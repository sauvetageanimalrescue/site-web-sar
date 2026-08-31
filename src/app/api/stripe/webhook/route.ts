import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe, urlSite } from "@/lib/stripe";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { creerMembre, envoyerCarteMembre } from "@/lib/membres";
import { envoyerCourriel, gabaritCourriel } from "@/lib/courriel";
import {
  genererAutorisationStage,
  genererBilletsStage,
  genererGuideStage,
  type DonneesDocumentsStage,
} from "@/lib/stages/documents";
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
    province: m.province || null,
    pays: m.pays || null,
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

  // Stripe peut livrer le meme evenement plus d'une fois. Une commande deja
  // inscrite ne doit jamais reserver les places ni envoyer les billets deux fois.
  if (m.commande_id) {
    const { data: existante } = await supabase
      .from("inscriptions_stage")
      .select("id")
      .eq("commande_id", m.commande_id)
      .maybeSingle();
    if (existante) return;
  }

  const nombrePersonnes = m.nombre_personnes === "2" ? 2 : 1;

  // La place est décomptée de façon atomique : deux paiements simultanés sur
  // la dernière place ne peuvent pas passer tous les deux.
  const { data: reservee } = await supabase.rpc("reserver_places_stage", {
    p_stage_id: stageId,
    p_nombre_places: nombrePersonnes,
  });

  const billet1Jeton = crypto.randomUUID();
  const billet2Jeton = nombrePersonnes === 2 ? crypto.randomUUID() : null;
  const autorisationRequise = m.mineur1 === "1" || m.mineur2 === "1";
  const autorisationTexte = autorisationRequise
    ? "Je confirme etre autorise a inscrire le ou les participants mineurs nommes dans ce document et avoir obtenu l'accord de leur parent ou de leur tuteur legal."
    : null;

  await supabase.from("inscriptions_stage").insert({
    stage_id: stageId,
    commande_id: m.commande_id ?? null,
    prenom: m.participant1_prenom ?? "",
    nom: m.participant1_nom ?? "",
    courriel,
    telephone: m.telephone ?? "",
    accompagnateur_prenom: m.participant2_prenom || null,
    accompagnateur_nom: m.participant2_nom || null,
    personne1_mineure: m.mineur1 === "1",
    personne2_mineure: m.mineur2 === "1",
    scenario: m.scenario ?? null,
    responsable_prenom: m.responsable_prenom ?? "",
    responsable_nom: m.responsable_nom ?? "",
    participant1_prenom: m.participant1_prenom ?? "",
    participant1_nom: m.participant1_nom ?? "",
    participant2_prenom: m.participant2_prenom || null,
    participant2_nom: m.participant2_nom || null,
    autorisation_requise: autorisationRequise,
    autorisation_signature: m.autorisation_signature || null,
    autorisation_signee_le: m.autorisation_signee_le || null,
    autorisation_texte: autorisationTexte,
    billet1_jeton: billet1Jeton,
    billet2_jeton: billet2Jeton,
    langue: (m.langue as Locale) ?? "fr",
    // Si la dernière place vient de partir, l'inscription est quand même
    // enregistrée mais marquée, pour que l'équipe rappelle la personne.
    statut: reservee === false ? "annulee" : "confirmee",
  });

  // Une autre transaction a pu prendre les dernières places entre l'ouverture
  // de Stripe et le paiement. On ne doit jamais émettre de billets valides
  // dans ce cas exceptionnel: l'équipe reprend le dossier manuellement.
  if (reservee === false) {
    await envoyerCourriel({
      destinataire: [courriel, "e.dussault@sar.quebec"],
      sujet: "Stage d'observation - réservation à vérifier",
      html: gabaritCourriel({
        titre: "Réservation à vérifier",
        corps: `<p style="margin:0 0 14px;line-height:1.6;">Le paiement a été reçu, mais les places disponibles ont été prises au même moment par une autre réservation.</p><p style="margin:0;line-height:1.6;">Notre équipe communiquera avec vous afin de déplacer la réservation ou de procéder au remboursement. Aucun billet n'est émis pour le moment.</p>`,
      }),
    });
    return;
  }

  const { data: stage } = await supabase
    .from("stages")
    .select("code, date_stage, heure_debut, heure_fin, lieu, maitre_stage, vehicule")
    .eq("id", stageId)
    .maybeSingle();

  if (!stage) return;
  const s = stage as unknown as {
    code: string;
    date_stage: string;
    heure_debut: string;
    heure_fin: string;
    lieu: string;
    maitre_stage: string | null;
    vehicule: string | null;
  };

  const langue = ((m.langue as Locale) ?? "fr") as keyof typeof CONFIRMATION_STAGE;
  const textes = CONFIRMATION_STAGE[langue] ?? CONFIRMATION_STAGE.fr;
  const [a, mo, j] = s.date_stage.split("-");

  const participants = [
    {
      prenom: m.participant1_prenom ?? "",
      nom: m.participant1_nom ?? "",
      mineur: m.mineur1 === "1",
      jeton: billet1Jeton,
    },
    ...(nombrePersonnes === 2 && billet2Jeton
      ? [{
          prenom: m.participant2_prenom ?? "",
          nom: m.participant2_nom ?? "",
          mineur: m.mineur2 === "1",
          jeton: billet2Jeton,
        }]
      : []),
  ];
  const documents: DonneesDocumentsStage = {
    code: s.code,
    date: s.date_stage,
    heureDebut: s.heure_debut,
    heureFin: s.heure_fin,
    lieu: s.lieu,
    maitreStage: s.maitre_stage ?? "A confirmer",
    vehicule: s.vehicule ?? "A confirmer",
    responsablePrenom: m.responsable_prenom ?? "",
    responsableNom: m.responsable_nom ?? "",
    signature: m.autorisation_signature || null,
    signeeLe: m.autorisation_signee_le || null,
    participants,
    langue: (m.langue as Locale) ?? "fr",
    baseUrl: urlSite(),
  };

  try {
    const [guide, billets, autorisation] = await Promise.all([
      genererGuideStage(documents),
      genererBilletsStage(documents),
      autorisationRequise ? genererAutorisationStage(documents) : Promise.resolve(null),
    ]);
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
      pieces: [
        { filename: `guide-stage-${s.code}.pdf`, content: Buffer.from(guide).toString("base64") },
        { filename: `billets-stage-${s.code}.pdf`, content: Buffer.from(billets).toString("base64") },
        ...(autorisation
          ? [{ filename: `autorisation-parentale-${s.code}.pdf`, content: Buffer.from(autorisation).toString("base64") }]
          : []),
      ],
    });
  } catch {
    // Le paiement est encaissé et l'inscription enregistrée : un courriel
    // raté ne doit pas provoquer un réessai de Stripe.
  }
}

