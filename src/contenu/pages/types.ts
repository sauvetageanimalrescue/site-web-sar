// Pages éditoriales : contenu long, sans logique. Une seule route attrape-tout
// les rend toutes, ce qui évite un composant de page quasi vide par contenu.

export type BlocPage = {
  titre?: string;
  texte?: string[];
  liste?: string[];
  encadre?: { titre: string; lignes: string[] };
};

export type PageEditoriale = {
  surtitre?: string;
  titre: string;
  intro?: string;
  image?: string;
  blocs: BlocPage[];
  // Boutons affichés en fin de page.
  actions?: { href: string; libelle: string; principal?: boolean }[];
  // Retiré de l'index des moteurs de recherche (pages légales, par exemple).
  sansIndexation?: boolean;
};

export type CataloguePages = Record<string, PageEditoriale>;
