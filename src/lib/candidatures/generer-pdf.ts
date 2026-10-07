import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import sharp from "sharp";

const LARGEUR = 612;
const HAUTEUR = 792;
const MARGE = 42;
const BAS = 58;
const MARINE = rgb(0.043, 0.137, 0.22);
const CIEL = rgb(0.18, 0.525, 0.757);
const GRIS = rgb(0.35, 0.42, 0.47);
const PALE = rgb(0.94, 0.96, 0.97);
const BLANC = rgb(1, 1, 1);

export type DonneesPdfCandidature = {
  id: string;
  creeLe: string;
  poste: string;
  prenom: string;
  nom: string;
  courriel: string;
  telephone: string;
  adresseRue: string;
  ville: string;
  province: string;
  codePostal: string;
  dateNaissance: string;
  occupation: string;
  vehicule: boolean;
  permis: boolean;
  disponibilites: string[];
  disponibilitesTexte: string;
  experienceAnimaux: string[];
  experience: string;
  experienceConnexe: string[];
  experienceConnexeTexte: string;
  motivation: string;
  reference: string;
  confirmeBenevolat: boolean;
  confirmeSelection: boolean;
  confirmeMajeur: boolean;
  photo: Uint8Array;
};

function dateCourte(iso: string) {
  if (!iso) return "Non précisée";
  const parties = iso.slice(0, 10).split("-");
  return parties.length === 3
    ? `${parties[2]}/${parties[1]}/${parties[0]}`
    : iso;
}

function dateReception(iso: string) {
  const parties = new Intl.DateTimeFormat("fr-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "America/Toronto",
  }).formatToParts(new Date(iso));
  const valeur = (type: string) => parties.find((partie) => partie.type === type)?.value ?? "";
  return `${valeur("day")}/${valeur("month")}/${valeur("year")} à ${valeur("hour")}:${valeur("minute")}`;
}

function couperLignes(texte: string, police: PDFFont, taille: number, largeur: number) {
  const lignes: string[] = [];
  for (const paragraphe of texte.replace(/\r\n?/g, "\n").split("\n")) {
    if (!paragraphe.trim()) {
      lignes.push("");
      continue;
    }
    let ligne = "";
    for (const mot of paragraphe.trim().split(/\s+/)) {
      const essai = ligne ? `${ligne} ${mot}` : mot;
      if (police.widthOfTextAtSize(essai, taille) <= largeur) {
        ligne = essai;
        continue;
      }
      if (ligne) lignes.push(ligne);
      ligne = "";
      for (const caractere of mot) {
        if (police.widthOfTextAtSize(ligne + caractere, taille) > largeur && ligne) {
          lignes.push(ligne);
          ligne = "";
        }
        ligne += caractere;
      }
    }
    if (ligne) lignes.push(ligne);
  }
  return lignes;
}

