const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function charger(fichier, modules = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(fichier, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, require: (nom) => {
    if (nom in modules) return modules[nom];
    throw new Error(`Dépendance non simulée: ${nom}`);
  }, process, console, Date, Intl, crypto: require('node:crypto') }, { filename: fichier });
  return module.exports;
}
const rabais = charger('src/lib/rabais-formation.ts');
const tarifs = charger('src/lib/tarifs-formation.ts');
const formation = { id: 'novembre', code: 'PSA-2611', titre: 'Formation', date_debut: '2099-11-28', date_fin: '2099-11-29', prix_cents: 24999, places: 25, places_vendues: 11, publie: true };

test('options : montants côté serveur et Stripe concordent, produit stable, codes activés', async () => {
  for (const manuel of [false, true]) for (const carte of [false, true]) for (const clientStripeId of [undefined, 'cus_destinataire']) {
    const appels = {};
    let erreurRattachement = false;
    const db = { from: (table) => {
      const q = {
        select: () => q, eq: () => q,
        maybeSingle: async () => ({ data: formation }),
        insert: (valeur) => { appels.commande = valeur; return q; },
        single: async () => ({ data: { id: 'commande' } }),
        update: () => { q.error = erreurRattachement ? { message: 'écriture refusée' } : null; return q; },
      };
      assert.ok(['formations', 'commandes'].includes(table));
      return q;
    } };
    const stripe = {
      customers: { retrieve: async () => ({ email: 'test@example.test' }) },
      products: { retrieve: async (id) => ({ id, active: true }) },
      checkout: { sessions: {
        create: async (params) => { appels.session = params; return { id: 'cs_test', url: 'https://example.test/checkout' }; },
        expire: async (id) => { appels.expiree = id; },
      } },
    };
    const paiement = charger('src/lib/paiement.ts', {
      'server-only': {}, '@/lib/stripe': { stripe: () => stripe, urlSite: () => 'https://example.test' },
      '@/lib/supabase/admin': { creerClientAdmin: () => db }, '@/lib/constantes': {},
      '@/lib/rabais-formation': rabais, '@/lib/tarifs-formation': tarifs,
    });
    await paiement.creerPaiementFormation({ formationId: formation.id, prenom: 'Test', nom: 'Local', courriel: 'test@example.test', telephone: '000', manuelImprime: manuel, carteParticipation: carte, langue: 'fr', clientStripeId });
    const attendu = 24999 + (manuel ? 2999 : 0) + (carte ? 999 : 0);
    assert.equal(appels.commande.montant_cents, attendu);
    assert.equal(appels.session.line_items.reduce((s, l) => s + l.price_data.unit_amount * l.quantity, 0), attendu);
    assert.equal(appels.session.allow_promotion_codes, true);
    assert.equal(appels.session.line_items[0].price_data.product, 'sar_formation_novembre');
    assert.equal(appels.session.automatic_tax, undefined);
    assert.equal(appels.session.customer, clientStripeId, 'identité uniquement fournie par une préparation serveur');
    assert.equal(appels.session.customer_email, clientStripeId ? undefined : 'test@example.test');
    stripe.customers.retrieve = async () => ({ email: 'autre@example.test' });
    await assert.rejects(paiement.creerPaiementFormation({ formationId: formation.id, courriel: 'test@example.test', clientStripeId: 'cus_autre' }), /Destinataire Stripe incompatible/);
    erreurRattachement = true;
    await assert.rejects(paiement.creerPaiementFormation({ formationId: formation.id, courriel: 'test@example.test', langue: 'fr' }), /Rattachement de la session impossible/);
    assert.equal(appels.expiree, 'cs_test');
  }
});

test('produit absent : création stable et idempotente; refus et produit inactif ne sont pas masqués', async () => {
  let cree;
  await rabais.obtenirProduitFormation({ products: {
    retrieve: async () => { throw { code: 'resource_missing' }; },
    create: async (p, options) => { cree = { p, options }; return p; },
  } }, formation);
  assert.equal(cree.p.id, 'sar_formation_novembre');
  assert.equal(cree.options.idempotencyKey, 'produit-formation-novembre');
  await assert.rejects(rabais.obtenirProduitFormation({ products: { retrieve: async () => { throw new Error('permission'); } } }, formation), /permission/);
  await assert.rejects(rabais.obtenirProduitFormation({ products: { retrieve: async () => ({ active: false }) } }, formation), /indisponible/);
});

const session = { id: 'cs_test', status: 'complete', payment_status: 'paid', currency: 'cad', amount_total: 15399, amount_subtotal: 24999, total_details: { amount_discount: 9600, amount_tax: 0 }, customer_email: 'test@example.test', metadata: { type: 'formation', commande_id: 'commande', formation_id: 'novembre' } };

test('bilan : remise 96 CAD, gratuité, taxes, paiement différé et montants invalides', () => {
  assert.equal(rabais.bilanPaiement(session).montant_cents, 15399);
  assert.equal(rabais.bilanPaiement(session).rabais_cents, 9600);
  assert.equal(rabais.bilanPaiement({ ...session, amount_total: 0, payment_status: 'no_payment_required' }).montant_cents, 0);
  assert.equal(rabais.bilanPaiement({ ...session, amount_total: 17705, total_details: { amount_discount: 9600, amount_tax: 2306 } }).taxes_cents, 2306);
  for (const valeurs of [{ payment_status: 'unpaid' }, { status: 'open' }, { amount_total: null }, { amount_total: -1 }, { currency: 'usd' }, { payment_status: 'no_payment_required' }]) {
    assert.throws(() => rabais.bilanPaiement({ ...session, ...valeurs }));
  }
});

test('webhook : impayé ignoré, paiement différé accepté, transaction en erreur réessayable', async () => {
  let evenement;
  let rpc = 0;
  let erreur = false;
  const webhook = charger('src/app/api/stripe/webhook/route.ts', {
    'next/server': { NextResponse: { json: (body) => body } },
    'next-intl/server': { getTranslations: async () => () => '' },
    '@/lib/stripe': { stripe: () => ({ webhooks: { constructEvent: () => evenement } }) },
    '@/lib/supabase/admin': { creerClientAdmin: () => ({ rpc: async (_, params) => {
      rpc++; assert.equal(params.p_montant_cents, session.amount_total);
      return erreur ? { error: true } : { data: { nouvelle: false } };
    } }) },
    '@/lib/membres': {}, '@/lib/courriel': {}, '@/lib/stages/documents': {}, '@/lib/rabais-formation': rabais,
  });
  process.env.STRIPE_WEBHOOK_SECRET = 'secret-local-factice';
  const requete = { headers: { get: () => 'signature-simulee' }, text: async () => '{}' };
  evenement = { type: 'checkout.session.completed', data: { object: { ...session, payment_status: 'unpaid' } } };
  await webhook.POST(requete); assert.equal(rpc, 0);
  evenement = { type: 'checkout.session.async_payment_succeeded', data: { object: session } };
  await webhook.POST(requete); assert.equal(rpc, 1);
  erreur = true;
  await assert.rejects(webhook.POST(requete), /Confirmation de formation impossible/);
});
