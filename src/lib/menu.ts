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
      { cle: "missionsInternationales", href: "/missions-internationales" },
      { cle: "missionsNationales", href: "/missions-nationales" },
      { cle: "distinctions", href: "/distinctions" },
      { cle: "memoriam", href: "/in-memoriam" },
      { cle: "medias", href: "/medias" },
    ],
  },
  {
    cle: "services",
    liens: [
      { cle: "secoursAnimalier", href: "/services/secours-animalier" },
      { cle: "sauvetageTechnique", href: "/services/sauvetage-technique" },
      { cle: "capture", href: "/services/capture" },
      { cle: "inspection", href: "/services/inspection" },
      { cle: "reglementation", href: "/services/reglementation" },
      { cle: "denombrement", href: "/services/denombrement" },
      { cle: "sinistres", href: "/services/sinistres" },
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
      { cle: "atelierPrimaire", href: "/ateliers/primaire" },
      { cle: "atelierSecondaire", href: "/ateliers/secondaire" },
    ],
  },
];

// Liens de premier niveau, hors menus déroulants.
export const LIENS_DIRECTS: LienMenu[] = [
  { cle: "fiches", href: "/informations" },
];

// Connexion : trois portes distinctes, parce que ce ne sont ni les mêmes
// personnes, ni les mêmes comptes, ni les mêmes bases de données. Les
// membres et les partenaires vivent dans le site public ; les intervenants
// dans le registre des missions, qui est une application séparée.
export const MENU_CONNEXION: SectionMenu = {
  cle: "connexion",
  liens: [
    { cle: "connexionMembre", href: "/espace-membre" },
    { cle: "connexionPartenaire", href: "/espace-partenaire" },
    { cle: "connexionIntervenant", href: "https://sar-intranet.com" },
  ],
};
