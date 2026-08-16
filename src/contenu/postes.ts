import type { Locale } from "@/i18n/routing";

// Descriptions des cinq postes bénévoles. Contenu éditorial long : il vit ici
// plutôt que dans messages/*.json, qui reste réservé à l'interface.

export type Poste = {
  cle: "repartiteur" | "messager" | "eclaireur" | "secouriste" | "sauveteur";
  niveau: string | null;
  image: string;
};

export const POSTES: Poste[] = [
  { cle: "repartiteur", niveau: "EGS", image: "/images/poste-repartiteur.jpg" },
  { cle: "messager", niveau: null, image: "/images/poste-messager.jpg" },
  { cle: "secouriste", niveau: null, image: "/images/poste-secouriste.jpg" },
  { cle: "sauveteur", niveau: null, image: "/images/poste-sauveteur.jpg" },
];

type Fiche = {
  titre: string;
  resume: string;
  description: string;
  taches: string[];
  avantages: string[];
  profil: string[];
};

type Textes = Record<Poste["cle"], Fiche>;

const FR: Textes = {
  repartiteur: {
    titre: "Répartiteur·trice",
    resume: "La première voix qu'entend un citoyen. Entièrement à distance.",
    description:
      "Chaque jour, des citoyens contactent Sauvetage Animal Rescue pour signaler un animal en détresse. Avant qu'une équipe intervienne sur le terrain, quelqu'un doit recueillir l'information, comprendre la situation et la transmettre rapidement aux bonnes personnes. C'est le rôle de l'Équipe de gestion des signalements. Ce poste se fait entièrement à distance, ce qui permet de contribuer aux sauvetages sans être sur le terrain. Aucune expérience préalable n'est requise : une formation est offerte pour maîtriser les outils et les procédures internes.",
    taches: [
      "Recueillir les signalements",
      "Écouter la messagerie vocale",
      "Lire la messagerie Messenger",
      "Prendre les courriels",
      "Communiquer avec les citoyens",
      "Prendre des notes au registre",
      "Utiliser les communications radio",
      "Assurer la liaison avec les équipes",
    ],
    avantages: [
      "Télétravail",
      "Aucune limite territoriale",
      "Horaires flexibles",
      "Implication sporadique",
      "Aucun minimum d'implication",
      "Pas besoin de voiture",
    ],
    profil: [
      "Ordinateur de bureau ou portable",
      "Téléphone cellulaire",
      "18 ans minimum",
      "Bonne communication orale et écrite",
      "Calme et réactivité",
      "Connaissance de base des animaux",
      "Bilinguisme, un atout",
    ],
  },
  messager: {
    titre: "Messager·ère",
    resume: "Le transport des animaux vers les refuges partenaires.",
    description:
      "Le transport des animaux vers les refuges partenaires libère les équipes de patrouille et de sauvetage, qui peuvent répondre plus vite à un autre appel. Comme plusieurs refuges sont en périphérie de Montréal, cette contribution logistique améliore directement notre efficacité sur le terrain. Chaque mission de transport est une étape clé de la chaîne de sauvetage : pendant qu'un animal est conduit en sécurité, une autre vie peut être secourue ailleurs. Ce rôle convient à celles et ceux qui veulent s'impliquer de façon flexible et ponctuelle.",
    taches: [
      "Transporter des animaux vers les refuges partenaires",
      "Rejoindre une équipe sur le terrain pour assurer le relais",
      "Appliquer les consignes médicales ou opérationnelles",
    ],
    avantages: [
      "Horaire flexible",
      "Implication ponctuelle et accessible",
      "Rôle concret et valorisant",
    ],
    profil: [
      "18 ans minimum",
      "Accès à un véhicule",
      "Téléphone cellulaire",
      "Permis de conduire valide",
    ],
  },
  eclaireur: {
    titre: "Éclaireur ou éclaireuse",
    resume: "Les yeux de l'organisation, avant l'intervention.",
    description:
      "L'éclaireur est le premier maillon du terrain. Il se rend sur les lieux d'un signalement pour valider la situation avant qu'une équipe complète soit mobilisée : l'animal est-il toujours là, dans quel état, à quelle hauteur, quels sont les accès et les dangers ? Cette évaluation évite de déplacer inutilement une équipe de sauvetage technique et permet d'arriver avec le bon équipement du premier coup. C'est un poste d'entrée idéal pour découvrir le terrain sans avoir à manipuler un animal.",
    taches: [
      "Se rendre sur les lieux d'un signalement",
      "Confirmer la présence et l'état de l'animal",
      "Documenter les accès, les hauteurs et les risques",
      "Transmettre photos et informations à la centrale",
      "Rassurer et informer le citoyen sur place",
    ],
    avantages: [
      "Porte d'entrée vers les postes de terrain",
      "Aucune manipulation d'animal exigée",
      "Formation et encadrement fournis",
      "Implication ponctuelle possible",
    ],
    profil: [
      "18 ans minimum",
      "Accès à un véhicule et à un téléphone cellulaire",
      "Sens de l'observation",
      "Capacité à suivre les consignes",
    ],
  },
  secouriste: {
    titre: "Secouriste",
    resume: "Au coeur des opérations de terrain, tous les jours.",
    description:
      "Le patrouilleur répond aux signalements venant des citoyens, des services animaliers, de nos partenaires ou des services d'urgence. Son rôle est d'intervenir dans les situations où l'animal peut être récupéré sans équipe de sauvetage technique. Les patrouilles couvrent une grande variété d'interventions, de la simple cueillette au sol jusqu'à la récupération sécuritaire d'un animal réactif à l'aide d'équipement spécialisé. Un poste pour celles et ceux qui veulent s'impliquer activement, dans une structure bien organisée.",
    taches: [
      "Répondre aux appels de patrouille",
      "Sécuriser et transporter les animaux",
      "Appliquer les consignes opérationnelles",
      "Communiquer avec la centrale par radio",
      "Documenter chaque mission au registre",
    ],
    avantages: [
      "Rôle unique et valorisant sur le terrain",
      "Travail d'équipe structuré",
      "Encadrement et formation continue",
      "Contribution directe au sauvetage d'animaux",
    ],
    profil: [
      "18 ans minimum",
      "Accès à un véhicule et à un téléphone cellulaire",
      "Autonomie et capacité à suivre les consignes",
      "Bonne condition physique",
    ],
  },
  sauveteur: {
    titre: "Sauveteur·euse",
    resume: "Le secours technique : hauteur, glace, espace clos.",
    description:
      "Le sauveteur intervient là où une patrouille ne peut pas aller : un chat à quinze mètres dans un arbre, un raton laveur au fond d'une cheminée, un chien sur une glace instable, une bernache prise dans un pilier de pont. Ces interventions demandent des techniques de travail en hauteur, du matériel de cordage certifié et une discipline de sécurité stricte. C'est le poste le plus exigeant de l'organisation, accessible après un parcours de formation interne et une progression depuis la patrouille.",
    taches: [
      "Intervenir en hauteur, sur glace ou en espace clos",
      "Monter et vérifier les systèmes de cordage",
      "Capturer et sécuriser un animal en milieu périlleux",
      "Appliquer les procédures de santé et sécurité",
      "Tenir à jour le registre des cordes de sauvetage",
    ],
    avantages: [
      "Formations techniques payées par l'organisation",
      "Équipement de protection fourni",
      "Progression interne reconnue",
      "Interventions que personne d'autre ne fait au Québec",
    ],
    profil: [
      "18 ans minimum",
      "Aucun vertige, bonne condition physique",
      "Rigueur absolue sur les consignes de sécurité",
      "Disponibilité récurrente",
      "Expérience en hauteur ou en secours, un atout",
    ],
  },
};

