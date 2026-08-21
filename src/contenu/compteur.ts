// Report des animaux secourus avant la mise en service de l'intranet.
//
// L'intranet, qui contient le registre des missions, entre en service le
// premier octobre 2026. Avant cette date, les interventions ne sont pas
// toutes consignées : le compteur du site n'en verrait qu'une poignée et
// donnerait de l'organisation une image très en dessous de la réalité.
//
// Ce report est ajouté au total de l'année et au grand total. Il n'est PAS
// ajouté aux compteurs du jour, de la semaine ni du mois : ceux-là sont
// réellement en direct et doivent le rester, sans quoi le site afficherait
// des animaux secourus aujourd'hui qui ne l'ont pas été.
//
// La valeur vient de la direction générale et représente des interventions
// réelles. Elle se met à jour ici, à la main, jusqu'au premier octobre.
export const REPORT_ANNEE = 493;

// Date d'arrêté du report : 493 animaux secourus du premier janvier au
// premier juillet 2026, chiffre fourni par la direction générale. Les trois
// missions déjà au registre datent d'août, il n'y a donc aucun double compte.
export const REPORT_ARRETE_LE = "2026-07-01";
