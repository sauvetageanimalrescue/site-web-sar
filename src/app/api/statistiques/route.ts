import { NextResponse } from "next/server";
import { lireStatistiques } from "@/lib/statistiques";

// Les deux pages doivent lire la même photographie du registre, sans réponse
// périmée conservée par le CDN pendant plusieurs minutes.
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await lireStatistiques();
  if (!stats) {
    return NextResponse.json({ erreur: "indisponible" }, { status: 503 });
  }
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}
