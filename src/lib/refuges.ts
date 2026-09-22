// Lieux et coordonnées du tableau ministériel des permis 2026-2027.
// Le permis n'atteste ni la disponibilité ni l'admission d'une espèce.
export const SOURCE_REFUGES = "https://cdn-contenu.quebec.ca/cdn-contenu/faune/documents/garde-captivite/liste-detenteurs-permis-garde-captivite.pdf";
export const SOURCE_INTERDICTION = "https://cdn-contenu.quebec.ca/cdn-contenu/faune/Rage-chez-les-animaux/documents/liste-municipalites-visees-deplacement-animaux.pdf";

export type Refuge = { nom: string; adresse: string; telephone: string; latitude: number; longitude: number; rive: "nord" | "sud" };

export const REFUGES: Refuge[] = [
  { nom: "Société protectrice des animaux de Québec", adresse: "1130 avenue de Galilée, Québec (Québec) G1P 4B7", telephone: "418-527-9104", latitude: 46.804557, longitude: -71.298633, rive: "nord" },
  { nom: "Refuge de la faune de l’Estrie", adresse: "1700 rue Achille-Barrière, Sherbrooke (Québec) J1H 0J1", telephone: "819-432-5599", latitude: 45.431214, longitude: -71.911293, rive: "sud" },
  { nom: "Refuge Bec et bobo", adresse: "288 chemin Côté, Stoke (Québec) J0B 3G0", telephone: "819-563-1468", latitude: 45.477457, longitude: -71.812570, rive: "sud" },
  { nom: "Centre de réhabilitation de la faune Agawàte", adresse: "74 chemin de Lytton, Montcerf-Lytton (Québec) J0W 1N0", telephone: "819-449-2164", latitude: 46.551491, longitude: -76.042806, rive: "nord" },
  { nom: "Refuge sauvage Kayla", adresse: "74-2 rue Mercier, Val-des-Monts (Québec) J8N 7T9", telephone: "873-688-8882", latitude: 45.562421, longitude: -75.623053, rive: "nord" },
  { nom: "Domaine de nos Ancêtres", adresse: "1895 route 172 Sud, Sacré-Coeur (Québec) G0T 1Y0", telephone: "418-236-4551", latitude: 48.219699, longitude: -69.755132, rive: "nord" },
  { nom: "SOS Miss Dolittle", adresse: "175 chemin du Bras, Saint-Henri (Québec) G0R 3E0", telephone: "418-561-2484", latitude: 46.695303, longitude: -71.116552, rive: "sud" },
  { nom: "Carole Cochrane", adresse: "1183 2e rang, Saint-Roch-des-Aulnaies (Québec) G0R 4E0", telephone: "418-354-7743", latitude: 47.276958, longitude: -70.177894, rive: "sud" },
  { nom: "Josée Bragagnolo", adresse: "161 chemin Lafrenière, Saint-Damien-de-Brandon (Québec) J0K 2N1", telephone: "450-917-2707", latitude: 46.345748, longitude: -73.398675, rive: "nord" },
  { nom: "Le Nichoir", adresse: "637 rue Main, Hudson (Québec) J0P 1H0", telephone: "450-458-2809", latitude: 45.466015, longitude: -74.160050, rive: "nord" },
];

export const ESPECES_75_KM = ["raton", "moufette", "renard", "coyote", "canide", "cerf"] as const;
export const ESPECES_INTERDITES = ["raton", "moufette", "renard", "coyote"] as const;

export function distanceKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLon = (b.longitude - a.longitude) * rad;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
