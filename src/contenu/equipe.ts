// Les personnes de l'équipe. Chacune a sa page, à l'adresse /equipe/<cle>.
//
// Rien ici n'est deviné : une personne n'apparaît sur le site que si la
// direction générale a fourni ses informations et que la personne y consent.
// Une équipe de bénévoles n'est pas un organigramme public par défaut.

export type Membre = {
  cle: string;
  prenom: string;
  nom: string;
  // Ce qu'elle fait dans l'organisation, en clair.
  fonction: string;
  // Grade ou distinction portée, s'il y a lieu.
  grade?: string;
  // Date d'entrée dans l'équipe, en jour/mois/année.
  depuis?: string;
  // Photo dans public/images. Sans photo, la carte reste sur fond marine
  // avec les initiales : mieux qu'une silhouette générique.
  photo?: string;
  // Quelques lignes de présentation.
  texte?: string[];
  // L'intervention qui l'a marquée, racontée par elle.
  sauvetageMarquant?: string;
  // Identifiant d'une vidéo YouTube, pour une entrevue.
  video?: string;
};

export const MEMBRES: Membre[] = [
  {
    cle: "eric-dussault",
    prenom: "Eric",
    nom: "Dussault",
    fonction: "Fondateur et directeur général",
    depuis: "2010",
    photo: "/images/carte-direction.jpg",
    texte: [
      "Venu des services d'urgence, Eric Dussault a fondé l'organisation après avoir constaté qu'il n'existait rien de comparable pour les animaux. Il dirige, forme et intervient encore sur le terrain.",
    ],
  },
];

export function trouverMembre(cle: string) {
  return MEMBRES.find((m) => m.cle === cle) ?? null;
}

export function initiales(m: Membre) {
  return (m.prenom[0] ?? "") + (m.nom[0] ?? "");
}

// Nombre d'années de service, calculé à partir de l'année d'entrée.
export function anneesDeService(m: Membre, anneeCourante: number) {
  const debut = Number(m.depuis?.slice(-4));
  if (!Number.isFinite(debut)) return null;
  return Math.max(anneeCourante - debut, 0);
}
