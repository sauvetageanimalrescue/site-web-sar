import type { CataloguePages } from "./types";

// La clé est le chemin, sans la locale. Le contenu reprend et resserre celui
// de l'ancien site Shopify, archivé dans contenu-source/texte.
export const PAGES_FR: CataloguePages = {
  mission: {
    surtitre: "Depuis deux mille dix",
    titre: "Notre mission",
    intro:
      "Sauvetage Animal Rescue a pour mission de protéger et de sauver les animaux. Nous déployons des ressources humaines et matérielles pour mener à bien nos missions de secours et de sauvetage.",
    image: "/images/australie-2020.jpg",
    blocs: [
      {
        titre: "Protéger et sauver",
        texte: [
          "La mission de Sauvetage Animal Rescue est avant tout de protéger et de sauver les animaux en situation de détresse. Pour y parvenir, l'organisation mobilise les ressources humaines, matérielles et techniques nécessaires afin de mener à bien des missions de secours et de sauvetage, parfois dans des environnements complexes ou difficiles d'accès. Chaque intervention repose sur un même engagement: mettre notre expertise et nos capacités opérationnelles au service des animaux qui ont besoin d'aide.",
        ],
      },
      {
        titre: "Notre vision",
        texte: [
          "La vision de Sauvetage Animal Rescue est de devenir une ressource essentielle en matière de protection et de sauvetage animalier à l'échelle nationale, tout en établissant un standard d'excellence reconnu bien au-delà de nos frontières. Par le développement de notre expertise, de nos méthodes d'intervention et de notre capacité opérationnelle, nous aspirons à devenir un modèle pour les organismes animaliers à travers le monde, et à contribuer à faire évoluer les pratiques de sauvetage animalier.",
        ],
      },
      {
        image: {
          fichier: "/images/mission-terrain.jpg",
          alt: "Trois intervenants au bord de l'eau avec deux oiseaux secourus",
        },
      },
      {
        titre: "Nos valeurs",
        texte: [
          "Les valeurs de Sauvetage Animal Rescue définissent autant notre façon d'intervenir que notre manière de travailler ensemble. L'altruisme nous pousse à agir dans l'intérêt des animaux et des personnes que nous servons, sans distinction et sans recherche de bénéfice personnel. La bravoure nous permet d'affronter avec courage et sang-froid des situations parfois complexes ou dangereuses. La collaboration nous rappelle que les meilleures interventions reposent sur le travail d'équipe et la coopération avec les citoyens, les organisations et les services d'urgence. La discipline assure la rigueur de nos méthodes, de notre formation et de nos pratiques afin de protéger autant nos équipes que les animaux secourus. Enfin, l'excellence nous pousse à maintenir les plus hauts standards, à apprendre constamment et à toujours chercher à nous améliorer.",
        ],
      },
      {
        titre: "« Ensemble au service des animaux »",
        texte: [
          "Notre devise résume à elle seule notre façon de concevoir le sauvetage animalier. Ensemble, c'est d'abord notre équipe, unie autour d'une même mission. C'est aussi l'ensemble des organisations, refuges, services animaliers et services d'urgence avec lesquels nous collaborons. Enfin, c'est notre communauté de membres et de donateurs, dont le soutien rend nos interventions possibles. Trois forces complémentaires, réunies autour d'un seul objectif: être au service des animaux.",
        ],
      },
      {
        image: {
          fichier: "/images/mission-bateau.jpg",
          alt: "Deux intervenants embarquant un transporteur dans une embarcation",
        },
      },
      {
        titre: "Un vide dans la chaîne de secours",
        texte: [
          "Lorsqu'un être humain est en détresse, tout un mécanisme se déploie. Mais pour un animal, rien de tel n'existait ici. Les pompiers et les services animaliers faisaient de leur mieux, mais aucune structure n'était conçue spécifiquement pour le sauvetage animalier complexe. C'est ce vide que Sauvetage Animal Rescue est venu combler. En reprenant les principes du secours d'urgence et en les appliquant au monde animal, l'organisation a bâti une chaîne d'intervention structurée, de la prise d'appel jusqu'à la fin de la mission, avec des formations, des procédures, et une rigueur digne des services d'urgence.",
        ],
      },
      {
        titre: "Financé par ses membres",
        texte: [
          "Sauvetage Animal Rescue ne reçoit aucun financement public ni subvention gouvernementale. Notre indépendance repose entièrement sur les adhésions annuelles, les dons et nos activités de financement. Cette autonomie est notre force: elle nous permet d'agir selon notre mission, sans compromis. Chaque adhésion compte, car elle contribue directement à rendre chaque intervention possible.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/direction", libelle: "Le mot du directeur général" },
    ],
  },

  direction: {
    surtitre: "Portrait du fondateur",
    titre: "Direction générale",
    intro:
      "Eric Dussault a fondé Sauvetage Animal Rescue et la dirige depuis. Le parcours d'un homme venu des services d'urgence, qui a constaté qu'il n'existait rien de comparable pour les animaux et a décidé de le bâtir.",
    image: "/images/direction-terrain.jpg",
    blocs: [
      {
        titre: "Tout part d'un constat",
        texte: [
          "Au début des années deux mille, Eric Dussault fait un constat qui marquera la suite de son parcours. Lorsqu'un animal se retrouve en situation d'urgence, les propriétaires disposent de très peu de ressources capables d'intervenir directement sur le terrain. Une expérience vécue au sein de sa propre famille, alors qu'elle cherchait désespérément de l'aide pour retrouver son chat Capucine, met cette réalité en lumière. Malgré les nombreux appels à des organismes et des services d'urgence, rien n'existe vraiment pour intervenir auprès d'un animal en détresse. Cette absence de réponse soulève une question qui ne le quittera plus. Pourquoi existe-t-il des services spécialisés pour pratiquement toutes les situations d'urgence, mais aucun véritable service d'intervention dédié aux animaux? Ce constat devient le point de départ d'une réflexion qui, quelques années plus tard, donnera naissance à une vision entièrement nouvelle du sauvetage animalier au Québec.",
        ],
      },
      {
        image: {
          fichier: "/images/direction-2010.jpg",
          alt: "Eric Dussault tenant un chat dans la neige, à l'époque de la fondation",
          legende: "2010 - Eric Dussault et son chat Tommy",
        },
      },
      {
        titre: "Ailleurs dans le monde",
        texte: [
          "Ses recherches l'amènent à découvrir, aux États-Unis, des équipes ayant développé une tout autre approche du sauvetage animalier. À Los Angeles, notamment, l'équipe SMART, spécialisée dans les interventions de sauvetage animalier, lui révèle jusqu'où peut aller un service lorsqu'on lui donne les moyens, la formation et l'expertise nécessaires. Équipements spécialisés, véhicules adaptés, techniques de sauvetage et culture opérationnelle: pour Eric, cette découverte agit comme une démonstration. Ce qu'il imaginait était possible. Mais rien de comparable n'existait alors au Canada. Plutôt que d'accepter cette absence comme une fatalité, il décide de s'en inspirer pour bâtir ici une approche adaptée à la réalité québécoise. L'objectif ne sera jamais de simplement reproduire un modèle américain, mais d'en retenir une conviction fondamentale: un animal en détresse mérite lui aussi une réponse organisée, compétente et capable de se déplacer jusqu'à lui.",
        ],
      },
      {
        titre: "L'hiver qui a tout changé",
        texte: [
          "Le parcours est toutefois loin d'être linéaire. Au cours d'un hiver particulièrement calme, alors que les interventions se font rares et que la jeune organisation traverse une véritable saison morte, le doute s'installe. Eric envisage sérieusement de tourner la page. Puis survient un événement qui changera sa perception de la mission. Un chien est signalé à la dérive sur les glaces dans le secteur de Sorel-Tracy. Devant une situation qui ne relève véritablement d'aucun service traditionnel, les citoyens cherchent désespérément quelqu'un capable d'intervenir et finissent par se tourner vers Sauvetage Animal Rescue. L'équipe répond présente et se rend sur place. L'issue ne sera malheureusement pas celle espérée, mais l'intervention apporte une réponse définitive au doute qui s'était installé: ce service avait une raison d'exister. Pour Eric, il devient alors impossible d'imaginer abandonner en sachant qu'un autre animal pourrait, un jour, avoir besoin d'une équipe comme la sienne. À partir de ce moment, Sauvetage Animal Rescue n'est plus simplement une idée à essayer. C'est une mission à construire.",
        ],
      },
      {
        image: {
          fichier: "/images/direction-chaton.jpg",
          alt: "Eric Dussault remettant un chaton noir à un citoyen",
          legende: "2012 - Eric Dussault accompagné de Milo, le chat, et son propriétaire",
        },
      },
      {
        titre: "Bâtir sans suivre le modèle établi",
        texte: [
          "Entrepreneur idéaliste et profondément anticonformiste, Eric Dussault n'a jamais cherché à bâtir Sauvetage Animal Rescue selon un modèle conventionnel. Son leadership repose moins sur le titre que sur l'exemple, l'expérience du terrain et la crédibilité acquise au fil des interventions et des formations. Il demeure d'abord et avant tout un sauveteur, avec la conviction qu'un dirigeant doit comprendre intimement la réalité de ceux qu'il appelle à intervenir. Cette façon de diriger influence encore aujourd'hui la culture de l'organisation: apprendre, expérimenter, remettre les méthodes en question et constamment chercher à faire mieux.",
        ],
      },
      {
        titre: "Un modèle mondial",
        texte: [
          "Et l'ambition dépasse largement les frontières du Québec. La vision est de faire de Sauvetage Animal Rescue une ressource essentielle en protection et en sauvetage animalier, capable de contribuer un jour à une véritable réponse d'urgence à l'échelle du pays. Plus encore, Eric assume une ambition rarement formulée aussi ouvertement dans le milieu: bâtir l'un des plus importants services de sauvetage animalier au monde et faire du Québec une référence internationale dans ce domaine. Une ambition immense, certes, mais fidèle à l'idée qui se trouve à l'origine de toute l'histoire: lorsqu'une ressource essentielle n'existe pas encore, quelqu'un doit décider de la créer.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/equipe", libelle: "L'équipe" },
    ],
  },

  territoire: {
    surtitre: "Communauté Métropolitaine de Montréal",
    titre: "Notre territoire",
    intro:
      "Sauvetage Animal Rescue intervient sur l'ensemble du territoire de la Communauté Métropolitaine de Montréal: 82 municipalités réparties dans cinq régions administratives, Montréal, Laval, la Montérégie, les Laurentides et Lanaudière.",
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
        titre: "Êtes-vous sur notre territoire ?",
        texte: [
          "Entrez le nom de votre municipalité. Si elle fait partie de la Communauté Métropolitaine de Montréal, nous nous y déplaçons.",
        ],
        composant: "territoire",
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/mission", libelle: "Notre mission" },
    ],
  },

  "missions-internationales": {
    surtitre: "Au-delà du territoire",
    titre: "Missions internationales",
    intro:
      "Notre travail quotidien s'arrête aux limites de la Communauté Métropolitaine de Montréal. Certains sinistres, eux, ne s'arrêtent nulle part. Quand des animaux se comptent par milliers et que personne sur place n'a la formation pour aller les chercher, nous partons.",
    image: "/images/australie-2020.jpg",
    blocs: [
      {
        titre: "Australie, février 2020",
        texte: [
          "Les feux de forêt qui ont ravagé l'Australie ont tué et blessé des animaux sauvages en nombre inconcevable. Notre équipe s'est rendue sur place pour prêter main-forte au secours des animaux dans les zones brûlées.",
          "Intervenir dans une forêt calcinée n'a rien de commun avec une intervention urbaine. Arbres instables, sol brûlant, faune inconnue, blessures d'un type que nous ne voyons pas ici. C'est la mission la plus exigeante que l'organisation ait menée.",
        ],
      },
      {
        titre: "Pourquoi nous partons",
        texte: [
          "Le secours technique d'animaux est une discipline rare. Les techniques que nous avons développées, le travail en hauteur, la capture sécuritaire, la structure d'intervention, ne sont limitées par aucune frontière.",
          "Chaque déploiement nous rapporte aussi quelque chose. Ce que l'on apprend dans une zone sinistrée revient directement dans nos interventions quotidiennes, et dans ce que nous enseignons ici.",
        ],
      },
      {
        titre: "Ce que nous pouvons apporter",
        liste: [
          "Appui direct lors de sinistres majeurs touchant des animaux",
          "Formation d'équipes locales au secours et au sauvetage technique",
          "Transfert de nos procédures d'intervention et de sécurité",
          "Accompagnement dans la mise en place d'une structure de répartition",
        ],
      },
      {
        titre: "Nous joindre",
        texte: [
          "Pour toute demande de déploiement ou de collaboration, écrivez directement à la direction générale à e.dussault@sar.quebec.",
        ],
      },
    ],
    actions: [
      { href: "/direction", libelle: "Le mot du directeur général", principal: true },
    ],
  },

  "missions-nationales": {
    surtitre: "Hors territoire",
    titre: "Missions nationales",
    intro:
      "Lors d'un sinistre majeur, les animaux sont les derniers à être évacués et les premiers à être oubliés. Quand les autorités nous appellent en renfort, nous quittons notre territoire habituel pour aller les chercher.",
    image: "/images/sainte-marthe-2019.jpg",
    blocs: [
      {
        titre: "Sainte-Marthe-sur-le-Lac, 2019",
        texte: [
          "La rupture de la digue a forcé l'évacuation de milliers de résidents en quelques heures. Beaucoup ont dû partir sans leurs animaux, restés seuls dans des maisons cernées par l'eau.",
          "Notre équipe a mené 125 opérations dans les secteurs inondés et en a ramené 171 animaux. Chacune de ces opérations, c'est une famille qui a retrouvé le sien.",
        ],
        encadre: {
          titre: "Le bilan de l'opération",
          lignes: [
            "171 animaux secourus",
            "125 opérations dans les secteurs évacués",
            "Municipalité: Sainte-Marthe-sur-le-Lac",
          ],
        },
      },
      {
        titre: "Abitibi-Témiscamingue",
        texte: [
          "Déploiement plus récent, en appui aux communautés touchées. Le contexte régional impose ses propres contraintes: distances considérables, ressources locales limitées, autonomie complète de l'équipe sur le terrain.",
        ],
      },
      {
        titre: "Pourquoi nous répondons",
        texte: [
          "Un plan de sécurité civile prévoit l'évacuation des personnes. Presque aucun ne prévoit celle des animaux, et beaucoup de gens refusent de partir sans les leurs. Une équipe capable d'aller les chercher retire donc un obstacle à l'évacuation elle-même.",
          "C'est ce que nous apportons lors d'un sinistre: une capacité que les services d'urgence n'ont pas à développer, et qu'ils peuvent appeler.",
        ],
      },
    ],
    actions: [
      { href: "/services/sinistres", libelle: "Nos services en sinistre", principal: true },
      { href: "/missions-internationales", libelle: "Missions internationales" },
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
          "Le certificat de partenariat mesure 11 x 17 pouces. Son design s'inspire des billets de banque et des bons du trésor: éléments de sécurité, couleurs riches, format registre. Le nom de votre organisation y figure en évidence, entouré d'un message de remerciement bilingue. Il est renouvelé chaque année et seulement vingt exemplaires sont émis.",
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
      "Notre équipe se déplace directement en classe pour parler aux enfants de la protection des animaux, du travail de sauvetage et des gestes simples qui font une différence quand on croise un animal en difficulté.",
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
      "Un atelier conçu pour des adolescents, qui parle de responsabilité, de conséquences et de choix de carrière plutôt que de bons sentiments. Le métier existe vraiment, et ceux qui le font viennent parfois le raconter.",
    image: "/images/ecoles.jpg",
    blocs: [
      {
        titre: "Un ton différent du primaire",
        texte: [
          "Au secondaire, les élèves n'ont plus besoin qu'on leur explique qu'il faut aimer les animaux. Ils ont besoin de comprendre ce qui se passe réellement: pourquoi une portée de chatons finit dans une ruelle, ce que devient un animal abandonné en août, comment un geste banal comme relâcher un poisson rouge dans un ruisseau déséquilibre un milieu entier.",
          "L'atelier s'appuie sur des interventions réelles, avec photos et vidéos, et laisse une large place aux questions. Les adolescents en posent beaucoup, et souvent des difficiles.",
        ],
      },
      {
        titre: "Ce qu'on aborde",
        liste: [
          "Les lois québécoises sur les animaux et ce qu'elles impliquent vraiment",
          "La surpopulation animale et le rôle de la stérilisation",
          "Le secours technique: cordage, capture, sécurité",
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
      "Sauvetage Animal Rescue n'est pas un refuge. Nous sommes une équipe de secours technique: nous allons chercher l'animal là où il est coincé, nous le sécurisons, et nous le remettons entre de bonnes mains.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        titre: "Secours et sauvetage",
        texte: [
          "Notre service principal. Travail en hauteur, espaces clos, glace, bords d'autoroute, capture d'animaux réactifs. Sur appel, partout sur le territoire de la Communauté Métropolitaine de Montréal.",
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
          "Un animal sur une scène d'intervention change la donne: il peut blesser un intervenant, fuir vers la circulation ou bloquer l'accès à une victime. Nous intervenons en appui des services de police et d'incendie, et nous formons leur personnel.",
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

  secteurs: {
    surtitre: "Pour qui nous intervenons",
    titre: "Secteurs d'activité",
    intro:
      "Un raton laveur dans un cimetière, des goélands sur un entrepôt, un chevreuil sur une piste d'aéroport: le problème n'est jamais tout à fait le même selon le milieu. Voici les secteurs où nous intervenons et ce que nous y faisons.",
    image: "/images/carte-services.jpg",
    blocs: [
      {
        titre: "Les milieux que nous desservons",
        liste: [
          "Municipalités",
          "Services animaliers",
          "Services de police et d'incendie",
          "Aéroports",
          "Ports et marinas",
          "Chemins de fer",
          "Centres commerciaux",
          "Entrepôts et centres de distribution",
          "Hôpitaux et CHSLD",
          "Hôtels et restaurants",
          "Écoles et universités",
          "Cimetières",
          "Golfs et terrains sportifs",
          "Carrières et sites d'extraction",
          "Gestionnaires d'immeubles",
          "Fermes et milieux agricoles",
          "Chantiers de construction",
          "Événements et festivals",
        ],
      },
      {
        titre: "Votre secteur n'est pas dans la liste?",
        texte: [
          "Elle n'est pas exhaustive. Si un animal cause un problème dans votre milieu de travail, ou si vous ne savez pas à qui vous adresser, appelez la ligne de signalement ou écrivez à la direction générale. Nous vous dirons franchement si la situation relève de nous ou d'un autre service.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
      { href: "/services/patrouille", libelle: "Voir nos services" },
    ],
  },

  "services/inspection": {
    surtitre: "Avant que le problème s'installe",
    titre: "Inspection",
    intro:
      "Une inspection sert à comprendre ce qui attire les animaux chez vous et par où ils entrent. C'est presque toujours moins coûteux que de gérer la même situation trois fois par année.",
    image: "/images/carte-secteurs.jpg",
    blocs: [
      {
        titre: "Ce que nous vérifions",
        liste: [
          "Points d'entrée: soffites, ventilations, conduits, vides sanitaires",
          "Sources de nourriture et d'eau accessibles",
          "Abris potentiels: entretoits, remises, empilements, machinerie",
          "Traces de présence: excréments, poils, sentiers, dommages",
          "Risques pour les occupants et pour les animaux eux-mêmes",
        ],
      },
      {
        titre: "Ce que vous recevez",
        texte: [
          "Un rapport écrit décrivant ce qui a été constaté, l'espèce en cause quand elle est identifiable, et les correctifs à apporter par ordre de priorité. Nous distinguons clairement ce qui relève de nous de ce qui relève d'un entrepreneur, d'un exterminateur ou de votre équipe d'entretien.",
          "Nous ne vendons pas de produits et nous ne facturons pas au nombre d'animaux capturés. Un rapport qui conclut qu'il n'y a rien à faire est un rapport utile.",
        ],
      },
    ],
    actions: [
      { href: "/secteurs", libelle: "Voir les secteurs desservis", principal: true },
    ],
  },

  "services/capture": {
    surtitre: "Sans blesser l'animal",
    titre: "Capture",
    intro:
      "Capturer un animal qui ne veut pas être capturé demande du matériel, de la patience et une bonne lecture du comportement animal. Mal fait, on blesse la bête, on se fait mordre, ou on la pousse vers un danger pire.",
    image: "/images/carte-signalement.jpg",
    blocs: [
      {
        titre: "Nos moyens",
        liste: [
          "Perches de capture, de plusieurs longueurs",
          "Cages-trappes adaptées à l'espèce et surveillées",
          "Filets, épuisettes et sacs de capture",
          "Équipement de protection contre les morsures et les griffures",
          "Cages de transport ventilées et couvertes",
        ],
      },
      {
        titre: "Nos règles",
        texte: [
          "Une cage-trappe n'est jamais laissée sans surveillance prolongée: un animal piégé au soleil ou au froid souffre, et un piège oublié devient une cruauté. Nous privilégions toujours la méthode la moins invasive qui fonctionne, et nous acceptons de repartir bredouilles plutôt que de forcer une capture qui mettrait l'animal en danger.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
    ],
  },

  "services/reglementation": {
    surtitre: "Patrouilleurs assermentés",
    titre: "Règlementation",
    intro:
      "Certains de nos patrouilleurs sont assermentés et peuvent appliquer la règlementation animalière sur le territoire des municipalités qui leur en confient le mandat. Une compétence rare, exercée avec la même rigueur que le reste de nos interventions.",
    image: "/images/carte-services.jpg",
    blocs: [
      {
        titre: "Ce que ça permet",
        liste: [
          "Application des règlements municipaux sur les animaux",
          "Vérification des licences et de l'identification",
          "Constats d'infraction et suivi des dossiers",
          "Réponse aux plaintes de nuisance ou de divagation",
          "Accompagnement des services municipaux sur le terrain",
        ],
      },
      {
        titre: "Une posture, pas seulement un pouvoir",
        texte: [
          "Être assermenté ne change pas la mission. Notre premier réflexe reste l'explication et l'accompagnement du citoyen, parce qu'un propriétaire qui comprend le règlement s'y conforme durablement, alors qu'un constat mal expliqué ne règle rien. Le constat existe pour les cas où le dialogue a échoué ou lorsque la sécurité l'exige.",
        ],
      },
    ],
    actions: [
      { href: "/secteurs", libelle: "Voir les secteurs desservis", principal: true },
    ],
  },

  "services/denombrement": {
    surtitre: "Compter avant de décider",
    titre: "Dénombrement",
    intro:
      "Avant d'intervenir sur une population animale, il faut savoir combien il y en a, où et depuis quand. Un dénombrement remplace les impressions par des chiffres, et évite des décisions coûteuses fondées sur une plainte isolée.",
    image: "/images/territoire.jpg",
    blocs: [
      {
        titre: "Ce que nous dénombrons",
        liste: [
          "Colonies de chats sans propriétaire",
          "Populations de faune urbaine dans un secteur donné",
          "Cerfs et grande faune en milieu périurbain",
          "Colonies d'oiseaux sur un bâtiment ou un site industriel",
          "Suivi d'une population dans le temps, avant et après intervention",
        ],
      },
      {
        titre: "Comment nous procédons",
        texte: [
          "Observation sur le terrain à heures fixes, relevés photographiques, identification des individus quand c'est possible, et cartographie des points de présence. Les données sont consignées et vous sont remises sous forme de rapport, avec les limites de la méthode clairement indiquées.",
          "Un dénombrement honnête donne parfois un résultat qui dérange: une population moins nombreuse qu'on le croyait, ou un problème qui vient d'ailleurs. C'est précisément ce qui le rend utile pour justifier une décision devant un conseil municipal ou une direction.",
        ],
      },
    ],
    actions: [
      { href: "/secteurs", libelle: "Voir les secteurs desservis", principal: true },
    ],
  },

  "services/sinistres": {
    surtitre: "Incendies, inondations, évacuations",
    titre: "Sinistres",
    intro:
      "Quand une famille est évacuée en pleine nuit, personne n'a prévu quoi faire du chat, du perroquet ou des poissons. C'est un angle mort des plans d'urgence, et c'est là que nous intervenons.",
    image: "/images/hero-accueil.jpg",
    blocs: [
      {
        titre: "Ce que nous faisons sur un sinistre",
        liste: [
          "Récupération des animaux restés dans un bâtiment évacué",
          "Prise en charge et transport vers un lieu sûr",
          "Soutien aux sinistrés qui ne peuvent pas garder leur animal",
          "Liaison avec les refuges et les cliniques vétérinaires",
          "Assistance aux services d'incendie sur les lieux",
        ],
      },
      {
        titre: "Pourquoi ça compte",
        texte: [
          "Des gens refusent d'évacuer, ou retournent dans un immeuble en feu, pour un animal. Ce n'est pas de l'imprudence, c'est un attachement que les plans d'urgence sous-estiment encore. Savoir qu'une équipe s'occupe de l'animal permet au sinistré de sortir, et aux pompiers de faire leur travail.",
          "Pour organiser une entente préalable avec votre municipalité ou votre service d'incendie, écrivez à e.dussault@sar.quebec.",
        ],
      },
    ],
    actions: [
      { href: "/services/municipalites", libelle: "Services aux municipalités", principal: true },
    ],
  },

  "services/patrouille": {
    surtitre: "Le premier niveau d'intervention",
    titre: "Patrouille",
    intro:
      "La majorité des appels ne demandent ni corde ni harnais. Un animal errant, blessé au sol, coincé derrière une clôture ou dans un garage: la patrouille s'en occupe, tous les jours, sur l'ensemble du territoire.",
    image: "/images/carte-services.jpg",
    blocs: [
      {
        titre: "Ce que fait une patrouille",
        liste: [
          "Répondre aux signalements des citoyens et des services municipaux",
          "Cueillette au sol d'un animal blessé ou affaibli",
          "Capture d'un animal réactif à l'aide d'équipement spécialisé",
          "Sécurisation d'un animal en attendant une équipe technique",
          "Transport vers un refuge ou une clinique partenaire",
          "Documentation de la mission au registre",
        ],
      },
      {
        titre: "Le maillon le plus sollicité",
        texte: [
          "C'est le niveau qui traite le plus grand volume. Une patrouille arrive avec un véhicule identifié, des cages, des perches de capture et une radio reliée à la centrale. Si la situation dépasse ses moyens, elle sécurise les lieux et demande le renfort d'une équipe de sauvetage technique.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
    ],
  },

  "services/secours-animalier": {
    surtitre: "Porter secours",
    titre: "Secours Animalier",
    intro:
      "Le secours, c'est venir en aide à un animal qui souffre ou qui est en danger, sans que la situation exige des techniques de travail en hauteur. C'est le coeur du métier, et c'est ce qui occupe la majorité de nos heures.",
    image: "/images/carte-signalement.jpg",
    blocs: [
      {
        titre: "Les situations couvertes",
        liste: [
          "Animal blessé, malade ou affaibli",
          "Animal orphelin ou juvénile isolé",
          "Animal pris dans une clôture, un grillage, un filet",
          "Animal enfermé dans un bâtiment, un véhicule, un conteneur",
          "Faune urbaine en détresse: raton laveur, mouffette, écureuil",
          "Oiseaux blessés ou pris dans une ligne à pêche",
        ],
      },
      {
        titre: "Une chaîne, pas un geste isolé",
        texte: [
          "Un secours réussi ne s'arrête pas au moment où l'animal est entre nos mains. Il faut ensuite le transporter, le confier à un refuge ou à une clinique, et documenter l'intervention. C'est pour cette raison que l'organisation compte des messagers dont le seul rôle est le transport: pendant qu'un animal est conduit en sécurité, une autre vie peut être secourue ailleurs.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
      { href: "/equipe", libelle: "Voir les fonctions de l'équipe" },
    ],
  },

  "services/sauvetage-technique": {
    surtitre: "Là où personne d'autre ne va",
    titre: "Sauvetage Technique",
    intro:
      "Le sauvetage technique est une discipline en soi. Il commence là où le secours ordinaire s'arrête: quand atteindre l'animal exige des cordes, un harnais, une formation en travail en hauteur et une discipline de sécurité stricte.",
    image: "/images/stages.jpg",
    blocs: [
      {
        titre: "Les milieux d'intervention",
        liste: [
          "Travail en hauteur: arbres, toits, pylônes, structures, ponts",
          "Espaces clos: égouts, puisards, cheminées, murs, conduits",
          "Milieux instables: glace, berges, cours d'eau",
          "Sites industriels et emprises ferroviaires",
        ],
      },
      {
        titre: "Ce que ça exige",
        texte: [
          "Du matériel de cordage certifié, vérifié et consigné dans un registre des cordes de sauvetage. Des sauveteurs formés, qui ont progressé depuis la patrouille avant d'accéder à ce niveau. Et une règle non négociable: aucune intervention ne commence si la sécurité des intervenants n'est pas assurée, parce qu'un sauveteur blessé ne sauve plus personne.",
          "C'est le service qui distingue l'organisation. Au Québec, très peu d'équipes sont capables de descendre en rappel pour aller chercher un chat à quinze mètres ou une bernache prise dans un pilier de pont.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
      { href: "/recrutement", libelle: "Devenir sauveteur" },
    ],
  },

  "services/interventions": {
    surtitre: "Notre service principal",
    titre: "Secours et sauvetage",
    intro:
      "Une équipe formée au secours technique, disponible en tout temps, pour les situations où un animal ne peut pas s'en sortir seul et où personne sur place n'a l'équipement pour intervenir sans danger.",
    image: "/images/hero-accueil.jpg",
    blocs: [
      {
        titre: "Les interventions que nous faisons",
        liste: [
          "Travail en hauteur: arbres, toits, pylônes, structures",
          "Espaces clos: égouts, puisards, cheminées, murs, conduits",
          "Milieux instables: glace, berges, cours d'eau",
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
          "Nous intervenons pour les citoyens, les services animaliers municipaux, les services de police et d'incendie, les refuges, les entreprises et les gestionnaires d'immeubles. Le service est offert sur l'ensemble du territoire de la Communauté Métropolitaine de Montréal.",
        ],
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Signaler un animal", principal: true },
      { href: "/territoire", libelle: "Voir le territoire desservi" },
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
          "Un chat perché à quinze mètres, un raton laveur dans un conduit municipal, un cerf blessé dans un parc, une famille de canards dans un puisard: ce sont des appels que reçoivent les services animaliers, les travaux publics et parfois le 911. Ils demandent du matériel de cordage certifié, une formation en espace clos et une connaissance du comportement animal.",
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
      { href: "/territoire", libelle: "Voir le territoire desservi", principal: true },
    ],
  },

  patreon: {
    surtitre: "Soutien mensuel",
    titre: "Devenir Patreon",
    intro:
      "Patreon permet un soutien financier régulier plutôt qu'un don unique. Pour une organisation qui ne reçoit aucune subvention, cette stabilité change tout: elle permet de planifier l'équipement, l'entretien des véhicules et le remplacement du matériel de sauvetage.",
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
      "Sauvetage Animal Rescue offre des formations aux propriétaires d'animaux ainsi qu'à toute personne appelée à interagir avec des animaux dans le cadre de son travail: milieu animalier, services de police et d'incendie, entreprises.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Trois parcours",
        liste: [
          "Initiation Secours Animal: 25 modules, 8 heures, une journée",
          "Premiers Secours Animal: 50 modules, 16 heures",
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
      "Une journée pour être mieux outillé face à une situation d'urgence impliquant votre animal: reconnaître les signes de détresse, poser les gestes appropriés et assurer un transport rapide vers un établissement vétérinaire.",
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
          "Un animal présent sur une scène d'intervention change la donne: il peut blesser un intervenant, s'enfuir vers la circulation, empêcher l'accès à une victime ou compliquer une évacuation. Nos formations visent à réduire ces risques pour les citoyens, pour les intervenants et pour les animaux eux-mêmes.",
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
      "Pour un animal en détresse, appelez la ligne de signalement, jour et nuit. Pour une demande de service, un partenariat, une question des médias ou toute autre raison, voici comment nous rejoindre.",
    blocs: [
      {
        encadre: {
          titre: "Téléphone",
          lignes: [
            "Ligne de signalement: 514-773-3911",
            "Sans frais: 833-773-3911",
            "Officier de garde: 514-270-3636",
            "Télécopieur: 438-238-4481",
          ],
        },
      },
      {
        encadre: {
          titre: "Courriel et adresse",
          lignes: [
            "Renseignements généraux: info@sar.quebec",
            "Direction générale: e.dussault@sar.quebec",
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
      "Cette politique explique quels renseignements Sauvetage Animal Rescue recueille lorsque vous utilisez ce site, pourquoi nous les recueillons, combien de temps nous les conservons et à qui ils peuvent être communiqués.",
    sansIndexation: false,
    blocs: [
      {
        titre: "Ce que nous recueillons",
        liste: [
          "Signalements: nom, téléphone, courriel, adresse où se trouve l'animal et description de la situation.",
          "Adhésions: nom, courriel, téléphone, ville, code postal et renseignements de facturation traités par Stripe.",
          "Candidatures: coordonnées, disponibilités, expérience et motivation.",
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
      "Les conditions qui s'appliquent à l'utilisation du site sar.quebec, aux adhésions, aux dons et aux inscriptions qui y sont effectués. En utilisant ce site, vous acceptez les conditions décrites ci-dessous.",
    blocs: [
      {
        titre: "Signalements",
        texte: [
          "Le formulaire de signalement en ligne ne remplace pas un appel téléphonique. Pour une urgence, appelez la ligne de signalement. Nous ne garantissons aucun délai d'intervention: les missions sont priorisées selon la gravité et les ressources disponibles.",
        ],
      },
      {
        titre: "Adhésions et dons",
        texte: [
          "Les cotisations et les dons ne sont pas remboursables. Une adhésion est valide jusqu'au 31 décembre de son année d'émission. L'adhésion avec renouvellement automatique se reconduit chaque année et peut être annulée en tout temps depuis l'espace membre; l'annulation prend effet à la fin de la période déjà payée.",
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
