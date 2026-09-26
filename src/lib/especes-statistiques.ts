import { PAR_ESPECE } from "@/contenu/statistiques-2026";
import { libelleEspece } from "@/lib/especes";
import type { Statistiques } from "@/lib/statistiques";

// Correspondance avec les douze lignes du bilan historique. Sans ce lien,
// seules les fiches de ratons laveurs recevaient les nouveaux dénombrements.
const CODES_BILAN = [
  "204", "101", "205", "302", "301", "399", "201", "305", "309", "206", "207", "212",
] as const;

export function especesAnnee(stats: Statistiques | null) {
  const especes = new Map<string, { code: string; libelle: string; valeur: number }>();
  PAR_ESPECE.forEach((espece, index) => {
    const code = CODES_BILAN[index];
    if (code) especes.set(code, { code, ...espece });
  });

  for (const espece of stats?.especes ?? []) {
    const historique = especes.get(espece.code);
    if (historique) {
      historique.valeur += espece.sauves;
    } else {
      especes.set(espece.code, {
        code: espece.code,
        libelle: libelleEspece(espece.code, "fr"),
        valeur: espece.sauves,
      });
    }
  }

  return [...especes.values()].sort((a, b) => b.valeur - a.valeur);
}
