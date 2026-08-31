import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import QRCode from "qrcode";
import type { Locale } from "@/i18n/routing";

const MARINE = rgb(0.043, 0.137, 0.22);
const CIEL = rgb(0.18, 0.525, 0.757);
const GRIS = rgb(0.35, 0.42, 0.47);
const BLANC = rgb(1, 1, 1);
const LARGEUR = 612;
const HAUTEUR = 792;

export type ParticipantStage = {
  prenom: string;
  nom: string;
  mineur: boolean;
  jeton: string;
};

export type DonneesDocumentsStage = {
  code: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  lieu: string;
  maitreStage: string;
  vehicule: string;
  responsablePrenom: string;
  responsableNom: string;
  signature: string | null;
  signeeLe: string | null;
  participants: ParticipantStage[];
  langue: Locale;
  baseUrl: string;
};

function nettoyer(texte: string) {
  return texte.replace(/[\u2010-\u2015]/g, "-").replace(/\u00a0/g, " ");
}

function lignes(texte: string, police: PDFFont, taille: number, largeur: number) {
  const mots = nettoyer(texte).split(/\s+/);
  const resultat: string[] = [];
  let ligne = "";
  for (const mot of mots) {
    const essai = ligne ? `${ligne} ${mot}` : mot;
    if (police.widthOfTextAtSize(essai, taille) <= largeur) ligne = essai;
    else {
      if (ligne) resultat.push(ligne);
      ligne = mot;
    }
  }
  if (ligne) resultat.push(ligne);
  return resultat;
}

function entete(page: PDFPage, titre: string, sousTitre?: string) {
  page.drawRectangle({ x: 0, y: HAUTEUR - 92, width: LARGEUR, height: 92, color: MARINE });
  page.drawRectangle({ x: 0, y: HAUTEUR - 5, width: LARGEUR, height: 5, color: CIEL });
  page.drawText("SAUVETAGE ANIMAL RESCUE", { x: 42, y: HAUTEUR - 35, size: 11, color: CIEL });
  page.drawText(titre, { x: 42, y: HAUTEUR - 62, size: 20, color: BLANC });
  if (sousTitre) page.drawText(sousTitre, { x: 42, y: HAUTEUR - 79, size: 9, color: BLANC });
}

function paragraphe(page: PDFPage, texte: string, y: number, police: PDFFont, taille = 10.5) {
  const ls = lignes(texte, police, taille, LARGEUR - 84);
  ls.forEach((ligne, i) => page.drawText(ligne, { x: 42, y: y - i * 15, size: taille, font: police, color: MARINE }));
  return y - ls.length * 15;
}