const EN: Textes = {
  repartiteur: {
    titre: "Dispatcher",
    resume: "The first voice a caller hears. Fully remote.",
    description:
      "Every day, people contact Sauvetage Animal Rescue to report an animal in distress. Before a team goes out, someone has to gather the information, understand the situation and pass it quickly to the right people. That is the job of the reporting management team. The role is fully remote, so you can contribute to rescues without being in the field. No prior experience is required: training is provided on our internal tools and procedures.",
    taches: [
      "Collect incoming reports",
      "Listen to voicemail",
      "Read Messenger conversations",
      "Handle incoming email",
      "Speak with citizens",
      "Log notes in the registry",
      "Use radio communications",
      "Liaise with field teams",
    ],
    avantages: [
      "Work from home",
      "No territorial limits",
      "Flexible hours",
      "Occasional involvement",
      "No minimum commitment",
      "No car needed",
    ],
    profil: [
      "Desktop or laptop computer",
      "Mobile phone",
      "18 years old minimum",
      "Clear spoken and written communication",
      "Calm and responsive under pressure",
      "Basic knowledge of animals",
      "Bilingualism an asset",
    ],
  },
  messager: {
    titre: "Courier",
    resume: "Transporting animals to partner shelters.",
    description:
      "Driving animals to partner shelters frees up patrol and rescue teams to answer the next call faster. Since many shelters sit on the edges of the Montréal area, this logistical contribution directly improves our field efficiency. Every transport run is a key link in the rescue chain: while one animal is driven to safety, another life can be saved elsewhere. The role suits people who want to help on a flexible, occasional basis.",
    taches: [
      "Drive animals to partner shelters",
      "Meet a field team to take over transport",
      "Follow medical or operational instructions",
    ],
    avantages: [
      "Flexible schedule",
      "Occasional and accessible involvement",
      "A concrete, rewarding role",
    ],
    profil: [
      "18 years old minimum",
      "Access to a vehicle",
      "Mobile phone",
      "Valid driver's licence",
    ],
  },
  eclaireur: {
    titre: "Scout",
    resume: "The organization's eyes, ahead of the intervention.",
    description:
      "The scout is the first field link. They go to the reported location to confirm the situation before a full team is mobilized: is the animal still there, in what condition, how high up, what are the access routes and hazards? This assessment avoids sending a technical rescue team out for nothing and means arriving with the right equipment the first time. It is an ideal entry role to discover field work without handling an animal.",
    taches: [
      "Travel to the reported location",
      "Confirm the animal's presence and condition",
      "Document access, heights and hazards",
      "Send photos and details to dispatch",
      "Reassure and inform the person on site",
    ],
    avantages: [
      "Gateway to the field positions",
      "No animal handling required",
      "Training and supervision provided",
      "Occasional involvement possible",
    ],
    profil: [
      "18 years old minimum",
      "Access to a vehicle and a mobile phone",
      "Sharp observation skills",
      "Able to follow instructions",
    ],
  },
  secouriste: {
    titre: "First responder",
    resume: "At the heart of daily field operations.",
    description:
      "Patrollers answer reports from citizens, municipal animal services, our partners and emergency services. Their role is to handle situations where the animal can be recovered without a technical rescue team. Patrols cover a wide range of calls, from a simple ground pickup to safely capturing a reactive animal with specialized equipment. A role for those who want to be actively involved, within a well-organized structure.",
    taches: [
      "Answer patrol calls",
      "Secure and transport animals",
      "Follow operational instructions",
      "Communicate with dispatch by radio",
      "Document every mission in the registry",
    ],
    avantages: [
      "A unique, rewarding field role",
      "Structured teamwork",
      "Supervision and ongoing training",
      "Direct contribution to saving animals",
    ],
    profil: [
      "18 years old minimum",
      "Access to a vehicle and a mobile phone",
      "Autonomy and ability to follow instructions",
      "Good physical condition",
    ],
  },
  sauveteur: {
    titre: "Rescuer",
    resume: "Technical rescue: heights, ice, confined spaces.",
    description:
      "Rescuers go where a patrol cannot: a cat fifteen metres up a tree, a raccoon at the bottom of a chimney, a dog on unstable ice, a goose caught in a bridge pier. These calls demand rope access techniques, certified hardware and strict safety discipline. It is the most demanding position in the organization, reached after internal training and progression from patrol.",
    taches: [
      "Operate at height, on ice or in confined spaces",
      "Build and check rope systems",
      "Capture and secure animals in hazardous settings",
      "Apply health and safety procedures",
      "Keep the rescue rope registry up to date",
    ],
    avantages: [
      "Technical training paid by the organization",
      "Protective equipment provided",
      "Recognized internal progression",
      "Interventions nobody else performs in Québec",
    ],
    profil: [
      "18 years old minimum",
      "No fear of heights, good physical condition",
      "Absolute rigour on safety procedures",
      "Recurring availability",
      "Height or rescue experience an asset",
    ],
  },
};

