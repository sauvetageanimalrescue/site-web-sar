import type { Locale } from "@/i18n/routing";

// Traduction publique des codes d'espèce du registre des missions. On ne
// reprend que ce que le public a besoin de lire : la famille pour les
// graphiques, l'espèce précise pour le fil des interventions.
// « Déclaration obligatoire » couvre 80 à 99 d'un seul tenant.

type Trio = Record<Locale, string>;

export const FAMILLES: Record<string, Trio> = {
  "10": { fr: "Animaux domestiques", en: "Domestic animals", es: "Animales domésticos" },
  "20": { fr: "Faune urbaine", en: "Urban wildlife", es: "Fauna urbana" },
  "30": { fr: "Petite faune", en: "Small wildlife", es: "Fauna menor" },
  "40": { fr: "Oiseaux sauvages", en: "Wild birds", es: "Aves silvestres" },
  "50": { fr: "Animaux de ferme", en: "Farm animals", es: "Animales de granja" },
  "60": { fr: "Animaux exotiques", en: "Exotic animals", es: "Animales exóticos" },
  "70": { fr: "Animaux marins", en: "Aquatic animals", es: "Animales acuáticos" },
  "80": { fr: "Grande faune", en: "Large wildlife", es: "Fauna mayor" },
  "00": { fr: "Non précisé", en: "Unspecified", es: "Sin especificar" },
};

export const ESPECES: Record<string, Trio> = {
  "11": { fr: "Chat", en: "Cat", es: "Gato" },
  "12": { fr: "Chien", en: "Dog", es: "Perro" },
  "13": { fr: "Lapin domestique", en: "Domestic rabbit", es: "Conejo doméstico" },
  "14": { fr: "Oiseau domestique", en: "Pet bird", es: "Ave doméstica" },
  "15": { fr: "Rongeur domestique", en: "Pet rodent", es: "Roedor doméstico" },
  "16": { fr: "Reptile", en: "Reptile", es: "Reptil" },
  "17": { fr: "Souris", en: "Mouse", es: "Ratón" },
  "18": { fr: "Rat", en: "Rat", es: "Rata" },
  "19": { fr: "Hérisson", en: "Hedgehog", es: "Erizo" },
  "21": { fr: "Écureuil", en: "Squirrel", es: "Ardilla" },
  "22": { fr: "Raton laveur", en: "Raccoon", es: "Mapache" },
  "23": { fr: "Mouffette", en: "Skunk", es: "Mofeta" },
  "24": { fr: "Marmotte", en: "Groundhog", es: "Marmota" },
  "25": { fr: "Lapin à queue blanche", en: "Cottontail rabbit", es: "Conejo de cola blanca" },
  "26": { fr: "Lièvre", en: "Hare", es: "Liebre" },
  "27": { fr: "Rat musqué", en: "Muskrat", es: "Rata almizclera" },
  "28": { fr: "Castor", en: "Beaver", es: "Castor" },
  "29": { fr: "Tamia", en: "Chipmunk", es: "Ardilla listada" },
  "31": { fr: "Renard roux", en: "Red fox", es: "Zorro rojo" },
  "32": { fr: "Porc-épic", en: "Porcupine", es: "Puercoespín" },
  "33": { fr: "Taupe", en: "Mole", es: "Topo" },
  "34": { fr: "Pékan", en: "Fisher", es: "Marta pescadora" },
  "35": { fr: "Vison", en: "Mink", es: "Visón" },
  "36": { fr: "Polatouche", en: "Flying squirrel", es: "Ardilla voladora" },
  "37": { fr: "Belette", en: "Weasel", es: "Comadreja" },
  "38": { fr: "Hermine", en: "Ermine", es: "Armiño" },
  "39": { fr: "Musaraigne", en: "Shrew", es: "Musaraña" },
  "41": { fr: "Canard", en: "Duck", es: "Pato" },
  "42": { fr: "Bernache", en: "Canada goose", es: "Barnacla canadiense" },
  "43": { fr: "Oie", en: "Goose", es: "Ganso" },
  "44": { fr: "Oie des neiges", en: "Snow goose", es: "Ganso blanco" },
  "45": { fr: "Goéland", en: "Gull", es: "Gaviota" },
  "46": { fr: "Corneille ou corbeau", en: "Crow or raven", es: "Cuervo o corneja" },
  "47": { fr: "Cormoran", en: "Cormorant", es: "Cormorán" },
  "48": { fr: "Huard", en: "Loon", es: "Somormujo" },
  "49": { fr: "Pigeon", en: "Pigeon", es: "Paloma" },
  "51": { fr: "Cochon", en: "Pig", es: "Cerdo" },
  "52": { fr: "Mouton", en: "Sheep", es: "Oveja" },
  "53": { fr: "Vache", en: "Cow", es: "Vaca" },
  "54": { fr: "Cheval", en: "Horse", es: "Caballo" },
  "55": { fr: "Canard domestique", en: "Domestic duck", es: "Pato doméstico" },
  "56": { fr: "Poule ou coq", en: "Chicken", es: "Gallina o gallo" },
  "61": { fr: "Serpent domestique", en: "Pet snake", es: "Serpiente doméstica" },
  "62": { fr: "Serpent sauvage", en: "Wild snake", es: "Serpiente silvestre" },
  "71": { fr: "Loutre", en: "Otter", es: "Nutria" },
  "72": { fr: "Dauphin", en: "Dolphin", es: "Delfín" },
  "73": { fr: "Tortue", en: "Turtle", es: "Tortuga" },
  "74": { fr: "Grenouille", en: "Frog", es: "Rana" },
  "75": { fr: "Poisson", en: "Fish", es: "Pez" },
  "76": { fr: "Phoque", en: "Seal", es: "Foca" },
  "77": { fr: "Baleine", en: "Whale", es: "Ballena" },
  "78": { fr: "Béluga", en: "Beluga", es: "Beluga" },
  "81": { fr: "Boeuf musqué", en: "Muskox", es: "Buey almizclero" },
  "82": { fr: "Carcajou", en: "Wolverine", es: "Glotón" },
  "83": { fr: "Caribou", en: "Caribou", es: "Caribú" },
  "84": { fr: "Cerf de Virginie", en: "White-tailed deer", es: "Ciervo de cola blanca" },
  "85": { fr: "Cougar", en: "Cougar", es: "Puma" },
  "86": { fr: "Coyote", en: "Coyote", es: "Coyote" },
  "87": { fr: "Dindon sauvage", en: "Wild turkey", es: "Pavo salvaje" },
  "88": { fr: "Loup", en: "Wolf", es: "Lobo" },
  "89": { fr: "Lynx du Canada", en: "Canada lynx", es: "Lince canadiense" },
  "90": { fr: "Lynx roux", en: "Bobcat", es: "Lince rojo" },
  "91": { fr: "Opossum", en: "Opossum", es: "Zarigüeya" },
  "92": { fr: "Orignal", en: "Moose", es: "Alce" },
  "93": { fr: "Ours blanc", en: "Polar bear", es: "Oso polar" },
  "94": { fr: "Ours noir", en: "Black bear", es: "Oso negro" },
  "95": { fr: "Renard gris", en: "Gray fox", es: "Zorro gris" },
  "96": { fr: "Oiseau de proie", en: "Bird of prey", es: "Ave rapaz" },
  "98": { fr: "Chauve-souris", en: "Bat", es: "Murciélago" },
  "99": { fr: "Autre animal", en: "Other animal", es: "Otro animal" },
};

