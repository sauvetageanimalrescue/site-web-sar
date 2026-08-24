import type { Locale } from "@/i18n/routing";

// Traduction publique des codes d'espèce 2027 du registre des missions
// (3 chiffres). On ne reprend que ce que le public a besoin de lire : la
// famille pour les graphiques, l'espèce précise pour le fil des
// interventions.

type Trio = Record<Locale, string>;

export const FAMILLES: Record<string, Trio> = {
  "000": { fr: "Non précisé", en: "Unspecified", es: "Sin especificar" },
  "100": { fr: "Animaux domestiques", en: "Domestic animals", es: "Animales domésticos" },
  "200": { fr: "Mammifères sauvages", en: "Wild mammals", es: "Mamíferos silvestres" },
  "300": { fr: "Oiseaux sauvages", en: "Wild birds", es: "Aves silvestres" },
  "400": { fr: "Animaux de ferme", en: "Farm animals", es: "Animales de granja" },
  "500": { fr: "Reptiles et amphibiens", en: "Reptiles and amphibians", es: "Reptiles y anfibios" },
  "600": { fr: "Faune aquatique et marine", en: "Aquatic and marine wildlife", es: "Fauna acuática y marina" },
  "700": { fr: "Animaux exotiques ou inhabituels", en: "Exotic or unusual animals", es: "Animales exóticos o inusuales" },
  "800": { fr: "Oiseaux de proie", en: "Birds of prey", es: "Aves rapaces" },
  "900": { fr: "Animaux à déclaration obligatoire", en: "Animals requiring mandatory reporting", es: "Animales de declaración obligatoria" },
};

