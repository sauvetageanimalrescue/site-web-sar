import { TOTAL_MISSIONS } from "@/contenu/statistiques-2026";

// Report des animaux et des déplacements, avant que l'intranet ne consigne
// tout.
//
// L'intranet, qui contient le registre des missions, entre en service le
// premier octobre 2026. En attendant, le compteur en direct ne voit que les
// quelques missions déjà saisies.
//
// Coupure par date, jamais par mission précise: le report couvre tout ce qui
// est fermé jusqu'au 21 août 2026 inclus, le registre reprend le relais le
// 22. La requête SQL elle-même (statistiques_publiques, voir
// supabase/migrations/0009_deplacements_et_coupure_par_date.sql) exclut tout
// ce qui est fermé avant cette date: le report et le registre ne se
// chevauchent donc jamais, quelles que soient les missions de test ajoutées
// ou retirées du registre entre-temps. Cette date doit rester synchronisée
// avec la date écrite dans cette migration.
export const REPORT_ARRETE_LE = "2026-08-21";

// Méthode de l'organisation, celle de ses récapitulatifs mensuels: somme des
// animaux adultes et juvéniles, un animal minimum par mission quand le
// dénombrement n'a pas été saisi, sans soustraire les décès. Elle donne 577
// animaux du premier janvier au 21 août 2026. Vérifiée sur juillet: 111
// animaux dénombrés plus 5 missions sans dénombrement, soit les 116 du
// récapitulatif mensuel.
export const REPORT_ANNEE = 577;

// Même période, même source, mais en comptant des déplacements plutôt que
// des animaux: TOTAL_MISSIONS (statistiques-2026.ts) est exactement ce
// chiffre, les 424 missions du fichier consolidé du premier janvier au 21
// août 2026.
export const REPORT_DEPLACEMENTS_ANNEE = TOTAL_MISSIONS;

// Report du mois en cours. Le compteur mensuel ne voit que les missions déjà
// saisies au registre, alors que le mois est bien avancé: il afficherait
// presque rien plutôt que 81 animaux et 68 déplacements.
//
// Ce report est daté. Il ne s'applique qu'au mois et à l'année indiqués, ce
// qui évite qu'il continue de gonfler le compteur en septembre. Le premier
// du mois prochain, il devient sans effet de lui-même.
//
// Août 2026: 68 missions et 81 animaux du premier au 21 août selon la
// méthode de l'organisation.
export const REPORT_MOIS = { annee: 2026, mois: 8, animaux: 81, deplacements: 68 };
