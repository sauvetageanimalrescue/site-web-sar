import { createClient } from "@supabase/supabase-js";

// Écriture dans le registre des missions. Réservé au serveur : la clé
// service_role contourne la RLS et ne doit jamais atteindre le navigateur.
// Le site n'y écrit qu'une seule chose, un signalement entrant.

export function clientRegistreAdmin() {
  const url = process.env.REGISTRE_SUPABASE_URL;
  const cle = process.env.REGISTRE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) return null;
  return createClient(url, cle, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export type SignalementEntrant = {
  signalantNom: string;
  signalantTelephone: string;
  signalantCourriel: string | null;
  adresse: string;
  ville: string;
  codePostal: string | null;
  precisionsLieu: string | null;
  especeCode: string | null;
  etatAnimal: string | null;
  etatPrecisions: string;
  langue: string;
};

// Retourne le numéro de signalement (S-AAAA-NNNNN) pour que le citoyen
// puisse s'y référer, ou null si le registre est injoignable.
export async function creerSignalement(
  entree: SignalementEntrant,
): Promise<string | null> {
  const supabase = clientRegistreAdmin();
  if (!supabase) return null;

  const { data: numero, error: erreurNumero } = await supabase.rpc(
    "generer_numero_signalement",
  );
  if (erreurNumero || !numero) return null;

  const { error } = await supabase.from("signalements").insert({
    numero,
    canal: "formulaire_web",
    statut: "nouveau",
    signalant_type: "citoyen",
    signalant_nom: entree.signalantNom,
    signalant_telephone: entree.signalantTelephone,
    signalant_courriel: entree.signalantCourriel,
    adresse: entree.adresse,
    ville: entree.ville,
    code_postal: entree.codePostal,
    precisions_lieu: entree.precisionsLieu,
    espece_code: entree.especeCode,
    etat_animal: entree.etatAnimal,
    etat_precisions: entree.etatPrecisions,
    langue: entree.langue,
  });

  if (error) return null;
  return numero as string;
}
