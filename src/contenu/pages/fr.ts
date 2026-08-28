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
        titre: "Êtes-vous sur notre territoire?",
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
      "Notre travail quotidien se concentre dans la Communauté métropolitaine de Montréal. Mais lorsque des animaux, ailleurs dans le monde, ont besoin de notre expertise, nous pouvons déployer une équipe spécialisée pour prêter main-forte sur le terrain.",
    image: "/images/australie-2020.jpg",
    blocs: [
      {
        titre: "Des ressources humaines sur le terrain",
        texte: [
          "Lors d'une catastrophe majeure, l'aide peut prendre plusieurs formes. La nôtre est avant tout opérationnelle. Sauvetage Animal Rescue déploie des intervenants formés, expérimentés et autonomes, accompagnés de l'équipement spécialisé nécessaire pour participer directement aux opérations de secours. Notre objectif n'est pas de remplacer les organisations locales, mais de renforcer leur capacité d'intervention lorsque leurs ressources sont fortement sollicitées. Nous pouvons ainsi nous intégrer aux équipes déjà présentes, partager notre expertise et prendre part concrètement aux opérations de recherche, d'accès, de capture, d'évacuation ou de sauvetage des animaux touchés.",
        ],
      },
      {
        image: {
          fichier: "/images/australie-2020.jpg",
          alt: "Deux intervenantes de dos dans une forêt calcinée",
          legende: "2020 - Gabrielle et Lori en Australie",
        },
      },
      {
        titre: "Australie, février 2020",
        texte: [
          "En février 2020, Sauvetage Animal Rescue s'est rendu en Australie afin de prêter main-forte dans les régions durement touchées par les feux de forêt. Dans un environnement profondément transformé par les incendies, notre équipe a dû composer avec des forêts calcinées, des arbres fragilisés, des conditions de terrain difficiles et une faune très différente de celle avec laquelle nous intervenons habituellement. Kangourous, wallabies, wombats, échidnés, koalas et oiseaux comptaient parmi les nombreuses espèces affectées par cette catastrophe. Cette mission a exigé une grande capacité d'adaptation, une vigilance constante et la mise en pratique de notre expertise dans un contexte d'intervention complètement nouveau.",
        ],
      },
      {
        titre: "Proposer une mission ou une collaboration",
        texte: [
          "Les organisations qui souhaitent soumettre une demande de déploiement international, discuter d'une collaboration ou évaluer la possibilité d'un soutien opérationnel peuvent communiquer directement avec la direction générale de Sauvetage Animal Rescue à e.dussault@sar.quebec",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/missions-nationales", libelle: "Missions nationales" },
    ],
  },

  "missions-nationales": {
    surtitre: "Hors territoire",
    titre: "Missions nationales",
    intro:
      "Lorsqu'un sinistre majeur touche une communauté et que des animaux ont besoin d'assistance, Sauvetage Animal Rescue peut être déployé partout au pays afin de soutenir les autorités et les équipes locales directement sur le terrain.",
    image: "/images/sainte-marthe-2019.jpg",
    blocs: [
      {
        titre: "Renforcer les équipes sur le terrain",
        texte: [
          "Lors d'une intervention d'envergure, les ressources locales peuvent rapidement être mises à rude épreuve. Sauvetage Animal Rescue peut alors être appelé en renfort afin d'ajouter une capacité opérationnelle spécialisée aux équipes déjà mobilisées. Nous déployons des intervenants formés, expérimentés et autonomes, accompagnés de l'équipement nécessaire pour participer directement aux opérations de secours. Notre rôle est de nous intégrer à la structure en place, de travailler en collaboration avec les autorités et les organisations locales, puis d'apporter notre expertise là où elle peut faire une différence concrète pour les animaux touchés.",
        ],
      },
      {
        image: {
          fichier: "/images/mission-sainte-marthe.jpg",
          alt: "Intervention en zone inondée à Sainte-Marthe-sur-le-Lac",
          legende: "2019 - Sainte-Marthe-sur-le-Lac",
        },
      },
      {
        titre: "Sainte-Marthe-sur-le-Lac, avril 2019",
        texte: [
          "En avril 2019, la rupture d'une digue à Sainte-Marthe-sur-le-Lac a provoqué d'importantes inondations et forcé l'évacuation de milliers de résidents. Pendant trois jours, une équipe de 15 intervenants de Sauvetage Animal Rescue a été déployée dans la zone sinistrée afin d'aller chercher les animaux demeurés dans les résidences évacuées. Au total, notre équipe est intervenue dans 125 domiciles inondés et a évacué 171 animaux. Un poste de commandement ainsi qu'un refuge temporaire ont été mis en place pour soutenir les opérations et accueillir les animaux secourus. La mission s'est déroulée en collaboration avec la Sûreté du Québec, les services policiers municipaux et les services incendie présents sur le terrain.",
        ],
      },
      {
        image: {
          fichier: "/images/mission-abitibi.jpg",
          alt: "Déploiement en Abitibi-Témiscamingue pendant les feux de forêt",
          legende: "2023 - Abitibi-Témiscamingue",
        },
      },
      {
        titre: "Abitibi-Témiscamingue, juin 2023",
        texte: [
          "En juin 2023, alors que d'importants feux de forêt frappaient l'Abitibi-Témiscamingue, Sauvetage Animal Rescue a déployé une équipe afin de soutenir les animaux, les communautés et les organisations touchés par la situation. Notre intervention nous a conduits dans plusieurs secteurs de la région, notamment à Amos, Rouyn-Noranda, Val-d'Or, Senneterre, La Sarre, Normétal ainsi qu'à Kitcisakik. Sur le terrain, notre équipe a notamment participé à l'évacuation de chiens vers des refuges et prêté assistance aux organismes déjà mobilisés. Nous avons également acheminé d'importantes quantités de nourriture, ainsi que des cages, des transporteurs et du matériel destinés à soutenir les opérations. Cette mission illustre bien la polyvalence d'un déploiement national: intervenir directement lorsque nécessaire, mais aussi renforcer concrètement les capacités des ressources locales.",
        ],
      },
      {
        image: {
          fichier: "/images/mission-stoneham.jpg",
          alt: "Hélicoptère en ravitaillement à Stoneham",
          legende: "2025 - Ravitaillement héliporté à Stoneham",
        },
      },
      {
        titre: "Stoneham, mars 2025",
        texte: [
          "En mars 2025, le débordement de la rivière Cachée a emporté un pont et complètement isolé près de 90 chiens d'Aventures Nord-Bec, à Stoneham. Privés de tout accès terrestre, les animaux ne pouvaient plus recevoir normalement la nourriture et les soins dont ils avaient besoin. Sauvetage Animal Rescue a alors coordonné une opération de ravitaillement par hélicoptère afin d'acheminer d'importantes quantités de nourriture et de matériel sur le site. L'opération a également permis de transporter du personnel jusqu'aux installations afin qu'une présence humaine puisse être maintenue auprès des chiens. Notre équipe a été déployée sur le terrain pour coordonner la logistique et les opérations héliportées nécessaires au maintien de leur prise en charge.",
        ],
      },
      {
        titre: "Pourquoi nous répondons",
        texte: [
          "Un plan de sécurité civile prévoit l'évacuation des personnes. Presque aucun ne prévoit celle des animaux, et beaucoup de gens refusent de partir sans les leurs. Une équipe capable d'aller les chercher retire donc un obstacle à l'évacuation elle-même.",
          "C'est ce que nous apportons lors d'un sinistre: une capacité que les services d'urgence n'ont pas à développer, et qu'ils peuvent appeler.",
        ],
      },
      {
        titre: "Planification et sécurité civile",
        texte: [
          "Les municipalités, services d'urgence et organisations qui souhaitent intégrer la prise en charge des animaux à leur plan de sécurité civile peuvent prévoir à l'avance la participation de Sauvetage Animal Rescue lors d'un sinistre ou d'une intervention majeure. Pour discuter d'une entente, d'un protocole de collaboration ou des modalités de déploiement, communiquez directement avec la direction générale à e.dussault@sar.quebec",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/missions-internationales", libelle: "Missions internationales" },
    ],
  },

  "foire-aux-questions": {
    surtitre: "Vos questions, nos réponses",
    titre: "Foire aux questions",
    intro:
      "Un aperçu des questions qu'on nous pose le plus souvent, sur notre mission, notre territoire, l'adhésion et les dons. Pour tout le reste, la direction générale vous répond directement.",
    image: "/images/hero-accueil.jpg",
    blocs: [
      {
        questions: [
          {
            question: "Qu'est-ce que Sauvetage Animal Rescue?",
            reponse:
              "Sauvetage Animal Rescue est une équipe de secours et de sauvetage technique pour les animaux. Nous ne sommes pas un refuge: nous intervenons directement sur le terrain pour sécuriser un animal en détresse, puis nous le remettons à un refuge, au service animalier municipal ou à son propriétaire, selon la situation.",
          },
          {
            question: "Sur quel territoire intervenez-vous?",
            reponse:
              "Nous intervenons sur l'ensemble du territoire de la Communauté métropolitaine de Montréal: 82 municipalités réparties dans cinq régions administratives, Montréal, Laval, la Montérégie, les Laurentides et Lanaudière. Vérifiez si votre municipalité en fait partie sur notre page [Territoire desservi](/territoire).",
          },
          {
            question: "Comment signaler un animal en détresse?",
            reponse:
              "Composez notre ligne de signalement au 514-773-3911, ou sans frais au 1-833-773-3911, jour et nuit. Le formulaire de signalement en ligne mène à la même file de répartition: dans les deux cas, notre équipe analyse le signalement et communique avec vous dans les meilleurs délais.",
          },
          {
            question: "Puis-je vous amener un animal trouvé, ou en adopter un?",
            reponse:
              "Non. Sauvetage Animal Rescue n'est pas un refuge et ne fait pas d'adoption. Un animal que nous secourons est remis à un refuge, au service animalier municipal ou à son propriétaire, selon le cas. Pour une adoption, adressez-vous à votre service animalier municipal ou à un refuge.",
          },
          {
            question: "Pourquoi devenir membre?",
            reponse:
              "Sauvetage Animal Rescue ne reçoit aucun financement public ni subvention gouvernementale. Ce sont les adhésions et les dons de nos membres qui financent nos interventions, notamment lorsqu'aucun propriétaire ou organisme ne peut raisonnablement en assumer les frais.",
          },
          {
            question: "Comment faire un don?",
            reponse:
              "Le formulaire de don accepte un don ponctuel ou mensuel, par carte. Une confirmation vous est envoyée par courriel une fois le paiement complété.",
          },
          {
            question: "Est-ce que je reçois un reçu pour fins d'impôt?",
            reponse:
              "Non. Sauvetage Animal Rescue est un organisme à but non lucratif provincial, mais n'a pas le statut d'organisme de bienfaisance enregistré auprès de l'Agence du revenu du Canada. La confirmation de don envoyée par courriel n'est donc pas un reçu aux fins de l'impôt.",
          },
          {
            question: "Comment devenir bénévole ou intervenant?",
            reponse:
              "Sauvetage Animal Rescue recrute des répartiteurs, des messagers, des secouristes et des sauveteurs. La page Recrutement présente les postes ainsi que le stage d'observation qui précède l'engagement.",
          },
          {
            question: "Intervenez-vous en dehors de la Communauté métropolitaine de Montréal?",
            reponse:
              "Notre activité quotidienne se concentre sur ce territoire, mais nous pouvons être déployés ailleurs au pays ou à l'international lors d'un sinistre majeur, en renfort des équipes locales déjà mobilisées.",
          },
          {
            question: "Comment associer mon entreprise ou ma municipalité à Sauvetage Animal Rescue?",
            reponse:
              "Les entreprises peuvent devenir partenaires officiels, et les municipalités peuvent conclure une entente de services. Écrivez à la direction générale à e.dussault@sar.quebec pour en discuter.",
          },
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/contact", libelle: "Nous joindre" },
    ],
  },

  medias: {
    surtitre: "Couverture médiatique",
    titre: "Dans les médias",
    intro:
      "La singularité de nos interventions attire régulièrement l'attention des médias. Qu'il s'agisse de couvrir nos opérations ou de commenter l'actualité animalière, Sauvetage Animal Rescue est devenu une référence fréquemment sollicitée.",
    image: "/images/medias-entrevue.jpg",
    blocs: [
      {
        titre: "Une expertise qui fait l'actualité",
        texte: [
          "Les interventions de Sauvetage Animal Rescue se retrouvent régulièrement dans l'actualité en raison de leur caractère souvent inhabituel, spectaculaire ou hautement spécialisé. Télévision, radio, presse écrite et médias numériques font appel à notre organisation pour documenter certaines opérations sur le terrain, mais également pour expliquer les réalités entourant le sauvetage et la protection des animaux. Notre équipe est aussi appelée à commenter différents enjeux qui touchent le monde animalier et à mettre son expertise à la disposition des journalistes. Cette visibilité contribue à mieux faire connaître notre travail, mais surtout à sensibiliser le public aux réalités du secours animalier.",
        ],
      },
      {
        image: {
          fichier: "/images/medias-terrain.jpg",
          alt: "Entrevue accordée à une équipe de télévision sur le terrain",
        },
      },
      {
        titre: "Revue de presse",
        composant: "presse",
      },
      {
        titre: "Demandes médias et entrevues",
        texte: [
          "Les journalistes et représentants des médias qui souhaitent réaliser une entrevue, valider une information, obtenir un commentaire ou mieux comprendre nos opérations peuvent communiquer directement avec Sauvetage Animal Rescue. Il est également possible, selon la nature de la demande et les contraintes opérationnelles, d'organiser une présence ou une période d'observation sur le terrain afin de documenter notre travail de façon plus immersive. Pour toute demande médiatique, communiquez directement avec la direction générale à e.dussault@sar.quebec",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/serie-televisee", libelle: "Série télévisée" },
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

  solutions: {
    surtitre: "Pour qui nous intervenons",
    titre: "Solutions",
    intro:
      "Un raton laveur dans un cimetière, des goélands sur un entrepôt, un chevreuil sur une piste d'aéroport: le problème n'est jamais tout à fait le même selon le milieu. Voici les secteurs où nous intervenons et ce que nous y faisons.",
    image: "/images/carte-services.jpg",
    blocs: [
      {
        titre: "Les milieux que nous desservons",
        liste: [
          "Municipalités",
          "Services animaliers",
          "Centrales 311 et 911",
          "Sécurité publique",
          "Bases militaires",
          "Hôpitaux et résidences",
          "Écoles et universités",
          "Transports en commun",
          "Aéroports",
          "Installations portuaires",
          "Entreprises et usines",
          "Centres commerciaux",
          "Parcs d'attractions",
          "Tours cellulaires et télécommunications",
          "Cimetières",
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
    surtitre: "À la demande des autorités",
    titre: "Inspection et évaluation",
    intro:
      "À la demande des autorités, Sauvetage Animal Rescue peut procéder à l'inspection d'un milieu de vie ou coordonner l'évaluation d'un animal jugé potentiellement dangereux, selon un processus structuré, documenté et sécuritaire.",
    image: "/images/inspection-milieu.jpg",
    blocs: [
      {
        titre: "Inspection du milieu de vie",
        texte: [
          "À la demande d'une municipalité ou d'une autre autorité compétente, nos intervenants peuvent se rendre sur place afin d'évaluer les conditions dans lesquelles un animal est gardé. L'inspection vise notamment à vérifier si le milieu de vie respecte les exigences applicables en matière de garde et de bien-être animal. L'accès à l'eau et à la nourriture, l'état général des installations, la propreté des lieux, la sécurité des aménagements ainsi que les conditions de garde à l'intérieur et à l'extérieur peuvent faire partie des éléments observés. Les constatations sont documentées afin de fournir aux autorités l'information nécessaire pour assurer un suivi approprié du dossier.",
        ],
      },
      {
        image: {
          fichier: "/images/inspection-evaluation.jpg",
          alt: "Intervenants en inspection sur le terrain",
        },
      },
      {
        titre: "Évaluation des animaux dangereux",
        texte: [
          "Lorsqu'un animal présente un comportement préoccupant ou fait l'objet d'un dossier de dangerosité, Sauvetage Animal Rescue peut coordonner les différentes étapes nécessaires à son évaluation. Notre équipe peut assurer la sécurisation de l'animal, sa prise en charge et son transport vers les ressources spécialisées appropriées. L'évaluation comportementale est réalisée avec la collaboration de professionnels qualifiés, notamment des vétérinaires et des spécialistes du comportement animal, afin de documenter le niveau de risque et les circonstances entourant le comportement observé. Notre rôle consiste à encadrer l'intervention de façon sécuritaire et structurée, depuis la prise en charge initiale jusqu'à la remise du rapport aux autorités concernées.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/services/secours-animalier", libelle: "Secours animalier" },
    ],
  },

  "services/capture": {
    surtitre: "Sans blesser l'animal",
    titre: "Capture",
    intro:
      "Capturer un animal en détresse exige de comprendre son comportement, de choisir la bonne méthode et de protéger autant l'animal que l'intervenant. Nos équipes privilégient toujours une capture sécuritaire, contrôlée et sans contact inutile.",
    image: "/images/capture-bateau.jpg",
    blocs: [
      {
        titre: "Capturer sans blesser",
        texte: [
          "Une opération de capture vise d'abord à prendre le contrôle d'un animal de façon sécuritaire, en limitant au maximum le stress, les risques de blessures et les contacts directs avec les intervenants. Le choix de la méthode dépend de l'espèce, de son comportement, de son état physique, de l'environnement et du niveau de risque. Nos équipes disposent de différentes techniques et d'équipements spécialisés permettant d'adapter chaque intervention à la situation. Lorsque possible, nous privilégions toujours la méthode la moins invasive et la plus sécuritaire, autant pour l'animal que pour les personnes présentes.",
        ],
      },
      {
        image: {
          fichier: "/images/capture-dynamique.jpg",
          alt: "Capture à l'aide d'outils manuels spécialisés",
        },
      },
      {
        titre: "Capture dynamique",
        texte: [
          "La capture dynamique implique une intervention directe du sauveteur à l'aide d'outils manuels spécialisés. Filets, perches de capture, pinces adaptées et autres dispositifs permettent de contrôler et de sécuriser l'animal tout en maintenant une distance entre celui-ci et l'intervenant. Cette approche réduit notamment les risques de morsure, de griffure ou de transmission de maladies. Elle demande une bonne lecture du comportement animal, de la coordination et la capacité d'adapter rapidement la technique utilisée aux réactions de l'animal.",
        ],
      },
      {
        image: {
          fichier: "/images/capture-mecanique.jpg",
          alt: "Cage de capture refermée sur des ratons laveurs",
        },
      },
      {
        titre: "Capture mécanique",
        texte: [
          "La capture mécanique repose sur l'utilisation de dispositifs conçus pour contenir l'animal sans qu'un sauveteur ait à intervenir directement au moment de la capture. Il peut s'agir d'une cage de capture à déclenchement automatique, qui se referme lorsque l'animal y entre, ou d'une cage tombante, abaissée autour de l'animal au moment opportun. Selon le dispositif et les circonstances, le déclenchement peut être effectué manuellement à distance ou à l'aide d'un mécanisme électronique. Cette méthode est particulièrement utile lorsqu'une approche directe risquerait de faire fuir l'animal ou d'augmenter son niveau de stress.",
        ],
      },
      {
        image: {
          fichier: "/images/capture-telesedation.jpg",
          alt: "Intervention de capture avec équipement spécialisé",
        },
      },
      {
        titre: "Capture chimique et télésédation",
        texte: [
          "Dans certaines situations exceptionnelles, les méthodes conventionnelles ne permettent pas de sécuriser l'animal sans augmenter les risques pour celui-ci ou pour les intervenants. La capture chimique, aussi appelée télésédation, peut alors être envisagée. Elle consiste à administrer à distance un médicament sédatif au moyen d'une fléchette projetée par un équipement spécialisé. Chez Sauvetage Animal Rescue, ce type d'intervention est réalisé en présence et sous la responsabilité d'un vétérinaire. La télésédation demeure une solution de dernier recours, utilisée lorsque les méthodes dynamiques ou mécaniques ne permettent pas d'effectuer la capture de façon suffisamment sécuritaire.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/services/secours-animalier", libelle: "Secours animalier" },
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
    titre: "Secours animalier",
    intro:
      "Le secours animalier consiste à intervenir lorsqu'un animal est blessé, malade, affaibli, piégé ou autrement en détresse. C'est le coeur de nos opérations quotidiennes et la forme d'intervention que nous réalisons le plus souvent.",
    image: "/images/carte-signalement.jpg",
    blocs: [
      {
        titre: "Porter assistance aux animaux en détresse",
        texte: [
          "Les situations auxquelles nos équipes répondent sont extrêmement variées. Nous intervenons auprès d'animaux blessés, malades, affaiblis ou agonisants, mais également auprès de jeunes animaux orphelins ou en situation de vulnérabilité. Nos sauveteurs peuvent être appelés lorsqu'un animal est coincé dans une clôture, un grillage ou un filet, enfermé dans un bâtiment, un véhicule ou un conteneur, ou lorsqu'un animal de la faune urbaine se trouve en détresse. Nous portons également assistance aux oiseaux blessés ou empêtrés dans des lignes à pêche. Dans chacun de ces cas, l'objectif demeure le même: sécuriser l'animal et lui donner accès rapidement aux ressources dont il a besoin.",
        ],
      },
      {
        image: {
          fichier: "/images/secours-rue.jpg",
          alt: "Deux intervenants dans la rue, l'un avec un filet, l'autre portant un oiseau",
        },
      },
      {
        titre: "Exemples de situations",
        liste: [
          "Écureuil orphelin tombé du nid",
          "Bernache blessée à une aile",
          "Goéland pris dans du fil à pêche",
          "Canard avec un hameçon au bec",
          "Marmotte blessée par une flèche",
          "Chat heurté par un véhicule",
          "Chien abandonné et attaché",
          "Moufette avec troubles neurologiques",
          "Rat musqué coincé dans une clôture",
          "Pigeon incapable de voler",
          "Raton laveur orphelin",
          "Chat coincé dans un moteur",
          "Raton laveur pris dans un conteneur",
          "Lapin à queue blanche orphelin",
          "Tortue blessée",
          "Castor agonisant",
        ],
      },
      {
        titre: "Qui finance nos interventions",
        texte: [
          "Une grande partie de nos opérations auprès d'animaux trouvés dans des lieux publics est rendue possible grâce à la **[contribution de nos membres](/membre)**. Leur soutien permet notamment de financer des interventions lorsqu'aucun citoyen, propriétaire ou organisme ne peut raisonnablement en assumer les frais. Les municipalités, entreprises, institutions et autres organisations peuvent également conclure une entente de services avec Sauvetage Animal Rescue. Ces ententes prévoient les modalités d'intervention et de facturation, tout en donnant accès à une ligne directe disponible 24 heures sur 24. Elles permettent surtout d'établir à l'avance un cadre clair, rapide et efficace lorsqu'une situation exige notre intervention.",
        ],
      },
      {
        titre: "Une chaîne, pas un geste isolé",
        texte: [
          "Une intervention ne commence pas lorsque nos sauveteurs arrivent sur place et ne se termine pas lorsque l'animal est entre leurs mains. Elle s'inscrit dans une véritable chaîne de secours qui débute avec le citoyen, le service d'urgence ou l'organisation qui nous signale la situation. Après l'intervention vient ensuite la prise en charge: transport vers une clinique vétérinaire, un refuge, un service animalier ou une ressource spécialisée selon les besoins de l'animal. Nos messagers et messagères jouent un rôle essentiel dans cette chaîne en assurant ces transports, permettant ainsi aux équipes de terrain de demeurer disponibles pour répondre à une nouvelle urgence.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/signalement", libelle: "Signaler un animal" },
    ],
  },

  "services/sauvetage-technique": {
    surtitre: "Là où personne d'autre ne va",
    titre: "Sauvetage technique",
    intro:
      "Lorsque des animaux se retrouvent dans des environnements périlleux ou difficiles d'accès, nos sauveteurs déploient des techniques spécialisées et de l'équipement homologué afin de les atteindre, les sécuriser et les ramener en sécurité.",
    image: "/images/sauvetage-technique.jpg",
    blocs: [
      {
        titre: "Aller là où l'animal se trouve",
        texte: [
          "Les animaux ont parfois le don de se retrouver dans des endroits où personne ne devrait avoir à aller les chercher. En hauteur, sous terre, sur l'eau, sur la glace, dans un espace restreint ou au coeur d'une structure complexe, ces interventions exigent des compétences qui dépassent largement le secours animalier conventionnel. Sauvetage Animal Rescue a développé une expertise spécifiquement adaptée à ces environnements périlleux et constitue la seule équipe de sauvetage technique de ce genre au Canada. Notre rôle est simple à définir, mais exigeant à accomplir: rejoindre l'animal là où il se trouve, le sécuriser et l'évacuer sans compromettre la sécurité de nos intervenants.",
        ],
      },
      {
        image: {
          fichier: "/images/technique-019.jpg",
          alt: "Sauveteurs en intervention technique",
        },
      },
      {
        titre: "Exemples d'interventions",
        liste: [
          "Chat coincé dans un arbre",
          "Moufette tombée dans un puits",
          "Renard blessé dans un ponceau",
          "Chevreuil coincé sur la glace",
          "Chien à la dérive",
          "Chien coincé sur une paroi rocheuse",
          "Castor coincé dans une écluse",
          "Pigeon suspendu à un panneau publicitaire",
          "Goéland accroché à une corniche",
          "Oiseau coincé dans une tour de télécommunications",
          "Marmotte blessée sous un cabanon",
          "Canetons coincés dans un égout",
          "Raton laveur coincé dans un manège",
        ],
      },
      {
        titre: "Une discipline qui ne s'improvise pas",
        texte: [
          "Le sauvetage technique impose des exigences élevées en matière de formation, d'équipement et de santé-sécurité. Cordes, harnais, systèmes d'ancrage, dispositifs antichute et autres équipements spécialisés doivent être adaptés à leur utilisation, inspectés et entretenus avec rigueur. Nos cordes et nos équipements critiques font notamment l'objet d'un suivi permettant d'en documenter l'utilisation et l'état. Chaque intervention exige également une évaluation des risques, une méthode de travail adaptée et des sauveteurs formés aux techniques utilisées. Dans un environnement périlleux, la sécurité n'est jamais un détail: elle fait partie intégrante de l'opération, du premier accès jusqu'au retour de l'équipe au sol.",
        ],
      },
      {
        image: {
          fichier: "/images/technique-020.jpg",
          alt: "Intervention de sauvetage technique en hauteur",
        },
      },
      {
        titre: "Qui finance nos interventions",
        texte: [
          "**[Nos membres](/membre)** jouent un rôle essentiel dans le financement des opérations de sauvetage technique réalisées lorsqu'aucun propriétaire ou organisme ne peut raisonnablement en assumer les coûts, notamment lorsqu'un animal se retrouve en détresse dans un lieu public. Ces interventions nécessitent souvent des équipements spécialisés, des véhicules et plusieurs intervenants. Les municipalités, entreprises, institutions et autres organisations peuvent également conclure une entente de services avec Sauvetage Animal Rescue. Ces ententes permettent de déterminer à l'avance les modalités d'intervention et de facturation, tout en donnant accès à une ligne directe disponible 24 heures sur 24 lorsqu'une situation nécessite notre expertise.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Devenir membre", principal: true },
      { href: "/services/secours-animalier", libelle: "Secours animalier" },
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
