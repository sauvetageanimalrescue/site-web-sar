// Revue de presse. Chaque entrée est une apparition médiatique vérifiée, avec
// son lien d'origine: rien n'est recopié ici, on renvoie à la source.
//
// La date suit la forme AAAA-MM-JJ quand elle est connue, AAAA quand seule
// l'année l'est. Une entrée sans date reste valide et se range à la fin.
export type Support = "article" | "radio" | "television" | "balado";

export type Coupure = {
  media: string;
  titre: string;
  url: string;
  support: Support;
  date?: string;
};

export const PRESSE: Coupure[] = [
  {
    media: "La Relève",
    titre: "Kangourou en cavale: un animal en danger, des sauveteurs impuissants",
    url: "https://lareleve.qc.ca/2026/06/14/kangourou-en-cavale-un-animal-en-danger-des-sauveteurs-impuissants/",
    support: "article",
    date: "2026-06-14",
  },
  {
    media: "Journal de Boucherville",
    titre: "Un wallaby en cavale à Boucherville",
    url: "https://www.journaldeboucherville.com/actualite/un-wallaby-en-caval-a-boucherville/",
    support: "article",
    date: "2026-06",
  },
  {
    media: "Goldwater, Dubé",
    titre: "Éric Dussault, treize ans à aider les animaux en détresse",
    url: "https://goldwaterdroit.com/en/blog/eric-dussault-13-years-of-helping-animals-in-distress/",
    support: "article",
    date: "2022",
  },
  {
    media: "FM 103,3",
    titre: "Sauvetage Animal Rescue va compter les cerfs du parc Michel-Chartrand",
    url: "https://www.fm1033.ca/sauvetage-animal-rescue-va-faire-un-decompte-des-cerfs-du-parc-michel-chartrand/",
    support: "radio",
  },
  {
    media: "La Presse",
    titre: "La paille et la poutre",
    url: "https://www.lapresse.ca/actualites/2020-11-25/la-paille-et-la-poutre.php",
    support: "article",
    date: "2020-11-25",
  },
  {
    media: "Le Soleil de Châteauguay",
    titre: "Un Châteauguois au secours des koalas",
    url: "https://cybersoleil.com/un-chateauguois-au-secours-des-koalas/",
    support: "article",
    date: "2020",
  },
  {
    media: "98,5 FM",
    titre: "Éric Dussault commente la situation du renard",
    url: "https://www.985fm.ca/audio/470628/eric-dusseault-1",
    support: "radio",
  },
  {
    media: "TVRS",
    titre: "Laramée Maintenant, entrevue avec Éric Dussault",
    url: "https://www.tvrs.ca/emissions/laramee-maintenant/a20/episode-125/segment-3",
    support: "television",
  },
];

// Les plus récentes d'abord; celles dont la date est inconnue ferment la
// liste plutôt que de prétendre à une place dans la chronologie.
export function presseTriee() {
  return [...PRESSE].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
