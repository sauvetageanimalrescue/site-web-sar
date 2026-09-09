"use server";

import { getLocale } from "next-intl/server";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { envoyerCourriel, gabaritCourriel } from "@/lib/courriel";
import { ORGANISATION } from "@/lib/constantes";
import type { Locale } from "@/i18n/routing";

export type EtatCandidature =
  | { etat: "inactif" }
  | { etat: "succes" }
  | { etat: "erreur"; motif: "champs" | "photo" | "envoi" };

const POSTES_VALIDES = [
  "repartiteur",
  "messager",
  "secouriste",
  "sauveteur",
  // Anciennes appellations, encore acceptées.
  "eclaireur",
  "patrouilleur",
];

function texte(donnees: FormData, cle: string) {
  const valeur = donnees.get(cle);
  return typeof valeur === "string" ? valeur.trim() : "";
}

function age(dateNaissance: string) {
  const naissance = new Date(`${dateNaissance}T12:00:00`);
  if (Number.isNaN(naissance.getTime())) return null;
  const maintenant = new Date();
  let resultat = maintenant.getFullYear() - naissance.getFullYear();
  const anniversairePasse =
    maintenant.getMonth() > naissance.getMonth() ||
    (maintenant.getMonth() === naissance.getMonth() &&
      maintenant.getDate() >= naissance.getDate());
  if (!anniversairePasse) resultat -= 1;
  return resultat >= 0 && resultat <= 120 ? resultat : null;
}

function estPhoto(fichier: File) {
  if (fichier.type.startsWith("image/")) return true;
  return /\.(avif|bmp|gif|heic|heif|jpe?g|png|tiff?|webp)$/i.test(fichier.name);
}

export async function envoyerCandidature(
  _precedent: EtatCandidature,
  donnees: FormData,
): Promise<EtatCandidature> {
  const poste = texte(donnees, "poste");
  const prenom = texte(donnees, "prenom");
  const nom = texte(donnees, "nom");
  const courriel = texte(donnees, "courriel");
  const telephone = texte(donnees, "telephone");
  const ville = texte(donnees, "ville");
  const dateNaissance = texte(donnees, "dateNaissance");
  const photo = donnees.get("photo");

  if (
    !POSTES_VALIDES.includes(poste) ||
    !prenom ||
    !nom ||
    !courriel ||
    !telephone ||
    !ville ||
    !dateNaissance ||
    !(photo instanceof File) ||
    photo.size === 0
  ) {
    return { etat: "erreur", motif: "champs" };
  }

  const ageCandidat = age(dateNaissance);
  if (ageCandidat === null || !estPhoto(photo) || photo.size > 4_000_000) {
    return { etat: "erreur", motif: "photo" };
  }

  const langue = (await getLocale()) as Locale;
  const cases = (cle: string) =>
    donnees.getAll(cle).filter((v): v is string => typeof v === "string");
  const disponibilites = cases("disponibilites");
  const extension =
    photo.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
    "image";
  const cheminPhoto = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;

  const { error: erreurPhoto } = await creerClientAdmin()
    .storage.from("candidatures")
    .upload(cheminPhoto, photo, {
      contentType: photo.type || undefined,
      upsert: false,
    });

  if (erreurPhoto) return { etat: "erreur", motif: "envoi" };

  const { error } = await creerClientAdmin().from("candidatures").insert({
    poste,
    prenom,
    nom,
    courriel,
    telephone,
    ville,
    adresse_rue: texte(donnees, "adresseRue") || null,
    province: texte(donnees, "province") || null,
    code_postal: texte(donnees, "codePostal") || null,
    date_naissance: dateNaissance,
    photo_url: cheminPhoto,
    langue,
    a_vehicule: donnees.get("vehicule") === "on",
    a_permis: donnees.get("permis") === "on",
    disponibilites,
    occupation: texte(donnees, "occupation") || null,
    disponibilites_texte: texte(donnees, "disponibilitesTexte") || null,
    experience_animaux: cases("experienceAnimaux"),
    experience_connexe: cases("experienceConnexe"),
    experience_connexe_texte:
      texte(donnees, "experienceConnexeTexte") || null,
    confirme_selection: donnees.get("confirmeSelection") === "on",
    confirme_majeur: donnees.get("confirmeMajeur") === "on",
    experience: texte(donnees, "experience") || null,
    motivation: texte(donnees, "motivation") || null,
    reference: texte(donnees, "reference") || null,
  });

  if (error) {
    await creerClientAdmin().storage.from("candidatures").remove([cheminPhoto]);
    return { etat: "erreur", motif: "envoi" };
  }

  // Avis à la direction. Un échec d'envoi ne doit pas perdre la candidature,
  // qui est déjà enregistrée en base.
  await envoyerCourriel({
    // Plusieurs destinataires possibles, séparés par une virgule dans la
    // variable d'environnement (ex. Eric et Tania reçoivent chacun copie).
    destinataire: (
      process.env.COURRIEL_RECRUTEMENT || ORGANISATION.courriels.direction
    )
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
    sujet: `Nouvelle candidature — ${poste} — ${prenom} ${nom}`,
    repondreA: courriel,
    html: gabaritCourriel({
      titre: "Nouvelle candidature",
      corps: `
        <p style="margin:0 0 14px;line-height:1.6;"><strong>Poste :</strong> ${poste}<br>
        <strong>Nom :</strong> ${prenom} ${nom}<br>
        <strong>Courriel :</strong> ${courriel}<br>
        <strong>Téléphone :</strong> ${telephone}<br>
        <strong>Ville :</strong> ${ville}<br>
        <strong>Date de naissance :</strong> ${dateNaissance} (${ageCandidat} ans)<br>
        <strong>Photo :</strong> reçue et conservée avec la candidature<br>
        <strong>Véhicule :</strong> ${donnees.get("vehicule") === "on" ? "oui" : "non"}<br>
        <strong>Permis :</strong> ${donnees.get("permis") === "on" ? "oui" : "non"}<br>
        <strong>Disponibilités :</strong> ${disponibilites.join(", ") || "non précisées"}</p>
        <p style="margin:0;line-height:1.6;"><strong>Motivation :</strong><br>${
          texte(donnees, "motivation") || "(vide)"
        }</p>`,
    }),
  });

  return { etat: "succes" };
}