const CONFIRMATION_DON = {
  fr: {
    sujet: (mensuel: boolean) =>
      mensuel ? "Merci pour votre don mensuel" : "Merci pour votre don",
    titre: "Merci pour votre don",
    corps: (montant: string, mensuel: boolean) => `
      <p style="margin:0 0 14px;line-height:1.6;">Nous avons bien reçu votre don${
        mensuel ? " mensuel" : ""
      } de <strong>${montant}</strong>.</p>
      <p style="margin:0 0 14px;line-height:1.6;">${
        mensuel
          ? "Ce montant sera prélevé automatiquement chaque mois. Vous pouvez annuler en tout temps en écrivant à info@sar.quebec."
          : "Chaque don contribue directement à financer nos interventions."
      }</p>
      <p style="margin:0;line-height:1.6;font-size:13px;color:#5a6b78;">Ce courriel confirme votre don, mais ne constitue pas un reçu aux fins de l'impôt. Sauvetage Animal Rescue est un organisme à but non lucratif provincial, sans le statut d'organisme de bienfaisance enregistré auprès de l'Agence du revenu du Canada.</p>`,
  },
  en: {
    sujet: (mensuel: boolean) =>
      mensuel ? "Thank you for your monthly donation" : "Thank you for your donation",
    titre: "Thank you for your donation",
    corps: (montant: string, mensuel: boolean) => `
      <p style="margin:0 0 14px;line-height:1.6;">We have received your${
        mensuel ? " monthly" : ""
      } donation of <strong>${montant}</strong>.</p>
      <p style="margin:0 0 14px;line-height:1.6;">${
        mensuel
          ? "This amount will be charged automatically every month. You may cancel at any time by writing to info@sar.quebec."
          : "Every donation directly funds our interventions."
      }</p>
      <p style="margin:0;line-height:1.6;font-size:13px;color:#5a6b78;">This email confirms your donation but is not a tax receipt. Sauvetage Animal Rescue is a provincial non-profit organization, not a registered charity with the Canada Revenue Agency.</p>`,
  },
  es: {
    sujet: (mensuel: boolean) =>
      mensuel ? "Gracias por su donación mensual" : "Gracias por su donación",
    titre: "Gracias por su donación",
    corps: (montant: string, mensuel: boolean) => `
      <p style="margin:0 0 14px;line-height:1.6;">Hemos recibido su donación${
        mensuel ? " mensual" : ""
      } de <strong>${montant}</strong>.</p>
      <p style="margin:0 0 14px;line-height:1.6;">${
        mensuel
          ? "Este monto se cobrará automáticamente cada mes. Puede cancelar en cualquier momento escribiendo a info@sar.quebec."
          : "Cada donación financia directamente nuestras intervenciones."
      }</p>
      <p style="margin:0;line-height:1.6;font-size:13px;color:#5a6b78;">Este correo confirma su donación, pero no constituye un recibo fiscal. Sauvetage Animal Rescue es un organismo sin fines de lucro provincial, sin el estatus de organización benéfica registrada ante la Agencia de Ingresos de Canadá.</p>`,
  },
} as const;

function formaterMontant(montantCents: number, langue: Locale) {
  const dollars = montantCents / 100;
  const locale = langue === "fr" ? "fr-CA" : langue === "es" ? "es-ES" : "en-CA";
  return new Intl.NumberFormat(locale, { style: "currency", currency: "CAD" }).format(dollars);
}

async function traiterDon(session: Stripe.Checkout.Session) {
  const m = session.metadata ?? {};
  const mensuel = m.type === "don_mensuel";
  const courriel =
    session.customer_details?.email ?? session.customer_email ?? "";
  if (!courriel || !session.amount_total) return;

  const langue = ((m.langue as Locale) ?? "fr") as keyof typeof CONFIRMATION_DON;
  const textes = CONFIRMATION_DON[langue] ?? CONFIRMATION_DON.fr;
  const montant = formaterMontant(session.amount_total, langue);

  try {
    await envoyerCourriel({
      destinataire: courriel,
      sujet: textes.sujet(mensuel),
      html: gabaritCourriel({
        titre: textes.titre,
        corps: textes.corps(montant, mensuel),
      }),
    });
  } catch {
    // Le don est encaissé : un courriel raté ne doit pas provoquer un
    // réessai de Stripe.
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
    if (type === "don" || type === "don_mensuel") {
      await traiterDon(session);
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
