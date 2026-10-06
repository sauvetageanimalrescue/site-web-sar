"use server";

import { getLocale } from "next-intl/server";
import { creerClientAdmin } from "@/lib/supabase/admin";
import { envoyerCourriel, gabaritCourriel } from "@/lib/courriel";
import { genererPdfCandidature } from "@/lib/candidatures/generer-pdf";
import { OCCUPATIONS, EXPERIENCES_ANIMAUX, EXPERIENCES_CONNEXES } from "@/contenu/experiences";
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

const DESTINATAIRES_RECRUTEMENT = [
  "e.dussault@sar.quebec",
  "t.tscherne@sar.quebec",
  "c.taillefer@sar.quebec",
];

const JOURS: Record<string, string> = {
  semaineJour: "Semaine, jour",
  semaineSoir: "Semaine, soir",
  finSemaineJour: "Fin de semaine, jour",
  finSemaineSoir: "Fin de semaine, soir",
  nuit: "Nuit",
  surAppel: "Sur appel",
};

const POSTES: Record<string, string> = {
  repartiteur: "Répartiteur ou répartitrice",
  messager: "Messager ou messagère",
  secouriste: "Secouriste",
  sauveteur: "Sauveteur ou sauveteuse",
  eclaireur: "Éclaireur ou éclaireuse",
  patrouilleur: "Patrouilleur ou patrouilleuse",
};

function libelles(cles: string[], choix: { cle: string; fr: string }[]) {
  return cles.map((cle) => choix.find((item) => item.cle === cle)?.fr ?? cle);
}

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
    donnees.get("confirmeBenevolat") !== "on" ||
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

  if (erreurPhoto) {
    console.error("Téléversement de photo de candidature impossible:", erreurPhoto.message);
    return { etat: "erreur", motif: "envoi" };
  }

  const candidature = {
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
  };
  const { data: enregistrement, error } = await creerClientAdmin()
    .from("candidatures")
    .insert(candidature)
    .select("id, cree_le")
    .single();

  if (error || !enregistrement) {
    console.error("Enregistrement de candidature impossible:", error?.message);
    await creerClientAdmin().storage.from("candidatures").remove([cheminPhoto]);
    return { etat: "erreur", motif: "envoi" };
  }

  // Le dossier est déjà conservé: une erreur de PDF ou de courriel ne doit
  // jamais pousser la personne à soumettre une deuxième candidature.
  const pieces: { filename: string; content: string }[] = [];
  try {
    const resultat = await genererPdfCandidature({
      id: enregistrement.id,
      creeLe: enregistrement.cree_le,
      poste: POSTES[poste] ?? poste,
      prenom,
      nom,
      courriel,
      telephone,
      adresseRue: texte(donnees, "adresseRue"),
      ville,
      province: texte(donnees, "province"),
      codePostal: texte(donnees, "codePostal"),
      dateNaissance,
      occupation: OCCUPATIONS.find((item) => item.cle === candidature.occupation)?.fr ?? candidature.occupation ?? "",
      vehicule: candidature.a_vehicule,
      permis: candidature.a_permis,
      disponibilites: disponibilites.map((jour) => JOURS[jour] ?? jour),
      disponibilitesTexte: texte(donnees, "disponibilitesTexte"),
      experienceAnimaux: libelles(candidature.experience_animaux, EXPERIENCES_ANIMAUX),
      experience: texte(donnees, "experience"),
      experienceConnexe: libelles(candidature.experience_connexe, EXPERIENCES_CONNEXES),
      experienceConnexeTexte: texte(donnees, "experienceConnexeTexte"),
      motivation: texte(donnees, "motivation"),
      reference: texte(donnees, "reference"),
      confirmeSelection: candidature.confirme_selection,
      confirmeMajeur: candidature.confirme_majeur,
      photo: new Uint8Array(await photo.arrayBuffer()),
    });
    pieces.push({
      filename: `candidature-${enregistrement.id.slice(0, 8)}.pdf`,
      content: Buffer.from(resultat.pdf).toString("base64"),
    });
    // Le PDF reste aussi dans le même dossier privé que la photo: il peut
    // être retrouvé dans Supabase même si un courriel a été effacé.
    const cheminPdf = cheminPhoto.replace(/\.[^.]+$/, ".pdf");
    const { error: erreurArchive } = await creerClientAdmin()
      .storage.from("candidatures")
      .upload(cheminPdf, resultat.pdf, {
        contentType: "application/pdf",
        upsert: false,
      });
    if (erreurArchive) {
      console.error("Archivage du PDF de candidature impossible:", erreurArchive.message);
    }
    if (!resultat.photoIntegree) {
      pieces.push({
        filename: photo.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) || "photo",
        content: Buffer.from(await photo.arrayBuffer()).toString("base64"),
      });
    }
  } catch (erreur) {
    console.error("PDF de candidature impossible:", erreur instanceof Error ? erreur.message : erreur);
  }

  const courrielEnvoye = await envoyerCourriel({
    destinataire: DESTINATAIRES_RECRUTEMENT,
    sujet: `Nouvelle candidature - ${poste} - ${prenom} ${nom}`.replace(/[\r\n]/g, " "),
    repondreA: courriel,
    html: gabaritCourriel({
      titre: "Nouvelle candidature",
      corps: `<p style="margin:0 0 14px;line-height:1.6;">Une nouvelle candidature a été enregistrée pour le poste de ${POSTES[poste] ?? poste}.</p><p style="margin:0;line-height:1.6;">${pieces.length ? "La fiche complète est jointe en PDF. Si la photo n'a pas pu y être intégrée, son fichier original est joint séparément." : "La fiche PDF n'a pas pu être produite. Le dossier et la photo restent accessibles dans Supabase."}</p>`,
    }),
    pieces,
  });
  if (!courrielEnvoye) console.error("Avis de candidature non envoyé:", enregistrement.id);

  return { etat: "succes" };
}
