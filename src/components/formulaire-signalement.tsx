"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconCircleCheckFilled, IconAlertTriangleFilled } from "@tabler/icons-react";
import type { Locale } from "@/i18n/routing";
import { ESPECES, FAMILLES, familleDeEspece } from "@/lib/especes";
import { ORGANISATION } from "@/lib/constantes";
import {
  envoyerSignalement,
  type EtatSignalement,
} from "@/lib/actions/signalement";

// Les dix-sept états du CRAP 2027 (voir etats-animal.ts, registre des
// missions) : les valeurs sont recopiées exactement, pour que la répartition
// retrouve ses repères. Seul le libellé affiché est reformulé pour le public.
const ETATS = [
  "Agonisant",
  "Blessé",
  "Confiné",
  "Décédé",
  "Errant",
  "Fuite / En cavale",
  "Gêne physique / Incommodé",
  "Hauteur",
  "Incertain / À vérifier",
  "Malade",
  "Nuisance",
  "Orphelin",
  "Pris / Coincé",
  "Réactif / Agressif",
  "Sain",
  "Trappé",
  "Vulnérable / À risque",
] as const;

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

function Champ({
  nom,
  libelle,
  requis = false,
  type = "text",
  aide,
}: {
  nom: string;
  libelle: string;
  requis?: boolean;
  type?: string;
  aide?: string;
}) {
  const t = useTranslations("signalement.champs");
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">
        {libelle}
        {!requis && (
          <span className="ml-1 font-normal text-muted">({t("facultatif")})</span>
        )}
      </span>
      <input
        type={type}
        name={nom}
        required={requis}
        placeholder={aide}
        className={CLASSE_CHAMP}
      />
    </label>
  );
}

export function FormulaireSignalement() {
  const t = useTranslations("signalement");
  const c = useTranslations("signalement.champs");
  const e = useTranslations("signalement.etats");
  const locale = useLocale() as Locale;

  const [etat, action, enCours] = useActionState<EtatSignalement, FormData>(
    envoyerSignalement,
    { etat: "inactif" },
  );

  if (etat.etat === "succes") {
    return (
      <div className="rounded-xl border border-vert bg-vert-doux p-6">
        <p className="flex items-center gap-2 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-vert">
          <IconCircleCheckFilled className="size-7" aria-hidden />
          {t("succesTitre")}
        </p>
        <p className="mt-3 leading-relaxed text-foreground/90">
          {t("succesTexte", {
            numero: etat.numero,
            telephone: ORGANISATION.telephones.signalement,
          })}
        </p>
      </div>
    );
  }

  // Espèces regroupées par famille pour un <optgroup> lisible.
  const groupes = Object.entries(
    Object.keys(ESPECES).reduce<Record<string, string[]>>((acc, code) => {
      const famille = familleDeEspece(code);
      (acc[famille] ??= []).push(code);
      return acc;
    }, {}),
  );

  return (
    <form action={action} className="space-y-5">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "champs"
            ? t("erreurChamps")
            : t("erreur", { telephone: ORGANISATION.telephones.signalement })}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Champ nom="nom" libelle={c("nom")} requis />
        <Champ nom="telephone" libelle={c("telephone")} type="tel" requis />
      </div>
      <Champ nom="courriel" libelle={c("courriel")} type="email" />

      <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <Champ nom="adresse" libelle={c("adresse")} requis />
        <Champ nom="ville" libelle={c("ville")} requis />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Champ nom="codePostal" libelle={c("codePostal")} />
        <Champ nom="precisions" libelle={c("precisions")} aide={c("precisionsAide")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-foreground">
            {c("espece")}
          </span>
          <select name="espece" defaultValue="" className={CLASSE_CHAMP}>
            <option value="">{c("choisir")}</option>
            {groupes.map(([famille, codes]) => (
              <optgroup key={famille} label={FAMILLES[famille]?.[locale] ?? famille}>
                {codes.map((code) => (
                  <option key={code} value={code}>
                    {ESPECES[code][locale]}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-foreground">
            {c("etat")}
          </span>
          <select name="etat" defaultValue="" className={CLASSE_CHAMP}>
            <option value="">{c("choisir")}</option>
            {ETATS.map((valeur) => (
              <option key={valeur} value={valeur}>
                {e(valeur)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-foreground">
          {c("description")}
        </span>
        <textarea
          name="description"
          required
          rows={5}
          placeholder={c("descriptionAide")}
          className={CLASSE_CHAMP}
        />
      </label>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-md bg-urgence px-6 py-3.5 font-semibold text-white transition hover:bg-urgence/90 disabled:opacity-60 sm:w-auto"
      >
        {enCours ? `${c("envoi")}…` : c("envoyer")}
      </button>
    </form>
  );
}
