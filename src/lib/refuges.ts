// Lieux et coordonnées du tableau ministériel des permis 2026-2027.
// Le permis n'atteste ni la disponibilité ni l'admission d'une espèce.
export const SOURCE_REFUGES = "https://cdn-contenu.quebec.ca/cdn-contenu/faune/documents/garde-captivite/liste-detenteurs-permis-garde-captivite.pdf";

export type Refuge = { nom: string; adresse: string; telephone: string; courriel?: string; siteWeb?: string; latitude?: number; longitude?: number; rive?: "nord" | "sud"; profil?: "nichoir" | "reptiles" | "reptilesAmphibiens" | "rapacesSanctuaire" };

export const REFUGES: Refuge[] = [
  // Sélection SAR, toutes classes de permis confondues. Coordonnées civiques vérifiées au géocodeur du Québec.
  // Sans coordonnées fiables, conserver le contact plutôt qu'inventer une distance.
  {"nom":"Havre de la faune","adresse":"2 chemin privé no. 5, Saint-Fabien (Québec) G0L 2Z0","telephone":"418-732-4232"},
  {"nom":"Centre et refuge chez Marmy","adresse":"209 route Harrisson, Matane (Québec) G0L 1K1","telephone":"418-562-7254"},
  {"nom":"Centre de conservation de la biodiversité boréale (CCBB)","adresse":"2230 boulevard du Jardin, Saint-Félicien (Québec) G8K 2P8","telephone":"418-679-0543","latitude":48.68767,"longitude":-72.515152},
  {"nom":"Zoo de Falardeau","adresse":"296 rang 2, Saint-David-de-Falardeau (Québec) G0V 1C0","telephone":"418-673-4602","latitude":48.632679,"longitude":-71.181954,"siteWeb":"https://zoofalardeau.com/nous-joindre/"},
  {"nom":"Ranch Dupont","adresse":"3590 rang Saint-Michel, Shawinigan (Québec) G9N 6T5","telephone":"873-271-0035","latitude":46.486168,"longitude":-72.744028},
  {"nom":"Refuge Blanche Neige","adresse":"2290 boulevard Thibeau, Trois-Rivières (Québec) G8T 1E9","telephone":"450-916-3195","latitude":46.410098,"longitude":-72.576489},
  {"nom":"Émilie Pérusse-Lord","adresse":"401 rang Saint-Félix Ouest, Notre-Dame-du-Mont-Carmel (Québec) G0X 3J0","telephone":"819-698-7476","latitude":46.435752,"longitude":-72.670591},
  {"nom":"Monsieur Reptile","adresse":"4891 boulevard des Forges, Trois-Rivières (Québec) G8Y 4Z3","telephone":"819-909-6080","latitude":46.360926,"longitude":-72.592964,"profil":"reptilesAmphibiens","siteWeb":"https://monsieurreptile.com/"},
  {"nom":"Marie-Christine Chartier","adresse":"379 chemin Bulwer, Martinville (Québec) J0B 2A0","telephone":"450-502-8418","latitude":45.304192,"longitude":-71.701226},
  {"nom":"Refuge Lobadanaki","adresse":"137 rang du Rocher, Saint-Étienne-de-Bolton (Québec) J0E 2E0","telephone":"819-674-1606","latitude":45.29876,"longitude":-72.346245,"siteWeb":"https://refugelobadanaki.ca/","courriel":"info@refugelobadanaki.ca"},
  {"nom":"Refuge Filles des Bois","adresse":"823 route 161, Stornoway (Québec) G0Y 1N0","telephone":"819-238-5377","latitude":45.738363,"longitude":-71.215736,"siteWeb":"https://refugefillesdesbois.ca/","courriel":"fondationfillesdesbois@gmail.com"},
  {"nom":"Guillaume Bouchard","adresse":"960 chemin Fitch Bay, Magog (Québec) J1X 3W2","telephone":"450-525-0590","latitude":45.181277,"longitude":-72.142337},
  {"nom":"Zoo Ecomuseum","adresse":"21125 chemin Sainte-Marie, Sainte-Anne-de-Bellevue (Québec) H9X 3Y7","telephone":"514-457-9449","latitude":45.428277,"longitude":-73.919855},
  {"nom":"Domaine des 3 Vents","adresse":"188 chemin des Ponts, Val-d’Or (Québec) J9P 0C1","telephone":"819-824-8537"},
  {"nom":"Refuge Pageau","adresse":"3991 chemin Croteau, Amos (Québec) J9T 3A1","telephone":"819-732-8999","latitude":48.561396,"longitude":-78.014877},
  {"nom":"Ferme 5 étoiles","adresse":"465 route 172 Nord, Sacré-Cœur (Québec) G0T 1Y0","telephone":"418-236-4551","latitude":48.256367,"longitude":-69.873023},
  {"nom":"Centre d’interprétation des oiseaux de proie de Godbout","adresse":"226 rue Pascal-Comeau, Godbout (Québec) G0H 1G0","telephone":"418-568-7715","latitude":49.315774,"longitude":-67.599829,"profil":"rapacesSanctuaire","siteWeb":"https://www.ciopgodbout.com/","courriel":"info@ciopgodbout.com"},
  {"nom":"Miller Zoo","adresse":"20 route Hurley, Frampton (Québec) G0R 1M0","telephone":"418-209-1652","latitude":46.510215,"longitude":-70.826226},
  {"nom":"Domaine La Guadeloupe","adresse":"1011 8e Rue Est, La Guadeloupe (Québec) G0M 1G0","telephone":"418-459-6555","latitude":45.96029,"longitude":-70.906915},
  {"nom":"Éco-Nature","adresse":"345 boulevard Sainte-Rose, Laval (Québec) H7L 1M7","telephone":"450-622-1020","latitude":45.608365,"longitude":-73.796392},
  {"nom":"Familizoo","adresse":"11155 route 335, Saint-Calixte (Québec) J0K 1Z0","telephone":"450-222-5225","latitude":46.000193,"longitude":-73.918293},
  {"nom":"Centre-refuge Nymous","adresse":"591 rang Sainte-Agathe, Sainte-Béatrix (Québec) J0K 1Y0","telephone":"450-883-5020","latitude":46.244257,"longitude":-73.635999,"siteWeb":"https://www.centre-refuge-nymous.com/","courriel":"refugenymous@gmail.com"},
  {"nom":"Ferme de reptiles Exotarium","adresse":"846 chemin Fresnière, Saint-Eustache (Québec) J7R 0G2","telephone":"450-472-1827","latitude":45.565139,"longitude":-73.988755,"profil":"reptiles","siteWeb":"https://www.exotarium.ca/"},
  {"nom":"Mélanie Lapointe-Gauthier","adresse":"Lot 6 088 788, Saint-Fulgence (Québec)","telephone":"418-812-0525"},
  { nom: "Société protectrice des animaux de Québec", adresse: "1130 avenue de Galilée, Québec (Québec) G1P 4B7", telephone: "418-527-9104", latitude: 46.804557, longitude: -71.298633, rive: "nord" },
  { nom: "Refuge de la faune de l’Estrie", adresse: "1700 rue Achille-Barrière, Sherbrooke (Québec) J1H 0J1", telephone: "819-432-5599", latitude: 45.431214, longitude: -71.911293, rive: "sud" },
  { nom: "Refuge Bec et bobo", adresse: "288 chemin Côté, Stoke (Québec) J0B 3G0", telephone: "819-563-1468", latitude: 45.477457, longitude: -71.812570, rive: "sud" },
  { nom: "Centre de réhabilitation de la faune Agawàte", adresse: "74 chemin de Lytton, Montcerf-Lytton (Québec) J0W 1N0", telephone: "819-449-2164", latitude: 46.551491, longitude: -76.042806, rive: "nord" },
  { nom: "Refuge sauvage Kayla", adresse: "74-2 rue Mercier, Val-des-Monts (Québec) J8N 7T9", telephone: "873-688-8882", latitude: 45.562421, longitude: -75.623053, rive: "nord" },
  { nom: "Domaine de nos Ancêtres", adresse: "1895 route 172 Sud, Sacré-Coeur (Québec) G0T 1Y0", telephone: "418-236-4551", latitude: 48.219699, longitude: -69.755132, rive: "nord" },
  { nom: "SOS Miss Dolittle", adresse: "175 chemin du Bras, Saint-Henri (Québec) G0R 3E0", telephone: "418-561-2484", latitude: 46.695303, longitude: -71.116552, rive: "sud" },
  { nom: "Carole Cochrane", adresse: "1183 2e rang, Saint-Roch-des-Aulnaies (Québec) G0R 4E0", telephone: "418-354-7743", latitude: 47.276958, longitude: -70.177894, rive: "sud" },
  { nom: "Josée Bragagnolo", adresse: "161 chemin Lafrenière, Saint-Damien-de-Brandon (Québec) J0K 2N1", telephone: "450-917-2707", latitude: 46.345748, longitude: -73.398675, rive: "nord" },
  { nom: "Le Nichoir", adresse: "637 rue Main, Hudson (Québec) J0P 1H0", telephone: "450-458-2809", latitude: 45.466015, longitude: -74.160050, rive: "nord", profil: "nichoir", siteWeb: "https://lenichoir.org/fr/oiseaux-secours/", courriel: "info@lenichoir.org" },
];

export function distanceKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLon = (b.longitude - a.longitude) * rad;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
