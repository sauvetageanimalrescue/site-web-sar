// Pages éditoriales: contenu long, sans logique. Une seule route attrape-tout
// les rend toutes, ce qui évite un composant de page quasi vide par contenu.

export type BlocPage = {
  titre?: string;
  texte?: string[];
  liste?: string[];
  encadre?: { titre: string; lignes: string[] };
  // Une image centrée à la largeur d'une carte, coins arrondis. Elle se
  // suffit à elle-même: ni légende, ni texte à côté.
  image?: {
    fichier: string;
    alt?: string;
    legende?: string;
    // Décalage du cadrage, ex. "center -50px" pour remonter la photo et
    // révéler ce qu'il y a plus bas dans l'image.
    position?: string;
  };
  // Composant interactif inséré dans une page éditoriale. Un seul pour
  // l'instant : la vérification du territoire desservi.
  composant?: "territoire" | "presse";
  // Foire aux questions: une question, une réponse repliée derrière un
  // chevron. La réponse accepte **gras** et [libellé](/adresse), comme un
  // paragraphe éditorial.
  questions?: { question: string; reponse: string }[];
};

export type PageEditoriale = {
  surtitre?: string;
  titre: string;
  intro?: string;
  image?: string;
  // Décalage du cadrage de la photo d'en-tête, ex. "center 200px".
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  imageTailleNaturelle?: { largeur: number; hauteur: number };
  blocs: BlocPage[];
  // Boutons affichés en fin de page.
  actions?: { href: string; libelle: string; principal?: boolean }[];
  // Retiré de l'index des moteurs de recherche (pages légales, par exemple).
  sansIndexation?: boolean;
};

export type CataloguePages = Record<string, PageEditoriale>;
