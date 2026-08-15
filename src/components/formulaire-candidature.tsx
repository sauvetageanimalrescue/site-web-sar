"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  IconCircleCheckFilled,
  IconAlertTriangleFilled,
} from "@tabler/icons-react";
import type { Locale } from "@/i18n/routing";
import { POSTES, fichePoste } from "@/contenu/postes";
import { ORGANISATION } from "@/lib/constantes";
import {
  envoyerCandidature,
  type EtatCandidature,
} from "@/lib/actions/candidature";

const DISPONIBILITES = [
  "semaineJour",
  "semaineSoir",
  "finSemaineJour",
  "finSemaineSoir",
  "nuit",
  "surAppel",
] as const;

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

export function FormulaireCandidature({
  posteInitial,
}: {
  posteInitial?: string;
}) {
  const t = useTranslations("recrutement");
  const c = useTranslations("recrutement.champs");
  const j = useTranslations("recrutement.jours");
  const locale = useLocale() as Locale;

  const [etat, action, enCours] = useActionState<EtatCandidature, FormData>(
    envoyerCandidature,
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
          {t("succesTexte", { courriel: ORGANISATION.courriels.direction })}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "champs"
            ? t("erreurChamps")
            : t("erreurEnvoi", { courriel: ORGANISATION.courriels.direction })}
        </p>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-foreground">
          {c("poste")}
        </span>
        <select
          name="poste"
          required
          defaultValue={posteInitial ?? ""}
          className={CLASSE_CHAMP}
        >
          <option value="">{c("choisir")}</option>
          {POSTES.map((p) => (
            <option key={p.cle} value={p.cle}>
              {fichePoste(p.cle, locale).titre}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{c("prenom")}</span>
          <input name="prenom" required className={CLASSE_CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{c("nom")}</span>
          <input name="nom" required className={CLASSE_CHAMP} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{c("courriel")}</span>
          <input type="email" name="courriel" required className={CLASSE_CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{c("telephone")}</span>
          <input type="tel" name="telephone" required className={CLASSE_CHAMP} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{c("ville")}</span>
          <input name="ville" required className={CLASSE_CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            {c("codePostal")}{" "}
            <span className="font-normal text-muted">({c("facultatif")})</span>
          </span>
          <input name="codePostal" className={CLASSE_CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            {c("dateNaissance")}{" "}
            <span className="font-normal text-muted">({c("facultatif")})</span>
          </span>
          <input type="date" name="dateNaissance" className={CLASSE_CHAMP} />
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-foreground">
          {c("disponibilites")}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {DISPONIBILITES.map((d) => (
            <label
              key={d}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                name="disponibilites"
                value={d}
                className="size-4 accent-[var(--marine)]"
              />
              {j(d)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm">
          <input
            type="checkbox"
            name="vehicule"
            className="size-4 accent-[var(--marine)]"
          />
          {c("vehicule")}
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm">
          <input
            type="checkbox"
            name="permis"
            className="size-4 accent-[var(--marine)]"
          />
          {c("permis")}
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">
          {c("experience")}{" "}
          <span className="font-normal text-muted">({c("facultatif")})</span>
        </span>
        <textarea
          name="experience"
          rows={3}
          placeholder={c("experienceAide")}
          className={CLASSE_CHAMP}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">{c("motivation")}</span>
        <textarea name="motivation" rows={4} className={CLASSE_CHAMP} />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">
          {c("reference")}{" "}
          <span className="font-normal text-muted">({c("facultatif")})</span>
        </span>
        <input name="reference" className={CLASSE_CHAMP} />
      </label>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60 sm:w-auto"
      >
        {enCours ? `${c("envoi")}…` : c("envoyer")}
      </button>
    </form>
  );
}
