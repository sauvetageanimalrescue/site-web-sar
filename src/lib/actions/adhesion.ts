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
  const prenom = texte(donnees, "prenom");
  const nom = texte(donnees, "nom");
  const courriel = texte(donnees, "courriel");
  const telephone = texte(donnees, "telephone");
  const nombrePersonnes = texte(donnees, "nombrePersonnes") === "2" ? 2 : 1;
  const accompagnateurPrenom = texte(donnees, "accompagnateurPrenom");
  const accompagnateurNom = texte(donnees, "accompagnateurNom");

  if (
    !stageId ||
    !prenom ||
    !nom ||
    !courriel ||
    !telephone ||
    (nombrePersonnes === 2 && (!accompagnateurPrenom || !accompagnateurNom))
  ) {
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
      nombrePersonnes,
      accompagnateurPrenom: nombrePersonnes === 2 ? accompagnateurPrenom : null,
      accompagnateurNom: nombrePersonnes === 2 ? accompagnateurNom : null,
      mineur1: donnees.get("mineur1") === "on",
      mineur2: nombrePersonnes === 2 && donnees.get("mineur2") === "on",
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
