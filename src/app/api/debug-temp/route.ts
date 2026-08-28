import { NextResponse } from "next/server";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { genererCarteMembre } from "@/lib/carte/generer";
import type { Membre } from "@/lib/membres";

// Route temporaire, retiree juste apres verification de l'envoi Resend une
// fois le domaine sar.quebec verifie. Expose la reponse brute de Resend
// pour diagnostiquer un echec que envoyerCourriel avale normalement.
// Protegee par la cle service role, que seuls Eric et Claude possedent.
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
  const membre = data as unknown as Membre;

  let pdf: Uint8Array;
  try {
    pdf = await genererCarteMembre({
      prenom: membre.prenom,
      nom: membre.nom,
      numero: membre.numero,
      annee: membre.annee,
      expireLe: membre.expire_le,
      jetonVerification: membre.jeton_verification,
      langue: membre.langue,
    });
  } catch (e) {
    return NextResponse.json({ etape: "pdf", erreur: String(e) }, { status: 500 });
  }

  const cle = process.env.RESEND_API_KEY;
  const expediteur =
    process.env.COURRIEL_EXPEDITEUR || "Sauvetage Animal Rescue <info@sar.quebec>";
  const reponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: expediteur,
      to: [membre.courriel],
      subject: `Votre carte de membre ${membre.annee}`,
      html: "<p>Test de diagnostic, carte en piece jointe.</p>",
      attachments: [
        {
          filename: `carte-membre-${membre.numero}.pdf`,
          content: Buffer.from(pdf).toString("base64"),
        },
      ],
    }),
  });
  const texte = await reponse.text();
  return NextResponse.json({
    statut: reponse.status,
    ok: reponse.ok,
    corps: texte,
    tailleAttachementBase64: Buffer.from(pdf).toString("base64").length,
    cleUtiliseePrefixe: cle ? cle.slice(0, 8) : null,
    expediteurUtilise: JSON.stringify(expediteur),
  });
}
