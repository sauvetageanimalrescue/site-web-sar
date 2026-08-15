// Arborescence du site. Les libellés sont des clés du namespace « nav » ;
// l'en-tête et le pied de page lisent tous les deux cette structure pour ne
// jamais diverger.

export type LienMenu = { cle: string; href: string };
export type SectionMenu = { cle: string; liens: LienMenu[] };

export const MENU: SectionMenu[] = [
  {
    cle: "organisation",
    liens: [
      { cle: "mission", href: "/mission" },
      { cle: "direction", href: "/direction" },
      { cle: "equipe", href: "/equipe" },
      { cle: "territoire", href: "/territoire" },
      { cle: "statistiques", href: "/statistiques" },
      { cle: "medias", href: "/medias" },
    ],
  },
  {
    cle: "services",
    liens: [
      { cle: "interventions", href: "/services/interventions" },
      { cle: "municipalites", href: "/services/municipalites" },
      { cle: "atelierPrimaire", href: "/ateliers/primaire" },
      { cle: "atelierSecondaire", href: "/ateliers/secondaire" },
    ],
  },
  {
    cle: "contribuer",
    liens: [
      { cle: "membre", href: "/membre" },
      { cle: "dons", href: "/dons" },
      { cle: "patreon", href: "/patreon" },
      { cle: "partenariat", href: "/partenariat" },
      { cle: "partenaires", href: "/partenaires" },
      { cle: "recrutement", href: "/recrutement" },
      { cle: "stages", href: "/stages" },
    ],
  },
  {
    cle: "formations",
    liens: [
      { cle: "isa", href: "/formations/initiation-secours-animal" },
      { cle: "psa", href: "/formations/premiers-secours-animal" },
      { cle: "servicesUrgence", href: "/formations/services-urgence" },
    ],
  },
];

// Liens de premier niveau, hors menus déroulants.
export const LIENS_DIRECTS: LienMenu[] = [
  { cle: "fiches", href: "/informations" },
];
