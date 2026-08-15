import type { CataloguePages } from "./types";
import { MUNICIPALITES } from "@/contenu/municipalites";

// La clé est le chemin, sans la locale. Le contenu reprend et resserre celui
// de l'ancien site Shopify, archivé dans contenu-source/texte.
export const PAGES_FR: CataloguePages = {
  mission: {
    surtitre: "Depuis 2010",
    titre: "Notre mission",
    intro:
      "Sauvetage Animal Rescue vient en aide aux animaux en détresse. Nous déployons des ressources humaines et matérielles pour mener des missions de secours et de sauvetage, auprès des citoyens, des entreprises et des municipalités.",
    image: "/images/hero-accueil.png",
    blocs: [
      {
        titre: "Un vide dans la chaîne de secours",
        texte: [
          "Quand un humain est en détresse, tout un système se met en marche. Pour un animal, il n'existait rien de comparable au Québec. Les pompiers et les services animaliers faisaient ce qu'ils pouvaient, mais personne n'était formé spécifiquement pour aller chercher un chat à quinze mètres dans un arbre ou un raton laveur au fond d'une cheminée.",
          "Sauvetage Animal Rescue est né de ce constat. L'organisation applique au monde animal les principes du secours d'urgence : une centrale qui reçoit les appels, des niveaux d'intervention, des procédures de sécurité, un registre où chaque mission est documentée du premier appel jusqu'à sa fermeture.",
        ],
      },
      {
        titre: "Ce que nous faisons",
        liste: [
          "Secours technique en hauteur, sur glace, en égout et en espace clos",
          "Capture sécuritaire d'animaux errants, réactifs ou blessés",
          "Transport vers les refuges et les cliniques partenaires",
          "Assistance aux services d'urgence et aux municipalités",
          "Formation du public et des intervenants",
          "Sensibilisation dans les écoles primaires",
        ],
      },
      {
        titre: "Qui nous appelle",
        texte: [
          "Nos appels viennent des citoyens, des services animaliers municipaux, des services de police et d'incendie, des refuges, des entreprises et parfois d'autres organismes de sauvetage. Le point commun de toutes ces demandes : un animal se trouve dans une situation dont il ne peut pas sortir seul, et personne sur place n'a l'équipement ou la formation pour intervenir sans danger.",
        ],
      },
      {
        titre: "Financé par ses membres",
        texte: [
          "Nous ne recevons aucune subvention gouvernementale et aucun financement public. Tout repose sur les cotisations des membres, les dons, les campagnes de rue et notre communauté. C'est ce qui garantit notre indépendance, et c'est aussi ce qui rend chaque adhésion déterminante.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/statistiques", libelle: "Voir nos statistiques" },
    ],
  },

  direction: {
    surtitre: "Mot du fondateur",
    titre: "Direction générale",
    intro:
      "Eric Dussault, fondateur et directeur général de Sauvetage Animal Rescue.",
    image: "/images/direction.png",
    blocs: [
      {
        texte: [
          "Je consacre ma vie à défendre ceux qui n'ont pas de voix : les animaux en détresse. En 2010, j'ai fondé Sauvetage Animal Rescue, une organisation unique au Québec, spécialisée dans le secours technique d'animaux. Nous intervenons là où personne d'autre ne le fait : dans les arbres, sur les toits, dans les égouts, sur les glaces, en milieu urbain comme en milieu rural. Chats, ratons laveurs, bernaches, renards, chiens, pigeons : chaque intervention est différente, mais la mission reste la même, protéger la vie.",
          "L'idée m'est venue d'un constat simple. Dans notre société, quand un humain est en détresse, il y a tout un système de secours prêt à agir. Pour les animaux, il y avait un grand vide. J'ai décidé d'adapter les principes du secours d'urgence, appris au fil de mes années dans le secours et sauvetage, la sécurité publique, le transport de valeurs et la protection rapprochée, à une cause qui me touche profondément.",
          "Mon plus grand défi depuis la création de l'organisation, c'est la stabilité financière. Nous ne recevons aucune aide gouvernementale. Tout repose sur la générosité des citoyens et sur notre communauté. Ce sont ces membres, ces alliés de coeur, qui rendent chaque intervention possible.",
          "Je suis entouré d'une équipe de bénévoles formidables, venus des services d'urgence, du monde animalier et du grand public, qui donnent temps, énergie et coeur pour secourir des vies. Ensemble, nous accomplissons plusieurs centaines de missions chaque année.",
          "Ce que je souhaite pour l'avenir, c'est que Sauvetage Animal Rescue devienne la référence en matière de sauvetage animal. Former d'autres équipes, ici et ailleurs. Transmettre notre savoir. Et faire reconnaître un jour notre rôle dans la chaîne d'urgence, à l'égal des services traditionnels. Parce que la souffrance animale mérite autant d'attention que celle des humains.",
          "Et ce rêve, je ne peux le réaliser qu'avec vous.",
        ],
      },
      {
        encadre: {
          titre: "Nous joindre",
          lignes: [
            "Eric Dussault, directeur général",
            "e.dussault@sar.quebec",
            "2180, rue Sainte-Catherine Ouest, Montréal (Québec) H3H 1M7",
            "Ligne de signalement : 514-773-3911",
            "Sans frais : 833-773-3911",
            "Officier de garde : 514-270-3636",
          ],
        },
      },
    ],
  },

  territoire: {
    surtitre: "Communauté métropolitaine de Montréal",
    titre: "Notre territoire",
    intro:
      "Sauvetage Animal Rescue intervient sur l'ensemble du territoire de la Communauté métropolitaine de Montréal : 82 municipalités réparties dans cinq régions administratives, Montréal, Laval, la Montérégie, les Laurentides et Lanaudière.",
    image: "/images/territoire.jpg",
    blocs: [
      {
        titre: "Un territoire de 4 360 kilomètres carrés",
        texte: [
          "On y compte plus de 4,2 millions de résidents, près de la moitié de la population québécoise, et plus de 1,7 million de foyers. Des milliers de parcs, de forêts urbaines, de rivières, de voies rapides, de zones agricoles et de quartiers densément bâtis s'y côtoient. Chaque année, ce territoire génère des centaines d'appels nécessitant une intervention rapide et spécialisée.",
        ],
      },
      {
        titre: "Entre ville et nature",
        texte: [
          "Cette diversité impose une grande capacité d'adaptation. Secourir un chat coincé en hauteur dans un arrondissement montréalais, venir en aide à des canetons tombés dans une grille d'égout en banlieue ou intervenir auprès d'un cerf blessé dans une municipalité périphérique ne demandent ni le même équipement ni la même approche. La mission s'adapte au terrain et à la réalité locale de chaque intervention.",
        ],
      },
      {
        titre: "Les 82 municipalités desservies",
        liste: MUNICIPALITES,
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
    ],
  },

  partenaires: {
    surtitre: "Ensemble",
    titre: "Nos partenaires",
    intro:
      "Nos partenaires jouent un rôle déterminant dans la réalisation de notre mission. Leur soutien nous permet de secourir plus d'animaux, de leur offrir les soins nécessaires et de sensibiliser la communauté à la cause animale.",
    image: "/images/remise-certificat.jpg",
    blocs: [
      {
        titre: "Le certificat de partenaire",
        texte: [
          "Le certificat de partenariat mesure 11 x 17 pouces. Son design s'inspire des billets de banque et des bons du trésor : éléments de sécurité, couleurs riches, format registre. Le nom de votre organisation y figure en évidence, entouré d'un message de remerciement bilingue. Il est renouvelé chaque année et seulement vingt exemplaires sont émis.",
        ],
      },
      {
        titre: "La visibilité qui vient avec",
        liste: [
          "Certificat affiché dans votre commerce ou votre bureau",
          "Publication en direct sur notre page Facebook lors de la remise, convertie en vidéo",
          "Publication photo de la remise sur Facebook",
          "Publication photo sur Instagram",
          "Publication vidéo sur TikTok",
          "Mention dans la section Partenaires de notre site",
          "Publication spéciale sur Patreon",
          "Mention dans l'infolettre",
        ],
      },
    ],
    actions: [
      { href: "/partenariat", libelle: "Devenir partenaire", principal: true },
    ],
  },

  medias: {
    surtitre: "Couverture médiatique",
    titre: "Dans les médias",
    intro:
      "Reportages télévisés, articles de presse et entrevues radio consacrés au travail de Sauvetage Animal Rescue. Chaque couverture est une occasion de faire connaître la cause animale au-delà de notre communauté.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        texte: [
          "Nos interventions ont été couvertes par La Presse, TVA Nouvelles, le Courrier du Sud, 107.7 Estrie, 103.3, Info Petite Nation et Le Soleil de Châteauguay, entre autres. Les sujets vont du sauvetage d'un chien en eaux vives à Plaisance jusqu'aux prises de position de l'organisation sur l'abattage de cerfs en milieu urbain.",
          "Pour toute demande d'entrevue ou d'information journalistique, écrivez à la direction générale à e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "ateliers/primaire": {
    surtitre: "Sensibilisation",
    titre: "Ateliers au primaire",
    intro:
      "Notre équipe se déplace directement en classe pour sensibiliser les jeunes à la protection et au sauvetage des animaux.",
    image: "/images/ecoles.jpg",
    blocs: [
      {
        titre: "Ce que les élèves apprennent",
        texte: [
          "Au cours de ces présentations interactives, les élèves apprennent à reconnaître un animal en détresse, quels gestes poser, qui contacter et quelles ressources existent. Nous mettons l'accent sur l'empathie et le respect envers les animaux, et nous encourageons les enfants à devenir de véritables protecteurs animaliers.",
          "Chaque atelier est modulable selon les besoins et l'horaire de l'école.",
        ],
      },
      {
        titre: "Un certificat pour chaque élève",
        texte: [
          "Chaque élève reçoit un certificat officiel remis par Sauvetage Animal Rescue. Il souligne son écoute, sa participation et son engagement envers les animaux. C'est aussi un souvenir de notre passage, qu'il pourra afficher fièrement dans sa chambre.",
        ],
      },
      {
        titre: "Réserver une date",
        texte: [
          "Pour plus d'informations ou pour réserver, communiquez avec la direction générale à e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "ateliers/secondaire": {
    surtitre: "Sensibilisation",
    titre: "Ateliers au secondaire",
    intro:
      "Un atelier conçu pour des adolescents, qui parle de responsabilité, de conséquences et de choix de carrière plutôt que de bons sentiments.",
    image: "/images/ecoles.jpg",
    blocs: [
      {
        titre: "Un ton différent du primaire",
        texte: [
          "Au secondaire, les élèves n'ont plus besoin qu'on leur explique qu'il faut aimer les animaux. Ils ont besoin de comprendre ce qui se passe réellement : pourquoi une portée de chatons finit dans une ruelle, ce que devient un animal abandonné en août, comment un geste banal comme relâcher un poisson rouge dans un ruisseau déséquilibre un milieu entier.",
          "L'atelier s'appuie sur des interventions réelles, avec photos et vidéos, et laisse une large place aux questions. Les adolescents en posent beaucoup, et souvent des difficiles.",
        ],
      },
      {
        titre: "Ce qu'on aborde",
        liste: [
          "Les lois québécoises sur les animaux et ce qu'elles impliquent vraiment",
          "La surpopulation animale et le rôle de la stérilisation",
          "Le secours technique : cordage, capture, sécurité",
          "Reconnaître une situation dangereuse et savoir ne pas intervenir",
          "Les métiers du milieu animalier et les parcours pour y arriver",
          "Le bénévolat dès 18 ans et les stages d'observation dès 14 ans",
        ],
      },
      {
        titre: "Format et réservation",
        texte: [
          "L'atelier dure une période de cours et s'adapte au groupe, du premier au cinquième secondaire. Il peut se donner en classe, en grand groupe ou dans le cadre d'une journée thématique.",
          "Pour réserver une date, écrivez à la direction générale à e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  services: {
    surtitre: "Ce que nous offrons",
    titre: "Nos services",
    intro:
      "Sauvetage Animal Rescue n'est pas un refuge. Nous sommes une équipe de secours technique : nous allons chercher l'animal là où il est coincé, nous le sécurisons, et nous le remettons entre de bonnes mains.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        titre: "Secours et sauvetage",
        texte: [
          "Notre service principal. Travail en hauteur, espaces clos, glace, bords d'autoroute, capture d'animaux réactifs. Sur appel, partout sur le territoire de la Communauté métropolitaine de Montréal.",
        ],
      },
      {
        titre: "Soutien aux municipalités",
        texte: [
          "Les appels animaliers arrivent aux villes sans qu'elles disposent toujours du matériel de cordage ou de la formation en espace clos. Nous offrons cette capacité en soutien de vos services existants, plutôt que de vous obliger à l'équiper vous-mêmes.",
        ],
      },
      {
        titre: "Ateliers dans les écoles",
        texte: [
          "Des ateliers adaptés au primaire et au secondaire, donnés directement en classe. Reconnaître un animal en détresse, savoir qui appeler, comprendre la surpopulation animale et les métiers du milieu.",
        ],
      },
      {
        titre: "Assistance aux services d'urgence",
        texte: [
          "Un animal sur une scène d'intervention change la donne : il peut blesser un intervenant, fuir vers la circulation ou bloquer l'accès à une victime. Nous intervenons en appui des services de police et d'incendie, et nous formons leur personnel.",
        ],
      },
    ],
    actions: [
      {
        href: "/services/interventions",
        libelle: "Secours et sauvetage",
        principal: true,
      },
      { href: "/services/municipalites", libelle: "Municipalités" },
      { href: "/ateliers/primaire", libelle: "Ateliers au primaire" },
      { href: "/ateliers/secondaire", libelle: "Ateliers au secondaire" },
    ],
  },

  "services/interventions": {
    surtitre: "Notre service principal",
    titre: "Secours et sauvetage",
    intro:
      "Une équipe formée au secours technique, disponible en tout temps, pour les situations où un animal ne peut pas s'en sortir seul et où personne sur place n'a l'équipement pour intervenir sans danger.",
    image: "/images/hero-accueil.png",
    blocs: [
      {
        titre: "Les interventions que nous faisons",
        liste: [
          "Travail en hauteur : arbres, toits, pylônes, structures",
          "Espaces clos : égouts, puisards, cheminées, murs, conduits",
          "Milieux instables : glace, berges, cours d'eau",
          "Bords d'autoroute et voies rapides",
          "Capture d'animaux réactifs à l'aide d'équipement spécialisé",
          "Transport vers les refuges et cliniques partenaires",
        ],
      },
      {
        titre: "Comment se déclenche une intervention",
        texte: [
          "Tout commence par un signalement, par téléphone, par le formulaire du site, par Messenger ou par un service partenaire. Un répartiteur recueille l'information, évalue l'urgence et attribue un niveau d'intervention. Selon la situation, un éclaireur va d'abord valider sur place, ou une équipe est mobilisée directement.",
          "Chaque mission est documentée dans notre registre opérationnel, du premier appel jusqu'à sa fermeture. C'est ce registre qui alimente le compteur public de ce site.",
        ],
      },
      {
        titre: "Pour qui",
        texte: [
          "Nous intervenons pour les citoyens, les services animaliers municipaux, les services de police et d'incendie, les refuges, les entreprises et les gestionnaires d'immeubles. Le service est offert sur l'ensemble du territoire de la Communauté métropolitaine de Montréal.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
      { href: "/territoire", libelle: "Voir le territoire couvert" },
    ],
  },

  "services/municipalites": {
    surtitre: "Aux villes et aux MRC",
    titre: "Services aux municipalités",
    intro:
      "Les appels concernant des animaux arrivent aux municipalités sans qu'elles disposent toujours de l'équipement ou de la formation pour y répondre. Nous agissons en soutien de vos services existants.",
    image: "/images/territoire.jpg",
    blocs: [
      {
        titre: "Le problème que ça règle",
        texte: [
          "Un chat perché à quinze mètres, un raton laveur dans un conduit municipal, un cerf blessé dans un parc, une famille de canards dans un puisard : ce sont des appels que reçoivent les services animaliers, les travaux publics et parfois le 911. Ils demandent du matériel de cordage certifié, une formation en espace clos et une connaissance du comportement animal.",
          "Plutôt que d'équiper et de former chaque municipalité pour des situations qui surviennent quelques fois par année, nous offrons cette capacité en soutien.",
        ],
      },
      {
        titre: "Ce que nous offrons aux municipalités",
        liste: [
          "Intervention de secours technique sur appel",
          "Soutien aux services animaliers et aux travaux publics",
          "Assistance aux services de police et d'incendie",
          "Formation du personnel municipal aux situations impliquant des animaux",
          "Ateliers de sensibilisation dans les écoles du territoire",
          "Présence lors d'événements municipaux",
        ],
      },
      {
        titre: "Prendre entente",
        texte: [
          "Les modalités s'établissent au cas par cas selon le volume d'appels, le territoire et les services déjà en place. Écrivez à la direction générale à e.dussault@sar.quebec pour en discuter.",
        ],
      },
    ],
    actions: [
      { href: "/territoire", libelle: "Voir le territoire couvert", principal: true },
    ],
  },

  patreon: {
    surtitre: "Soutien mensuel",
    titre: "Devenir Patreon",
    intro:
      "Patreon permet un soutien financier régulier plutôt qu'un don unique. Pour une organisation qui ne reçoit aucune subvention, cette stabilité change tout : elle permet de planifier l'équipement, l'entretien des véhicules et le remplacement du matériel de sauvetage.",
    image: "/images/patreon.png",
    blocs: [
      {
        titre: "Les avantages",
        liste: [
          "Carte de membre virtuelle",
          "Accès à la ligne d'urgence en tout temps",
          "Accès aux communications radio",
          "Publications quotidiennes",
          "Journal de bord du chef",
          "Capsules informatives",
          "Entrevues avec les sauveteurs",
          "Vidéos exclusives",
          "Messages de boîte vocale",
          "Concours et tirages",
          "Produits réservés aux membres",
          "Sondages et événements privés",
        ],
      },
      {
        titre: "Ce qu'en disent les membres",
        texte: [
          "« J'appuie votre organisation parce que vous sauvez des vies qui comptent beaucoup à mes yeux. Gardez à coeur cette merveilleuse mission. Chaque vie est importante. » Sylvie, Sainte-Anne-des-Plaines",
          "« Je suis tellement fière d'être membre Patreon, je le suis depuis presque vos débuts. J'ai vraiment le sentiment de contribuer au sauvetage d'animaux en détresse qui, sans vous, seraient laissés à eux-mêmes. » Sylvie, Saint-Jean-sur-Richelieu",
        ],
      },
    ],
    actions: [
      {
        href: "https://www.patreon.com/sauvetageanimalrescue",
        libelle: "Aller sur Patreon",
        principal: true,
      },
    ],
  },

  partenariat: {
    surtitre: "2 000 $ par année",
    titre: "Devenir partenaire",
    intro:
      "Vingt certificats de partenaire sont émis chaque année. Ils s'adressent aux entreprises et aux organisations qui veulent associer leur nom au sauvetage animal, avec une visibilité concrète auprès d'une communauté engagée.",
    image: "/images/certificat-partenaire.png",
    blocs: [
      {
        titre: "Ce que comprend le partenariat",
        liste: [
          "Un certificat 11 x 17 pouces, numéroté et renouvelé chaque année",
          "Une remise officielle captée en photo et en vidéo",
          "Une diffusion en direct sur nos réseaux lors de la remise",
          "Des publications dédiées sur Facebook, Instagram et TikTok",
          "Une mention permanente sur la page Partenaires du site",
          "Une publication spéciale sur Patreon",
          "Une mention dans l'infolettre",
        ],
      },
      {
        titre: "Prendre entente",
        texte: [
          "Le nombre de certificats étant limité, les ententes se prennent directement avec la direction générale. Écrivez à e.dussault@sar.quebec en précisant le nom de votre organisation et votre secteur d'activité.",
        ],
      },
    ],
  },

  formations: {
    surtitre: "Pour le public et les intervenants",
    titre: "Formations",
    intro:
      "Sauvetage Animal Rescue offre des formations aux propriétaires d'animaux ainsi qu'à toute personne appelée à interagir avec des animaux dans le cadre de son travail : milieu animalier, services de police et d'incendie, entreprises.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Trois parcours",
        liste: [
          "Initiation Secours Animal : 25 modules, 8 heures, une journée",
          "Premiers Secours Animal : 50 modules, 16 heures",
          "Formations sur mesure pour les services d'urgence",
        ],
      },
      {
        titre: "Une approche pratique",
        texte: [
          "Nos formations ne visent pas à faire de vous un vétérinaire. Elles visent à vous rendre capable de reconnaître une urgence, d'approcher un animal sans aggraver la situation ni vous blesser, de poser les bons gestes et d'amener l'animal chez le vétérinaire le plus rapidement possible.",
        ],
      },
    ],
    actions: [
      {
        href: "/formations/initiation-secours-animal",
        libelle: "Initiation Secours Animal",
        principal: true,
      },
      {
        href: "/formations/premiers-secours-animal",
        libelle: "Premiers Secours Animal",
      },
    ],
  },

  "formations/initiation-secours-animal": {
    surtitre: "25 modules • 8 heures",
    titre: "Initiation Secours Animal",
    intro:
      "Une journée pour être mieux outillé face à une situation d'urgence impliquant votre animal : reconnaître les signes de détresse, poser les gestes appropriés et assurer un transport rapide vers un établissement vétérinaire.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Au programme",
        liste: [
          "Lois et règlements sur les animaux au Québec",
          "Plan d'urgence et trousse de premiers secours",
          "Équipement de protection individuelle",
          "Approche sécuritaire et langage des animaux",
          "Signes vitaux et niveaux de conscience",
          "Muselière et contention",
          "Vérification primaire et secondaire",
          "Anamnèse et état de choc",
          "Déshydratation et intoxications",
          "Désobstruction des voies respiratoires",
          "Respiration artificielle et réanimation cardiaque",
          "Numéros d'urgence et ressources",
        ],
      },
      {
        titre: "Inclus",
        liste: [
          "Cahier de formation",
          "Certificat de participation",
          "Autocollant",
        ],
      },
      {
        titre: "S'inscrire",
        texte: [
          "Les dates de formation sont annoncées par courriel et sur nos réseaux sociaux. Pour connaître la prochaine session ou organiser une formation privée, écrivez à e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "formations/premiers-secours-animal": {
    surtitre: "50 modules • 16 heures",
    titre: "Premiers Secours Animal",
    intro:
      "La formation complète destinée aux propriétaires d'animaux qui veulent être réellement préparés. Elle couvre l'ensemble des urgences courantes et des pathologies que rencontre un animal de compagnie.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Ce que couvre la formation",
        liste: [
          "Tout le contenu de l'Initiation Secours Animal",
          "Hyperthermie, coup de chaleur, hypothermie et engelures",
          "Quasi-noyade et électrisation",
          "Épilepsie, accident vasculaire cérébral, infarctus",
          "Embolie pulmonaire, torsion gastrique, occlusion intestinale",
          "Contusions, plaies, hémorragies et brûlures",
          "Exorbitation",
          "Blessures aux os et aux articulations",
          "Animal heurté par un véhicule",
          "Immobilisation, évacuation et transport",
          "Pathologies chroniques fréquentes et zoonoses",
          "Mise bas, prophylaxie et sécurité en voiture",
        ],
      },
      {
        titre: "Inclus",
        liste: [
          "Cahier de formation",
          "Carte et certificat de participation",
          "Écusson et autocollant",
        ],
      },
      {
        titre: "S'inscrire",
        texte: [
          "Pour connaître la prochaine session ou organiser une formation de groupe, écrivez à e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "formations/services-urgence": {
    surtitre: "Sur mesure",
    titre: "Formations aux services d'urgence",
    intro:
      "Des formations conçues pour les policiers, les pompiers et les intervenants de première ligne, afin qu'ils puissent reconnaître, anticiper et gérer les situations où des animaux sont impliqués.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        titre: "Pourquoi",
        texte: [
          "Un animal présent sur une scène d'intervention change la donne : il peut blesser un intervenant, s'enfuir vers la circulation, empêcher l'accès à une victime ou compliquer une évacuation. Nos formations visent à réduire ces risques pour les citoyens, pour les intervenants et pour les animaux eux-mêmes.",
        ],
      },
      {
        titre: "Entièrement modulables",
        texte: [
          "Le contenu s'adapte à la mission, au territoire et aux contraintes de chaque organisation. Il peut être orienté vers les interventions de patrouille, la sécurité publique, ou les contextes liés aux incendies et aux opérations de sauvetage. Chaque formation est ajustée en collaboration avec l'organisation demandeuse, pour rester cohérente avec ses procédures internes.",
        ],
      },
      {
        titre: "Demander une formation",
        texte: [
          "Écrivez à e.dussault@sar.quebec en précisant le type de formation souhaitée, votre contexte opérationnel et les réalités de votre milieu.",
        ],
      },
    ],
  },

  contact: {
    surtitre: "Nous joindre",
    titre: "Coordonnées",
    intro:
      "Pour un animal en détresse, appelez la ligne de signalement. Pour toute autre demande, voici comment nous rejoindre.",
    blocs: [
      {
        encadre: {
          titre: "Téléphone",
          lignes: [
            "Ligne de signalement : 514-773-3911",
            "Sans frais : 833-773-3911",
            "Officier de garde : 514-270-3636",
            "Télécopieur : 438-238-4481",
          ],
        },
      },
      {
        encadre: {
          titre: "Courriel et adresse",
          lignes: [
            "Renseignements généraux : info@sar.quebec",
            "Direction générale : e.dussault@sar.quebec",
            "2180, rue Sainte-Catherine Ouest",
            "Montréal (Québec) H3H 1M7, Canada",
          ],
        },
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
    ],
  },

  confidentialite: {
    titre: "Politique de confidentialité",
    intro:
      "Cette politique explique quels renseignements Sauvetage Animal Rescue recueille, pourquoi, et ce que nous en faisons.",
    sansIndexation: false,
    blocs: [
      {
        titre: "Ce que nous recueillons",
        liste: [
          "Signalements : nom, téléphone, courriel, adresse où se trouve l'animal et description de la situation.",
          "Adhésions : nom, courriel, téléphone, ville, code postal et renseignements de facturation traités par Stripe.",
          "Candidatures : coordonnées, disponibilités, expérience et motivation.",
          "Statistiques de navigation agrégées, sans identification personnelle.",
        ],
      },
      {
        titre: "Pourquoi",
        texte: [
          "Les renseignements d'un signalement servent uniquement à traiter l'intervention et à vous rappeler au besoin. Les renseignements d'adhésion servent à émettre votre carte, à vous la faire parvenir et à gérer votre renouvellement. Les candidatures servent au processus de recrutement.",
        ],
      },
      {
        titre: "Paiements",
        texte: [
          "Les paiements sont traités par Stripe. Nous ne voyons jamais votre numéro de carte et nous ne le conservons pas. Stripe applique ses propres politiques de sécurité et de conservation.",
        ],
      },
      {
        titre: "Partage",
        texte: [
          "Nous ne vendons ni ne louons vos renseignements. Ils peuvent être transmis à un refuge, à une clinique vétérinaire ou à un service municipal uniquement lorsque c'est nécessaire pour prendre en charge un animal signalé.",
        ],
      },
      {
        titre: "Vos droits",
        texte: [
          "Vous pouvez demander l'accès, la correction ou la suppression de vos renseignements en écrivant à info@sar.quebec. Nous répondons dans un délai de trente jours.",
        ],
      },
    ],
  },

  conditions: {
    titre: "Conditions d'utilisation",
    intro:
      "Conditions applicables à l'utilisation du site sar.quebec et aux transactions qui y sont effectuées.",
    blocs: [
      {
        titre: "Signalements",
        texte: [
          "Le formulaire de signalement en ligne ne remplace pas un appel téléphonique. Pour une urgence, appelez la ligne de signalement. Nous ne garantissons aucun délai d'intervention : les missions sont priorisées selon la gravité et les ressources disponibles.",
        ],
      },
      {
        titre: "Adhésions et dons",
        texte: [
          "Les cotisations et les dons ne sont pas remboursables. Une adhésion est valide jusqu'au 31 décembre de son année d'émission. L'adhésion avec renouvellement automatique se reconduit chaque année et peut être annulée en tout temps depuis l'espace membre ; l'annulation prend effet à la fin de la période déjà payée.",
        ],
      },
      {
        titre: "Stages et formations",
        texte: [
          "Les stages d'observation et les formations ne sont pas remboursables. Une place peut être cédée à une autre personne. Le participant est responsable de noter la date et l'heure de son activité et doit signer une décharge de responsabilité sur place.",
        ],
      },
      {
        titre: "Propriété",
        texte: [
          "Les textes, images, écussons et contenus de ce site appartiennent à Sauvetage Animal Rescue et ne peuvent pas être reproduits sans autorisation écrite.",
        ],
      },
    ],
  },
};
