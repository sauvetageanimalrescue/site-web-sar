type MissionDenombrement = {
  espece_code: string | null;
  nb_adultes: number | null;
  nb_juveniles: number | null;
  animaux?: unknown;
};

// Les anciennes fiches ne permettent pas de répartir les décès par âge.
// Leur calcul reste inchangé; les nouvelles lignes comptent chaque vivant une fois.
export function denombrementSecourus(mission: MissionDenombrement) {
  const especes = new Map<string, number>();
  if (mission.animaux == null) {
    const total = Math.max(0, mission.nb_adultes ?? 0) + Math.max(0, mission.nb_juveniles ?? 0);
    if (mission.espece_code && total > 0) especes.set(mission.espece_code, total);
    return { total, especes };
  }
  let total = 0;
  if (Array.isArray(mission.animaux)) {
    for (const ligne of mission.animaux) {
      if (!ligne || typeof ligne !== "object" ||
          typeof ligne.espece_code !== "string" || !ligne.espece_code ||
          typeof ligne.etat !== "string" || !ligne.etat ||
          !Number.isSafeInteger(ligne.nombre) || ligne.nombre <= 0 ||
          ligne.etat === "Décédé") continue;
      total += ligne.nombre;
      especes.set(ligne.espece_code, (especes.get(ligne.espece_code) ?? 0) + ligne.nombre);
    }
  }
  return { total, especes };
}
