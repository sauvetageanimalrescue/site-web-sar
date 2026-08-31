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

  // L'adresse n'est obligatoire que si une carte physique est demandée: sans
  // quoi il n'y a rien à poster.
  const cartePhysique = donnees.get("cartePhysique") === "on";
  const adresse = texte(donnees, "adresse");
  const ville = texte(donnees, "ville");
  const codePostal = texte(donnees, "codePostal");
  const province = texte(donnees, "province");
  const pays = texte(donnees, "pays");
  if (cartePhysique && (!adresse || !ville || !codePostal || !province || !pays)) {
    return { etat: "erreur", motif: "champs" };
  }

  let url: string;
  try {
    url = await creerPaiementAdhesion({
      prenom,
      nom,
      courriel,
      telephone: texte(donnees, "telephone") || null,
      adresse: adresse || null,
      appartement: texte(donnees, "appartement") || null,
      ville: ville || null,
      codePostal: codePostal || null,
      province: province || null,
      pays: pays || null,
      cartePhysique,
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
  const scenario = texte(donnees, "scenario");
  const responsablePrenom = texte(donnees, "responsablePrenom");
  const responsableNom = texte(donnees, "responsableNom");
  const courriel = texte(donnees, "courriel");
  const telephone = texte(donnees, "telephone");
  const scenarios = ["seul", "avec", "autre1", "autres2"] as const;
  if (!scenarios.includes(scenario as (typeof scenarios)[number])) {
    return { etat: "erreur", motif: "champs" };
  }
  const responsableParticipe = scenario === "seul" || scenario === "avec";
  const nombrePersonnes: 1 | 2 = scenario === "avec" || scenario === "autres2" ? 2 : 1;
  const participant1Prenom = responsableParticipe
    ? responsablePrenom
    : texte(donnees, "participant1Prenom");
  const participant1Nom = responsableParticipe
    ? responsableNom
    : texte(donnees, "participant1Nom");
  const participant2Prenom = nombrePersonnes === 2
    ? texte(donnees, "participant2Prenom")
    : "";
  const participant2Nom = nombrePersonnes === 2
    ? texte(donnees, "participant2Nom")
    : "";
  const mineur1 = !responsableParticipe && donnees.get("mineur1") === "on";
  const mineur2 = nombrePersonnes === 2 && donnees.get("mineur2") === "on";
  const autorisationRequise = mineur1 || mineur2;
  const autorisationSignature = texte(donnees, "autorisationSignature");
  const autorisationAcceptee = donnees.get("autorisationAcceptee") === "on";

  if (
    !stageId ||
    !responsablePrenom ||
    !responsableNom ||
    !courriel ||
    !telephone ||
    !participant1Prenom ||
    !participant1Nom ||
    (nombrePersonnes === 2 && (!participant2Prenom || !participant2Nom)) ||
    (autorisationRequise && (!autorisationAcceptee || !autorisationSignature))
  ) {
    return { etat: "erreur", motif: "champs" };
  }

  let url: string;
  try {
    url = await creerPaiementStage({
      stageId,
      scenario: scenario as "seul" | "avec" | "autre1" | "autres2",
      responsablePrenom,
      responsableNom,
      courriel,
      telephone,
      nombrePersonnes,
      participant1Prenom,
      participant1Nom,
      participant2Prenom: nombrePersonnes === 2 ? participant2Prenom : null,
      participant2Nom: nombrePersonnes === 2 ? participant2Nom : null,
      mineur1,
      mineur2,
      autorisationSignature: autorisationRequise ? autorisationSignature : null,
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
