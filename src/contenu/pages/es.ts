import type { CataloguePages } from "./types";
import { MUNICIPALITES } from "@/contenu/municipalites";

export const PAGES_ES: CataloguePages = {
  mission: {
    surtitre: "Desde 2010",
    titre: "Nuestra misión",
    intro:
      "Sauvetage Animal Rescue ayuda a los animales en peligro. Desplegamos personas y equipos para llevar a cabo misiones de socorro y rescate, al servicio de ciudadanos, empresas y municipios.",
    image: "/images/hero-accueil.jpg",
    blocs: [
      {
        titre: "Un vacío en la cadena de socorro",
        texte: [
          "Cuando una persona está en peligro, todo un sistema se pone en marcha. Para un animal, no existía nada comparable en Quebec. Los bomberos y los servicios animales municipales hacían lo que podían, pero nadie estaba formado específicamente para bajar a un gato a quince metros en un árbol o sacar a un mapache del fondo de una chimenea.",
          "Sauvetage Animal Rescue nació de esa constatación. La organización aplica al mundo animal los principios del socorro de urgencia: una central que recibe las llamadas, niveles de intervención, procedimientos de seguridad y un registro donde cada misión queda documentada desde la primera llamada hasta su cierre.",
        ],
      },
      {
        titre: "Lo que hacemos",
        liste: [
          "Rescate técnico en altura, sobre hielo, en alcantarillas y en espacios confinados",
          "Captura segura de animales callejeros, reactivos o heridos",
          "Transporte a refugios y clínicas asociadas",
          "Apoyo a los servicios de emergencia y a los municipios",
          "Formación del público y de los profesionales",
          "Sensibilización en las escuelas primarias",
        ],
      },
      {
        titre: "Quién nos llama",
        texte: [
          "Nuestras llamadas provienen de ciudadanos, servicios animales municipales, policía y bomberos, refugios, empresas y a veces de otras organizaciones de rescate. Todas tienen algo en común: un animal se encuentra en una situación de la que no puede salir solo, y nadie en el lugar tiene el equipo o la formación para intervenir sin peligro.",
        ],
      },
      {
        titre: "Financiada por sus miembros",
        texte: [
          "No recibimos ninguna subvención gubernamental ni financiación pública. Todo depende de las cuotas de los miembros, las donaciones, las campañas en la calle y nuestra comunidad. Eso garantiza nuestra independencia y es también lo que hace que cada afiliación cuente.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Hacerse miembro", principal: true },
      { href: "/statistiques", libelle: "Ver nuestras estadísticas" },
    ],
  },

  direction: {
    surtitre: "Palabras del fundador",
    titre: "Dirección general",
    intro:
      "Eric Dussault, fundador y director general de Sauvetage Animal Rescue.",
    image: "/images/direction.png",
    blocs: [
      {
        texte: [
          "Dedico mi vida a defender a quienes no tienen voz: los animales en peligro. En 2010 fundé Sauvetage Animal Rescue, una organización única en Quebec, especializada en el rescate técnico de animales. Intervenimos donde nadie más lo hace: en los árboles, en los tejados, en las alcantarillas, sobre el hielo, tanto en la ciudad como en el campo. Gatos, mapaches, barnaclas, zorros, perros, palomas: cada intervención es distinta, pero la misión sigue siendo la misma, proteger la vida.",
          "La idea surgió de una constatación sencilla. En nuestra sociedad, cuando un ser humano está en peligro, hay todo un sistema de socorro listo para actuar. Para los animales había un gran vacío. Decidí adaptar los principios del socorro de urgencia, aprendidos durante mis años en rescate, seguridad pública, transporte de valores y protección personal, a una causa que me toca profundamente.",
          "Mi mayor desafío desde la creación de la organización es la estabilidad financiera. No recibimos ninguna ayuda gubernamental. Todo depende de la generosidad de los ciudadanos y de nuestra comunidad. Son esos miembros, esos aliados de corazón, los que hacen posible cada intervención.",
          "Estoy rodeado de un equipo de voluntarios extraordinarios, procedentes de los servicios de emergencia, del mundo animal y del público en general, que dan tiempo, energía y corazón para salvar vidas. Juntos realizamos varios cientos de misiones cada año.",
          "Lo que deseo para el futuro es que Sauvetage Animal Rescue se convierta en la referencia en materia de rescate animal. Formar a otros equipos, aquí y en otros lugares. Transmitir nuestro saber. Y lograr algún día que se reconozca nuestro papel dentro de la cadena de urgencia, en igualdad con los servicios tradicionales. Porque el sufrimiento animal merece tanta atención como el humano.",
          "Y ese sueño solo puedo alcanzarlo con ustedes.",
        ],
      },
      {
        encadre: {
          titre: "Contacto",
          lignes: [
            "Eric Dussault, director general",
            "e.dussault@sar.quebec",
            "2180, rue Sainte-Catherine Ouest, Montreal (Quebec) H3H 1M7",
            "Línea de aviso: 514-773-3911",
            "Sin cargo: 833-773-3911",
            "Oficial de guardia: 514-270-3636",
          ],
        },
      },
    ],
  },

  territoire: {
    surtitre: "Comunidad Metropolitana de Montreal",
    titre: "Nuestro territorio",
    intro:
      "Sauvetage Animal Rescue interviene en todo el territorio de la Comunidad Metropolitana de Montreal: 82 municipios repartidos en cinco regiones administrativas, Montreal, Laval, la Montérégie, los Laurentides y Lanaudière.",
    image: "/images/territoire.jpg",
    blocs: [
      {
        titre: "Un territorio de 4360 kilómetros cuadrados",
        texte: [
          "Viven allí más de 4,2 millones de residentes, cerca de la mitad de la población quebequense, y más de 1,7 millones de hogares. Miles de parques, bosques urbanos, ríos, vías rápidas, zonas agrícolas y barrios densamente construidos conviven en el mismo espacio. Cada año este territorio genera cientos de llamadas que exigen una intervención rápida y especializada.",
        ],
      },
      {
        titre: "Entre ciudad y naturaleza",
        texte: [
          "Esa diversidad exige una gran capacidad de adaptación. Rescatar a un gato atrapado en altura en un distrito de Montreal, socorrer a unos patitos caídos en una alcantarilla de las afueras o atender a un ciervo herido en un municipio periférico no requieren ni el mismo equipo ni el mismo enfoque. La misión se adapta al terreno y a la realidad local de cada intervención.",
        ],
      },
      {
        titre: "Los 82 municipios atendidos",
        liste: MUNICIPALITES,
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Reportar un animal", principal: true },
    ],
  },

  medias: {
    surtitre: "Cobertura mediática",
    titre: "En los medios",
    intro:
      "Reportajes de televisión, artículos de prensa y entrevistas de radio dedicados al trabajo de Sauvetage Animal Rescue. Cada cobertura es una ocasión de llevar la causa animal más allá de nuestra comunidad.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        texte: [
          "Nuestras intervenciones han sido cubiertas por La Presse, TVA Nouvelles, Courrier du Sud, 107.7 Estrie, 103.3, Info Petite Nation y Le Soleil de Châteauguay, entre otros. Los temas van desde el rescate de un perro en aguas bravas en Plaisance hasta las posiciones de la organización sobre la caza de ciervos en medio urbano.",
          "Para cualquier solicitud de entrevista o información periodística, escriba a la dirección general: e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "ateliers/primaire": {
    surtitre: "Sensibilización",
    titre: "Talleres en escuelas primarias",
    intro:
      "Nuestro equipo se desplaza directamente al aula para sensibilizar a los más jóvenes sobre la protección y el rescate de animales.",
    image: "/images/ecoles.jpg",
    blocs: [
      {
        titre: "Lo que aprenden los alumnos",
        texte: [
          "Durante estas presentaciones interactivas, los alumnos aprenden a reconocer un animal en peligro, qué hacer, a quién avisar y qué recursos existen. Insistimos en la empatía y el respeto hacia los animales, y animamos a los niños a convertirse en verdaderos protectores de la fauna.",
          "Cada taller se adapta a las necesidades y al horario de la escuela.",
        ],
      },
      {
        titre: "Un certificado para cada alumno",
        texte: [
          "Cada alumno recibe un certificado oficial entregado por Sauvetage Animal Rescue. Reconoce su atención, su participación y su compromiso con los animales. Es también un recuerdo de nuestra visita que podrá exhibir con orgullo en su habitación.",
        ],
      },
      {
        titre: "Reservar una fecha",
        texte: [
          "Para más información o para reservar, contacte con la dirección general en e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  partenariat: {
    surtitre: "2000 $ al año",
    titre: "Ser socio",
    intro:
      "Cada año se emiten veinte certificados de socio. Están dirigidos a empresas y organizaciones que quieren asociar su nombre al rescate animal, con una visibilidad concreta ante una comunidad comprometida.",
    image: "/images/certificat-partenaire.png",
    blocs: [
      {
        titre: "Lo que incluye la asociación",
        liste: [
          "Un certificado de 11 por 17 pulgadas, numerado y renovado cada año",
          "Una entrega oficial captada en foto y vídeo",
          "Una emisión en directo en nuestras redes durante la entrega",
          "Publicaciones dedicadas en Facebook, Instagram y TikTok",
          "Una mención en el boletín",
        ],
      },
      {
        titre: "Concertar el acuerdo",
        texte: [
          "Como el número de certificados es limitado, los acuerdos se cierran directamente con la dirección general. Escriba a e.dussault@sar.quebec indicando el nombre de su organización y su sector de actividad.",
        ],
      },
    ],
  },

  formations: {
    surtitre: "Para el público y los profesionales",
    titre: "Formaciones",
    intro:
      "Sauvetage Animal Rescue ofrece formaciones a propietarios de animales y a toda persona que deba interactuar con animales en su trabajo: sector animal, policía y bomberos, empresas.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Tres recorridos",
        liste: [
          "Iniciación al Socorro Animal: 25 módulos, 8 horas, una jornada",
          "Primeros Auxilios Animal: 50 módulos, 16 horas",
          "Formaciones a medida para servicios de emergencia",
        ],
      },
      {
        titre: "Un enfoque práctico",
        texte: [
          "Nuestras formaciones no pretenden convertirle en veterinario. Buscan que sea capaz de reconocer una urgencia, acercarse a un animal sin agravar la situación ni herirse, actuar correctamente y llevar al animal al veterinario lo antes posible.",
        ],
      },
    ],
    actions: [
      {
        href: "/formations/initiation-secours-animal",
        libelle: "Iniciación al Socorro Animal",
        principal: true,
      },
      {
        href: "/formations/premiers-secours-animal",
        libelle: "Primeros Auxilios Animal",
      },
    ],
  },

  "formations/initiation-secours-animal": {
    surtitre: "25 módulos • 8 horas",
    titre: "Iniciación al Socorro Animal",
    intro:
      "Una jornada para estar mejor preparado ante una urgencia con su animal: reconocer las señales de peligro, actuar adecuadamente y garantizar un traslado rápido a un centro veterinario.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Contenido",
        liste: [
          "Leyes y reglamentos sobre animales en Quebec",
          "Plan de urgencia y botiquín de primeros auxilios",
          "Equipo de protección individual",
          "Acercamiento seguro y lenguaje de los animales",
          "Signos vitales y niveles de conciencia",
          "Bozal y contención",
          "Verificación primaria y secundaria",
          "Anamnesis y estado de choque",
          "Deshidratación e intoxicaciones",
          "Desobstrucción de las vías respiratorias",
          "Respiración artificial y reanimación cardíaca",
          "Números de urgencia y recursos",
        ],
      },
      {
        titre: "Incluye",
        liste: [
          "Cuaderno de formación",
          "Certificado de participación",
          "Pegatina",
        ],
      },
      {
        titre: "Inscribirse",
        texte: [
          "Las fechas se anuncian por correo y en nuestras redes sociales. Para conocer la próxima sesión u organizar una formación privada, escriba a e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "formations/premiers-secours-animal": {
    surtitre: "50 módulos • 16 horas",
    titre: "Primeros Auxilios Animal",
    intro:
      "La formación completa para propietarios que quieren estar realmente preparados. Cubre el conjunto de urgencias frecuentes y de patologías que puede sufrir un animal de compañía.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Lo que cubre la formación",
        liste: [
          "Todo el contenido de Iniciación al Socorro Animal",
          "Hipertermia, golpe de calor, hipotermia y congelaciones",
          "Casi ahogamiento y electrocución",
          "Epilepsia, accidente cerebrovascular, infarto",
          "Embolia pulmonar, torsión gástrica, obstrucción intestinal",
          "Contusiones, heridas, hemorragias y quemaduras",
          "Exoftalmia traumática",
          "Lesiones óseas y articulares",
          "Animal atropellado por un vehículo",
          "Inmovilización, evacuación y transporte",
          "Patologías crónicas frecuentes y zoonosis",
          "Parto, profilaxis y seguridad en el coche",
        ],
      },
      {
        titre: "Incluye",
        liste: [
          "Cuaderno de formación",
          "Tarjeta y certificado de participación",
          "Parche y pegatina",
        ],
      },
      {
        titre: "Inscribirse",
        texte: [
          "Para conocer la próxima sesión u organizar una formación de grupo, escriba a e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "formations/services-urgence": {
    surtitre: "A medida",
    titre: "Formaciones para servicios de emergencia",
    intro:
      "Formaciones concebidas para policías, bomberos y personal de primera línea, para que puedan reconocer, anticipar y gestionar las situaciones en las que hay animales implicados.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        titre: "Por qué",
        texte: [
          "Un animal presente en una intervención lo cambia todo: puede herir a un interviniente, huir hacia el tráfico, impedir el acceso a una víctima o complicar una evacuación. Nuestras formaciones reducen esos riesgos para los ciudadanos, para los intervinientes y para los propios animales.",
        ],
      },
      {
        titre: "Totalmente modulables",
        texte: [
          "El contenido se adapta a la misión, al territorio y a las limitaciones de cada organización. Puede orientarse a las intervenciones de patrulla, a la seguridad pública o a contextos de incendio y rescate. Cada formación se ajusta junto con la organización solicitante para mantenerse coherente con sus procedimientos internos.",
        ],
      },
      {
        titre: "Solicitar una formación",
        texte: [
          "Escriba a e.dussault@sar.quebec indicando el tipo de formación deseada, su contexto operativo y las realidades de su servicio.",
        ],
      },
    ],
  },

  contact: {
    surtitre: "Contactarnos",
    titre: "Datos de contacto",
    intro:
      "Para un animal en peligro, llame a la línea de aviso. Para cualquier otra consulta, así puede contactarnos.",
    blocs: [
      {
        encadre: {
          titre: "Teléfono",
          lignes: [
            "Línea de aviso: 514-773-3911",
            "Sin cargo: 833-773-3911",
            "Oficial de guardia: 514-270-3636",
            "Fax: 438-238-4481",
          ],
        },
      },
      {
        encadre: {
          titre: "Correo y dirección",
          lignes: [
            "Información general: info@sar.quebec",
            "Dirección general: e.dussault@sar.quebec",
            "2180, rue Sainte-Catherine Ouest",
            "Montreal (Quebec) H3H 1M7, Canadá",
          ],
        },
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Reportar un animal", principal: true },
    ],
  },

  confidentialite: {
    titre: "Política de privacidad",
    intro:
      "Esta política explica qué datos recoge Sauvetage Animal Rescue, por qué y qué hacemos con ellos.",
    blocs: [
      {
        titre: "Qué recogemos",
        liste: [
          "Avisos: nombre, teléfono, correo, dirección donde se encuentra el animal y descripción de la situación.",
          "Afiliaciones: nombre, correo, teléfono, ciudad, código postal y datos de facturación tratados por Stripe.",
          "Candidaturas: datos de contacto, disponibilidad, experiencia y motivación.",
          "Estadísticas de navegación agregadas, sin identificación personal.",
        ],
      },
      {
        titre: "Por qué",
        texte: [
          "Los datos de un aviso sirven únicamente para gestionar la intervención y para volver a llamarle si hace falta. Los datos de afiliación sirven para emitir su tarjeta, hacérsela llegar y gestionar su renovación. Las candidaturas sirven para el proceso de reclutamiento.",
        ],
      },
      {
        titre: "Pagos",
        texte: [
          "Los pagos los procesa Stripe. Nunca vemos su número de tarjeta y no lo conservamos. Stripe aplica sus propias políticas de seguridad y conservación.",
        ],
      },
      {
        titre: "Comunicación a terceros",
        texte: [
          "No vendemos ni alquilamos sus datos. Pueden transmitirse a un refugio, a una clínica veterinaria o a un servicio municipal únicamente cuando sea necesario para hacerse cargo de un animal reportado.",
        ],
      },
      {
        titre: "Sus derechos",
        texte: [
          "Puede solicitar el acceso, la corrección o la supresión de sus datos escribiendo a info@sar.quebec. Respondemos en un plazo de treinta días.",
        ],
      },
    ],
  },

  conditions: {
    titre: "Condiciones de uso",
    intro:
      "Condiciones aplicables al uso del sitio sar.quebec y a las transacciones realizadas en él.",
    blocs: [
      {
        titre: "Avisos",
        texte: [
          "El formulario de aviso en línea no sustituye a una llamada telefónica. Para una urgencia, llame a la línea de aviso. No garantizamos ningún plazo de intervención: las misiones se priorizan según la gravedad y los recursos disponibles.",
        ],
      },
      {
        titre: "Afiliaciones y donaciones",
        texte: [
          "Las cuotas y las donaciones no son reembolsables. Una afiliación es válida hasta el 31 de diciembre de su año de emisión. La afiliación con renovación automática se renueva cada año y puede cancelarse en cualquier momento desde el área de miembro; la cancelación surte efecto al final del período ya pagado.",
        ],
      },
      {
        titre: "Jornadas y formaciones",
        texte: [
          "Las jornadas de observación y las formaciones no son reembolsables. Una plaza puede cederse a otra persona. El participante es responsable de anotar la fecha y la hora de su actividad y debe firmar una exención de responsabilidad en el lugar.",
        ],
      },
      {
        titre: "Propiedad",
        texte: [
          "Los textos, imágenes, emblemas y contenidos de este sitio pertenecen a Sauvetage Animal Rescue y no pueden reproducirse sin autorización escrita.",
        ],
      },
    ],
  },
};
