"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { demarrerStage, type EtatPaiement } from "@/lib/actions/adhesion";
import { TARIFS } from "@/lib/constantes";
import type { StageDisponible } from "@/lib/stages";

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

function formaterPrix(montant: number) {
  return montant.toFixed(2).replace(".", ",");
}

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

  const [nombrePersonnes, setNombrePersonnes] = useState<1 | 2>(1);
  const [mineur1, setMineur1] = useState(false);
  const [mineur2, setMineur2] = useState(false);

  const ouverts = stages.filter((s) => s.restantes > 0);
  const prix = nombrePersonnes === 2 ? TARIFS.stageDuo : TARIFS.stage;
  const unMineur = mineur1 || (nombrePersonnes === 2 && mineur2);

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
              {formaterDate(s.date_stage)}
              {s.maitre_stage ? ` • ${s.maitre_stage}` : ""}
              {s.vehicule ? ` (${s.vehicule})` : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">{c("nombrePersonnes")}</span>
        <select
          name="nombrePersonnes"
          required
          value={nombrePersonnes}
          onChange={(e) => setNombrePersonnes(Number(e.target.value) as 1 | 2)}
          className={CLASSE_CHAMP}
        >
          <option value={1}>
            {c("unePersonne")} — {formaterPrix(TARIFS.stage)} $
          </option>
          <option value={2}>
            {c("deuxPersonnes")} — {formaterPrix(TARIFS.stageDuo)} $
          </option>
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

      <label className="flex items-center gap-2 text-sm text-foreground/90">
        <input
          type="checkbox"
          name="mineur1"
          checked={mineur1}
          onChange={(e) => setMineur1(e.target.checked)}
          className="size-4 rounded border-border"
        />
        {c("mineur")}
      </label>

      {/* Le tarif couvre une ou deux personnes : la deuxième n'a besoin que de
          son nom, puisqu'elle se présentera avec la première le jour même. */}
      {nombrePersonnes === 2 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {c("prenomAccompagnateur")}
              </span>
              <input name="accompagnateurPrenom" required className={CLASSE_CHAMP} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                {c("nomAccompagnateur")}
              </span>
              <input name="accompagnateurNom" required className={CLASSE_CHAMP} />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground/90">
            <input
              type="checkbox"
              name="mineur2"
              checked={mineur2}
              onChange={(e) => setMineur2(e.target.checked)}
              className="size-4 rounded border-border"
            />
            {c("mineur")}
          </label>
        </>
      )}

      {unMineur && (
        <p className="rounded-md border border-border bg-surface-2 p-4 text-sm text-foreground/90">
          {c("consentementMineur")}
        </p>
      )}

      <button
        type="submit"
        disabled={enCours || ouverts.length === 0}
        className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60"
      >
        {enCours ? `${c("redirection")}…` : c("payer", { montant: formaterPrix(prix) })}
      </button>
    </form>
  );
}
