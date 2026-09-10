import { createClient } from "@supabase/supabase-js";

export type Formation = {
  id: string;
  code: string;
  titre: string;
  date_debut: string;
  date_fin: string;
  heure_debut: string;
  heure_fin: string;
  lieu: string;
  places: number;
  places_vendues: number;
  prix_cents: number;
};

export type FormationDisponible = Formation & { restantes: number };

export async function lireFormationsAVenir(): Promise<FormationDisponible[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !cle) return [];

  const supabase = createClient(url, cle, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("formations")
    .select("*")
    .gte("date_debut", aujourdhui)
    .order("date_debut", { ascending: true });

  if (error || !data) return [];
  return (data as unknown as Formation[]).map((formation) => ({
    ...formation,
    restantes: Math.max(formation.places - formation.places_vendues, 0),
  }));
}
