// Les personnes que l'organisation honore. Rien ici n'est inventé: chaque
// entrée est ajoutée à la main, avec l'accord des proches. Tant que la liste
// est vide, la page n'affiche que sa dédicace.
export type Hommage = {
  cle: string;
  nom: string;
  fonction?: string;
  // Sous la photo: année de naissance et année du décès.
  annees?: string;
  // Une photo dans public/images, si la famille en fournit une.
  image?: string;
  // Quelques lignes, dans la langue d'origine: un hommage ne se traduit pas.
  texte?: string[];
};

export const HOMMAGES: Hommage[] = [
  {
    cle: "roxane-martel",
    nom: "Roxanne Martel",
    fonction: "Recrue",
    annees: "1991 - 2023",
    image: "/images/memoriam-roxanne-martel.jpg",
    texte: [
      "Décédée le 29 mai 2023 à seulement 31 ans des suites de complications liées à un accident de la route, Roxanne Martel laisse derrière elle le souvenir d'une femme profondément engagée envers la cause animale. Connue et appréciée dans la communauté, elle mettait également sa présence sur les réseaux sociaux au service de cette cause qui lui tenait tant à coeur. Déterminée, audacieuse et animée d'une volonté remarquable, Roxanne venait de joindre les rangs de Sauvetage Animal Rescue comme recrue et avait entrepris sa formation de sauveteuse. Elle avait déjà participé à une première intervention sur le terrain. Son passage parmi nous aura été beaucoup trop court, mais son engagement, lui, demeure.",
    ],
  },
];
