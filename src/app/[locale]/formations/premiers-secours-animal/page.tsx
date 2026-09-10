import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { EnTetePage, ListePuces, Section } from "@/components/ui";
import { FormulaireFormation } from "@/components/formulaire-formation";
import { lireFormationsAVenir } from "@/lib/formations";

const SUJETS = [
  "Tout le contenu de l’Initiation Secours Animal",
  "Hyperthermie, coup de chaleur, hypothermie et engelures",
  "Quasi-noyade et électrisation",
  "Épilepsie, accident vasculaire cérébral et infarctus",
  "Embolie pulmonaire, torsion gastrique et occlusion intestinale",
  "Contusions, plaies, hémorragies et brûlures",
  "Exorbitation et blessures aux os ou aux articulations",
  "Animal heurté par un véhicule, immobilisation, évacuation et transport",
  "Pathologies chroniques fréquentes, zoonoses, mise bas et sécurité en voiture",
];

const INCLUS = [
  "Manuel de formation, version électronique",
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
    <Section largeur="carte"><p className="paragraphe text-lg leading-relaxed text-foreground/90">Nos formations ne visent pas à faire de vous un vétérinaire. Elles visent à vous rendre capable de reconnaître une urgence, d’approcher un animal sans aggraver la situation ni vous blesser, de poser les bons gestes et d’amener l’animal chez le vétérinaire le plus rapidement possible.</p></Section>
    <Section fond largeur="carte"><Photo fichier="/images/formation-premiers-secours-1.jpg" alt="Une formation de premiers secours animaliers donnée par Sauvetage Animal Rescue" /></Section>
    <Section titre="Ce que couvre la formation" largeur="carte"><ListePuces items={SUJETS} /></Section>
    <Section fond largeur="carte"><Photo fichier="/images/formation-premiers-secours-2.jpg" alt="Des participants à une formation de premiers secours animaliers" /></Section>
    <Section titre="Inclus dans la tarification" largeur="carte"><ListePuces items={INCLUS} /></Section>
    <Section fond titre="Réserver votre place" largeur="carte"><FormulaireFormation initiales={formations} /></Section>
  </>;
}

export async function generateMetadata() { return { title: "Premiers Secours Animal", description: "Formation de 16 heures en premiers secours animal." }; }
