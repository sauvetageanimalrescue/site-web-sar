import "server-only";
import { stripe, urlSite } from "@/lib/stripe";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { TARIFS, ANNEE_CARTE, ORGANISATION } from "@/lib/constantes";
import type { Locale } from "@/i18n/routing";

// Stripe accepte fr, en et es en langue de page de paiement.
function langueStripe(locale: Locale) {
  return locale as "fr" | "en" | "es";
}

type Adhesion = {
  prenom: string;
  nom: string;
  courriel: string;
  telephone: string | null;
  adresse: string | null;
  appartement: string | null;
  ville: string | null;
  codePostal: string | null;
  cartePhysique: boolean;
  langue: Locale;
  renouvellementAuto: boolean;
};

// Ouvre une session Stripe Checkout pour une carte de membre. En mode
// abonnement, Stripe reconduit la cotisation chaque année et le webhook
// prolonge l'adhésion sans intervention humaine.
export async function creerPaiementAdhesion(adhesion: Adhesion) {
  const montantCents = TARIFS.carteMembre * 100;
  const supabase = creerClientAdmin();

  const { data: commande, error } = await supabase
    .from("commandes")
    .insert({
      type: "carte_membre",
      montant_cents: montantCents,
      courriel: adhesion.courriel,
      prenom: adhesion.prenom,
      nom: adhesion.nom,
      langue: adhesion.langue,
      metadonnees: {
        telephone: adhesion.telephone,
        adresse: adhesion.adresse,
        appartement: adhesion.appartement,
        ville: adhesion.ville,
        code_postal: adhesion.codePostal,
        carte_physique: adhesion.cartePhysique,
        renouvellement_auto: adhesion.renouvellementAuto,
        annee: ANNEE_CARTE,
      },
    })
    .select("id")
    .single();

  if (error || !commande) throw new Error("Création de commande impossible");

  const nomProduit = `Carte de membre ${ANNEE_CARTE} — ${ORGANISATION.nom}`;
  const base = urlSite();

  const session = await stripe().checkout.sessions.create({
    mode: adhesion.renouvellementAuto ? "subscription" : "payment",
    locale: langueStripe(adhesion.langue),
    customer_email: adhesion.courriel,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "cad",
          unit_amount: montantCents,
          product_data: { name: nomProduit },
          ...(adhesion.renouvellementAuto
            ? { recurring: { interval: "year" as const } }
            : {}),
        },
      },
    ],
    success_url: `${base}/${adhesion.langue}/membre/merci?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${adhesion.langue}/membre`,
    // Les métadonnées voyagent jusqu'au webhook : c'est là que la fiche membre
    // est créée, une fois le paiement réellement confirmé par Stripe.
    metadata: {
      commande_id: commande.id,
      type: "carte_membre",
      prenom: adhesion.prenom,
      nom: adhesion.nom,
      telephone: adhesion.telephone ?? "",
      adresse: adhesion.adresse ?? "",
      appartement: adhesion.appartement ?? "",
      ville: adhesion.ville ?? "",
      code_postal: adhesion.codePostal ?? "",
      carte_physique: adhesion.cartePhysique ? "1" : "",
      langue: adhesion.langue,
      annee: String(ANNEE_CARTE),
    },
  });

  await supabase
    .from("commandes")
    .update({ stripe_session_id: session.id })
    .eq("id", commande.id);

  if (!session.url) throw new Error("Stripe n'a pas retourné d'URL de paiement");
  return session.url;
}

// Réservation d'un stage d'observation. La place n'est pas décomptée ici : le
// webhook la réserve seulement une fois le paiement confirmé, sinon un panier
// abandonné bloquerait une place pour rien.
export async function creerPaiementStage({
  stageId,
  prenom,
  nom,
  courriel,
  telephone,
  accompagnateur,
  langue,
}: {
  stageId: string;
  prenom: string;
  nom: string;
  courriel: string;
  telephone: string;
  accompagnateur: string | null;
  langue: Locale;
}) {
  const supabase = creerClientAdmin();

  const { data: stage, error: erreurStage } = await supabase
    .from("stages")
    .select("id, code, date_stage, prix_cents, places, places_vendues, publie")
    .eq("id", stageId)
    .maybeSingle();

  if (erreurStage || !stage) throw new Error("Stage introuvable");
  const s = stage as unknown as {
    id: string;
    code: string;
    date_stage: string;
    prix_cents: number;
    places: number;
    places_vendues: number;
    publie: boolean;
  };
  if (!s.publie || s.places_vendues >= s.places) throw new Error("Stage complet");

  const { data: commande, error } = await supabase
    .from("commandes")
    .insert({
      type: "stage",
      montant_cents: s.prix_cents,
      courriel,
      prenom,
      nom,
      langue,
      stage_id: s.id,
      metadonnees: { telephone, accompagnateur, code: s.code },
    })
    .select("id")
    .single();

  if (error || !commande) throw new Error("Création de commande impossible");

  const base = urlSite();
  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    locale: langueStripe(langue),
    customer_email: courriel,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "cad",
          unit_amount: s.prix_cents,
          product_data: {
            name: `Stage d'observation ${s.code} — ${s.date_stage}`,
          },
        },
      },
    ],
    success_url: `${base}/${langue}/stages/merci?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${langue}/stages`,
    metadata: {
      commande_id: commande.id,
      type: "stage",
      stage_id: s.id,
      prenom,
      nom,
      telephone,
      accompagnateur: accompagnateur ?? "",
      langue,
    },
  });

  await supabase
    .from("commandes")
    .update({ stripe_session_id: session.id })
    .eq("id", commande.id);

  if (!session.url) throw new Error("Stripe n'a pas retourné d'URL de paiement");
  return session.url;
}

// Don ponctuel ou mensuel. Le montant est choisi par le donateur, borné pour
// éviter les saisies accidentelles.
export async function creerPaiementDon({
  montant,
  mensuel,
  courriel,
  prenom,
  nom,
  langue,
}: {
  montant: number;
  mensuel: boolean;
  courriel: string;
  prenom: string | null;
  nom: string | null;
  langue: Locale;
}) {
  const montantCents = Math.round(Math.min(Math.max(montant, 5), 10000) * 100);
  const supabase = creerClientAdmin();

  const { data: commande, error } = await supabase
    .from("commandes")
    .insert({
      type: mensuel ? "don_mensuel" : "don",
      montant_cents: montantCents,
      courriel,
      prenom,
      nom,
      langue,
    })
    .select("id")
    .single();

  if (error || !commande) throw new Error("Création de commande impossible");

  const base = urlSite();
  const session = await stripe().checkout.sessions.create({
    mode: mensuel ? "subscription" : "payment",
    locale: langueStripe(langue),
    customer_email: courriel,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "cad",
          unit_amount: montantCents,
          product_data: {
            name: mensuel
              ? `Don mensuel — ${ORGANISATION.nom}`
              : `Don — ${ORGANISATION.nom}`,
          },
          ...(mensuel ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    success_url: `${base}/${langue}/dons/merci?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${langue}/dons`,
    metadata: {
      commande_id: commande.id,
      type: mensuel ? "don_mensuel" : "don",
      langue,
    },
  });

  await supabase
    .from("commandes")
    .update({ stripe_session_id: session.id })
    .eq("id", commande.id);

  if (!session.url) throw new Error("Stripe n'a pas retourné d'URL de paiement");
  return session.url;
}
