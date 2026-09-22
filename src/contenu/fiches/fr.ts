import type { CatalogueFiches } from "./types";

export const FICHES_FR: CatalogueFiches = {
  "animal-autoroute": {
    titre: "Animal sur une autoroute",
    resume:
      "Un animal sur une autoroute peut créer un danger pour lui-même, les automobilistes et les intervenants. Apprenez à signaler la situation de façon sécuritaire, à transmettre les bonnes informations et à joindre la ressource appropriée.",
    intro: [
      "Un animal aperçu sur une autoroute ou en bordure des voies peut se trouver en détresse et présenter un risque pour la circulation. Le signalement doit permettre aux autorités de localiser la situation et d’en évaluer les risques.",
      "Communiquez avec Québec 511, le service du ministère des Transports et de la Mobilité durable qui reçoit les signalements sur le réseau routier. En cas de danger immédiat pour les personnes ou la circulation, appelez le 911.",
    ],
    contact: {
      titre: "La ressource à contacter",
      texte:
        "Pour un animal sur une autoroute ou près des voies, privilégiez l’appel téléphonique à Québec 511.",
      lignes: [
        "Ministère des Transports et de la Mobilité durable du Québec",
        "Québec 511: signalement d’une situation dangereuse ou à risque",
        "511, option 2",
        "1-888-355-0511, option 2",
        "24 h sur 24, 7 jours sur 7",
      ],
      actions: [
        { href: "tel:511", libelle: "Appeler Québec 511", principal: true },
        { href: "tel:+18883550511", libelle: "1-888-355-0511" },
        { href: "tel:911", libelle: "Danger immédiat: appeler le 911" },
      ],
    },
    faire: [
      "Indiquez le numéro de l’autoroute ou de la route ainsi que le sens de circulation.",
      "Donnez la sortie, la borne kilométrique ou un autre repère identifiable.",
      "Précisez si l’animal est dans une voie, sur l’accotement, dans le terre-plein ou en bordure.",
      "Décrivez le type d’animal, sa taille approximative, le nombre d’animaux et son état apparent, sans vous approcher pour le vérifier.",
      "Mentionnez l’heure de l’observation, sa direction s’il se déplace et les risques constatés pour la circulation.",
      "Appelez le 911 lorsqu’il y a un danger immédiat pour les personnes ou que des véhicules freinent ou font des écarts.",
    ],
    eviter: [
      "Poursuivre l’animal ou tenter de le capturer dans la circulation.",
      "Entrer sur les voies, improviser un barrage ou vous arrêter pour observer ou photographier l’animal.",
      "Retourner sur les voies pour compléter le signalement ou obtenir une photo.",
      "Déplacer un animal qui semble décédé: ne présumez pas que son immobilité confirme le décès.",
    ],
    appeler: [
      "Québec 511 pour un signalement sur une autoroute ou le réseau relevant du ministère des Transports et de la Mobilité durable.",
      "Le 911 si la situation présente un danger immédiat pour les personnes ou la circulation.",
      "Votre municipalité ou le service animalier local pour une rue municipale, lorsque la situation ne présente pas de danger immédiat.",
    ],
    sections: [
      {
        titre: "Pourquoi Sauvetage Animal Rescue ne peut pas intervenir seul",
        texte: [
          "Sauvetage Animal Rescue ne peut intervenir en bordure d’une autoroute sans la collaboration ou, à tout le moins, l’autorisation du ministère des Transports ou de la Sûreté du Québec. La proximité des véhicules exige une coordination avec les autorités avant toute intervention.",
          "Une demande transmise à Sauvetage Animal Rescue ne signifie donc pas qu’une équipe peut procéder immédiatement à une capture. L’autorisation ou la collaboration des autorités ne constitue pas, à elle seule, une confirmation de déploiement de notre équipe.",
        ],
      },
      {
        titre: "Grande faune, animal immobile et rues municipales",
        texte: [
          "Le gouvernement du Québec recommande aussi le 511 pour signaler une situation dangereuse ou inhabituelle impliquant un cerf, un orignal ou un autre grand mammifère. En conduisant, surveillez les abords de la route, respectez la vitesse permise et, lorsqu’une collision est imminente, ralentissez et freinez progressivement sans manœuvre brusque.",
          "Si l’animal semble décédé, signalez son emplacement et son état apparent sans vous exposer pour vérifier s’il respire. Cette fiche concerne d’abord les autoroutes et le réseau relevant du ministère. Sur une rue municipale, la ressource peut être différente; vérifiez auprès de la municipalité ou du service animalier local.",
        ],
      },
    ],
    sources: [
      {
        libelle: "Coordonnées et signalements au ministère des Transports",
        href: "https://www.quebec.ca/gouvernement/ministeres-organismes/transports/coordonnees-structure/generales",
      },
      {
        libelle: "Circuler en présence de la grande faune",
        href: "https://www.quebec.ca/transports/circulation-securite-routiere/regles-conseils-vehicules/presence-grande-faune",
      },
      {
        libelle: "Restrictions pour arrêter un véhicule sur un chemin public",
        href: "https://www.quebec.ca/transports/circulation-securite-routiere/regles-conseils-vehicules/arreter-vehicule-chemin-public",
      },
    ],
    question: "Qui appeler pour un animal sur une autoroute?",
    reponse:
      "Appelez Québec 511, option 2, afin de signaler la situation sur le réseau routier. En cas de danger immédiat pour les personnes ou la circulation, appelez le 911. Ne tentez pas de capturer l’animal ni de vous arrêter sur les voies.",
  },
  "chat-dans-un-arbre": {
    titre: "Un chat est coincé dans un arbre",
    resume:
      "Combien de temps attendre, pourquoi il ne redescend pas seul et à quel moment il faut appeler.",
    intro: [
      "C'est l'appel le plus fréquent que nous recevons. Un chat monte sans difficulté, parce que ses griffes sont courbées vers l'arrière et le poussent vers le haut. Ces mêmes griffes l'empêchent de descendre la tête la première, et beaucoup de chats n'ont jamais appris à redescendre à reculons.",
      "La croyance selon laquelle un chat finit toujours par redescendre de lui-même est fausse. Un chat effrayé se fige, monte encore plus haut au moindre bruit, et peut rester perché plusieurs jours sans boire.",
    ],
    faire: [
      "Notez l'heure à laquelle vous l'avez vu monter: c'est la première question qu'on vous posera.",
      "Éloignez les chiens, les enfants et les curieux du pied de l'arbre.",
      "Déposez sa nourriture habituelle et un bol d'eau au pied de l'arbre, puis reculez et observez de loin.",
      "Parlez-lui calmement, sans crier son nom de façon répétée.",
      "Prenez une photo de loin qui montre la hauteur et la branche où il se trouve.",
      "Si la nuit approche et qu'il n'a pas bougé depuis douze heures, appelez.",
    ],
    eviter: [
      "Monter vous-même dans l'arbre ou y appuyer une échelle: la majorité des blessures graves liées à ces situations arrivent à des humains, pas à des chats.",
      "Secouer la branche ou l'arroser au boyau: il montera plus haut.",
      "Laisser un chien au pied de l'arbre en espérant qu'il descende.",
      "Appeler les pompiers: ils n'ont ni le mandat ni l'équipement pour ce type d'intervention.",
      "Attendre plus de vingt-quatre heures sans agir, surtout par temps froid ou par canicule.",
    ],
    appeler: [
      "Le chat est perché depuis plus de vingt-quatre heures.",
      "Il est visiblement blessé, ou il pend d'une patte prise dans une fourche.",
      "Il pleure sans arrêt, signe de déshydratation ou d'épuisement.",
      "La température descend sous zéro ou dépasse trente degrés.",
      "Il est monté dans un arbre proche d'une ligne électrique ou d'une route.",
    ],
    sections: [
      {
        titre: "Comment se déroule notre intervention",
        texte: [
          "Un sauveteur formé au travail en hauteur installe un système de cordes indépendant de l'arbre lui-même quand c'est possible, monte lentement pour ne pas déclencher de fuite, et sécurise le chat dans un sac de capture ou une cage souple avant de redescendre. L'opération dure de trente minutes à deux heures selon la hauteur, l'essence de l'arbre et le tempérament du chat.",
          "Une fois au sol, l'animal est examiné sommairement. S'il est déshydraté ou blessé, il est acheminé vers une clinique ou un refuge partenaire.",
        ],
      },
    ],
    question: "Est-ce qu'un chat finit toujours par descendre seul d'un arbre?",
    reponse:
      "Non. Les griffes d'un chat sont courbées vers l'arrière: elles l'aident à monter mais l'empêchent de descendre la tête la première. Un chat effrayé peut rester perché plusieurs jours sans boire. Au-delà de vingt-quatre heures, ou plus tôt par grand froid ou grande chaleur, il faut demander de l'aide.",
  },

  "chatons-errants": {
    titre: "J'ai trouvé des chatons dehors",
    resume:
      "La mère est peut-être à quelques mètres. Voici comment savoir s'ils sont vraiment orphelins avant de les déplacer.",
    intro: [
      "Chaque printemps et chaque été, des gens de bonne foi ramassent des portées entières de chatons qui n'étaient pas abandonnés. Une chatte errante déplace ses petits, part chasser plusieurs heures, et revient. Un chaton retiré à sa mère perd son meilleur soignant.",
      "La première chose à faire n'est pas de les prendre, mais d'observer.",
    ],
    faire: [
      "Observez à distance pendant au moins quatre à six heures, idéalement de plus loin que vous ne le croyez nécessaire: la mère ne reviendra pas si elle vous voit.",
      "Notez si les chatons sont propres, ronds et calmes: c'est le signe d'une mère active.",
      "Saupoudrez un peu de farine autour du nid: des traces de pattes vous diront si elle est revenue.",
      "Mettez-les à l'abri de la pluie et du soleil direct sans les déplacer du secteur.",
      "S'ils sont sales, maigres, froids au toucher ou s'ils pleurent sans arrêt, agissez tout de suite.",
    ],
    eviter: [
      "Donner du lait de vache: les chatons ne le digèrent pas et cela provoque des diarrhées mortelles.",
      "Nourrir un chaton froid: un chaton dont la température est basse ne digère pas et peut mourir de la tétée.",
      "Séparer les chatons entre plusieurs foyers.",
      "Les manipuler longuement si la mère est encore dans le secteur.",
      "Attendre l'automne en se disant qu'ils se débrouilleront: la mortalité des chatons errants du premier hiver est très élevée.",
    ],
    appeler: [
      "Les chatons sont froids, mouillés, blessés, ou couverts de mouches.",
      "La mère est visiblement morte ou blessée.",
      "Aucun retour de la mère après six heures d'observation.",
      "Le nid se trouve sous un capot de voiture, dans un moteur, ou dans un endroit qui va être détruit.",
      "Il y a une colonie de chats sans propriétaire dans le secteur et la situation se répète.",
    ],
    sections: [
      {
        titre: "Réchauffer avant de nourrir",
        texte: [
          "Si vous devez prendre en charge des chatons, la règle est simple: on réchauffe d'abord, on nourrit ensuite. Une bouteille d'eau chaude enveloppée dans une serviette, dans une boîte, suffit. Un chaton doit pouvoir s'éloigner de la source de chaleur s'il a trop chaud.",
          "La nourriture, ce n'est jamais du lait de vache. Une clinique ou un refuge fournira un lait maternisé pour chatons et vous montrera la technique de biberonnage, qui se fait sur le ventre et jamais sur le dos.",
        ],
      },
      {
        titre: "Le fond du problème",
        texte: [
          "Une chatte non stérilisée peut produire deux à trois portées par année. Stériliser une seule femelle errante évite des dizaines de naissances dans la rue. Si vous nourrissez un chat sans propriétaire, la stérilisation est le geste le plus utile que vous puissiez poser.",
        ],
      },
    ],
    question: "Faut-il ramasser des chatons trouvés dehors?",
    reponse:
      "Pas immédiatement. Observez à distance pendant quatre à six heures: la mère part souvent chasser et revient. Des chatons propres, ronds et calmes ont une mère active. Intervenez tout de suite s'ils sont froids, sales, blessés ou s'ils pleurent sans arrêt.",
  },

  "raton-laveur-dans-le-grenier": {
    titre: "Un raton laveur s'est installé dans mon grenier",
    resume:
      "Pourquoi il ne faut jamais boucher le trou avant d'être certain qu'il n'y a pas de petits à l'intérieur.",
    intro: [
      "Une femelle raton laveur cherche un endroit sec, sombre et en hauteur pour mettre bas, entre mars et juin. Un grenier, un vide sous toit ou une cheminée non capuchonnée sont exactement ce qu'elle recherche.",
      "L'erreur la plus coûteuse est de boucher l'ouverture dès qu'on entend du bruit. Si la mère est sortie chasser, elle défoncera votre toiture pour rejoindre ses petits, et si elle est à l'intérieur, vous emmurez une famille entière.",
    ],
    faire: [
      "Écoutez à quel moment de la journée vous entendez du bruit: des couinements aigus en fin d'hiver ou au printemps indiquent presque toujours des petits.",
      "Localisez l'ouverture depuis l'extérieur, souvent au niveau du soffite, de la ventilation de toit ou de la cheminée.",
      "Allumez une lumière vive et laissez une radio parlée en marche dans le grenier: le bruit et la lumière rendent l'endroit peu attrayant.",
      "Attendez que la famille parte d'elle-même, ce qui prend quelques semaines une fois les petits assez grands.",
      "Ensuite seulement, réparez et grillagez toutes les ouvertures.",
    ],
    eviter: [
      "Boucher le trou avant d'être certain que personne n'est à l'intérieur.",
      "Utiliser du poison: l'animal ira mourir dans un mur inaccessible.",
      "Piéger et relâcher très loin: au Québec le déplacement de la faune est encadré, et une mère déplacée laisse ses petits mourir sur place.",
      "Monter vous-même sur un toit en pente pour inspecter.",
      "Approcher un raton laveur qui ne fuit pas, surtout s'il titube ou bave.",
    ],
    appeler: [
      "Un raton laveur est tombé dans un mur, une cheminée ou un conduit et ne peut plus sortir.",
      "Vous avez trouvé des petits sans la mère.",
      "L'animal est blessé, désorienté, actif en plein jour et sans crainte.",
      "Il y a eu contact entre l'animal et une personne ou un animal domestique.",
    ],
    sections: [
      {
        titre: "Un raton laveur en plein jour n'est pas forcément malade",
        texte: [
          "Contrairement à une idée répandue, voir un raton laveur le jour n'est pas en soi un signe de rage. Une mère qui allaite sort chercher à manger à toute heure. Ce qui doit inquiéter, c'est un animal qui titube, tourne en rond, bave abondamment, semble paralysé d'une patte ou ne montre aucune crainte quand on s'approche.",
          "En cas de contact ou de morsure, lavez la plaie abondamment à l'eau savonneuse pendant quinze minutes et communiquez avec Info-Santé au 811 sans attendre.",
        ],
      },
    ],
    question:
      "Que faire si un raton laveur vit dans mon grenier avec des petits?",
    reponse:
      "Ne bouchez surtout pas l'ouverture. Rendez l'endroit inhospitalier avec de la lumière vive et une radio, et attendez que la mère déménage ses petits d'elle-même. Bouchez et grillagez seulement une fois la famille partie, sinon la mère défoncera la toiture pour revenir.",
  },

  "oiseau-blesse": {
    titre: "J'ai trouvé un oiseau blessé",
    resume:
      "Le geste qui sauve tient dans une boîte de carton et une pièce sombre et silencieuse.",
    intro: [
      "Un oiseau sauvage est une proie. Pour lui, être manipulé par un humain équivaut à être capturé par un prédateur, et le stress seul peut le tuer même sans blessure apparente.",
      "Deux causes reviennent constamment: la collision contre une fenêtre et l'attaque par un chat. Dans le second cas, l'urgence est réelle même si l'oiseau semble intact: la salive du chat contient des bactéries qui tuent un oiseau en moins de quarante-huit heures sans traitement.",
    ],
    faire: [
      "Préparez une boîte de carton percée de trous d'aération, garnie d'un linge sans boucles ni fils.",
      "Approchez calmement, couvrez l'oiseau d'une serviette pour lui masquer la vue, et prenez-le doucement en maintenant les ailes contre le corps.",
      "Placez la boîte dans une pièce sombre, silencieuse et tempérée, loin des animaux domestiques et des enfants.",
      "Laissez-le se reposer sans l'ouvrir toutes les cinq minutes.",
      "Si l'oiseau a heurté une fenêtre et qu'il est seulement étourdi, il peut repartir seul après une à deux heures de repos au calme.",
    ],
    eviter: [
      "Lui donner de l'eau ou de la nourriture: un oiseau affaibli aspire le liquide dans ses poumons et se noie.",
      "Le mettre en cage à barreaux: il abîmera son plumage et ses ailes.",
      "Le garder plusieurs jours pour l'apprivoiser: c'est illégal et cela réduit ses chances de retourner à la vie sauvage.",
      "Le manipuler à mains nues s'il s'agit d'un oiseau de proie: les serres, pas le bec, sont l'arme.",
      "Le relâcher tout de suite après une attaque de chat, même s'il semble bien.",
    ],
    appeler: [
      "L'oiseau a été attrapé par un chat ou un chien, même sans blessure visible.",
      "Une aile pend, une patte est cassée, ou il y a du sang.",
      "Il ne s'envole pas après deux heures de repos au calme.",
      "Il s'agit d'un oiseau de proie, d'un héron ou d'un grand oiseau aquatique.",
      "L'oiseau est pris dans un filet, une ligne à pêche, une colle ou un grillage.",
    ],
    sections: [
      {
        titre: "Un oisillon au sol n'est pas toujours en détresse",
        texte: [
          "En juin, beaucoup d'oisillons quittent le nid avant de savoir voler. Ils passent plusieurs jours au sol, sautillant dans l'herbe, pendant que leurs parents continuent de les nourrir. Un oisillon emplumé, alerte, qui se déplace, doit être laissé tranquille: il suffit d'éloigner les chats et de le remettre dans un buisson proche s'il est sur un trottoir.",
          "Un oisillon nu ou couvert de duvet, tombé d'un nid visible, peut être replacé dans ce nid. Contrairement à la croyance populaire, les oiseaux n'abandonnent pas leurs petits pour une odeur humaine.",
        ],
      },
    ],
    question: "Que faire d'un oiseau attrapé par un chat mais qui semble intact?",
    reponse:
      "Il faut le faire soigner sans attendre. La salive du chat contient des bactéries qui provoquent une infection mortelle en moins de quarante-huit heures, même sans plaie visible. Placez-le dans une boîte de carton au calme et faites appel à un service de sauvetage ou à un centre de réhabilitation.",
  },

  "canetons-dans-une-grille-degout": {
    titre: "Des canetons sont tombés dans une grille d'égout",
    resume:
      "Une situation classique du printemps, et une course contre la montre pendant que la mère attend juste à côté.",
    intro: [
      "Chaque printemps, des cane colverts nichent dans des cours, des stationnements ou des terre-pleins, parfois loin de tout point d'eau. Au moment où la couvée suit sa mère vers l'eau, les grilles d'égout constituent le piège le plus meurtrier du parcours.",
      "La bonne nouvelle: la mère reste presque toujours à proximité, parfois plusieurs heures. Tant qu'elle est là, une réunification est possible, et c'est de très loin le meilleur dénouement.",
    ],
    faire: [
      "Repérez la mère et ne la faites pas fuir: sans elle, les canetons devront être élevés en centre de réhabilitation.",
      "Comptez les canetons visibles ou audibles dans la grille.",
      "Bloquez la circulation autour de la grille si c'est sécuritaire de le faire.",
      "Appelez tout de suite: chaque heure compte, et l'eau peut monter en cas de pluie.",
      "Restez sur place jusqu'à l'arrivée de l'équipe pour garder la mère en vue.",
    ],
    eviter: [
      "Soulever seul une grille d'égout: elles pèsent souvent plus de trente kilos et peuvent écraser une main.",
      "Descendre dans un puisard: ce sont des espaces clos, parfois sans oxygène respirable.",
      "Chasser la mère pour dégager la zone.",
      "Repartir avec les canetons en pensant les élever chez soi: c'est illégal et leur taux de survie s'effondre.",
    ],
    appeler: [
      "Dès que vous constatez la chute, sans attendre.",
      "Si les canetons sont dans un puisard, un bassin, une piscine ou derrière une clôture.",
      "Si la mère a été frappée par un véhicule.",
      "Si une couvée traverse une voie rapide.",
    ],
    sections: [
      {
        titre: "Comment se termine ce genre d'intervention",
        texte: [
          "Une équipe ouvre la grille avec l'outillage approprié, récupère les canetons à l'épuisette, puis les dépose dans une boîte ouverte à quelques mètres de la mère. Dans la grande majorité des cas, elle rappelle ses petits et la famille repart ensemble vers l'eau. C'est le genre d'appel qui finit bien.",
        ],
      },
    ],
    question: "Qui appeler quand des canetons tombent dans une grille d'égout?",
    reponse:
      "Appelez sans attendre un service de sauvetage animal équipé pour ouvrir une grille et intervenir en espace clos. Ne soulevez pas la grille vous-même et ne chassez surtout pas la mère: tant qu'elle est à proximité, les canetons peuvent lui être rendus et repartir avec elle.",
  },

  "chauve-souris-dans-la-maison": {
    titre: "Une chauve-souris est entrée dans la maison",
    resume:
      "Une espèce protégée, un risque sanitaire réel, et une procédure précise à suivre.",
    intro: [
      "Les chauves-souris du Québec sont insectivores, utiles et en fort déclin. Plusieurs espèces sont menacées, notamment à cause du syndrome du museau blanc. Elles ne s'attaquent pas aux humains et ne s'accrochent pas aux cheveux.",
      "Cela dit, une chauve-souris est l'un des rares animaux du Québec chez qui la rage est encore présente. La règle sanitaire est stricte: dès qu'un contact est possible, même sans morsure ressentie, l'animal ne doit pas être relâché avant l'avis des autorités de santé.",
    ],
    faire: [
      "Sortez les personnes et les animaux de la pièce et fermez la porte.",
      "Éteignez la lumière et ouvrez grand une fenêtre ou une porte vers l'extérieur: souvent, elle sortira seule.",
      "Si elle se pose, couvrez-la d'une boîte, glissez un carton rigide dessous, et gardez-la fermée.",
      "Portez des gants épais, jamais les mains nues.",
      "Vérifiez si quelqu'un a dormi dans la pièce, ou s'il y avait un jeune enfant: dans ce cas, on considère qu'un contact a pu avoir lieu.",
    ],
    eviter: [
      "La toucher à mains nues.",
      "La tuer ou l'écraser: outre le fait que ce sont des espèces protégées, un crâne endommagé empêche l'analyse de la rage.",
      "La relâcher immédiatement si un contact humain est possible.",
      "Colmater une colonie dans un entretoit entre juin et août: les jeunes ne volent pas encore et mourraient à l'intérieur.",
    ],
    appeler: [
      "Une personne a été mordue, griffée, ou s'est réveillée dans la même pièce que la chauve-souris.",
      "Un animal domestique a eu un contact avec elle.",
      "L'animal est visiblement blessé ou au sol en plein jour.",
      "Une colonie s'est installée dans un entretoit ou un mur.",
    ],
    sections: [
      {
        titre: "En cas de contact",
        texte: [
          "Lavez la zone à l'eau savonneuse pendant quinze minutes, puis communiquez avec Info-Santé au 811. Le traitement préventif contre la rage est très efficace, mais il doit être commencé rapidement. Conservez l'animal en sécurité dans un contenant fermé: les autorités décideront s'il doit être analysé.",
        ],
      },
    ],
    question: "Que faire si une chauve-souris entre dans la maison?",
    reponse:
      "Isolez la pièce, éteignez la lumière et ouvrez une fenêtre pour qu'elle sorte seule. Ne la touchez jamais à mains nues. Si quelqu'un a été en contact avec elle, ou a dormi dans la même pièce, ne la relâchez pas: gardez-la dans un contenant fermé et appelez Info-Santé au 811.",
  },
};
