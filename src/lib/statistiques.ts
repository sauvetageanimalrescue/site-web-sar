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

function clientRegistre() {
  const url = process.env.REGISTRE_SUPABASE_URL;
  const cle = process.env.REGISTRE_SUPABASE_ANON_KEY;
  if (!url || !cle) return null;
  return createClient(url, cle, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Retourne null plutôt que de lever : une panne du registre ne doit jamais
// empêcher la page d'accueil de s'afficher.
export async function lireStatistiques(): Promise<Statistiques | null> {
  const supabase = clientRegistre();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("statistiques_publiques");
  if (error || !data) return null;

  // Le report couvre les interventions accomplies avant que l'intranet ne
  // consigne tout. Il ne touche ni le jour, ni la semaine.
  const stats = data as Statistiques;
  const maintenant = new Date();
  const memeMois =
    maintenant.getFullYear() === REPORT_MOIS.annee &&
    maintenant.getMonth() + 1 === REPORT_MOIS.mois;
  // La migration qui ajoute « deplacements » à la fonction SQL se colle à la
  // main : entre le moment où ce code est déployé et celui où elle est
  // collée, le registre répond encore avec l'ancienne forme, sans ce champ.
  const deplacements = stats.deplacements ?? {
    jour: 0,
    semaine: 0,
    mois: 0,
    annee: 0,
    total: 0,
  };
  return {
    ...stats,
    mois: stats.mois + (memeMois ? REPORT_MOIS.animaux : 0),
    annee: stats.annee + REPORT_ANNEE,
    total: stats.total + REPORT_ANNEE,
    deplacements: {
      ...deplacements,
      mois: deplacements.mois + (memeMois ? REPORT_MOIS.deplacements : 0),
      annee: deplacements.annee + REPORT_DEPLACEMENTS_ANNEE,
      total: deplacements.total + REPORT_DEPLACEMENTS_ANNEE,
    },
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
