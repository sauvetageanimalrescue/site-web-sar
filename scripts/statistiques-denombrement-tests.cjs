const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const fichier = path.join(__dirname, '../src/lib/statistiques-denombrement.ts');
const code = ts.transpileModule(fs.readFileSync(fichier, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const moduleTest = { exports: {} };
new Function('exports', 'module', code)(moduleTest.exports, moduleTest);
const { denombrementSecourus } = moduleTest.exports;
const ancienne = { espece_code: '204', nb_adultes: 1, nb_juveniles: 5 };
assert.equal(denombrementSecourus(ancienne).total, 6);
assert.equal(denombrementSecourus({ ...ancienne, animaux: null }).total, 6);
const ligne = (nombre, age, etat, espece_code = '204') => ({ nombre, age, etat, espece_code });
const mission = { ...ancienne, animaux: [
  ligne(1, 'adulte', 'Décédé'), ligne(4, 'juvenile', 'Orphelin'), ligne(1, 'juvenile', 'Décédé'),
] };
assert.equal(denombrementSecourus(mission).total, 4);
assert.deepEqual([...denombrementSecourus(mission).especes], [['204', 4]]);
mission.animaux.push(ligne(2, 'inconnu', 'Blessé', '205'));
assert.equal(denombrementSecourus(mission).total, 6);
assert.deepEqual([...denombrementSecourus(mission).especes], [['204', 4], ['205', 2]]);
assert.equal(denombrementSecourus({ ...ancienne, animaux: [ligne(3, 'inconnu', 'Décédé')] }).total, 0);
for (const animaux of [[], {}, [null], [ligne(-1, 'adulte', 'Blessé')], [ligne(1.5, 'adulte', 'Blessé')]]) {
  assert.equal(denombrementSecourus({ ...ancienne, animaux }).total, 0);
}
console.log('OK : anciennes fiches, six animaux dont deux Delta, âges inconnus et plusieurs espèces');

// Exercer également le consommateur utilisé par l'accueil et la page Statistiques,
// avec une base simulée, sans lire ni modifier la production.
async function verifierIntegration() {
  const maintenant = new Date().toISOString();
  const donnees = [
    { ...ancienne, created_at: maintenant, animaux: null },
    { ...mission, created_at: maintenant },
  ];
  let colonnes;
  const requete = {
    from: () => requete,
    select: valeur => { colonnes = valeur; return requete; },
    gt: async () => ({ data: donnees, error: null }),
  };
  const imports = nom => {
    if (nom === '@supabase/supabase-js') return { createClient: () => requete };
    if (nom === './statistiques-denombrement') return moduleTest.exports;
    if (nom === '@/contenu/compteur') return {
      REPORT_ANNEE: 0, REPORT_DEPLACEMENTS_ANNEE: 0,
      REPORT_MOIS: { annee: 0, mois: 0, animaux: 0, deplacements: 0 },
    };
    throw new Error(`Import inattendu : ${nom}`);
  };
  const compilation = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/statistiques.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const statsModule = { exports: {} };
  new Function('exports', 'module', 'require', compilation)(statsModule.exports, statsModule, imports);
  const sauvegarde = [process.env.REGISTRE_SUPABASE_URL, process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY];
  try {
    process.env.REGISTRE_SUPABASE_URL = 'https://exemple.invalid';
    process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY = 'simulation';
    const stats = await statsModule.exports.lireStatistiques();
    assert.equal(stats.jour, 12);
    assert.equal(stats.total, 12);
    assert.equal(stats.deplacements.jour, 2);
    assert.deepEqual(stats.especes, [{ code: '204', sauves: 10 }, { code: '205', sauves: 2 }]);
    assert.equal(colonnes, 'created_at,espece_code,nb_adultes,nb_juveniles,animaux');
    console.log('OK : intégration compteurs publics et répartition par espèce');
  } finally {
    ['REGISTRE_SUPABASE_URL', 'REGISTRE_SUPABASE_SERVICE_ROLE_KEY'].forEach((cle, i) => {
      if (sauvegarde[i] === undefined) delete process.env[cle]; else process.env[cle] = sauvegarde[i];
    });
  }
}
verifierIntegration().catch(erreur => { console.error(erreur); process.exitCode = 1; });