function formaterDate(iso: string) {
  return new Intl.DateTimeFormat("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export async function genererGuideStage(d: DonneesDocumentsStage) {
  const pdf = await PDFDocument.create();
  const normal = await pdf.embedFont(StandardFonts.Helvetica);
  const gras = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage([LARGEUR, HAUTEUR]);
  entete(page, "GUIDE DU STAGE D'OBSERVATION", `Réservation ${d.code}`);

  let y = 660;
  page.drawText("VOTRE JOURNÉE", { x: 42, y, size: 11, font: gras, color: CIEL });
  y -= 19;
  page.drawText(formaterDate(d.date), { x: 42, y, size: 11, font: gras, color: MARINE });
  page.drawText(`De ${d.heureDebut.slice(0, 2)} h à ${d.heureFin.slice(0, 2)} h`, { x: 42, y: y - 17, size: 10.5, font: normal, color: MARINE });
  page.drawText("Point de rencontre:", { x: 42, y: y - 42, size: 10.5, font: gras, color: MARINE });
  page.drawText(d.lieu, { x: 42, y: y - 59, size: 10.5, font: normal, color: MARINE });
  page.drawText("Au fond du stationnement, à côté du restaurant Thaï Express.", { x: 42, y: y - 76, size: 10.5, font: normal, color: MARINE });
  page.drawText("Vous pouvez y laisser votre véhicule pour toute la journée.", { x: 42, y: y - 93, size: 10.5, font: normal, color: MARINE });
  page.drawText(`Maître de stage: ${d.maitreStage}`, { x: 42, y: y - 116, size: 10.5, font: normal, color: MARINE });
  page.drawText(`Véhicule: ${d.vehicule}`, { x: 42, y: y - 133, size: 10.5, font: normal, color: MARINE });
  y -= 158;

  const sections = [
    ["AVANT DE PARTIR", "Arrivez quinze minutes avant l'heure prévue. Portez des vêtements adaptés à la météo et des chaussures fermées. Vous pouvez apporter un sac à dos, un repas, des collations et des bouteilles d'eau. L'équipement de protection est fourni lorsque la situation l'exige."],
    ["PENDANT LE STAGE", "Vous accompagnez l'équipe pendant ses opérations. Le nombre et la nature des interventions ne peuvent jamais être garantis. Toute participation à une manipulation demeure à la discrétion du maître de stage et la sécurité passe avant toute autre considération."],
    ["HORAIRE ET MÉTÉO", "Le stage est maintenu beau temps, mauvais temps. Nous faisons tout notre possible pour terminer à l'heure annoncée, mais une intervention en cours peut occasionner un retard. Le maître de stage en discute alors avec les participants."],
    ["CHANGEMENT ET ANNULATION", "La contribution n'est pas remboursable. La place peut être transférée à une autre personne en nous avisant. Un changement de date peut être tenté selon les places encore disponibles, sans garantie."],
    ["À RETENIR", "Conservez vos billets et présentez-les le matin du stage. Aucun rappel distinct n'est garanti: ajoutez immédiatement la date à votre calendrier. Pour toute information, écrivez à e.dussault@sar.quebec. Le matin du stage, si vous avez une question ou prévoyez être en retard, téléphonez à l'officier de garde au 514-270-3636."],
  ];
  for (const [titre, texte] of sections) {
    page.drawText(titre, { x: 42, y, size: 11, font: gras, color: CIEL });
    y = paragraphe(page, texte, y - 18, normal) - 16;
  }
  page.drawText("sar.quebec | 514-773-3911", { x: 42, y: 28, size: 8.5, font: normal, color: GRIS });
  return pdf.save();
}

export async function genererBilletsStage(d: DonneesDocumentsStage) {
  const pdf = await PDFDocument.create();
  const normal = await pdf.embedFont(StandardFonts.Helvetica);
  const gras = await pdf.embedFont(StandardFonts.HelveticaBold);

  for (const participant of d.participants) {
    const page = pdf.addPage([LARGEUR, HAUTEUR]);
    entete(page, "BILLET - STAGE D'OBSERVATION", `Réservation ${d.code}`);
    page.drawText(`${participant.prenom} ${participant.nom}`.toUpperCase(), { x: 42, y: 625, size: 25, font: gras, color: MARINE });
    page.drawText(formaterDate(d.date), { x: 42, y: 575, size: 20, font: gras, color: CIEL });
    page.drawText(`${d.heureDebut.slice(0, 2)} h à ${d.heureFin.slice(0, 2)} h`, { x: 42, y: 547, size: 15, font: gras, color: MARINE });
    page.drawText(d.lieu, { x: 42, y: 515, size: 11, font: normal, color: GRIS });
    page.drawText(`Maître de stage: ${d.maitreStage}`, { x: 42, y: 480, size: 11, font: normal, color: MARINE });
    page.drawText(`Véhicule: ${d.vehicule}`, { x: 42, y: 460, size: 11, font: normal, color: MARINE });

    const url = `${d.baseUrl}/${d.langue}/stages/billet/${participant.jeton}`;
    const qrData = await QRCode.toDataURL(url, { margin: 1, width: 500, color: { dark: "#0b2338", light: "#ffffff" } });
    const qr = await pdf.embedPng(qrData);
    page.drawImage(qr, { x: 176, y: 185, width: 260, height: 260 });
    page.drawText("Présentez ce billet à votre arrivée.", { x: 42, y: 145, size: 12, font: gras, color: MARINE });
    page.drawText("Le code QR permet à notre équipe de vérifier la réservation.", { x: 42, y: 124, size: 10, font: normal, color: GRIS });
    page.drawText("Sauvetage Animal Rescue | sar.quebec", { x: 42, y: 28, size: 8.5, font: normal, color: GRIS });
  }
  return pdf.save();
}

export async function genererAutorisationStage(d: DonneesDocumentsStage) {
  const pdf = await PDFDocument.create();
  const normal = await pdf.embedFont(StandardFonts.Helvetica);
  const gras = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage([LARGEUR, HAUTEUR]);
  entete(page, "AUTORISATION POUR PARTICIPANT MINEUR", `Réservation ${d.code}`);
  let y = 650;
  page.drawText("PARTICIPANT(S) MINEUR(S)", { x: 42, y, size: 11, font: gras, color: CIEL });
  y -= 25;
  for (const p of d.participants.filter((p) => p.mineur)) {
    page.drawText(`${p.prenom} ${p.nom}`, { x: 42, y, size: 13, font: gras, color: MARINE });
    y -= 22;
  }
  y -= 16;
  y = paragraphe(page, "Je confirme être autorisé à inscrire le ou les participants mineurs nommés dans ce document et avoir obtenu l'accord de leur parent ou de leur tuteur légal pour leur participation au stage d'observation de Sauvetage Animal Rescue.", y, normal, 11) - 30;
  page.drawText("SIGNATURE ÉLECTRONIQUE", { x: 42, y, size: 11, font: gras, color: CIEL });
  page.drawText(d.signature ?? "", { x: 42, y: y - 32, size: 18, font: gras, color: MARINE });
  page.drawLine({ start: { x: 42, y: y - 40 }, end: { x: 360, y: y - 40 }, thickness: 1, color: GRIS });
  page.drawText(`Responsable de la réservation: ${d.responsablePrenom} ${d.responsableNom}`, { x: 42, y: y - 70, size: 10, font: normal, color: MARINE });
  page.drawText(`Signé électroniquement le ${d.signeeLe ? new Date(d.signeeLe).toLocaleString("fr-CA") : ""}`, { x: 42, y: y - 90, size: 9, font: normal, color: GRIS });
  page.drawText(`Stage du ${formaterDate(d.date)} | Réservation ${d.code}`, { x: 42, y: y - 110, size: 9, font: normal, color: GRIS });
  page.drawText("Une copie de cette autorisation est conservée avec la réservation.", { x: 42, y: 45, size: 8.5, font: normal, color: GRIS });
  return pdf.save();
}
