import "server-only";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { genererCarteMembre } from "@/lib/carte/generer";
import { envoyerCourriel, gabaritCourriel } from "@/lib/courriel";
import { urlSite } from "@/lib/stripe";
import type { Locale } from "@/i18n/routing";

export type NouveauMembre = {
  prenom: string;
  nom: string;
  courriel: string;
  telephone: string | null;
  ville: string | null;
  codePostal: string | null;
  langue: Locale;
  annee: number;
  renouvellementAuto: boolean;
  stripeClientId: string | null;
  stripePaiementId: string | null;
  stripeAbonnementId: string | null;
};

export type Membre = {
  id: string;
  numero: string;
  annee: number;
  expire_le: string;
  prenom: string;
  nom: string;
  courriel: string;
  langue: Locale;
  statut: string;
  jeton_verification: string;
  renouvellement_auto: boolean;
  stripe_abonnement_id: string | null;
};

// Une adhésion court jusqu'au 31 décembre de son année.
function finAnnee(annee: number) {
  return `${annee}-12-31`;
}

export async function creerMembre(entree: NouveauMembre): Promise<Membre | null> {
  const supabase = creerClientAdmin();

  const { data: numero, error: erreurNumero } = await supabase.rpc(
    "generer_numero_membre",
    { p_annee: entree.annee },
  );
  if (erreurNumero || !numero) return null;

  const { data, error } = await supabase
    .from("membres")
    .insert({
      numero,
      annee: entree.annee,
      expire_le: finAnnee(entree.annee),
      prenom: entree.prenom,
      nom: entree.nom,
      courriel: entree.courriel,
      telephone: entree.telephone,
      ville: entree.ville,
      code_postal: entree.codePostal,
      langue: entree.langue,
      renouvellement_auto: entree.renouvellementAuto,
      stripe_client_id: entree.stripeClientId,
      stripe_paiement_id: entree.stripePaiementId,
      stripe_abonnement_id: entree.stripeAbonnementId,
    })
    .select("*")
    .single();

  if (error || !data) return null;
  return data as unknown as Membre;
}

const COURRIEL = {
  fr: {
    sujet: (annee: number) => `Votre carte de membre ${annee}`,
    titre: "Bienvenue parmi nos membres",
    corps: (m: Membre) => `
      <p style="margin:0 0 14px;line-height:1.6;">Bonjour ${m.prenom},</p>
      <p style="margin:0 0 14px;line-height:1.6;">Votre carte de membre ${m.annee} est jointe à ce courriel, en format PDF. Vous pouvez l'imprimer ou la garder sur votre téléphone.</p>
      <p style="margin:0 0 14px;line-height:1.6;"><strong>Numéro de membre :</strong> ${m.numero}<br>
      <strong>Valide jusqu'au :</strong> 31/12/${m.annee}</p>
      <p style="margin:0;line-height:1.6;">C'est votre cotisation qui paie le carburant, les cages et les cordes de chaque intervention. Merci d'en faire partie.</p>`,
    action: "Voir mon espace membre",
  },
  en: {
    sujet: (annee: number) => `Your ${annee} membership card`,
    titre: "Welcome aboard",
    corps: (m: Membre) => `
      <p style="margin:0 0 14px;line-height:1.6;">Hello ${m.prenom},</p>
      <p style="margin:0 0 14px;line-height:1.6;">Your ${m.annee} membership card is attached to this email as a PDF. Print it or keep it on your phone.</p>
      <p style="margin:0 0 14px;line-height:1.6;"><strong>Member number:</strong> ${m.numero}<br>
      <strong>Valid until:</strong> 31/12/${m.annee}</p>
      <p style="margin:0;line-height:1.6;">Your dues pay for the fuel, the traps and the ropes behind every rescue. Thank you for being part of it.</p>`,
    action: "Go to my member area",
  },
  es: {
    sujet: (annee: number) => `Su tarjeta de miembro ${annee}`,
    titre: "Bienvenido a nuestros miembros",
    corps: (m: Membre) => `
      <p style="margin:0 0 14px;line-height:1.6;">Hola ${m.prenom}:</p>
      <p style="margin:0 0 14px;line-height:1.6;">Su tarjeta de miembro ${m.annee} está adjunta a este correo en formato PDF. Puede imprimirla o guardarla en su teléfono.</p>
      <p style="margin:0 0 14px;line-height:1.6;"><strong>Número de miembro:</strong> ${m.numero}<br>
      <strong>Válida hasta:</strong> 31/12/${m.annee}</p>
      <p style="margin:0;line-height:1.6;">Su cuota paga el combustible, las jaulas y las cuerdas de cada intervención. Gracias por formar parte.</p>`,
    action: "Ver mi área de miembro",
  },
} as const;

// Génère la carte et l'expédie. Marque l'envoi pour qu'un renvoi manuel reste
// possible sans deviner si le membre a déjà reçu la sienne.
export async function envoyerCarteMembre(membre: Membre): Promise<boolean> {
  const textes = COURRIEL[membre.langue] ?? COURRIEL.fr;

  const pdf = await genererCarteMembre({
    prenom: membre.prenom,
    nom: membre.nom,
    numero: membre.numero,
    annee: membre.annee,
    expireLe: membre.expire_le,
    jetonVerification: membre.jeton_verification,
    langue: membre.langue,
  });

  const envoye = await envoyerCourriel({
    destinataire: membre.courriel,
    sujet: textes.sujet(membre.annee),
    html: gabaritCourriel({
      titre: textes.titre,
      corps: textes.corps(membre),
      action: {
        libelle: textes.action,
        href: `${urlSite()}/${membre.langue}/espace-membre`,
      },
    }),
    pieces: [
      {
        filename: `carte-membre-${membre.numero}.pdf`,
        content: Buffer.from(pdf).toString("base64"),
      },
    ],
  });

  if (envoye) {
    await creerClientAdmin()
      .from("membres")
      .update({ carte_envoyee_le: new Date().toISOString() })
      .eq("id", membre.id);
  }
  return envoye;
}
