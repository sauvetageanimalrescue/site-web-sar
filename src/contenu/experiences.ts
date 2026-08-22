import type { Locale } from "@/i18n/routing";

// Les listes du formulaire de recrutement, reprises telles quelles du
// formulaire utilisé par l'organisation. L'ordre est celui d'origine: il a
// été pensé pour que la personne trouve sa situation rapidement.

type Choix = { cle: string; fr: string; en: string; es: string };

export const OCCUPATIONS: Choix[] = [
  { cle: "etudiantPartiel", fr: "Étudiant·e à temps partiel", en: "Part-time student", es: "Estudiante a tiempo parcial" },
  { cle: "etudiantPlein", fr: "Étudiant·e à temps plein", en: "Full-time student", es: "Estudiante a tiempo completo" },
  { cle: "employePartiel", fr: "Employé·e à temps partiel", en: "Part-time employee", es: "Empleado·a a tiempo parcial" },
  { cle: "employePlein", fr: "Employé·e à temps plein", en: "Full-time employee", es: "Empleado·a a tiempo completo" },
  { cle: "autonome", fr: "Travailleur·euse autonome", en: "Self-employed", es: "Trabajador·a autónomo·a" },
  { cle: "sansEmploi", fr: "Sans emploi", en: "Unemployed", es: "Sin empleo" },
  { cle: "autre", fr: "Autre", en: "Other", es: "Otro" },
];

export const EXPERIENCES_ANIMAUX: Choix[] = [
  { cle: "aucune", fr: "Aucune expérience avec les animaux", en: "No experience with animals", es: "Sin experiencia con animales" },
  { cle: "manipulation", fr: "Manipulation des animaux", en: "Animal handling", es: "Manejo de animales" },
  { cle: "soins", fr: "Soins des animaux", en: "Animal care", es: "Cuidado de animales" },
  { cle: "animalier", fr: "Animalier·ère", en: "Animal attendant", es: "Cuidador·a de animales" },
  { cle: "tsa", fr: "Technicien·ne en santé animale", en: "Animal health technician", es: "Técnico·a en salud animal" },
  { cle: "veterinaire", fr: "Vétérinaire", en: "Veterinarian", es: "Veterinario·a" },
  { cle: "servicesAnimaliers", fr: "Services animaliers", en: "Animal services", es: "Servicios animales" },
  { cle: "ferme", fr: "Animaux de ferme", en: "Farm animals", es: "Animales de granja" },
  { cle: "faune", fr: "Animaux de la faune", en: "Wildlife", es: "Fauna silvestre" },
  { cle: "chevaux", fr: "Chevaux", en: "Horses", es: "Caballos" },
  { cle: "benevoleFaune", fr: "Bénévole dans un refuge de la faune", en: "Volunteer in a wildlife shelter", es: "Voluntario·a en un refugio de fauna" },
  { cle: "benevoleServices", fr: "Bénévole dans un service animalier", en: "Volunteer in an animal service", es: "Voluntario·a en un servicio animal" },
  { cle: "benevoleRefuge", fr: "Bénévole dans un refuge pour chat ou chien", en: "Volunteer in a cat or dog shelter", es: "Voluntario·a en un refugio de perros o gatos" },
  { cle: "autre", fr: "Autre", en: "Other", es: "Otro" },
];

export const EXPERIENCES_CONNEXES: Choix[] = [
  { cle: "escalade", fr: "Escalade", en: "Climbing", es: "Escalada" },
  { cle: "sauvetageAquatique", fr: "Sauvetage plage ou piscine", en: "Beach or pool lifeguarding", es: "Salvamento en playa o piscina" },
  { cle: "plongee", fr: "Plongée sous-marine", en: "Scuba diving", es: "Buceo" },
  { cle: "premiersSoins", fr: "Premiers soins", en: "First aid", es: "Primeros auxilios" },
  { cle: "premierRepondant", fr: "Premier répondant", en: "First responder", es: "Primer respondiente" },
  { cle: "paramedic", fr: "Paramédic", en: "Paramedic", es: "Paramédico·a" },
  { cle: "infirmier", fr: "Infirmier·ère", en: "Nurse", es: "Enfermero·a" },
  { cle: "medecin", fr: "Médecin", en: "Physician", es: "Médico·a" },
  { cle: "pompier", fr: "Pompier·ère", en: "Firefighter", es: "Bombero·a" },
  { cle: "policier", fr: "Policier·ère", en: "Police officer", es: "Policía" },
  { cle: "securitePublique", fr: "Sécurité publique ou sécurité civile", en: "Public safety or civil protection", es: "Seguridad pública o protección civil" },
  { cle: "securitePrivee", fr: "Sécurité privée ou transport de valeurs", en: "Private security or armoured transport", es: "Seguridad privada o transporte de valores" },
  { cle: "protectionFaune", fr: "Protection de la faune", en: "Wildlife protection", es: "Protección de la fauna" },
  { cle: "sauvetageSpecialise", fr: "Sauvetage spécialisé", en: "Specialised rescue", es: "Rescate especializado" },
  { cle: "espacesClos", fr: "Espaces clos", en: "Confined spaces", es: "Espacios confinados" },
  { cle: "hauteur", fr: "Hauteur", en: "Work at height", es: "Trabajo en altura" },
  { cle: "glace", fr: "Glace", en: "Ice", es: "Hielo" },
  { cle: "nautique", fr: "Nautique", en: "Boating", es: "Náutica" },
  { cle: "navigation", fr: "Navigation, cartes et boussole", en: "Navigation, maps and compass", es: "Navegación, mapas y brújula" },
  { cle: "armes", fr: "Armes à feu", en: "Firearms", es: "Armas de fuego" },
  { cle: "drone", fr: "Pilote de drone avec permis de Transports Canada", en: "Drone pilot with a Transport Canada certificate", es: "Piloto de dron con licencia de Transport Canada" },
  { cle: "pilote", fr: "Pilote d'avion ou d'hélicoptère", en: "Aeroplane or helicopter pilot", es: "Piloto de avión o helicóptero" },
  { cle: "photo", fr: "Photographie ou vidéo", en: "Photography or video", es: "Fotografía o vídeo" },
  { cle: "administration", fr: "Comptabilité ou administration", en: "Accounting or administration", es: "Contabilidad o administración" },
  { cle: "aucune", fr: "Aucune de ces réponses", en: "None of these", es: "Ninguna de estas" },
  { cle: "autre", fr: "Autre", en: "Other", es: "Otro" },
];

export function libelle(choix: Choix, langue: Locale) {
  return choix[langue]?? choix.fr;
}
