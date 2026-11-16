const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const racine = path.resolve(__dirname, '..');
function chargeur(remplacements = {}) {
  const cache = new Map();
  function lire(fichier) {
    if (cache.has(fichier)) return cache.get(fichier).exports;
    const module = { exports: {} }; cache.set(fichier, module);
    const code = ts.transpileModule(fs.readFileSync(fichier, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    function importer(nom) {
      if (Object.hasOwn(remplacements, nom)) return remplacements[nom];
      if (nom.startsWith('@/')) return lire(path.join(racine, 'src', nom.slice(2)) + '.ts');
      if (nom.startsWith('.')) return lire(path.resolve(path.dirname(fichier), nom) + '.ts');
      return require(nom);
    }
    new Function('exports', 'module', 'require', code)(module.exports, module, importer);
    return module.exports;
  }
  return lire;
}
const lire = chargeur();
const { denombrementSecourus } = lire(path.join(racine, 'src/lib/statistiques-denombrement.ts'));
const { calculerStatistiquesPubliques } = lire(path.join(racine, 'src/lib/statistiques-calculs.ts'));
const ligne = (nombre, age = 'adulte', etat = 'Blessé', espece_code = '204') => ({ nombre, age, etat, espece_code });
const mission = (id, champs = {}) => ({ id, created_at: '2026-11-01T16:00:00Z', statut: 'fermee', espece_code: '204', nb_adultes: 1, nb_juveniles: 0, nb_deces: 0, animaux: null, etat_animal: 'Blessé', ville: 'Montréal', region_administrative: '06', demandeur_type: 'Témoin', code_emplacement: '1101', mission_assignations: [], ...champs });
const affectation = (id, role = 'coop') => ({ profile_id: id, role, profiles: { prenom: `Sauveteur ${id}`, nom: 'Exemple' } });
const six = mission('six', { animaux: [ligne(1, 'adulte', 'Décédé'), ligne(4, 'juvenile', 'Orphelin'), ligne(1, 'juvenile', 'Décédé')], mission_assignations: [affectation('a','primaire'),affectation('a'),affectation('b')] });
assert.equal(denombrementSecourus(six).total, 6);
assert.deepEqual([...denombrementSecourus(six).especes], [['204', 6]]);
assert.equal(denombrementSecourus(mission('ancien', { nb_adultes: 2, nb_juveniles: 3, nb_deces: 1, animaux: [] })).total, 6);
assert.equal(denombrementSecourus(mission('inconnu', { animaux: [ligne(2,'inconnu')] })).total, 2);
for (const animaux of [{}, [null], [ligne(-1)], [ligne(1.5)]]) assert.equal(denombrementSecourus(mission('invalide',{ animaux })).total, 0);
const a = calculerStatistiquesPubliques([six,six,mission('radiee',{statut:'radiee'}),mission('futur',{created_at:'2027-01-01T12:00:00Z'})], new Date('2026-11-16T17:00:00Z'));
assert.equal(a.annee, 583); assert.equal(a.missions_annee,425);
assert.equal(a.annees[0].parMois.reduce((s,n)=>s+n,0),425);
assert.equal(a.annees[0].parJour.reduce((s,n)=>s+n,0),425);
assert.deepEqual(a.annees[0].equipe.map(p=>[p.missions,p.animaux]), [[1,6],[1,6]]);
assert.equal(a.annees[0].especes.reduce((s,e)=>s+e.sauves,0),6);
assert.equal(a.annees[0].etats.find(e=>e.libelle==='Décédé').valeur,2);
assert.equal(a.annees[0].parRegion[0].libelle,'Montréal');
assert.equal(a.annees[0].lieux[0].libelle,'Rue');
assert(!JSON.stringify(a).includes('profile_id'));
const frontiere = [mission('avant',{created_at:'2026-08-22T03:59:59Z'}),mission('apres',{created_at:'2026-08-22T04:00:00Z'}),mission('dec',{created_at:'2027-01-01T04:59:59Z'}),mission('jan',{created_at:'2027-01-01T05:00:00Z'})];
const b=calculerStatistiquesPubliques(frontiere,new Date('2027-01-01T17:00:00Z'));
assert.equal(b.annee,1);assert.equal(b.missions_annee,1);assert.equal(b.jour,1);assert.equal(b.mois,1);
assert.equal(b.annees.find(x=>x.annee===2026).animaux,579);
assert.equal(b.annees.find(x=>x.annee===2026).missions,426);
assert.equal(b.annees.find(x=>x.annee===2027).parMois[0],1);
const c=calculerStatistiquesPubliques([mission('fin',{code_fin:'10-99'})],new Date('2026-11-16T17:00:00Z'));
assert(!c.annees[0].etats.some(e=>e.libelle==='Décédé'));
console.log('OK: décès inclus, dédoublonnage, primaire/coop, report 2026, archives 2027, fuseau Québec et fin de mission indépendante.');
async function integration() {
  let appels=0, offset=0, colonnes='', panne=false;
  const donnees=Array.from({length:1001},(_,i)=>mission(String(i)));
  const requete={
    from:()=>requete,select:s=>{colonnes=s;return requete;},neq:()=>requete,gte:()=>requete,lte:()=>requete,order:()=>requete,
    range:n=>{offset=n;return requete;},abortSignal:async()=>{appels++;return panne && offset>=500 ? {data:null,error:{},count:null} : {data:donnees.slice(offset,offset+500),error:null,count:donnees.length};}
  };
  const imports={'server-only':{},'next/cache':{unstable_cache:fn=>fn},'@supabase/supabase-js':{createClient:()=>requete}};
  const mod=chargeur(imports)(path.join(racine,'src/lib/statistiques.ts'));
  const avant=[process.env.REGISTRE_SUPABASE_URL,process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY];
  try {
    process.env.REGISTRE_SUPABASE_URL='https://simulation.invalid';process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY='simulation';
    let resultat=await mod.lireStatistiques();
    assert(resultat);assert.equal(appels,3);assert.equal(resultat.total,1578);
    for(const champ of ['demandeur_nom','telephone','courriel','latitude','longitude','matricule']) assert(!colonnes.includes(champ));
    panne=true;assert.equal(await mod.lireStatistiques(),null);
    panne=false;assert(await mod.lireStatistiques());
    console.log('OK: pagination au-delà de 1000 fiches, échec sans total partiel, reprise et colonnes minimales.');
  } finally {
    ['REGISTRE_SUPABASE_URL','REGISTRE_SUPABASE_SERVICE_ROLE_KEY'].forEach((k,i)=>{if(avant[i]===undefined)delete process.env[k];else process.env[k]=avant[i];});
  }
}
integration().catch(e=>{console.error(e);process.exitCode=1;});
