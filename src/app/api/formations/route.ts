import { NextResponse } from "next/server";
import { lireFormationsAVenir } from "@/lib/formations";

export const revalidate = 0;

// Le formulaire actualise les places sans exposer aucune inscription.
export async function GET() {
  return NextResponse.json(await lireFormationsAVenir());
}
