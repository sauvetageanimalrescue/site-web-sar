import { createClient } from "@supabase/supabase-js";

// Les compteurs viennent du registre des missions, qui est une base Supabase
// distincte de celle du site public. On n'y accède qu'à travers deux fonctions
// SECURITY DEFINER accordées au rôle anon : aucune ligne de mission, aucune
// donnée de demandeur ne traverse jamais la frontière.
// Voir registre-des-missions/supabase/migrations/0040_statistiques_publiques.sql

export type Statistiques = {
  jour: number;
  semaine: number;
  mois: number;
  annee: number;
  // Toujours calculé par le registre, mais pas affiché : avant le registre,
  // les chiffres de l'organisation n'existent pas de façon fiable.
  total: number;
  missions_annee: number;
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
  return data as Statistiques;
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
