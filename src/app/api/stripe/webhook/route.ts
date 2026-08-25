import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { creerMembre, envoyerCarteMembre } from "@/lib/membres";
import { envoyerCourriel, gabaritCourriel } from "@/lib/courriel";
import type { Locale } from "@/i18n/routing";

// Le webhook est la seule source de vérité d'un paiement : la page de retour
// du navigateur peut être fermée avant d'être chargée, Stripe réessaie.

async function marquerCommandePayee(
  session: Stripe.Checkout.Session,
  membreId: string | null,
) {
  const commandeId = session.metadata?.commande_id;
  if (!commandeId) return;

  await creerClientAdmin()
    .from("commandes")
    .update({
      statut: "payee",
      payee_le: new Date().toISOString(),
      stripe_paiement_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      stripe_abonnement_id:
        typeof session.subscription === "string" ? session.subscription : null,
      ...(membreId ? { membre_id: membreId } : {}),
    })
    .eq("id", commandeId);
}

async function traiterAdhesion(session: Stripe.Checkout.Session) {
  const m = session.metadata ?? {};
  const courriel =
    session.customer_details?.email ?? session.customer_email ?? "";
  if (!courriel) return null;

  const membre = await creerMembre({
    prenom: m.prenom ?? "",
    nom: m.nom ?? "",
    courriel,
    telephone: m.telephone || null,
    adresse: m.adresse || null,
    appartement: m.appartement || null,
    ville: m.ville || null,
    codePostal: m.code_postal || null,
    cartePhysique: m.carte_physique === "1",
    langue: (m.langue as Locale) ?? "fr",
    annee: Number(m.annee) || new Date().getFullYear(),
    renouvellementAuto: session.mode === "subscription",
    stripeClientId:
      typeof session.customer === "string" ? session.customer : null,
    stripePaiementId:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
    stripeAbonnementId:
      typeof session.subscription === "string" ? session.subscription : null,
  });

  // L'envoi du courriel ne doit jamais faire échouer le webhook : Stripe
  // réessaierait et on créerait un deuxième membre pour le même paiement.
  if (membre) {
    try {
      await envoyerCarteMembre(membre);
    } catch {
      // La carte reste régénérable depuis l'espace membre.
    }
  }
  return membre;
}

const CONFIRMATION_STAGE = {
  fr: {
    sujet: (code: string) => `Stage d'observation ${code} — place confirmée`,
    titre: "Votre place est réservée",
    corps: (date: string, heure: string, lieu: string) => `
      <p style="margin:0 0 14px;line-height:1.6;">Votre place au stage d'observation est confirmée.</p>
      <p style="margin:0 0 14px;line-height:1.6;"><strong>Date :</strong> ${date}<br>
      <strong>Heure :</strong> ${heure}<br>
      <strong>Point de rencontre :</strong> ${lieu}</p>
      <p style="margin:0 0 14px;line-height:1.6;">Présentez-vous quinze minutes à l'avance. Portez des vêtements adaptés à la météo et des souliers fermés. Une décharge de responsabilité est signée sur place.</p>
      <p style="margin:0;line-height:1.6;">C'est votre responsabilité de noter la date et l'heure. Aucun remboursement, mais vous pouvez céder votre place à une autre personne en nous prévenant.</p>`,
  },
  en: {
    sujet: (code: string) => `Observation day ${code} — spot confirmed`,
    titre: "Your spot is booked",
    corps: (date: string, heure: string, lieu: string) => `
      <p style="margin:0 0 14px;line-height:1.6;">Your spot on the observation day is confirmed.</p>
      <p style="margin:0 0 14px;line-height:1.6;"><strong>Date:</strong> ${date}<br>
      <strong>Time:</strong> ${heure}<br>
      <strong>Meeting point:</strong> ${lieu}</p>
      <p style="margin:0 0 14px;line-height:1.6;">Arrive fifteen minutes early. Wear weather-appropriate clothing and closed shoes. A liability waiver is signed on site.</p>
      <p style="margin:0;line-height:1.6;">Noting the date and time is your responsibility. No refunds, but you may transfer your spot to someone else by letting us know.</p>`,
  },
  es: {
    sujet: (code: string) => `Jornada de observación ${code} — plaza confirmada`,
    titre: "Su plaza está reservada",
    corps: (date: string, heure: string, lieu: string) => `
      <p style="margin:0 0 14px;line-height:1.6;">Su plaza en la jornada de observación está confirmada.</p>
      <p style="margin:0 0 14px;line-height:1.6;"><strong>Fecha:</strong> ${date}<br>
      <strong>Hora:</strong> ${heure}<br>
      <strong>Punto de encuentro:</strong> ${lieu}</p>
      <p style="margin:0 0 14px;line-height:1.6;">Preséntese quince minutos antes. Lleve ropa adecuada al tiempo y zapatos cerrados. Se firma una exención de responsabilidad en el lugar.</p>
      <p style="margin:0;line-height:1.6;">Anotar la fecha y la hora es su responsabilidad. Sin reembolso, pero puede ceder su plaza a otra persona avisándonos.</p>`,
  },
} as const;

