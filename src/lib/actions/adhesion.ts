"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import {
  creerPaiementAdhesion,
  creerPaiementDon,
  creerPaiementStage,
} from "@/lib/paiement";
import type { Locale } from "@/i18n/routing";

export type EtatPaiement =
  | { etat: "inactif" }
  | { etat: "erreur"; motif: "champs" | "paiement" | "complet" };

function texte(donnees: FormData, cle: string) {
  const valeur = donnees.get(cle);
  return typeof valeur === "string" ? valeur.trim() : "";
}

export async function demarrerAdhesion(
  _precedent: EtatPaiement,
  donnees: FormData,
): Promise<EtatPaiement> {
  const prenom = texte(donnees, "prenom");
  const nom = texte(donnees, "nom");
  const courriel = texte(donnees, "courriel");

  if (!prenom || !nom || !courriel) {
    return { etat: "erreur", motif: "champs" };
  }

  let url: string;
  try {
    url = await creerPaiementAdhesion({
      prenom,
      nom,
      courriel,
      telephone: texte(donnees, "telephone") || null,
      ville: texte(donnees, "ville") || null,
      codePostal: texte(donnees, "codePostal") || null,
      langue: (await getLocale()) as Locale,
      renouvellementAuto: donnees.get("renouvellement") === "on",
    });
  } catch {
    return { etat: "erreur", motif: "paiement" };
  }

  // redirect() lève une exception de contrôle : elle doit rester hors du try.
  redirect(url);
}

export async function demarrerStage(
  _precedent: EtatPaiement,
  donnees: FormData,
): Promise<EtatPaiement> {
  const stageId = texte(donnees, "stage");
  const prenom = texte(donnees, "prenom");
  const nom = texte(donnees, "nom");
  const courriel = texte(donnees, "courriel");
  const telephone = texte(donnees, "telephone");

  if (!stageId || !prenom || !nom || !courriel || !telephone) {
    return { etat: "erreur", motif: "champs" };
  }

  let url: string;
  try {
    url = await creerPaiementStage({
      stageId,
      prenom,
      nom,
      courriel,
      telephone,
      accompagnateur: texte(donnees, "accompagnateur") || null,
      langue: (await getLocale()) as Locale,
    });
  } catch (erreur) {
    const message = erreur instanceof Error ? erreur.message : "";
    return {
      etat: "erreur",
      motif: message === "Stage complet" ? "complet" : "paiement",
    };
  }

  redirect(url);
}

export async function demarrerDon(
  _precedent: EtatPaiement,
  donnees: FormData,
): Promise<EtatPaiement> {
  const courriel = texte(donnees, "courriel");
  const montant = Number(texte(donnees, "montant"));

  if (!courriel || !Number.isFinite(montant) || montant < 5) {
    return { etat: "erreur", motif: "champs" };
  }

  let url: string;
  try {
    url = await creerPaiementDon({
      montant,
      mensuel: donnees.get("frequence") === "mensuel",
      courriel,
      prenom: texte(donnees, "prenom") || null,
      nom: texte(donnees, "nom") || null,
      langue: (await getLocale()) as Locale,
    });
  } catch {
    return { etat: "erreur", motif: "paiement" };
  }

  redirect(url);
}
