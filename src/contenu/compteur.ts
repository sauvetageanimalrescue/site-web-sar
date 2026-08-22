// Report des animaux pris en charge avant que l'intranet ne consigne tout.
//
// L'intranet, qui contient le registre des missions, entre en service le
// premier octobre 2026. En attendant, le compteur en direct ne voit que les
// quelques missions déjà saisies.
//
// Méthode de l'organisation, celle de ses récapitulatifs mensuels : somme des
// animaux adultes et juvéniles, un animal minimum par mission quand le
// dénombrement n'a pas été saisi, sans soustraire les décès. Elle donne 577
// animaux du premier janvier au 21 août 2026. Vérifiée sur juillet : 111
// animaux dénombrés plus 5 missions sans dénombrement, soit les 116 du
// récapitulatif mensuel.
//
// On retire les 3 animaux des missions du 7 et du 15 août, déjà comptés par
// le registre, pour ne pas les compter deux fois.
export const REPORT_ANNEE = 574;

// Le report couvre jusqu'à cette date ; au-delà, le registre prend le relais.
export const REPORT_ARRETE_LE = "2026-08-21";
