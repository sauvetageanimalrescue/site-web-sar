import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { genererPdfCandidature } from "../src/lib/candidatures/generer-pdf.ts";

const svg = Buffer.from(`<svg width="600" height="700" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="700" fill="#dce9ed"/>
  <circle cx="300" cy="265" r="105" fill="#799fb1"/>
  <path d="M90 700c15-160 95-245 210-245s195 85 210 245" fill="#799fb1"/>
  <text x="300" y="70" text-anchor="middle" fill="#0b2338" font-size="28">PHOTO FICTIVE</text>
</svg>`);

const photo = await sharp(svg).png().toBuffer();
const exemple = {
  id: "7ce52e89-3784-4f79-a913-59462345bd56",
  creeLe: "2026-09-28T14:42:00Z",
  poste: "Sauveteur ou sauveteuse",
  prenom: "Camille",
  nom: "Exemple",
  courriel: "camille.exemple@example.org",
  telephone: "514-555-0100",
  adresseRue: "123, rue des Érables, appartement 4",
  ville: "Montréal",
  province: "Québec",
  codePostal: "H2X 1Y4",
  dateNaissance: "1995-04-12",
  occupation: "Employé·e à temps plein",
  vehicule: true,
  permis: true,
  disponibilites: ["Semaine, soir", "Fin de semaine, jour", "Sur appel"],
  disponibilitesTexte: "Disponible après 17 h en semaine et deux fins de semaine par mois.",
  experienceAnimaux: ["Manipulation des animaux", "Soins des animaux", "Animaux de la faune"],
  experience: "J'ai travaillé plusieurs années dans un refuge et participé à des interventions de terrain. ".repeat(6),
  experienceConnexe: ["Premiers soins", "Escalade", "Travail en hauteur"],
  experienceConnexeTexte: "Formation complémentaire en sécurité et travail d'équipe.",
  motivation: "Je souhaite contribuer au sauvetage des animaux et mettre mes compétences au service de l'équipe. ".repeat(10),
  reference: "Alex Exemple, superviseur",
  confirmeSelection: true,
  confirmeMajeur: true,
  photo,
};

const { pdf, photoIntegree } = await genererPdfCandidature(exemple);
const destination = path.join(process.cwd(), "output", "pdf", "exemple-candidature.pdf");
await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, pdf);
console.log(JSON.stringify({ destination, photoIntegree, octets: pdf.length }));
