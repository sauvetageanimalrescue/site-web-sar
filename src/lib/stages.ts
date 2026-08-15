import { createClient } from "@supabase/supabase-js";

// Les dates de stage sont publiques : on les lit avec la clé publishable,
// à travers la politique RLS qui n'expose que les stages publiés.

export type Stage = {
  id: string;
  code: string;
  date_stage: string;
  heure_debut: string;
  heure_fin: string;
  lieu: string;
  places: number;
  places_vendues: number;
  prix_cents: number;
};

export type StageDisponible = Stage & { restantes: number };

export async function lireStagesAVenir(): Promise<StageDisponible[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !cle) return [];

  const supabase = createClient(url, cle, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Un stage reste affiché le jour même : quelqu'un peut réserver le matin.
  const aujourdhui = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("stages")
    .select("*")
    .gte("date_stage", aujourdhui)
    .order("date_stage", { ascending: true });

  if (error || !data) return [];

  return (data as unknown as Stage[]).map((s) => ({
    ...s,
    restantes: Math.max(s.places - s.places_vendues, 0),
  }));
}
