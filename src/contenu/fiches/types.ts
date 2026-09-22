// Fiches informatives: le coeur du référencement du site. Chaque fiche
// répond à une situation que les gens tapent réellement dans un moteur de
// recherche, avec une structure constante: quoi faire, quoi éviter, quand
// nous appeler.

export type CategorieFiche =
  | "domestique"
  | "faune-urbaine"
  | "oiseaux"
  | "general";

export type Urgence = "urgente" | "moderee" | "faible";

// Partie non traduisible d'une fiche: identifiant, classement, illustration.
export type Fiche = {
  slug: string;
  categorie: CategorieFiche;
  urgence: Urgence;
  image: string;
  especes: string[];
};

export type TexteFiche = {
  titre: string;
  resume: string;
  intro: string[];
  faire: string[];
  eviter: string[];
  appeler: string[];
  sections?: { titre: string; texte: string[] }[];
  // Certaines situations ont une ressource principale autre que SAR. Ce bloc
  // rend la bonne porte visible avant le reste de la fiche.
  contact?: {
    titre: string;
    texte?: string;
    lignes: string[];
    actions: { href: string; libelle: string; principal?: boolean }[];
  };
  sources?: { libelle: string; href: string }[];
  // Question et réponse reprises telles quelles dans les données structurées
  // FAQ, ce qui donne droit à un extrait enrichi dans les résultats.
  question: string;
  reponse: string;
};

export type CatalogueFiches = Record<string, TexteFiche>;
