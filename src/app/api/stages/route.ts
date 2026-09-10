import { NextResponse } from "next/server";
import { lireStagesAVenir } from "@/lib/stages";

export const revalidate = 0;

// Le formulaire actualise les places sans exposer les inscriptions.
export async function GET() {
  return NextResponse.json(await lireStagesAVenir());
}
