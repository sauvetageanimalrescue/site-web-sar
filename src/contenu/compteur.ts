// Report des animaux, avant que l'intranet ne consigne tout.
//
// L'intranet, qui contient le registre des missions, entre en service le
// premier octobre 2026. En attendant, le compteur en direct ne voit que les
// quelques missions déjà saisies.
//
// Méthode de l'organisation, celle de ses récapitulatifs mensuels: somme des
// animaux adultes et juvéniles, un animal minimum par mission quand le
// dénombrement n'a pas été saisi, sans soustraire les décès. Elle donne 577
// animaux du premier janvier au 21 août 2026. Vérifiée sur juillet: 111
// animaux dénombrés plus 5 missions sans dénombrement, soit les 116 du
// récapitulatif mensuel.
//
// On retire les 3 animaux des missions du 7 et du 15 août, déjà comptés par
// le registre, pour ne pas les compter deux fois.
export const REPORT_ANNEE = 574;

// Le report couvre jusqu'à cette date; au-delà, le registre prend le relais.
export const REPORT_ARRETE_LE = "2026-08-21";

// Report du mois en cours. Le compteur mensuel ne voit que les missions déjà
// saisies au registre, alors que le mois est bien avancé: il afficherait 3
// au lieu de 81.
//
// Ce report est daté. Il ne s'applique qu'au mois et à l'année indiqués, ce
// qui évite qu'il continue de gonfler le compteur en septembre. Le premier
// du mois prochain, il devient sans effet de lui-même.
//
// Août 2026: 68 missions et 81 animaux du premier au 21 août selon la
// méthode de l'organisation, moins les 3 animaux des missions du 7 et du 15
// août, déjà comptés par le registre.
export const REPORT_MOIS = { annee: 2026, mois: 8, valeur: 78 };
