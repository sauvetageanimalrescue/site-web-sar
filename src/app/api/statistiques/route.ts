import { NextResponse } from "next/server";
import { lireStatistiques } from "@/lib/statistiques";

// Le compteur du site interroge cette route toutes les minutes. On garde une
// courte mise en cache côté CDN pour ne pas marteler le registre quand
// plusieurs visiteurs sont sur la page en même temps.
export const revalidate = 30;

export async function GET() {
  const stats = await lireStatistiques();
  if (!stats) {
    return NextResponse.json({ erreur: "indisponible" }, { status: 503 });
  }
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
  });
}
