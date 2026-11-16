import { denombrementSecourus } from "./statistiques-denombrement";
import { REPORT_ANNEE, REPORT_ARRETE_LE, REPORT_DEPLACEMENTS_ANNEE, REPORT_MOIS } from "@/contenu/compteur";
import { MISSIONS_PAR_MOIS, PAR_JOUR, type Mesure } from "@/contenu/statistiques-2026";
import { EMPLACEMENTS_STATISTIQUES, REGIONS_STATISTIQUES, DEMANDEURS_STATISTIQUES } from "@/contenu/references-statistiques";

export type MissionCompteur = {
  id: string; created_at: string; statut: string;
  espece_code: string | null; nb_adultes: number | null; nb_juveniles: number | null;
  nb_deces: number | null; animaux: unknown; etat_animal: string | null;
  ville: string | null; region_administrative: string | null;
  demandeur_type: string | null; code_emplacement: string | null;
  mission_assignations: { profile_id: string; role: string; profiles: { prenom: string; nom: string } | null }[];
};
export type CompteurPeriodes = { jour: number; semaine: number; mois: number; annee: number; total: number };
export type AnneeStatistiques = {
  annee: number; missions: number; animaux: number; municipalites: number; regions: number;
  parMois: number[]; parJour: number[]; especes: { code: string; sauves: number }[];
  etats: Mesure[]; parMunicipalite: Mesure[]; parRegion: Mesure[]; demandeurs: Mesure[]; lieux: Mesure[];
  equipe: { nom: string; missions: number; animaux: number }[];
};
export type Statistiques = CompteurPeriodes & {
  missions_annee: number; deplacements: CompteurPeriodes; especes: { code: string; sauves: number }[];
  familles: { famille: string; sauves: number }[]; mensuel: { mois: string; sauves: number }[];
  anneeCourante: number; annees: AnneeStatistiques[]; genere_a: string;
};

const formatDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" });
export function dateToronto(date: Date) {
  const parts = formatDate.formatToParts(date);
  return ["year", "month", "day"].map(type => parts.find(p => p.type === type)!.value).join("-");
}
const classement = (table: Map<string, number>): Mesure[] => [...table].map(([libelle, valeur]) => ({ libelle, valeur })).sort((a, b) => b.valeur - a.valeur || a.libelle.localeCompare(b.libelle, "fr"));
const ajouter = (table: Map<string, number>, cle: string, n: number) => table.set(cle, (table.get(cle) ?? 0) + n);
const periodes = (): CompteurPeriodes => ({ jour: 0, semaine: 0, mois: 0, annee: 0, total: 0 });