async function traiterInscriptionStage(session: Stripe.Checkout.Session) {
  const m = session.metadata ?? {};
  const stageId = m.stage_id;
  const courriel =
    session.customer_details?.email ?? session.customer_email ?? "";
  if (!stageId || !courriel) return;

  const supabase = creerClientAdmin();

  // La place est décomptée de façon atomique : deux paiements simultanés sur
  // la dernière place ne peuvent pas passer tous les deux.
  const { data: reservee } = await supabase.rpc("reserver_place_stage", {
    p_stage_id: stageId,
  });

  await supabase.from("inscriptions_stage").insert({
    stage_id: stageId,
    commande_id: m.commande_id ?? null,
    prenom: m.prenom ?? "",
    nom: m.nom ?? "",
    courriel,
    telephone: m.telephone ?? "",
    accompagnateur_nom: m.accompagnateur || null,
    langue: (m.langue as Locale) ?? "fr",
    // Si la dernière place vient de partir, l'inscription est quand même
    // enregistrée mais marquée, pour que l'équipe rappelle la personne.
    statut: reservee === false ? "annulee" : "confirmee",
  });

  const { data: stage } = await supabase
    .from("stages")
    .select("code, date_stage, heure_debut, heure_fin, lieu")
    .eq("id", stageId)
    .maybeSingle();

  if (!stage) return;
  const s = stage as unknown as {
    code: string;
    date_stage: string;
    heure_debut: string;
    heure_fin: string;
    lieu: string;
  };

  const langue = ((m.langue as Locale) ?? "fr") as keyof typeof CONFIRMATION_STAGE;
  const textes = CONFIRMATION_STAGE[langue] ?? CONFIRMATION_STAGE.fr;
  const [a, mo, j] = s.date_stage.split("-");

  try {
    await envoyerCourriel({
      destinataire: courriel,
      sujet: textes.sujet(s.code),
      html: gabaritCourriel({
        titre: textes.titre,
        corps: textes.corps(
          `${j}/${mo}/${a}`,
          `${s.heure_debut.slice(0, 5)} — ${s.heure_fin.slice(0, 5)}`,
          s.lieu,
        ),
      }),
    });
  } catch {
    // Le paiement est encaissé et l'inscription enregistrée : un courriel
    // raté ne doit pas provoquer un réessai de Stripe.
  }
}

export async function POST(requete: NextRequest) {
  const signature = requete.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ erreur: "signature" }, { status: 400 });
  }

  let evenement: Stripe.Event;
  try {
    evenement = stripe().webhooks.constructEvent(
      await requete.text(),
      signature,
      secret,
    );
  } catch {
    return NextResponse.json({ erreur: "signature invalide" }, { status: 400 });
  }

  if (evenement.type === "checkout.session.completed") {
    const session = evenement.data.object;
    const type = session.metadata?.type;

    let membreId: string | null = null;
    if (type === "carte_membre") {
      const membre = await traiterAdhesion(session);
      membreId = membre?.id ?? null;
    }
    if (type === "stage") {
      await traiterInscriptionStage(session);
    }
    await marquerCommandePayee(session, membreId);
  }

  // Reconduction annuelle : Stripe prélève, on prolonge l'adhésion d'un an et
  // on réexpédie une carte à la nouvelle année.
  if (evenement.type === "invoice.paid") {
    const facture = evenement.data.object;
    const abonnement =
      typeof facture.parent?.subscription_details?.subscription === "string"
        ? facture.parent.subscription_details.subscription
        : null;

    if (abonnement && facture.billing_reason === "subscription_cycle") {
      const supabase = creerClientAdmin();
      const { data } = await supabase
        .from("membres")
        .select("*")
        .eq("stripe_abonnement_id", abonnement)
        .maybeSingle();

      if (data) {
        const nouvelleAnnee = new Date().getFullYear();
        const { data: prolonge } = await supabase
          .from("membres")
          .update({
            annee: nouvelleAnnee,
            expire_le: `${nouvelleAnnee}-12-31`,
            statut: "actif",
            carte_envoyee_le: null,
          })
          .eq("id", data.id)
          .select("*")
          .single();

        if (prolonge) {
          try {
            await envoyerCarteMembre(prolonge as never);
          } catch {
            // Idem : la carte reste téléchargeable depuis l'espace membre.
          }
        }
      }
    }
  }

  if (evenement.type === "customer.subscription.deleted") {
    const abonnement = evenement.data.object;
    await creerClientAdmin()
      .from("membres")
      .update({ renouvellement_auto: false })
      .eq("stripe_abonnement_id", abonnement.id);
  }

  return NextResponse.json({ recu: true });
}
