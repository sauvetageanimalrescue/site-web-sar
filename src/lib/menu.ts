// Arborescence du site. Les libellés sont des clés du namespace « nav » ;
// l'en-tête et le pied de page lisent tous les deux cette structure pour ne
// jamais diverger.

// href absent : le lien n'existe pas encore (page à venir), il s'affiche
// dans le menu mais ne mène nulle part.
export type LienMenu = { cle: string; href?: string };
// Une section porte soit une liste de liens, qui devient un menu déroulant,
// soit une adresse, et elle est alors un lien direct dans la barre.
export type SectionMenu = { cle: string; liens: LienMenu[]; href?: string };

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
      { cle: "serie", href: "/serie-televisee" },
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
      { cle: "sinistres", href: "/services/sinistres" },
    ],
  },
  {
    // Les milieux desservis : pas encore de fiche par milieu, donc aucun
    // href pour l'instant. La section s'affiche déjà pour qu'Eric voie
    // l'ordre et la liste complète pendant qu'on écrit le reste.
    cle: "solutions",
    liens: [
      { cle: "municipalites" },
      { cle: "securitePublique" },
      { cle: "militaires" },
      { cle: "serviceAnimalier" },
      { cle: "hopitauxResidences" },
      { cle: "ecolesUniversites" },
      { cle: "transportCommun" },
      { cle: "aeroport" },
      { cle: "installationPortuaire" },
      { cle: "entrepriseUsine" },
      { cle: "centresCommerciaux" },
      { cle: "parcsAttraction" },
      { cle: "toursCellulaires" },
      { cle: "telecommunications" },
      { cle: "cimetiere" },
    ],
  },
  {
    cle: "contribuer",
    liens: [
      { cle: "membre", href: "/membre" },
      { cle: "dons", href: "/dons" },
      { cle: "partenariat", href: "/partenariat" },
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
  // Pas encore de boutique en ligne : le mot apparaît, sans lien.
  { cle: "boutique" },
];

// Connexion : trois portes distinctes, parce que ce ne sont ni les mêmes
// personnes, ni les mêmes comptes, ni les mêmes bases de données. Les
// membres et les partenaires vivent dans le site public ; les intervenants
// dans le registre des missions, qui est une application séparée.
export const MENU_CONNEXION: SectionMenu = {
  cle: "connexion",
  liens: [
    // Les espaces membre et partenaire viendront quand leur authentification
    // sera en place ; inutile d'annoncer une porte qui ne s'ouvre pas.
    { cle: "connexionIntervenant", href: "https://sar-intranet.com" },
  ],
};
