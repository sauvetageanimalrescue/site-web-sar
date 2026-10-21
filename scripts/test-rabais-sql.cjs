// Dépendance de test locale : npm install --no-save --package-lock=false @electric-sql/pglite
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { PGlite } = require('@electric-sql/pglite');

test('migration idempotente, crédit, gratuité, répétition, dernière place et rollback', async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role service_role; create role anon; create role authenticated;
      create table public.membres(id uuid primary key);`);
    await db.exec(readFileSync('supabase/migrations/0003_commandes.sql', 'utf8'));
    await db.exec(readFileSync('supabase/migrations/0016_formations_premiers_secours.sql', 'utf8'));
    const migration = readFileSync('supabase/migrations/0018_rabais_formations.sql', 'utf8');
    await db.exec(migration); await db.exec(migration);
    const f = (await db.query("select id from formations where code = 'PSA-2611'")).rows[0].id;
    await db.query('update formations set places = 2 where id = $1', [f]);
    const commande = async (session) => (await db.query(`insert into commandes
      (type, montant_cents, courriel, prenom, nom, stripe_session_id, metadonnees)
      values ('formation',28997,'test@example.test','Test','Local',$1,$2) returning id`,
      [session, JSON.stringify({ formation_id: f, telephone: '000', manuel_imprime: true, carte_participation: true })])).rows[0].id;
    const confirmer = (id, session, total = 19397, sousTotal = 28997, rabais = 9600) => db.query(
      'select confirmer_commande_formation($1,$2,$3,$4,$5,$6,0,null) as resultat',
      [id, session, f, total, sousTotal, rabais]);
    const c1 = await commande('cs_1');
    assert.equal((await confirmer(c1, 'cs_1')).rows[0].resultat.statut, 'confirmee');
    assert.equal((await confirmer(c1, 'cs_1')).rows[0].resultat.nouvelle, false);
    assert.equal((await db.query('select places_vendues from formations where id=$1', [f])).rows[0].places_vendues, 1);
    const bilan = (await db.query('select montant_cents, rabais_cents, taxes_cents from commandes where id=$1', [c1])).rows[0];
    assert.deepEqual(bilan, { montant_cents: 19397, rabais_cents: 9600, taxes_cents: 0 });
    const c2 = await commande('cs_2');
    await confirmer(c2, 'cs_2', 0, 28997, 28997);
    assert.equal((await db.query('select montant_cents from commandes where id=$1', [c2])).rows[0].montant_cents, 0);
    const c3 = await commande('cs_3');
    assert.equal((await confirmer(c3, 'cs_3')).rows[0].resultat.statut, 'annulee');
    assert.equal((await confirmer(c3, 'cs_3')).rows[0].resultat.nouvelle, false);
    assert.equal((await db.query('select places_vendues from formations where id=$1', [f])).rows[0].places_vendues, 2);
    const c4 = await commande('cs_4');
    await assert.rejects(confirmer(c4, 'autre_session'), /incompatible/);
    await assert.rejects(confirmer(c4, 'cs_4', -1), /invalides/);
    await db.query('update formations set places=3 where id=$1', [f]);
    await db.query('update commandes set prenom=null where id=$1', [c4]);
    await assert.rejects(confirmer(c4, 'cs_4'), /null/);
    assert.equal((await db.query('select places_vendues from formations where id=$1', [f])).rows[0].places_vendues, 2, 'réservation annulée si insertion échoue');
    // L’appel anonyme ne gagne aucun droit de mutation via la fonction.
    await db.exec('set role anon');
    await assert.rejects(confirmer(c4, 'cs_4'), /permission denied/);
    await db.exec('reset role');
  } finally { await db.close(); }
});