export const ESPECES: Record<string, Trio> = {
  // Animaux domestiques
  "101": { fr: "Chat", en: "Cat", es: "Gato" },
  "102": { fr: "Chien", en: "Dog", es: "Perro" },
  "103": { fr: "Lapin domestique", en: "Domestic rabbit", es: "Conejo doméstico" },
  "104": { fr: "Furet", en: "Ferret", es: "Hurón" },
  "105": { fr: "Rongeur domestique", en: "Pet rodent", es: "Roedor doméstico" },
  "106": { fr: "Hérisson domestique", en: "Pet hedgehog", es: "Erizo doméstico" },
  "121": { fr: "Perroquet / Perruche", en: "Parrot / Parakeet", es: "Loro / Perico" },
  "131": { fr: "Serpent domestique", en: "Pet snake", es: "Serpiente doméstica" },
  "132": { fr: "Lézard domestique", en: "Pet lizard", es: "Lagarto doméstico" },
  "133": { fr: "Tortue domestique", en: "Pet turtle", es: "Tortuga doméstica" },
  "199": { fr: "Autre animal domestique", en: "Other domestic animal", es: "Otro animal doméstico" },

  // Mammifères sauvages
  "201": { fr: "Écureuil gris / noir", en: "Gray / black squirrel", es: "Ardilla gris / negra" },
  "202": { fr: "Écureuil roux", en: "Red squirrel", es: "Ardilla roja" },
  "203": { fr: "Tamia", en: "Chipmunk", es: "Ardilla listada" },
  "204": { fr: "Raton laveur", en: "Raccoon", es: "Mapache" },
  "205": { fr: "Moufette", en: "Skunk", es: "Mofeta" },
  "206": { fr: "Marmotte", en: "Groundhog", es: "Marmota" },
  "207": { fr: "Lapin à queue blanche", en: "Cottontail rabbit", es: "Conejo de cola blanca" },
  "208": { fr: "Lièvre", en: "Hare", es: "Liebre" },
  "209": { fr: "Rat musqué", en: "Muskrat", es: "Rata almizclera" },
  "210": { fr: "Castor", en: "Beaver", es: "Castor" },
  "211": { fr: "Porc-épic", en: "Porcupine", es: "Puercoespín" },
  "212": { fr: "Renard roux", en: "Red fox", es: "Zorro rojo" },
  "213": { fr: "Pékan", en: "Fisher", es: "Marta pescadora" },
  "214": { fr: "Vison / Belette / Hermine", en: "Mink / Weasel / Ermine", es: "Visón / Comadreja / Armiño" },
  "215": { fr: "Loutre", en: "Otter", es: "Nutria" },
  "216": { fr: "Souris / Rat sauvage", en: "Mouse / Wild rat", es: "Ratón / Rata silvestre" },
  "217": { fr: "Chauve-souris", en: "Bat", es: "Murciélago" },
  "218": { fr: "Taupe / Musaraigne", en: "Mole / Shrew", es: "Topo / Musaraña" },
  "299": { fr: "Autre mammifère sauvage", en: "Other wild mammal", es: "Otro mamífero silvestre" },

  // Oiseaux sauvages
  "301": { fr: "Canard sauvage", en: "Wild duck", es: "Pato silvestre" },
  "302": { fr: "Bernache", en: "Canada goose", es: "Barnacla canadiense" },
  "303": { fr: "Oie sauvage", en: "Wild goose", es: "Ganso silvestre" },
  "304": { fr: "Oie des neiges", en: "Snow goose", es: "Ganso blanco" },
  "305": { fr: "Goéland", en: "Gull", es: "Gaviota" },
  "306": { fr: "Corneille / Corbeau", en: "Crow / Raven", es: "Corneja / Cuervo" },
  "307": { fr: "Cormoran", en: "Cormorant", es: "Cormorán" },
  "308": { fr: "Huard", en: "Loon", es: "Somormujo" },
  "309": { fr: "Pigeon", en: "Pigeon", es: "Paloma" },
  "310": { fr: "Tourterelle", en: "Dove", es: "Tórtola" },
  "311": { fr: "Héron", en: "Heron", es: "Garza" },
  "312": { fr: "Aigrette", en: "Egret", es: "Garceta" },
  "313": { fr: "Pic / Pic-bois", en: "Woodpecker", es: "Pájaro carpintero" },
  "314": { fr: "Petit oiseau / Passereau", en: "Small bird / Songbird", es: "Ave pequeña / Pájaro cantor" },
  "399": { fr: "Autre oiseau sauvage", en: "Other wild bird", es: "Otra ave silvestre" },

  // Animaux de ferme
  "401": { fr: "Bovin", en: "Cattle", es: "Bovino" },
  "402": { fr: "Cheval / Poney", en: "Horse / Pony", es: "Caballo / Poni" },
  "403": { fr: "Âne / Mule", en: "Donkey / Mule", es: "Burro / Mula" },
  "404": { fr: "Cochon", en: "Pig", es: "Cerdo" },
  "405": { fr: "Mouton / Chèvre", en: "Sheep / Goat", es: "Oveja / Cabra" },
  "406": { fr: "Alpaga / Lama", en: "Alpaca / Llama", es: "Alpaca / Llama" },
  "407": { fr: "Poule / Coq / Volaille", en: "Chicken / Poultry", es: "Gallina / Gallo / Aves de corral" },
  "408": { fr: "Canard / Oie domestique", en: "Domestic duck / Goose", es: "Pato / Ganso doméstico" },
  "499": { fr: "Autre animal de ferme", en: "Other farm animal", es: "Otro animal de granja" },

  // Reptiles et amphibiens
  "501": { fr: "Tortue sauvage", en: "Wild turtle", es: "Tortuga silvestre" },
  "502": { fr: "Couleuvre / Serpent sauvage", en: "Wild snake", es: "Serpiente silvestre" },
  "503": { fr: "Grenouille / Rainette / Crapaud", en: "Frog / Tree frog / Toad", es: "Rana / Rana arborícola / Sapo" },
  "504": { fr: "Salamandre / Triton", en: "Salamander / Newt", es: "Salamandra / Tritón" },
  "599": { fr: "Autre reptile / amphibien sauvage", en: "Other wild reptile / amphibian", es: "Otro reptil / anfibio silvestre" },

  // Faune aquatique et marine
  "601": { fr: "Poisson", en: "Fish", es: "Pez" },
  "602": { fr: "Phoque", en: "Seal", es: "Foca" },
  "603": { fr: "Baleine", en: "Whale", es: "Ballena" },
  "699": { fr: "Autre animal aquatique / marin", en: "Other aquatic / marine animal", es: "Otro animal acuático / marino" },

  // Animaux exotiques ou inhabituels
  "701": { fr: "Kangourou / Wallaby", en: "Kangaroo / Wallaby", es: "Canguro / Wallaby" },
  "702": { fr: "Primate", en: "Primate", es: "Primate" },
  "703": { fr: "Félin exotique", en: "Exotic feline", es: "Felino exótico" },
  "704": { fr: "Canidé exotique", en: "Exotic canine", es: "Cánido exótico" },
  "705": { fr: "Reptile exotique", en: "Exotic reptile", es: "Reptil exótico" },
  "706": { fr: "Oiseau exotique", en: "Exotic bird", es: "Ave exótica" },
  "799": { fr: "Autre animal exotique / inhabituel", en: "Other exotic / unusual animal", es: "Otro animal exótico / inusual" },

  // Oiseaux de proie
  "801": { fr: "Crécerelle d'Amérique", en: "American kestrel", es: "Cernícalo americano" },
  "802": { fr: "Faucon", en: "Falcon", es: "Halcón" },
  "803": { fr: "Épervier brun", en: "Sharp-shinned hawk", es: "Gavilán pechirrufo" },
  "804": { fr: "Épervier de Cooper", en: "Cooper's hawk", es: "Gavilán de Cooper" },
  "805": { fr: "Buse à queue rousse", en: "Red-tailed hawk", es: "Aguililla colirroja" },
  "806": { fr: "Aigle royal", en: "Golden eagle", es: "Águila real" },
  "807": { fr: "Pygargue à tête blanche", en: "Bald eagle", es: "Águila calva" },
  "808": { fr: "Balbuzard pêcheur", en: "Osprey", es: "Águila pescadora" },
  "809": { fr: "Urubu à tête rouge", en: "Turkey vulture", es: "Zopilote aura" },
  "810": { fr: "Grand-duc d'Amérique", en: "Great horned owl", es: "Búho cornudo" },
  "811": { fr: "Harfang des neiges", en: "Snowy owl", es: "Búho nival" },
  "812": { fr: "Chouette rayée", en: "Barred owl", es: "Cárabo norteamericano" },
  "813": { fr: "Chouette lapone", en: "Great grey owl", es: "Cárabo lapón" },
  "814": { fr: "Chouette épervière", en: "Northern hawk owl", es: "Cárabo gavilán" },
  "815": { fr: "Petite Nyctale", en: "Northern saw-whet owl", es: "Mochuelo cabezón boreal" },
  "816": { fr: "Petit-duc maculé", en: "Eastern screech owl", es: "Autillo americano" },
  "817": { fr: "Hibou moyen-duc", en: "Long-eared owl", es: "Búho chico" },
  "818": { fr: "Hibou des marais", en: "Short-eared owl", es: "Búho campestre" },
  "899": { fr: "Autre oiseau de proie", en: "Other bird of prey", es: "Otra ave rapaz" },

  // Animaux à déclaration obligatoire
  "901": { fr: "Bœuf musqué", en: "Muskox", es: "Buey almizclero" },
  "902": { fr: "Carcajou", en: "Wolverine", es: "Glotón" },
  "903": { fr: "Caribou", en: "Caribou", es: "Caribú" },
  "904": { fr: "Cerf de Virginie", en: "White-tailed deer", es: "Ciervo de cola blanca" },
  "905": { fr: "Cougar", en: "Cougar", es: "Puma" },
  "906": { fr: "Coyote / Hybride", en: "Coyote / Hybrid", es: "Coyote / Híbrido" },
  "907": { fr: "Dindon sauvage", en: "Wild turkey", es: "Pavo salvaje" },
  "908": { fr: "Loup / Hybride", en: "Wolf / Hybrid", es: "Lobo / Híbrido" },
  "909": { fr: "Lynx du Canada", en: "Canada lynx", es: "Lince canadiense" },
  "910": { fr: "Lynx roux", en: "Bobcat", es: "Lince rojo" },
  "911": { fr: "Opossum d'Amérique", en: "Virginia opossum", es: "Zarigüeya de Virginia" },
  "912": { fr: "Orignal", en: "Moose", es: "Alce" },
  "913": { fr: "Ours blanc", en: "Polar bear", es: "Oso polar" },
  "914": { fr: "Ours noir", en: "Black bear", es: "Oso negro" },
  "915": { fr: "Renard gris", en: "Gray fox", es: "Zorro gris" },

  "999": { fr: "Autre animal", en: "Other animal", es: "Otro animal" },
};

// Issue de l'espèce précise si elle est connue, sinon de la famille.
export function libelleEspece(code: string | null, locale: Locale): string {
  if (!code) return FAMILLES["000"][locale];
  return (
    ESPECES[code]?.[locale] ??
    FAMILLES[familleDeEspece(code)]?.[locale] ??
    FAMILLES["000"][locale]
  );
}

export function familleDeEspece(code: string | null): string {
  if (!code || !/^\d{3}$/.test(code)) return "000";
  return `${code[0]}00`;
}

export function libelleFamille(code: string, locale: Locale): string {
  return FAMILLES[code]?.[locale] ?? FAMILLES["000"][locale];
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
