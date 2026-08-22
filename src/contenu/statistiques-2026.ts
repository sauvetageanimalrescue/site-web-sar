// Statistiques réelles de l'année 2026, du premier janvier au 21 août.
//
// Source : le registre des missions (janvier au 2 août) complété par la
// reconstruction du fil de répartition WhatsApp (3 au 21 août). Aucune valeur
// n'est inventée : chaque nombre vient des 424 missions du fichier consolidé.
//
// Ces chiffres sont figés. Ils seront remplacés par les données de l'intranet
// lorsque celui-ci entrera en service, le premier octobre 2026.

export type Mesure = { libelle: string; valeur: number };

export const PERIODE = "1er janvier au 21 août 2026";
export const TOTAL_MISSIONS = 424;
// Calculé sur le fichier consolidé avec la définition du compteur du site :
// missions closes par un code 10-70 à 10-75, moins les décès.
export const ANIMAUX_SECOURUS = 370;
export const MISSIONS_REUSSIES = 246;
// Le taux exclut les missions dont le code de fin est inconnu ou en cours.
export const MISSIONS_AVEC_ISSUE_CONNUE = 413;
export const SUR_TERRITOIRE = 405;

export const MISSIONS_PAR_MOIS = [
  {
    "libelle": "janvier",
    "valeur": 11
  },
  {
    "libelle": "février",
    "valeur": 18
  },
  {
    "libelle": "mars",
    "valeur": 33
  },
  {
    "libelle": "avril",
    "valeur": 59
  },
  {
    "libelle": "mai",
    "valeur": 58
  },
  {
    "libelle": "juin",
    "valeur": 82
  },
  {
    "libelle": "juillet",
    "valeur": 95
  },
  {
    "libelle": "août",
    "valeur": 68
  }
];

export const PAR_FAMILLE = [
  {
    "libelle": "Mammifère sauvage",
    "valeur": 207
  },
  {
    "libelle": "Oiseau sauvage",
    "valeur": 146
  },
  {
    "libelle": "Animal domestique",
    "valeur": 67
  },
  {
    "libelle": "Non codé",
    "valeur": 2
  },
  {
    "libelle": "Autre / déclaration",
    "valeur": 1
  },
  {
    "libelle": "Reptile/amphibien sauvage",
    "valeur": 1
  }
];

export const PAR_ESPECE = [
  {
    "libelle": "Raton laveur",
    "valeur": 80
  },
  {
    "libelle": "Chat",
    "valeur": 60
  },
  {
    "libelle": "Moufette",
    "valeur": 53
  },
  {
    "libelle": "Bernache",
    "valeur": 40
  },
  {
    "libelle": "Canard",
    "valeur": 27
  },
  {
    "libelle": "Oiseaux sauvage",
    "valeur": 26
  },
  {
    "libelle": "Ecureuil",
    "valeur": 23
  },
  {
    "libelle": "Goéland",
    "valeur": 18
  },
  {
    "libelle": "Pigeon",
    "valeur": 15
  },
  {
    "libelle": "Marmotte",
    "valeur": 14
  },
  {
    "libelle": "Lapin queue blanche",
    "valeur": 9
  },
  {
    "libelle": "Renard roux",
    "valeur": 8
  }
];

export const PAR_ISSUE = [
  {
    "libelle": "Animal secouru (capturé, remis, libéré, relocalisé, vétérinaire)",
    "valeur": 247
  },
  {
    "libelle": "Animal non trouvé / enfui / inatteignable / libéré seul",
    "valeur": 74
  },
  {
    "libelle": "Animal décédé ou euthanasié",
    "valeur": 44
  },
  {
    "libelle": "Pas en détresse / fausse alerte",
    "valeur": 25
  },
  {
    "libelle": "Mission annulée / impossible",
    "valeur": 14
  },
  {
    "libelle": "Code inconnu ou en cours",
    "valeur": 11
  },
  {
    "libelle": "Citoyens ou autre service ont procédé",
    "valeur": 9
  }
];

