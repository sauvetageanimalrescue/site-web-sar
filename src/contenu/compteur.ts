// Report des animaux secourus avant que l'intranet ne consigne tout.
//
// L'intranet, qui contient le registre des missions, entre en service le
// premier octobre 2026. En attendant, le compteur en direct ne voit que les
// quelques missions déjà saisies et donne de l'organisation une image très en
// dessous de la réalité.
//
// La valeur vient du fichier consolidé de l'année : 370 animaux secourus du
// premier janvier au 21 août 2026, calculés avec exactement la même définition
// que le compteur en direct, soit les missions closes par un code 10-70 à
// 10-75, moins les décès. On en retire les 3 animaux des missions du 7 et du
// 15 août, déjà comptés par le registre, pour ne pas les compter deux fois.
//
// Voir src/contenu/statistiques-2026.ts pour le détail publié sur la page.
export const REPORT_ANNEE = 367;

// Le report couvre jusqu'à cette date ; au-delà, le registre prend le relais.
export const REPORT_ARRETE_LE = "2026-08-21";
