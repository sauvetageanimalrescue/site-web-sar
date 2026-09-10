import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { EnTetePage, ListePuces, Section } from "@/components/ui";
import { FormulaireFormation } from "@/components/formulaire-formation";
import { lireFormationsAVenir } from "@/lib/formations";

const SUJETS = [
  "La préparation aux urgences et aux sinistres, la trousse et le sac d’évacuation",
  "Les responsabilités envers les animaux et le cadre légal au Québec",
  "Les particularités des interventions auprès des animaux de la faune",
  "La sécurité des lieux, l’approche de l’animal et la lecture de son comportement",
  "Les repères anatomiques, les vérifications primaire et secondaire, les signes vitaux et les renseignements à transmettre au vétérinaire",
  "L’appel d’urgence, les ressources disponibles et le relais vétérinaire",
  "La manipulation, la contention, l’immobilisation et le transport",
  "Les hémorragies, l’état de choc, les plaies, les brûlures et les blessures aux yeux, aux os et aux articulations",
  "L’étouffement, la respiration artificielle et la réanimation cardiorespiratoire",
  "Le coup de chaleur, l’hypothermie, les engelures et la déshydratation",
  "La noyade, l’électrisation, les intoxications et les réactions allergiques",
  "Les convulsions et les urgences neurologiques, cardiorespiratoires et digestives",
  "Les collisions, les animaux laissés dans un véhicule à la chaleur et la sécurité en voiture",
  "Les maladies chroniques, les zoonoses et les situations préoccupantes entourant la mise bas",
  "La prévention au quotidien et des mises en situation pour appliquer les apprentissages",
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
    <EnTetePage surtitre="50 modules • 16 heures" titre="Premiers Secours Animal" intro="La formation complète destinée aux propriétaires d’animaux qui veulent être réellement préparés. Elle couvre l’ensemble des urgences courantes et des pathologies que rencontre un animal de compagnie." image="/images/formations.jpg" imageTailleNaturelle={{ largeur: 2000, hauteur: 1125 }} />
    <Section titre="Se préparer à agir" largeur="carte"><p className="paragraphe text-lg leading-relaxed text-foreground/90">La formation <strong>Premiers Secours Animal</strong> de Sauvetage Animal Rescue s’adresse aux propriétaires de chiens et de chats qui souhaitent savoir quoi faire lorsqu’une urgence survient. Vous apprendrez à reconnaître les signes de détresse, à observer votre animal et à poser les premiers gestes pour lui porter secours en sécurité. L’objectif: éviter d’aggraver la situation, limiter les complications et faciliter une prise en charge vétérinaire rapide. À travers des explications illustrées et des mises en situation, vous développerez des repères concrets pour réagir avec méthode. Cette formation vous prépare à agir dans l’attente de l’aide vétérinaire, sans jamais la remplacer.</p></Section>
    <Section fond largeur="carte"><Photo fichier="/images/formation-premiers-secours-1.jpg" alt="Une formation de premiers secours animaliers donnée par Sauvetage Animal Rescue" /></Section>
    <Section titre="Au programme" largeur="carte"><ListePuces items={SUJETS} /></Section>
    <Section fond largeur="carte"><Photo fichier="/images/formation-premiers-secours-2.jpg" alt="Des participants à une formation de premiers secours animaliers" /></Section>
    <Section titre="Inclus dans la tarification" largeur="carte"><ListePuces items={INCLUS} /></Section>
    <Section fond titre="Réserver votre place" largeur="carte"><FormulaireFormation initiales={formations} /></Section>
  </>;
}

export async function generateMetadata() { return { title: "Premiers Secours Animal", description: "Formation de 16 heures en premiers secours animal." }; }
