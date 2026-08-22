// Les personnes que l'organisation honore. Rien ici n'est inventé: chaque
// entrée est ajoutée à la main, avec l'accord des proches. Tant que la liste
// est vide, la page n'affiche que sa dédicace.
export type Hommage = {
  cle: string;
  nom: string;
  fonction?: string;
  // Années de service, ou l'année du décès seule.
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
    fonction: "Membre de l'équipe",
    annees: "29 mai 2023",
    image: "/images/memoriam-roxanne-martel.jpg",
    texte: [
      "Roxanne s'est éteinte à trente et un ans, des suites des complications d'un accident de la route. Elle avait toute la vie devant elle.",
      "La cause animale, elle la portait profondément. C'est ce qui l'avait menée jusqu'à nous, et c'est ce que l'équipe garde d'elle.",
      "Elle nous manque.",
    ],
  },
];
