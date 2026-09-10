import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { EnTetePage, ListePuces, Section } from "@/components/ui";
import { FormulaireFormation } from "@/components/formulaire-formation";
import { lireFormationsAVenir } from "@/lib/formations";

const SUJETS = [
  "01 - Introduction",
  "02 - Les animaux et la loi au Québec",
  "03 - Préparation aux urgences",
  "04 - Trousse et sac d’évacuation",
  "05 - Animaux de la faune",
  "06 - Anatomie et physiologie",
  "07 - Sécurité de la scène",
  "08 - Approche et comportement",
  "09 - Vérification primaire",
  "10 - Vérification secondaire",
  "11 - Signes vitaux",
  "12 - Anamnèse",
  "13 - Appel d’urgence et relais vétérinaire",
  "14 - Manipulation, contention et muselière",
  "15 - Hémorragies",
  "16 - État de choc",
  "17 - Obstruction des voies respiratoires",
  "18 - Respiration artificielle et RCR",
  "19 - Réactions allergiques",
  "20 - Hyperthermie et coup de chaleur",
  "21 - Hypothermie et engelures",
  "22 - Déshydratation",
  "23 - Noyade et submersion",
  "24 - Électrisation",
  "25 - Intoxications",
  "26 - Urgences neurologiques",
  "27 - Urgences cardiorespiratoires",
  "28 - Urgences digestives et abdominales",
  "29 - Contusions et plaies",
  "30 - Blessures aux yeux",
  "31 - Brûlures",
  "32 - Traumatismes musculosquelettiques",
  "33 - Immobilisation, déplacement et évacuation",
  "34 - Les animaux et les véhicules",
  "35 - Maladies chroniques et particularités",
  "36 - Zoonoses et prévention des infections",
  "37 - Mise bas",
  "38 - Prévention au quotidien",
  "39 - Ressources externes",
  "40 - Mises en situation et évaluation",
];

const INCLUS = [
  "Manuel de formation en version électronique",
  "Certificat de participation",
  "Écusson et autocollant",
];

function Photo({ fichier, alt }: { fichier: string; alt: string }) {
  return <div className="relative aspect-video overflow-hidden rounded-xl bg-marine"><Image src={fichier} alt={alt} fill sizes="(max-width: 768px) 100vw, 42rem" className="object-cover" /></div>;
}

export const revalidate = 60;

export default async function PagePremiersSecoursAnimal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const formations = await lireFormationsAVenir();
  return <>
    <EnTetePage surtitre="40 modules • 16 heures" titre="Premiers Secours Animal" intro="La formation complète destinée aux propriétaires d’animaux qui veulent être réellement préparés. Elle couvre l’ensemble des urgences courantes et des pathologies que rencontre un animal de compagnie." image="/images/formations.jpg" imageTailleNaturelle={{ largeur: 2000, hauteur: 1125 }} />
    <Section titre="Se préparer à agir" largeur="carte"><p className="paragraphe text-lg leading-relaxed text-foreground/90">La formation <strong>Premiers Secours Animal</strong> de Sauvetage Animal Rescue s’adresse aux propriétaires de chiens et de chats qui souhaitent savoir quoi faire lorsqu’une urgence survient. Vous apprendrez à reconnaître les signes de détresse, à observer votre animal et à poser les premiers gestes pour lui porter secours en sécurité. L’objectif: éviter d’aggraver la situation, limiter les complications et faciliter une prise en charge vétérinaire rapide. À travers des explications illustrées et des mises en situation, vous développerez des repères concrets pour réagir avec méthode. Cette formation vous prépare à agir dans l’attente de l’aide vétérinaire, sans jamais la remplacer.</p></Section>
    <Section fond largeur="carte"><Photo fichier="/images/formation-premiers-secours-1.jpg" alt="Une formation de premiers secours animaliers donnée par Sauvetage Animal Rescue" /></Section>
    <Section titre="Les 40 modules" largeur="carte"><ListePuces items={SUJETS} /></Section>
    <Section fond largeur="carte"><Photo fichier="/images/formation-premiers-secours-materiel.jpg" alt="Manuel, certificat, mannequin et écusson de Premiers Secours Animal disposés dans une salle de formation" /></Section>
    <Section titre="Inclus dans la tarification" largeur="carte"><ListePuces items={INCLUS} /></Section>
    <Section fond titre="Réserver votre place" largeur="carte"><FormulaireFormation initiales={formations} /></Section>
  </>;
}

export async function generateMetadata() { return { title: "Premiers Secours Animal", description: "Formation de 16 heures en premiers secours animal." }; }
