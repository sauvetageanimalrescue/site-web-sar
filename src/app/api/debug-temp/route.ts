import { NextResponse } from "next/server";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { envoyerCarteMembre, type Membre } from "@/lib/membres";

// Route temporaire, retiree juste apres verification de l'envoi Resend une
// fois le domaine sar.quebec verifie. Protegee par la cle service role,
// que seuls Eric et Claude possedent.
export async function POST(requete: Request) {
  const auth = requete.headers.get("authorization");
  if (auth !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ erreur: "non autorise" }, { status: 401 });
  }
  const { id } = (await requete.json()) as { id: string };
  const { data, error } = await creerClientAdmin()
    .from("membres")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    return NextResponse.json({ erreur: "introuvable", detail: error }, { status: 404 });
  }
  const envoye = await envoyerCarteMembre(data as unknown as Membre);
  return NextResponse.json({ envoye });
}
