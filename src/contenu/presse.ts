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
    titre: "Éric Dussault, treize ans au secours des animaux en détresse",
    url: "https://goldwaterdroit.com/fr/nouvelles/2022/04/eric-dussault-13-ans-au-secours-des-animaux-en-detresse",
    support: "article",
    date: "2022-04",
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
  {
    media: "Narcity",
    titre: "Vidéos exclusives en immersion du sauvetage du renard au Vieux-Port de Montréal",
    url: "https://www.narcity.com/fr/montreal/videos-exclusives-sauvetage-renard-vieux-port-montreal",
    support: "article",
    date: "2022-03",
  },
  {
    media: "La Presse",
    titre: "Ours en cavale à Dorval: l'intervention des agents de la faune remise en cause",
    url: "https://www.lapresse.ca/actualites/grand-montreal/2021-07-01/ours-en-cavale-a-dorval/l-intervention-des-agents-de-la-faune-remise-en-cause.php",
    support: "article",
    date: "2021-07-01",
  },
  {
    media: "La Presse",
    titre: "L'ours en cavale à Dorval euthanasié",
    url: "https://www.lapresse.ca/actualites/grand-montreal/2021-05-24/l-ours-en-cavale-a-dorval-euthanasie.php",
    support: "article",
    date: "2021-05-24",
  },
  {
    media: "La Presse",
    titre: "Un ourson en cavale à Montréal capturé",
    url: "https://www.lapresse.ca/actualites/grand-montreal/2021-05-23/dorval/un-ourson-en-cavale-a-montreal-capture.php",
    support: "article",
    date: "2021-05-23",
  },
  {
    media: "98,5 FM",
    titre: "Un jeune ours attrapé sur le territoire de l'île de Montréal",
    url: "https://www.985fm.ca/nouvelles/397656/quartier-residentiel-de-dorval-un-jeune-ours-attrape-sur-le-territoire-de-l-ile-de-montreal",
    support: "radio",
    date: "2021-05",
  },
  {
    media: "MétéoMédia",
    titre: "Que faire si on croise un animal sauvage en ville",
    url: "https://www.meteomedia.com/fr/nouvelles/nature/biodiversite/que-faire-si-on-croise-un-animal-sauvage-en-ville",
    support: "article",
  },
  {
    media: "Narcity",
    titre: "Tous les articles consacrés à Sauvetage Animal Rescue",
    url: "https://www.narcity.com/tag/sauvetage-animal-rescue",
    support: "article",
  },
];

// Les plus récentes d'abord; celles dont la date est inconnue ferment la
// liste plutôt que de prétendre à une place dans la chronologie.
export function presseTriee() {
  return [...PRESSE].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