export function calculerStatistiquesPubliques(entrees: MissionCompteur[], maintenant = new Date()): Statistiques {
  const jour = dateToronto(maintenant), anneeCourante = Number(jour.slice(0, 4));
  const debut = new Date(`${jour}T00:00:00Z`);
  debut.setUTCDate(debut.getUTCDate() - (debut.getUTCDay() + 6) % 7);
  const semaine = debut.toISOString().slice(0, 10);
  const animaux = periodes(), deplacements = periodes();
  // L'historique couvre seulement 2026. Les détails sans ventilation fiable
  // viennent exclusivement du registre, sans répartir artificiellement le report.
  const missions = [...new Map(entrees.filter(m => m.statut !== "radiee" &&
    Number.isFinite(Date.parse(m.created_at)) && Date.parse(m.created_at) <= maintenant.getTime() &&
    dateToronto(new Date(m.created_at)) > REPORT_ARRETE_LE).map(m => [m.id, m])).values()];
  const mensuel = new Map<string, number>();
  for (const m of missions) {
    const date = dateToronto(new Date(m.created_at));
    const n = denombrementSecourus(m).total;
    for (const [compteur, valeur] of [[animaux, n], [deplacements, 1]] as const) {
      compteur.total += valeur;
      if (date.slice(0, 4) === String(anneeCourante)) compteur.annee += valeur;
      if (date.slice(0, 7) === jour.slice(0, 7)) compteur.mois += valeur;
      if (date >= semaine) compteur.semaine += valeur;
      if (date === jour) compteur.jour += valeur;
    }
    ajouter(mensuel, date.slice(0, 7), n);
  }
  animaux.total += REPORT_ANNEE;
  deplacements.total += REPORT_DEPLACEMENTS_ANNEE;
  if (anneeCourante === 2026) { animaux.annee += REPORT_ANNEE; deplacements.annee += REPORT_DEPLACEMENTS_ANNEE; }
  if (jour.slice(0, 7) === `${REPORT_MOIS.annee}-${String(REPORT_MOIS.mois).padStart(2, "0")}`) {
    animaux.mois += REPORT_MOIS.animaux; deplacements.mois += REPORT_MOIS.deplacements;
  }
  const annees: AnneeStatistiques[] = [];
  for (let annee = anneeCourante; annee >= 2026; annee--) {
    const parMois = Array<number>(12).fill(0), parJour = Array<number>(7).fill(0);
    if (annee === 2026) {
      MISSIONS_PAR_MOIS.forEach((m, i) => { parMois[i] = m.valeur; });
      PAR_JOUR.forEach((m, i) => { parJour[i] = m.valeur; });
    }
    let nbMissions = annee === 2026 ? REPORT_DEPLACEMENTS_ANNEE : 0;
    let nbAnimaux = annee === 2026 ? REPORT_ANNEE : 0;
    const especes = new Map<string, number>(), etats = new Map<string, number>();
    const villes = new Map<string, number>(), regions = new Map<string, number>();
    const demandeurs = new Map<string, number>(), lieux = new Map<string, number>();
    const equipe = new Map<string, { nom: string; missions: number; animaux: number }>();
    for (const m of missions) {
      const date = dateToronto(new Date(m.created_at));
      if (!date.startsWith(String(annee))) continue;
      const n = denombrementSecourus(m);
      nbMissions++; nbAnimaux += n.total;
      parMois[Number(date.slice(5, 7)) - 1]++;
      parJour[(new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7]++;
      for (const [code, valeur] of n.especes) ajouter(especes, code, valeur);
      for (const [etat, valeur] of n.etats) ajouter(etats, etat, valeur);
      ajouter(villes, m.ville?.trim() || "Non renseigné", 1);
      ajouter(regions, REGIONS_STATISTIQUES[m.region_administrative ?? ""] ?? "Non renseigné", 1);
      // Ne jamais publier un texte libre de demandeur ou de lieu: seules les
      // catégories du référentiel, sans adresse ni coordonnées, sont exposées.
      ajouter(demandeurs, DEMANDEURS_STATISTIQUES.includes(m.demandeur_type ?? "") ? m.demandeur_type! : "Non renseigné", 1);
      ajouter(lieux, EMPLACEMENTS_STATISTIQUES[m.code_emplacement ?? ""] ?? "Non renseigné", 1);
      const vus = new Set<string>();
      for (const a of m.mission_assignations ?? []) {
        if (!["primaire", "coop"].includes(a.role) || vus.has(a.profile_id)) continue;
        vus.add(a.profile_id);
        const nom = a.profiles ? `${a.profiles.prenom} ${a.profiles.nom}`.trim() : "Profil indisponible";
        const personne = equipe.get(a.profile_id) ?? { nom, missions: 0, animaux: 0 };
        personne.missions++; personne.animaux += n.total; equipe.set(a.profile_id, personne);
      }
    }
    annees.push({ annee, missions: nbMissions, animaux: nbAnimaux,
      municipalites: [...villes.keys()].filter(v => v !== "Non renseigné").length,
      regions: [...regions.keys()].filter(v => v !== "Non renseigné").length,
      parMois, parJour, especes: classement(especes).map(e => ({ code: e.libelle, sauves: e.valeur })),
      etats: classement(etats), parMunicipalite: classement(villes), parRegion: classement(regions),
      demandeurs: classement(demandeurs), lieux: classement(lieux),
      equipe: [...equipe.values()].sort((a, b) => b.missions - a.missions || b.animaux - a.animaux || a.nom.localeCompare(b.nom, "fr")),
    });
  }
  return { ...animaux, missions_annee: deplacements.annee, deplacements, annees, anneeCourante,
    especes: annees[0]?.especes ?? [], familles: [],
    mensuel: [...mensuel].map(([mois, sauves]) => ({ mois, sauves })).sort((a,b) => a.mois.localeCompare(b.mois)),
    genere_a: maintenant.toISOString() };
}
