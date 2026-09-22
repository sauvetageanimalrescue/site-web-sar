// Le découpage administratif officiel sert à déterminer la rive à partir
// du point de découverte, sans laisser le visiteur déclarer lui-même sa rive.
const SERVICE = "https://servicescarto.mrnf.gouv.qc.ca/pes/rest/services/Territoire/SDA_WMS/MapServer/2/query";

const REGIONS_NORD = new Set(["02", "03", "04", "06", "07", "08", "09", "10", "13", "14", "15"]);
const REGIONS_SUD = new Set(["01", "05", "11", "12", "17"]);

export async function trouverTerritoire(point: { latitude: number; longitude: number }): Promise<{ rive: "nord" | "sud"; ville: string } | null> {
  const url = new URL(SERVICE);
  url.searchParams.set("geometry", `${point.longitude},${point.latitude}`);
  url.searchParams.set("geometryType", "esriGeometryPoint");
  url.searchParams.set("inSR", "4326");
  url.searchParams.set("spatialRel", "esriSpatialRelIntersects");
  url.searchParams.set("outFields", "MUS_CO_REG,MUS_CO_MRC,MUS_NM_MUN");
  url.searchParams.set("returnGeometry", "false");
  url.searchParams.set("f", "json");

  try {
    const reponse = await fetch(url, { signal: AbortSignal.timeout(7000), next: { revalidate: 86400 } });
    if (!reponse.ok) return null;
    const donnees = await reponse.json() as { features?: { attributes: { MUS_CO_REG?: string; MUS_CO_MRC?: string; MUS_NM_MUN?: string } }[] };
    const codes = donnees.features?.[0]?.attributes;
    if (!codes?.MUS_NM_MUN) return null;
    if (REGIONS_NORD.has(codes.MUS_CO_REG ?? "")) return { rive: "nord", ville: codes.MUS_NM_MUN };
    if (REGIONS_SUD.has(codes.MUS_CO_REG ?? "")) return { rive: "sud", ville: codes.MUS_NM_MUN };
    // La Montérégie est au sud, sauf Vaudreuil-Soulanges au nord du fleuve.
    if (codes.MUS_CO_REG === "16") return { rive: codes.MUS_CO_MRC === "71" ? "nord" : "sud", ville: codes.MUS_NM_MUN };
    return null;
  } catch {
    return null;
  }
}
