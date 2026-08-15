import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { urlSite } from "@/lib/stripe";

// Carte de membre au format carte de crédit (85,6 × 54 mm), recto-verso sur
// deux pages : le recto pour l'identité, le verso pour le code QR de
// vérification et les numéros d'urgence.

const LARGEUR = 242.6; // 85,6 mm en points
const HAUTEUR = 153.1; // 54 mm en points

const MARINE = rgb(0.043, 0.137, 0.22);
const OR = rgb(0.788, 0.635, 0.153);
const BLANC = rgb(1, 1, 1);

export type DonneesCarte = {
  prenom: string;
  nom: string;
  numero: string;
  annee: number;
  expireLe: string; // ISO
  jetonVerification: string;
  langue: "fr" | "en" | "es";
};

const LIBELLES = {
  fr: {
    titre: "CARTE DE MEMBRE",
    membre: "MEMBRE",
    numero: "N° DE MEMBRE",
    valide: "VALIDE JUSQU'AU",
    verification: "Vérifier cette carte",
    urgence: "LIGNE DE SIGNALEMENT",
    merci: "Merci de rendre nos interventions possibles.",
  },
  en: {
    titre: "MEMBERSHIP CARD",
    membre: "MEMBER",
    numero: "MEMBER NO.",
    valide: "VALID UNTIL",
    verification: "Verify this card",
    urgence: "REPORTING LINE",
    merci: "Thank you for making our rescues possible.",
  },
  es: {
    titre: "TARJETA DE MIEMBRO",
    membre: "MIEMBRO",
    numero: "N.º DE MIEMBRO",
    valide: "VÁLIDA HASTA",
    verification: "Verificar esta tarjeta",
    urgence: "LÍNEA DE AVISO",
    merci: "Gracias por hacer posibles nuestras intervenciones.",
  },
} as const;

// Date en jour / mois / année, la convention de l'organisation.
function formaterDate(iso: string) {
  const d = new Date(iso);
  const jj = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${jj}/${mm}/${d.getUTCFullYear()}`;
}

// Réduit la taille du texte jusqu'à ce qu'il tienne dans la largeur voulue :
// un nom composé long ne doit pas déborder de la carte.
function tailleAjustee(
  texte: string,
  police: { widthOfTextAtSize: (t: string, s: number) => number },
  largeurMax: number,
  tailleDepart: number,
) {
  let taille = tailleDepart;
  while (taille > 7 && police.widthOfTextAtSize(texte, taille) > largeurMax) {
    taille -= 0.5;
  }
  return taille;
}

export async function genererCarteMembre(
  donnees: DonneesCarte,
): Promise<Uint8Array> {
  const l = LIBELLES[donnees.langue];
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${l.titre} ${donnees.annee} — ${donnees.numero}`);
  pdf.setAuthor("Sauvetage Animal Rescue");

  const gras = await pdf.embedFont(StandardFonts.HelveticaBold);
  const normal = await pdf.embedFont(StandardFonts.Helvetica);

  const ecusson = await pdf.embedPng(
    await readFile(path.join(process.cwd(), "src/lib/carte/ecusson.png")),
  );

  // --- Recto ---
  const recto = pdf.addPage([LARGEUR, HAUTEUR]);
  recto.drawRectangle({
    x: 0,
    y: 0,
    width: LARGEUR,
    height: HAUTEUR,
    color: MARINE,
  });
  // Liseré doré : le rappel de l'engrenage de l'écusson.
  recto.drawRectangle({
    x: 0,
    y: HAUTEUR - 4,
    width: LARGEUR,
    height: 4,
    color: OR,
  });

  const tailleEcusson = 46;
  recto.drawImage(ecusson, {
    x: LARGEUR - tailleEcusson - 12,
    y: HAUTEUR - tailleEcusson - 14,
    width: tailleEcusson,
    height: tailleEcusson,
  });

  recto.drawText("SAUVETAGE ANIMAL RESCUE", {
    x: 14,
    y: HAUTEUR - 24,
    size: 8.5,
    font: gras,
    color: BLANC,
  });
  recto.drawText(`${l.titre} ${donnees.annee}`, {
    x: 14,
    y: HAUTEUR - 38,
    size: 10,
    font: gras,
    color: OR,
  });

  const nomComplet = `${donnees.prenom} ${donnees.nom}`.toUpperCase();
  const tailleNom = tailleAjustee(nomComplet, gras, LARGEUR - 28, 17);
  recto.drawText(l.membre, {
    x: 14,
    y: 64,
    size: 6.5,
    font: normal,
    color: rgb(1, 1, 1),
    opacity: 0.55,
  });
  recto.drawText(nomComplet, {
    x: 14,
    y: 46,
    size: tailleNom,
    font: gras,
    color: BLANC,
  });

  recto.drawText(l.numero, {
    x: 14,
    y: 28,
    size: 6.5,
    font: normal,
    color: rgb(1, 1, 1),
    opacity: 0.55,
  });
  recto.drawText(donnees.numero, {
    x: 14,
    y: 14,
    size: 11,
    font: gras,
    color: OR,
  });

  const valide = formaterDate(donnees.expireLe);
  recto.drawText(l.valide, {
    x: LARGEUR - 14 - normal.widthOfTextAtSize(l.valide, 6.5),
    y: 28,
    size: 6.5,
    font: normal,
    color: rgb(1, 1, 1),
    opacity: 0.55,
  });
  recto.drawText(valide, {
    x: LARGEUR - 14 - gras.widthOfTextAtSize(valide, 11),
    y: 14,
    size: 11,
    font: gras,
    color: BLANC,
  });

  // --- Verso ---
  const verso = pdf.addPage([LARGEUR, HAUTEUR]);
  verso.drawRectangle({
    x: 0,
    y: 0,
    width: LARGEUR,
    height: HAUTEUR,
    color: BLANC,
  });
  verso.drawRectangle({ x: 0, y: 0, width: LARGEUR, height: 4, color: OR });

  const urlVerification = `${urlSite()}/${donnees.langue}/verification/${donnees.jetonVerification}`;
  const qrDataUrl = await QRCode.toDataURL(urlVerification, {
    margin: 0,
    width: 400,
    color: { dark: "#0b2338", light: "#ffffff" },
  });
  const qr = await pdf.embedPng(qrDataUrl);
  const tailleQr = 82;
  verso.drawImage(qr, {
    x: 14,
    y: (HAUTEUR - tailleQr) / 2 + 2,
    width: tailleQr,
    height: tailleQr,
  });

  const xTexte = 14 + tailleQr + 12;
  verso.drawText(l.verification, {
    x: xTexte,
    y: HAUTEUR - 34,
    size: 7,
    font: gras,
    color: MARINE,
  });
  verso.drawText("sar.quebec", {
    x: xTexte,
    y: HAUTEUR - 46,
    size: 7,
    font: normal,
    color: rgb(0.35, 0.42, 0.47),
  });

  verso.drawText(l.urgence, {
    x: xTexte,
    y: 74,
    size: 6.5,
    font: normal,
    color: rgb(0.35, 0.42, 0.47),
  });
  verso.drawText("514-773-3911", {
    x: xTexte,
    y: 58,
    size: 13,
    font: gras,
    color: MARINE,
  });

  const tailleMerci = tailleAjustee(l.merci, normal, LARGEUR - xTexte - 14, 6.5);
  verso.drawText(l.merci, {
    x: xTexte,
    y: 30,
    size: tailleMerci,
    font: normal,
    color: rgb(0.35, 0.42, 0.47),
  });

  return pdf.save();
}
