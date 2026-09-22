import { NextResponse } from "next/server";
import { distanceKm, ESPECES_75_KM, ESPECES_INTERDITES, REFUGES } from "@/lib/refuges";
import { municipaliteVisee } from "@/lib/municipalites-rage";

const GEOCODEUR = "https://servicescarto.mrnf.gouv.qc.ca/pes/rest/services/Territoire/Adresse_Geocodage/GeocodeServer/findAddressCandidates";
const ESPECES = new Set(["raton", "moufette", "renard", "coyote", "canide", "cerf", "autres"]);

type Candidat = {
  address: string;
  score: number;
  location: { x: number; y: number };
  attributes: { City?: string; Addr_type?: string; Num?: number };
};

export async function POST(requete: Request) {
  let donnees: { adresse?: string; espece?: string; rive?: string };
  try { donnees = await requete.json(); } catch { return NextResponse.json({ erreur: "requete" }, { status: 400 }); }
  const adresse = donnees.adresse?.trim() ?? "";
  const numero = Number(adresse.match(/^\s*(\d+)/)?.[1]);
  const espece = donnees.espece ?? "";
  const rive = donnees.rive ?? "";
  if (adresse.length < 8 || adresse.length > 180 || !numero || !ESPECES.has(espece) || !["nord", "sud"].includes(rive)) {
    return NextResponse.json({ erreur: "champs" }, { status: 400 });
  }

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

  const ville = candidat.attributes.City;
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (date > "2026-10-06" && ESPECES_INTERDITES.some((nom) => nom === espece)) {
    return NextResponse.json({ erreur: "restrictionARevoir" }, { status: 409 });
  }
  const interdiction = date <= "2026-10-06" && ESPECES_INTERDITES.some((nom) => nom === espece) && municipaliteVisee(ville);
  const point = { latitude: candidat.location.y, longitude: candidat.location.x };
  if (interdiction) return NextResponse.json({ interdiction: true, ville, adresseTrouvee: candidat.address });

  const limite75 = ESPECES_75_KM.some((nom) => nom === espece);
  const refuges = REFUGES.map((refuge) => ({ ...refuge, distanceExacte: distanceKm(point, refuge) }))
    .filter((refuge) => !limite75 || (refuge.distanceExacte <= 75 && !(rive === "sud" && refuge.rive === "nord")))
    .map(({ distanceExacte, ...refuge }) => ({ ...refuge, distance: Math.round(distanceExacte) }))
    .sort((a, b) => a.distance - b.distance);
  return NextResponse.json({ adresseTrouvee: candidat.address, ville, refuges, limite75, interdiction: false });
}