// Issue de l'espèce précise si elle est connue, sinon de la famille.
export function libelleEspece(code: string | null, locale: Locale): string {
  if (!code) return FAMILLES["00"][locale];
  return (
    ESPECES[code]?.[locale] ??
    FAMILLES[familleDeEspece(code)]?.[locale] ??
    FAMILLES["00"][locale]
  );
}

export function familleDeEspece(code: string | null): string {
  if (!code || !/^\d{2}$/.test(code)) return "00";
  if (code >= "80") return "80";
  return `${code[0]}0`;
}

export function libelleFamille(code: string, locale: Locale): string {
  return FAMILLES[code]?.[locale] ?? FAMILLES["00"][locale];
}

// Dénouements publiables : ce sont les seuls codes que le registre expose.
export const CODES_FIN: Record<string, Trio> = {
  "10-70": {
    fr: "Capturé et sécurisé",
    en: "Captured and secured",
    es: "Capturado y asegurado",
  },
  "10-71": {
    fr: "Remis au propriétaire",
    en: "Returned to owner",
    es: "Devuelto al propietario",
  },
  "10-72": {
    fr: "Libéré sur place",
    en: "Released on site",
    es: "Liberado en el lugar",
  },
  "10-73": {
    fr: "Relocalisé et libéré",
    en: "Relocated and released",
    es: "Reubicado y liberado",
  },
  "10-74": {
    fr: "Remis au service animalier",
    en: "Transferred to animal services",
    es: "Entregado al servicio animal",
  },
  "10-75": {
    fr: "Remis au refuge",
    en: "Transferred to a shelter",
    es: "Entregado al refugio",
  },
};

export function libelleCodeFin(code: string | null, locale: Locale): string {
  if (!code) return "";
  return CODES_FIN[code]?.[locale] ?? "";
}