const ES: Textes = {
  repartiteur: {
    titre: "Despachador·a",
    resume: "La primera voz que oye un ciudadano. Totalmente a distancia.",
    description:
      "Cada día, ciudadanos contactan a Sauvetage Animal Rescue para avisar de un animal en peligro. Antes de que un equipo salga al terreno, alguien debe recoger la información, entender la situación y transmitirla rápidamente a las personas adecuadas. Ese es el papel del equipo de gestión de avisos. El puesto es totalmente a distancia, lo que permite contribuir a los rescates sin estar en el terreno. No se requiere experiencia previa: se ofrece formación sobre las herramientas y los procedimientos internos.",
    taches: [
      "Recoger los avisos",
      "Escuchar el buzón de voz",
      "Leer los mensajes de Messenger",
      "Atender los correos electrónicos",
      "Comunicarse con los ciudadanos",
      "Tomar notas en el registro",
      "Usar las comunicaciones por radio",
      "Enlazar con los equipos de campo",
    ],
    avantages: [
      "Teletrabajo",
      "Sin límite territorial",
      "Horarios flexibles",
      "Participación esporádica",
      "Sin compromiso mínimo",
      "No hace falta coche",
    ],
    profil: [
      "Ordenador de sobremesa o portátil",
      "Teléfono móvil",
      "18 años como mínimo",
      "Buena comunicación oral y escrita",
      "Calma y capacidad de reacción",
      "Conocimientos básicos de animales",
      "Bilingüismo, una ventaja",
    ],
  },
  messager: {
    titre: "Mensajero·a",
    resume: "El transporte de animales a los refugios asociados.",
    description:
      "Llevar a los animales a los refugios asociados libera a los equipos de patrulla y rescate, que pueden atender antes otra llamada. Como varios refugios están en la periferia de Montreal, esta aportación logística mejora directamente nuestra eficacia sobre el terreno. Cada traslado es un eslabón clave de la cadena de rescate: mientras se lleva a un animal a lugar seguro, se puede salvar otra vida en otro sitio. Un papel para quien quiera implicarse de forma flexible y puntual.",
    taches: [
      "Transportar animales a los refugios asociados",
      "Reunirse con un equipo en el terreno para el relevo",
      "Aplicar las indicaciones médicas u operativas",
    ],
    avantages: [
      "Horario flexible",
      "Participación puntual y accesible",
      "Un papel concreto y gratificante",
    ],
    profil: [
      "18 años como mínimo",
      "Acceso a un vehículo",
      "Teléfono móvil",
      "Licencia de conducir vigente",
    ],
  },
  eclaireur: {
    titre: "Explorador o exploradora",
    resume: "Los ojos de la organización, antes de la intervención.",
    description:
      "El explorador es el primer eslabón sobre el terreno. Acude al lugar del aviso para validar la situación antes de movilizar a un equipo completo: ¿sigue ahí el animal, en qué estado, a qué altura, cuáles son los accesos y los peligros? Esta evaluación evita desplazar sin necesidad a un equipo de rescate técnico y permite llegar con el equipo adecuado a la primera. Es un puesto de entrada ideal para descubrir el terreno sin manipular animales.",
    taches: [
      "Acudir al lugar del aviso",
      "Confirmar la presencia y el estado del animal",
      "Documentar accesos, alturas y riesgos",
      "Enviar fotos e información a la central",
      "Tranquilizar e informar al ciudadano en el lugar",
    ],
    avantages: [
      "Puerta de entrada a los puestos de campo",
      "No exige manipular animales",
      "Formación y supervisión incluidas",
      "Participación puntual posible",
    ],
    profil: [
      "18 años como mínimo",
      "Acceso a un vehículo y a un teléfono móvil",
      "Sentido de la observación",
      "Capacidad de seguir instrucciones",
    ],
  },
  secouriste: {
    titre: "Socorrista",
    resume: "En el corazón de las operaciones de campo, cada día.",
    description:
      "El patrullero atiende los avisos de ciudadanos, servicios animales municipales, socios y servicios de emergencia. Su papel es intervenir en las situaciones en las que el animal puede recuperarse sin equipo de rescate técnico. Las patrullas cubren intervenciones muy variadas, desde una simple recogida en el suelo hasta la captura segura de un animal reactivo con equipo especializado. Un puesto para quien quiera implicarse activamente dentro de una estructura bien organizada.",
    taches: [
      "Atender las llamadas de patrulla",
      "Asegurar y transportar a los animales",
      "Aplicar las instrucciones operativas",
      "Comunicarse con la central por radio",
      "Documentar cada misión en el registro",
    ],
    avantages: [
      "Un papel único y gratificante sobre el terreno",
      "Trabajo en equipo estructurado",
      "Supervisión y formación continua",
      "Contribución directa al rescate de animales",
    ],
    profil: [
      "18 años como mínimo",
      "Acceso a un vehículo y a un teléfono móvil",
      "Autonomía y capacidad de seguir instrucciones",
      "Buena condición física",
    ],
  },
  sauveteur: {
    titre: "Rescatista",
    resume: "El rescate técnico: altura, hielo, espacio confinado.",
    description:
      "El rescatista interviene donde una patrulla no puede llegar: un gato a quince metros en un árbol, un mapache en el fondo de una chimenea, un perro sobre hielo inestable, una barnacla atrapada en un pilar de puente. Estas intervenciones exigen técnicas de trabajo en altura, material de cuerdas certificado y una disciplina de seguridad estricta. Es el puesto más exigente de la organización, accesible tras un recorrido de formación interna y una progresión desde la patrulla.",
    taches: [
      "Intervenir en altura, sobre hielo o en espacio confinado",
      "Montar y verificar los sistemas de cuerdas",
      "Capturar y asegurar a un animal en medio peligroso",
      "Aplicar los procedimientos de salud y seguridad",
      "Mantener al día el registro de cuerdas de rescate",
    ],
    avantages: [
      "Formaciones técnicas pagadas por la organización",
      "Equipo de protección incluido",
      "Progresión interna reconocida",
      "Intervenciones que nadie más hace en Quebec",
    ],
    profil: [
      "18 años como mínimo",
      "Sin vértigo, buena condición física",
      "Rigor absoluto con las normas de seguridad",
      "Disponibilidad recurrente",
      "Experiencia en altura o socorro, una ventaja",
    ],
  },
};

const PAR_LANGUE: Record<Locale, Textes> = { fr: FR, en: EN, es: ES };

export function fichePoste(cle: Poste["cle"], locale: Locale): Fiche {
  return PAR_LANGUE[locale][cle];
}
