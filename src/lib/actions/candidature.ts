"use server";

import { getLocale } from "next-intl/server";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { envoyerCourriel, gabaritCourriel } from "@/lib/courriel";
import { ORGANISATION } from "@/lib/constantes";
import type { Locale } from "@/i18n/routing";

export type EtatCandidature =
  | { etat: "inactif" }
  | { etat: "succes" }
  | { etat: "erreur"; motif: "champs" | "envoi" };

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

  if (
    !POSTES_VALIDES.includes(poste) ||
    !prenom ||
    !nom ||
    !courriel ||
    !telephone ||
    !ville
  ) {
    return { etat: "erreur", motif: "champs" };
  }

  const langue = (await getLocale()) as Locale;
  const cases = (cle: string) =>
    donnees.getAll(cle).filter((v): v is string => typeof v === "string");
  const disponibilites = cases("disponibilites");

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
    date_naissance: texte(donnees, "dateNaissance") || null,
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

  if (error) return { etat: "erreur", motif: "envoi" };

  // Avis à la direction. Un échec d'envoi ne doit pas perdre la candidature,
  // qui est déjà enregistrée en base.
  await envoyerCourriel({
    destinataire:
      process.env.COURRIEL_RECRUTEMENT || ORGANISATION.courriels.direction,
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
