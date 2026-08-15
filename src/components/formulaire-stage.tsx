"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { demarrerStage, type EtatPaiement } from "@/lib/actions/adhesion";
import type { StageDisponible } from "@/lib/stages";

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

export function FormulaireStage({
  stages,
  stageInitial,
}: {
  stages: StageDisponible[];
  stageInitial?: string;
}) {
  const t = useTranslations("stages");
  const c = useTranslations("stages.champs");
  const locale = useLocale();
  const [etat, action, enCours] = useActionState<EtatPaiement, FormData>(
    demarrerStage,
    { etat: "inactif" },
  );

  const ouverts = stages.filter((s) => s.restantes > 0);
  const prix = (ouverts[0]?.prix_cents ?? 22000) / 100;

  const formaterDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(locale, {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <form action={action} className="space-y-5">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "champs"
            ? t("erreurChamps")
            : etat.motif === "complet"
              ? t("erreurComplet")
              : t("erreurPaiement")}
        </p>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-medium">{t("choisirDate")}</span>
        <select
          name="stage"
          required
          defaultValue={stageInitial ?? ""}
          className={CLASSE_CHAMP}
        >
          <option value="">{c("choisir")}</option>
          {ouverts.map((s) => (
            <option key={s.id} value={s.id}>
              {s.code} • {formaterDate(s.date_stage)}
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

      <label className="block">
        <span className="mb-1 block text-sm font-medium">
          {c("accompagnateur")}{" "}
          <span className="font-normal text-muted">({c("facultatif")})</span>
        </span>
        <input name="accompagnateur" className={CLASSE_CHAMP} />
      </label>

      <button
        type="submit"
        disabled={enCours || ouverts.length === 0}
        className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60"
      >
        {enCours ? `${c("redirection")}…` : c("payer", { montant: prix })}
      </button>
    </form>
  );
}
