"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { demarrerDon, type EtatPaiement } from "@/lib/actions/adhesion";

const MONTANTS = [25, 50, 100, 250];

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

export function FormulaireDon() {
  const t = useTranslations("dons");
  const c = useTranslations("dons.champs");
  const [etat, action, enCours] = useActionState<EtatPaiement, FormData>(
    demarrerDon,
    { etat: "inactif" },
  );
  const [montant, setMontant] = useState(50);
  const [mensuel, setMensuel] = useState(false);

  return (
    <form action={action} className="space-y-6">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "champs" ? t("erreurChamps") : t("erreurPaiement")}
        </p>
      )}

      {/* Ponctuel ou mensuel : deux boutons plutôt qu'une case à cocher, pour
          que le choix soit visible avant de saisir un montant. */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-surface-2 p-1">
        {[false, true].map((valeur) => (
          <button
            key={String(valeur)}
            type="button"
            onClick={() => setMensuel(valeur)}
            className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
              mensuel === valeur
                ? "bg-marine text-white"
                : "text-muted hover:text-marine"
            }`}
          >
            {valeur ? t("mensuel") : t("ponctuel")}
          </button>
        ))}
      </div>
      <input type="hidden" name="frequence" value={mensuel ? "mensuel" : "ponctuel"} />

      <div>
        <span className="mb-2 block text-sm font-medium">{c("montant")}</span>
        <div className="grid grid-cols-4 gap-2">
          {MONTANTS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMontant(m)}
              className={`rounded-md border px-2 py-3 font-semibold transition ${
                montant === m
                  ? "border-marine bg-marine text-white"
                  : "border-border text-marine hover:border-marine"
              }`}
            >
              {m} $
            </button>
          ))}
        </div>
        <label className="mt-3 block">
          <span className="mb-1 block text-sm text-muted">
            {t("montantLibre")}
          </span>
          <input
            type="number"
            name="montant"
            min={5}
            step={1}
            value={montant}
            onChange={(e) => setMontant(Number(e.target.value))}
            className={CLASSE_CHAMP}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">{c("courriel")}</span>
        <input type="email" name="courriel" required className={CLASSE_CHAMP} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            {c("prenom")}{" "}
            <span className="font-normal text-muted">({c("facultatif")})</span>
          </span>
          <input name="prenom" className={CLASSE_CHAMP} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            {c("nom")}{" "}
            <span className="font-normal text-muted">({c("facultatif")})</span>
          </span>
          <input name="nom" className={CLASSE_CHAMP} />
        </label>
      </div>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60"
      >
        {enCours ? `${c("redirection")}…` : `${c("donner")} ${montant} $`}
      </button>
    </form>
  );
}
