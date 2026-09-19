import { createClient } from "@supabase/supabase-js";
import {
  REPORT_ANNEE,
  REPORT_DEPLACEMENTS_ANNEE,
  REPORT_MOIS,
} from "@/contenu/compteur";

// Les compteurs viennent du registre des missions, qui est une base Supabase
// distincte de celle du site public. On n'y accède qu'à travers deux fonctions
// SECURITY DEFINER accordées au rôle anon : aucune ligne de mission, aucune
// donnée de demandeur ne traverse jamais la frontière.
// Voir supabase/migrations/0009_deplacements_et_coupure_par_date.sql

export type CompteurPeriodes = {
  jour: number;
  semaine: number;
  mois: number;
  annee: number;
  total: number;
};

export type Statistiques = CompteurPeriodes & {
  missions_annee: number;
  // Même dénombrement, mais en déplacements plutôt qu'en animaux : une
  // mission compte dès qu'une équipe s'est rendue sur les lieux, prise en
  // charge de l'animal ou non.
  deplacements: CompteurPeriodes;
  especes?: { code: string; sauves: number }[];
  familles: { famille: string; sauves: number }[];
  mensuel: { mois: string; sauves: number }[];
  genere_a: string;
};

export type InterventionRecente = {
  ferme_a: string;
  ville: string | null;
  espece_code: string | null;
  code_fin: string | null;
  sauves: number;
};

type MissionCompteur = {
  created_at: string;
  espece_code: string | null;
  nb_adultes: number | null;
  nb_juveniles: number | null;
};

function clientRegistre() {
  const url = process.env.REGISTRE_SUPABASE_URL;
  const cle = process.env.REGISTRE_SUPABASE_ANON_KEY;
  if (!url || !cle) return null;
  return createClient(url, cle, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function cleDateToronto(date: Date) {
  const morceaux = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const valeur = (type: Intl.DateTimeFormatPartTypes) =>
    morceaux.find((morceau) => morceau.type === type)?.value ?? "";
  return `${valeur("year")}-${valeur("month")}-${valeur("day")}`;
}

function debutSemaine(cle: string) {
  const [annee, mois, jour] = cle.split("-").map(Number);
  const date = new Date(Date.UTC(annee, mois - 1, jour));
  const decalage = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - decalage);
  return date.toISOString().slice(0, 10);
}

// Retourne null plutôt que de lever : une panne du registre ne doit jamais
// empêcher la page d'accueil de s'afficher.
export async function lireStatistiques(): Promise<Statistiques | null> {
  const url = process.env.REGISTRE_SUPABASE_URL;
  const cle = process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY;
  const supabase = url && cle
    ? createClient(url, cle, { auth: { autoRefreshToken: false, persistSession: false } })
    : null;
  if (!supabase) return null;

  // Seules ces quatre colonnes non sensibles quittent le registre. La règle
  // opérationnelle est volontairement indépendante du code de fin: une carte
  // d'appel vaut un déplacement et son dénombrement vaut les animaux secourus.
  const { data, error } = await supabase
    .from("missions")
    .select("created_at,espece_code,nb_adultes,nb_juveniles")
    .gt("created_at", "2026-08-21T23:59:59-04:00");
  if (error || !data) return null;

  const maintenant = new Date();
  const aujourdHui = cleDateToronto(maintenant);
  const semaine = debutSemaine(aujourdHui);
  const mois = aujourdHui.slice(0, 7);
  const annee = aujourdHui.slice(0, 4);
  const periodes = () => ({ jour: 0, semaine: 0, mois: 0, annee: 0, total: 0 });
  const animaux = periodes();
  const deplacements = periodes();
  const especes = new Map<string, number>();
  const mensuel = new Map<string, number>();

  for (const mission of data as MissionCompteur[]) {
    const date = cleDateToronto(new Date(mission.created_at));
    const nombre = Math.max(0, mission.nb_adultes ?? 0) + Math.max(0, mission.nb_juveniles ?? 0);
    const ajouter = (compteur: CompteurPeriodes, valeur: number) => {
      compteur.total += valeur;
      if (date.startsWith(annee)) compteur.annee += valeur;
      if (date.startsWith(mois)) compteur.mois += valeur;
      if (date >= semaine) compteur.semaine += valeur;
      if (date === aujourdHui) compteur.jour += valeur;
    };
    ajouter(animaux, nombre);
    ajouter(deplacements, 1);
    mensuel.set(date.slice(0, 7), (mensuel.get(date.slice(0, 7)) ?? 0) + nombre);
    if (mission.espece_code && nombre > 0) {
      especes.set(mission.espece_code, (especes.get(mission.espece_code) ?? 0) + nombre);
    }
  }

  const memeMois =
    Number(annee) === REPORT_MOIS.annee &&
    Number(mois.slice(5, 7)) === REPORT_MOIS.mois;
  return {
    ...animaux,
    mois: animaux.mois + (memeMois ? REPORT_MOIS.animaux : 0),
    annee: animaux.annee + REPORT_ANNEE,
    total: animaux.total + REPORT_ANNEE,
    missions_annee: deplacements.annee + REPORT_DEPLACEMENTS_ANNEE,
    deplacements: {
      ...deplacements,
      mois: deplacements.mois + (memeMois ? REPORT_MOIS.deplacements : 0),
      annee: deplacements.annee + REPORT_DEPLACEMENTS_ANNEE,
      total: deplacements.total + REPORT_DEPLACEMENTS_ANNEE,
    },
    especes: [...especes.entries()].map(([code, sauves]) => ({ code, sauves })),
    familles: [],
    mensuel: [...mensuel.entries()]
      .map(([mois, sauves]) => ({ mois, sauves }))
      .sort((a, b) => a.mois.localeCompare(b.mois)),
    genere_a: maintenant.toISOString(),
  };
}

export async function lireInterventionsRecentes(
  limite = 8,
): Promise<InterventionRecente[]> {
  const supabase = clientRegistre();
  if (!supabase) return [];

  const { data, error } = await supabase.rpc("interventions_recentes", {
    p_limite: limite,
  });
  if (error || !data) return [];
  return data as unknown as InterventionRecente[];
}
