# Statistiques publiques reliées au registre

Mise à jour du 16/11/2026, site public SAR uniquement.

## Source et calculs

- Lecture serveur de la base du registre via les variables existantes REGISTRE_SUPABASE_URL et REGISTRE_SUPABASE_SERVICE_ROLE_KEY. Aucun secret dans le navigateur.
- Le JSON public ne contient que des agrégats, les noms des sauveteurs autorisés pour ces classements et leurs compteurs. Aucun identifiant interne, matricule, demandeur, téléphone, courriel, adresse précise ou coordonnée GPS.
- Une mission non radiée compte une fois, selon sa date de création en heure du Québec. Les missions futures sont exclues.
- Même dénombrement que `registre-des-missions/src/lib/statistiques/calculs.ts`: somme des lignes animales, décès et âge inconnu inclus; ancien formulaire: adultes + juvéniles + décès. Aucun animal inventé pour une fiche sans dénombrement. Aucun décès déduit du code de fin.
- Une participation par personne et par mission, primaire et co-op confondus. Chaque participant reçoit le nombre d'animaux de la mission. Les compteurs individuels ne s'additionnent pas pour obtenir le total de l'organisme.

## Historique et années

- Les 577 animaux et 424 missions historiques jusqu'au 21/08/2026 restent ajoutés au total de 2026 uniquement. Les missions du registre commencent le 24/08/2026 lors de l'audit: aucun chevauchement trouvé.
- Les ventilations historiques de missions par mois et jour de semaine sont conservées et additionnées aux missions du registre.
- Les espèces, états, municipalités, régions, catégories de demandeur, lieux et participations utilisent uniquement le registre. Les anciennes catégories et listes partielles ne permettent pas une fusion fiable avec les nouveaux référentiels. Elles restent conservées dans `src/contenu/statistiques-2026.ts`, mais ne sont plus affichées comme des statistiques courantes.
- Les compteurs géographiques portent donc le libellé « au registre ». Aucune répartition artificielle du complément historique.
- Le sélecteur conserve les années à partir de 2026. Les compteurs aujourd'hui/semaine/mois/année en haut restent ceux de la période actuelle. Les archives annuelles restent calculées à partir des fiches, pas figées: une correction d'une ancienne fiche se répercute dans son année.
- Les libellés d'espèce utilisent le catalogue public complet existant. Les libellés d'emplacement et catégories viennent du référentiel intranet synchronisé le 16/11/2026. Une modification future de ce référentiel devra être répercutée dans ces libellés publics.

## Charge et pannes

- Un résultat agrégé partagé, cache serveur revalidé après 60 secondes; clé quotidienne pour changer correctement de jour et d'année.
- Navigateur: une seule requête en vol, environ une par minute; pas de lecture périodique dans un onglet masqué. Reprise espacée jusqu'à cinq minutes en cas d'échec, sans effacer les derniers chiffres.
- Lecture ordonnée par pages de 500 avec comptage exact, délai global de 25 secondes et maximum de 100 pages. Si incomplète: pas de total partiel. Ce plafond devra être revu si le registre approche 50 000 missions.
- Aucun appel Google, IA ou service payant supplémentaire; pas de modification de données ni de permissions dans l'intranet.

## Vérifications

- `node scripts/statistiques-denombrement-tests.cjs`: cas anciens/nouveaux, décès, âge inconnu, doublons, primaire/co-op, années et fuseau Québec, pagination de 1 001 fiches, panne et reprise.
- Rapprochement en lecture seule avec le calcul intranet sur les 100 fiches: 99 missions non radiées, 115 animaux, 16 sauveteurs; tous les compteurs individuels concordent. Total public avec historique: 523 missions et 692 animaux à cet instant.
- Build de production et contrôle TypeScript. Les avertissements de traduction préexistants de la page Membre en anglais/espagnol ne concernent pas les statistiques.
- Contrôles navigateur français/anglais/espagnol, 390/768/1440 px, classements, navigation tactile, expansion, absence de données privées dans le JSON, panne/reprise et sélection de 2026 dans un passage simulé à 2027. Les simulations ne modifient aucune fiche réelle.