export async function genererPdfCandidature(d: DonneesPdfCandidature) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const police = await pdf.embedFont(
    await readFile(path.join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf")),
    { subset: true },
  );
  pdf.setTitle(`Candidature - ${d.prenom} ${d.nom}`);
  pdf.setAuthor("Sauvetage Animal Rescue");
  pdf.setSubject("Fiche confidentielle de recrutement");

  let page!: PDFPage;
  let y = 0;
  let numeroPage = 0;
  const nouvellePage = () => {
    page = pdf.addPage([LARGEUR, HAUTEUR]);
    numeroPage += 1;
    page.drawRectangle({ x: 0, y: HAUTEUR - 92, width: LARGEUR, height: 92, color: MARINE });
    page.drawRectangle({ x: 0, y: HAUTEUR - 5, width: LARGEUR, height: 5, color: CIEL });
    page.drawText("SAUVETAGE ANIMAL RESCUE", { x: MARGE, y: HAUTEUR - 34, size: 10, font: police, color: CIEL });
    page.drawText("FICHE DE CANDIDATURE", { x: MARGE, y: HAUTEUR - 61, size: 20, font: police, color: BLANC });
    page.drawText(`Reçue le ${dateReception(d.creeLe)}  |  Dossier ${d.id.slice(0, 8)}`, {
      x: MARGE, y: HAUTEUR - 78, size: 8.5, font: police, color: BLANC,
    });
    y = HAUTEUR - 122;
  };
  const place = (hauteur: number) => {
    if (y - hauteur < BAS) nouvellePage();
  };
  const section = (titre: string) => {
    place(54);
    y -= 13;
    page.drawLine({ start: { x: MARGE, y: y + 10 }, end: { x: LARGEUR - MARGE, y: y + 10 }, thickness: 0.7, color: CIEL });
    page.drawText(titre.toUpperCase(), { x: MARGE, y: y - 6, size: 10, font: police, color: CIEL });
    y -= 27;
  };
  const champ = (libelle: string, valeur: string) => {
    const lignes = couperLignes(valeur.trim() || "Non précisé", police, 10, LARGEUR - 2 * MARGE);
    place(23);
    page.drawText(libelle, { x: MARGE, y, size: 8, font: police, color: GRIS });
    y -= 15;
    for (const ligne of lignes) {
      place(15);
      if (ligne) page.drawText(ligne, { x: MARGE, y, size: 10, font: police, color: MARINE });
      y -= 14;
    }
    y -= 7;
  };
  const liste = (libelle: string, valeurs: string[]) =>
    champ(libelle, valeurs.length ? valeurs.join(", ") : "Aucune réponse");

  nouvellePage();
  let photoIntegree = false;
  try {
    // Redimensionner évite qu'une photo de téléphone rende la pièce jointe énorme.
    const jpeg = await sharp(d.photo, { limitInputPixels: 60_000_000 })
      .rotate()
      .resize(600, 700, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
    const image = await pdf.embedJpg(jpeg);
    const dimensions = image.scaleToFit(132, 156);
    page.drawRectangle({ x: 432, y: 468, width: 138, height: 162, color: PALE });
    page.drawImage(image, {
      x: 435 + (132 - dimensions.width) / 2,
      y: 471 + (156 - dimensions.height) / 2,
      width: dimensions.width,
      height: dimensions.height,
    });
    photoIntegree = true;
  } catch {
    page.drawRectangle({ x: 432, y: 468, width: 138, height: 162, color: PALE });
    page.drawText("Photo conservée", { x: 443, y: 550, size: 9, font: police, color: GRIS });
    page.drawText("séparément", { x: 443, y: 535, size: 9, font: police, color: GRIS });
  }

  const identite = [
    ["CANDIDAT OU CANDIDATE", `${d.prenom} ${d.nom}`],
    ["POSTE SOUHAITÉ", d.poste],
    ["COURRIEL", d.courriel],
    ["TÉLÉPHONE", d.telephone],
    ["DATE DE NAISSANCE", dateCourte(d.dateNaissance)],
  ];
  for (const [libelle, valeur] of identite) {
    const lignes = couperLignes(valeur || "Non précisé", police, 10, 365);
    page.drawText(libelle, { x: MARGE, y, size: 8, font: police, color: GRIS });
    y -= 15;
    for (const ligne of lignes) {
      page.drawText(ligne, { x: MARGE, y, size: 10, font: police, color: MARINE });
      y -= 14;
    }
    y -= 7;
  }
  y = Math.min(y, 451);

  section("Coordonnées et profil");
  champ("Adresse", [d.adresseRue, d.ville, d.province, d.codePostal].filter(Boolean).join(", "));
  champ("Occupation", d.occupation);
  champ("Véhicule personnel", d.vehicule ? "Oui" : "Non");
  champ("Permis de conduire", d.permis ? "Oui" : "Non");

  section("Disponibilités");
  liste("Créneaux sélectionnés", d.disponibilites);
  champ("Précisions", d.disponibilitesTexte);

  section("Expérience");
  liste("Avec les animaux", d.experienceAnimaux);
  champ("Détails sur l'expérience animale", d.experience);
  liste("Compétences connexes", d.experienceConnexe);
  champ("Autres précisions", d.experienceConnexeTexte);

  section("Motivation et référence");
  champ("Pourquoi la personne souhaite se joindre à l'équipe", d.motivation);
  champ("Personne de référence", d.reference);

  section("Confirmations");
  champ("Comprend qu’il s’agit d’un poste bénévole", d.confirmeBenevolat ? "Oui" : "Non");
  champ("Comprend que la candidature ne garantit pas la sélection", d.confirmeSelection ? "Oui" : "Non");
  champ("Confirme avoir au moins 18 ans", d.confirmeMajeur ? "Oui" : "Non");
  if (!photoIntegree) champ("Photo", "Le fichier original est joint séparément au courriel et conservé dans Supabase.");

  pdf.getPages().forEach((feuille, index) => {
    feuille.drawLine({ start: { x: MARGE, y: 44 }, end: { x: LARGEUR - MARGE, y: 44 }, thickness: 0.5, color: GRIS });
    feuille.drawText("Confidentiel - recrutement | Sauvetage Animal Rescue", { x: MARGE, y: 27, size: 8, font: police, color: GRIS });
    feuille.drawText(`${index + 1} / ${numeroPage}`, { x: LARGEUR - MARGE - 28, y: 27, size: 8, font: police, color: GRIS });
  });

  return { pdf: await pdf.save(), photoIntegree };
}
