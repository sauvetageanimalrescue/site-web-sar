import type { Fiche } from "./types";

// Ordre d'affichage sur la page d'index. Les situations les plus fréquentes
// en premier : ce sont celles qui remplissent la ligne de signalement.
export const FICHES: Fiche[] = [
  {
    slug: "chat-dans-un-arbre",
    categorie: "domestique",
    urgence: "moderee",
    image: "/images/hero-accueil.jpg",
    especes: ["11"],
  },
  {
    slug: "chatons-errants",
    categorie: "domestique",
    urgence: "moderee",
    image: "/images/recrutement.jpg",
    especes: ["11"],
  },
  {
    slug: "raton-laveur-dans-le-grenier",
    categorie: "faune-urbaine",
    urgence: "faible",
    image: "/images/territoire.jpg",
    especes: ["22"],
  },
  {
    slug: "oiseau-blesse",
    categorie: "oiseaux",
    urgence: "urgente",
    image: "/images/formations.jpg",
    especes: ["40", "49", "96"],
  },
  {
    slug: "canetons-dans-une-grille-degout",
    categorie: "oiseaux",
    urgence: "urgente",
    image: "/images/stages.jpg",
    especes: ["41", "42"],
  },
  {
    slug: "chauve-souris-dans-la-maison",
    categorie: "faune-urbaine",
    urgence: "urgente",
    image: "/images/services-urgence.png",
    especes: ["98"],
  },
];

export function trouverFiche(slug: string): Fiche | undefined {
  return FICHES.find((f) => f.slug === slug);
}
