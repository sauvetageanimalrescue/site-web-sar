import 'server-only';
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { calculerStatistiquesPubliques, dateToronto, type MissionCompteur, type Statistiques } from "./statistiques-calculs";
export type { Statistiques, CompteurPeriodes } from "./statistiques-calculs";

export type InterventionRecente = {
  ferme_a: string; ville: string | null; espece_code: string | null;
  code_fin: string | null; sauves: number;
};
function clientRegistre() {
  const url = process.env.REGISTRE_SUPABASE_URL;
  const cle = process.env.REGISTRE_SUPABASE_ANON_KEY;
  return url && cle ? createClient(url, cle, { auth: { autoRefreshToken: false, persistSession: false } }) : null;
}

// Seul le résultat agrégé et publiable entre dans le cache partagé. Les clés,
// les fiches, les identifiants et les coordonnées restent côté serveur.
async function chargerStatistiques(jour: string): Promise<Statistiques> {
  const url = process.env.REGISTRE_SUPABASE_URL;
  const cle = process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) throw new Error("Statistiques indisponibles");
  const supabase = createClient(url, cle, { auth: { autoRefreshToken: false, persistSession: false } });
  const maintenant = new Date();
  if (dateToronto(maintenant) !== jour) throw new Error("Changement de journée, lecture à reprendre");
  const missions: MissionCompteur[] = [];
  const delai = AbortSignal.timeout(25_000);
  let offset = 0;
  // Pagination ordonnée, pas de total silencieusement tronqué à 1 000 lignes.
  // Une réponse incomplète ou un budget dépassé conserve les anciens chiffres.
  for (let page = 0; page < 100; page++) {
    const { data, error, count } = await supabase.from("missions")
      .select(`id,created_at,statut,espece_code,nb_adultes,nb_juveniles,nb_deces,animaux,etat_animal,
        ville,region_administrative,demandeur_type,code_emplacement,
        mission_assignations(profile_id,role,profiles(prenom,nom))`, { count: "exact" })
      .neq("statut", "radiee").gte("created_at", "2026-08-22T00:00:00-04:00")
      .lte("created_at", maintenant.toISOString()).order("id").range(offset, offset + 499).abortSignal(delai);
    if (error || !data || count === null || (!data.length && offset < count)) throw new Error("Lecture des statistiques interrompue");
    missions.push(...data as unknown as MissionCompteur[]);
    offset += data.length;
    if (offset >= count) return calculerStatistiquesPubliques(missions, maintenant);
  }
  throw new Error("Volume des statistiques dépassé");
}
const lireAgregats = unstable_cache(chargerStatistiques, ["statistiques-publiques-v2"], { revalidate: 60 });
export async function lireStatistiques(): Promise<Statistiques | null> {
  try { return await lireAgregats(dateToronto(new Date())); }
  catch { return null; }
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
