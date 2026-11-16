type MissionDenombrement = {
  espece_code: string | null;
  nb_adultes: number | null;
  nb_juveniles: number | null;
  nb_deces?: number | null;
  animaux?: unknown;
  etat_animal?: string | null;
};

const entier = (n: unknown): number => typeof n === "number" && Number.isSafeInteger(n) && n > 0 ? n : 0;

// Même règle que l'intranet: tous les animaux comptent, quelle que soit
// l'issue. Un code de fin ne réécrit jamais l'état déclaré au départ.
export function denombrementSecourus(mission: MissionDenombrement) {
  const especes = new Map<string, number>();
  const etats = new Map<string, number>();
  if (mission.animaux == null || (Array.isArray(mission.animaux) && !mission.animaux.length)) {
    const vivants = entier(mission.nb_adultes) + entier(mission.nb_juveniles);
    const deces = entier(mission.nb_deces);
    const total = vivants + deces;
    if (total) especes.set(mission.espece_code || "000", total);
    if (vivants) etats.set(mission.etat_animal || "Non renseigné", vivants);
    if (deces) etats.set("Décédé", (etats.get("Décédé") ?? 0) + deces);
    return { total, especes, etats };
  }
  let total = 0;
  if (Array.isArray(mission.animaux)) {
    for (const ligne of mission.animaux) {
      if (!ligne || typeof ligne !== "object") continue;
      const n = entier(ligne.nombre);
      if (!n) continue;
      const code = typeof ligne.espece_code === "string" && ligne.espece_code ? ligne.espece_code : "000";
      const etat = typeof ligne.etat === "string" && ligne.etat ? ligne.etat : "Non renseigné";
      total += n;
      especes.set(code, (especes.get(code) ?? 0) + n);
      etats.set(etat, (etats.get(etat) ?? 0) + n);
    }
  }
  return { total, especes, etats };
}