export const PAR_ETAT = [
  {
    "libelle": "Pris",
    "valeur": 122
  },
  {
    "libelle": "Blessé",
    "valeur": 111
  },
  {
    "libelle": "Questionable",
    "valeur": 49
  },
  {
    "libelle": "Agonisant",
    "valeur": 33
  },
  {
    "libelle": "Orphelin",
    "valeur": 29
  },
  {
    "libelle": "Malade",
    "valeur": 17
  },
  {
    "libelle": "Confiné à l'intérieur",
    "valeur": 6
  },
  {
    "libelle": "Décédé",
    "valeur": 6
  }
];

export const PAR_REGION = [
  {
    "libelle": "Montréal",
    "valeur": 231
  },
  {
    "libelle": "Montérégie",
    "valeur": 66
  },
  {
    "libelle": "Laval",
    "valeur": 55
  },
  {
    "libelle": "Laurentides",
    "valeur": 37
  },
  {
    "libelle": "Lanaudière",
    "valeur": 33
  },
  {
    "libelle": "Capitale-nationale",
    "valeur": 1
  }
];

export const PAR_MUNICIPALITE = [
  {
    "libelle": "Montréal",
    "valeur": 206
  },
  {
    "libelle": "Laval",
    "valeur": 56
  },
  {
    "libelle": "Longueuil",
    "valeur": 14
  },
  {
    "libelle": "Repentigny",
    "valeur": 10
  },
  {
    "libelle": "Terrebonne",
    "valeur": 9
  },
  {
    "libelle": "Richelieu",
    "valeur": 8
  },
  {
    "libelle": "Brossard",
    "valeur": 6
  },
  {
    "libelle": "Mirabel",
    "valeur": 6
  },
  {
    "libelle": "Dorval",
    "valeur": 6
  },
  {
    "libelle": "Blainville",
    "valeur": 6
  }
];

export const PAR_LIEU = [
  {
    "libelle": "Déjà capturé",
    "valeur": 38
  },
  {
    "libelle": "Routes, municipal, rue",
    "valeur": 24
  },
  {
    "libelle": "Nature, arbre public",
    "valeur": 21
  },
  {
    "libelle": "Structures extérieures, balcon",
    "valeur": 19
  },
  {
    "libelle": "Copropriétés, cours intérieure",
    "valeur": 19
  },
  {
    "libelle": "Terrains, résidentiel arrière",
    "valeur": 17
  },
  {
    "libelle": "Nature et parcs, nature",
    "valeur": 16
  },
  {
    "libelle": "Terrains, résidentiel avant",
    "valeur": 13
  }
];

export const PAR_DEMANDEUR = [
  {
    "libelle": "Témoin",
    "valeur": 241
  },
  {
    "libelle": "Propriétaire des lieux",
    "valeur": 138
  },
  {
    "libelle": "Propriétaire de l’animal",
    "valeur": 17
  },
  {
    "libelle": "Port de Montréal mgt",
    "valeur": 9
  },
  {
    "libelle": "Travaux public ou parc",
    "valeur": 4
  },
  {
    "libelle": "Entreprise",
    "valeur": 4
  },
  {
    "libelle": "Refuge de la faune",
    "valeur": 3
  }
];

export const PAR_JOUR = [
  {
    "libelle": "lundi",
    "valeur": 49
  },
  {
    "libelle": "mardi",
    "valeur": 51
  },
  {
    "libelle": "mercredi",
    "valeur": 53
  },
  {
    "libelle": "jeudi",
    "valeur": 49
  },
  {
    "libelle": "vendredi",
    "valeur": 71
  },
  {
    "libelle": "samedi",
    "valeur": 76
  },
  {
    "libelle": "dimanche",
    "valeur": 75
  }
];

export const PAR_HEURE = [
  {
    "libelle": "Nuit de 0 h à 5 h",
    "valeur": 18
  },
  {
    "libelle": "Matin de 6 h à 11 h",
    "valeur": 90
  },
  {
    "libelle": "Après-midi de 12 h à 17 h",
    "valeur": 156
  },
  {
    "libelle": "Soir de 18 h à 23 h",
    "valeur": 160
  }
];
