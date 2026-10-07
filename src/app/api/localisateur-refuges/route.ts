import { NextResponse } from "next/server";
import { distanceKm, REFUGES } from "@/lib/refuges";

const GEOCODEUR = "https://servicescarto.mrnf.gouv.qc.ca/pes/rest/services/Territoire/Adresse_Geocodage/GeocodeServer/findAddressCandidates";

type Candidat = {
  address: string;
  score: number;
  location: { x: number; y: number };
  attributes: { City?: string; Addr_type?: string; Num?: number };
};

export async function POST(requete: Request) {
  let donnees: { adresse?: string; pointGoogle?: { latitude?: number; longitude?: number } } | null;
  try { donnees = await requete.json(); } catch { return NextResponse.json({ erreur: "requete" }, { status: 400 }); }
  const adresse = typeof donnees?.adresse === "string" ? donnees.adresse.trim() : "";
  const numero = Number(adresse.match(/^\s*(\d+)/)?.[1]);
  if (!donnees || adresse.length < 8 || adresse.length > 180) {
    return NextResponse.json({ erreur: "champs" }, { status: 400 });
  }

  let point: { latitude: number; longitude: number };
  let adresseTrouvee = adresse;
  if (donnees.pointGoogle && Number.isFinite(donnees.pointGoogle.latitude) && Number.isFinite(donnees.pointGoogle.longitude)) {
    point = { latitude: donnees.pointGoogle.latitude!, longitude: donnees.pointGoogle.longitude! };
    if (point.latitude < 44 || point.latitude > 63 || point.longitude < -80 || point.longitude > -57) {
      return NextResponse.json({ erreur: "adresse" }, { status: 422 });
    }
  } else {
    if (!numero || donnees.pointGoogle != null) return NextResponse.json({ erreur: "champs" }, { status: 400 });
    const url = new URL(GEOCODEUR);
    url.searchParams.set("SingleLine", `${adresse}, Québec`);
    url.searchParams.set("f", "json");
    url.searchParams.set("outFields", "*");
    let candidat: Candidat | undefined;
    try {
      const reponse = await fetch(url, { signal: AbortSignal.timeout(7000), next: { revalidate: 86400 } });
      if (!reponse.ok) throw new Error("geocodeur");
      const corps = await reponse.json() as { candidates?: Candidat[] };
      candidat = corps.candidates?.[0];
    } catch {
      return NextResponse.json({ erreur: "geocodeur" }, { status: 503 });
    }
    if (!candidat || candidat.score < 75 || !candidat.attributes.City || candidat.attributes.Num !== numero) {
      return NextResponse.json({ erreur: "adresse" }, { status: 422 });
    }
    point = { latitude: candidat.location.y, longitude: candidat.location.x };
    adresseTrouvee = candidat.address;
  }
  // Le classement informe sur la proximité, jamais sur la légalité du transport.
  const refuges = REFUGES.map((refuge) => ({ ...refuge, distanceExacte:
    typeof refuge.latitude === "number" && typeof refuge.longitude === "number"
      ? distanceKm(point, { latitude: refuge.latitude, longitude: refuge.longitude }) : null }))
    .sort((a, b) => (a.distanceExacte ?? Infinity) - (b.distanceExacte ?? Infinity) || a.nom.localeCompare(b.nom, "fr"))
    .map(({ distanceExacte, ...refuge }) => ({ ...refuge, distance: distanceExacte === null ? null : Math.round(distanceExacte * 10) / 10 }));
  return NextResponse.json({ adresseTrouvee, refuges });
}
