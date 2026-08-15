"use server";

import { getLocale } from "next-intl/server";
import { creerSignalement } from "@/lib/registre";

export type EtatSignalement =
  | { etat: "inactif" }
  | { etat: "succes"; numero: string }
  | { etat: "erreur"; motif: "champs" | "envoi" };

function texte(donnees: FormData, cle: string) {
  const valeur = donnees.get(cle);
  return typeof valeur === "string" ? valeur.trim() : "";
}

export async function envoyerSignalement(
  _precedent: EtatSignalement,
  donnees: FormData,
): Promise<EtatSignalement> {
  const nom = texte(donnees, "nom");
  const telephone = texte(donnees, "telephone");
  const adresse = texte(donnees, "adresse");
  const ville = texte(donnees, "ville");
  const description = texte(donnees, "description");

  if (!nom || !telephone || !adresse || !ville || !description) {
    return { etat: "erreur", motif: "champs" };
  }

  const numero = await creerSignalement({
    signalantNom: nom,
    signalantTelephone: telephone,
    signalantCourriel: texte(donnees, "courriel") || null,
    adresse,
    ville,
    codePostal: texte(donnees, "codePostal") || null,
    precisionsLieu: texte(donnees, "precisions") || null,
    especeCode: texte(donnees, "espece") || null,
    etatAnimal: texte(donnees, "etat") || null,
    etatPrecisions: description,
    langue: await getLocale(),
  });

  if (!numero) return { etat: "erreur", motif: "envoi" };
  return { etat: "succes", numero };
}
