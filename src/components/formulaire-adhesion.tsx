"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { IconAlertTriangleFilled, IconRepeat } from "@tabler/icons-react";
import {
  demarrerAdhesion,
  type EtatPaiement,
} from "@/lib/actions/adhesion";
import { TARIFS } from "@/lib/constantes";

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

function Champ({
  nom,
  libelle,
  requis = false,
  type = "text",
  facultatif,
}: {
  nom: string;
  libelle: string;
  requis?: boolean;
  type?: string;
  facultatif: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">
        {libelle}
        {!requis && (
          <span className="ml-1 font-normal text-muted">({facultatif})</span>
        )}
      </span>
      <input type={type} name={nom} required={requis} className={CLASSE_CHAMP} />
    </label>
  );
}

export function FormulaireAdhesion() {
  const t = useTranslations("membre");
  const c = useTranslations("membre.champs");
  const [etat, action, enCours] = useActionState<EtatPaiement, FormData>(
    demarrerAdhesion,
    { etat: "inactif" },
  );

  return (
    <form action={action} className="space-y-5">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "champs" ? t("erreurChamps") : t("erreurPaiement")}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Champ nom="prenom" libelle={c("prenom")} requis facultatif={c("facultatif")} />
        <Champ nom="nom" libelle={c("nom")} requis facultatif={c("facultatif")} />
      </div>
      <Champ
        nom="courriel"
        libelle={c("courriel")}
        type="email"
        requis
        facultatif={c("facultatif")}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Champ
          nom="telephone"
          libelle={c("telephone")}
          type="tel"
          facultatif={c("facultatif")}
        />
        <Champ nom="ville" libelle={c("ville")} facultatif={c("facultatif")} />
      </div>
      <Champ
        nom="codePostal"
        libelle={c("codePostal")}
        facultatif={c("facultatif")}
      />

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface-2 p-4">
        <input
          type="checkbox"
          name="renouvellement"
          defaultChecked
          className="mt-1 size-4 accent-[var(--marine)]"
        />
        <span>
          <span className="flex items-center gap-2 font-semibold text-marine">
            <IconRepeat className="size-4" aria-hidden />
            {t("renouvellementTitre")}
          </span>
          <span className="mt-1 block text-sm text-muted">
            {t("renouvellementTexte")}
          </span>
        </span>
      </label>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60"
      >
        {enCours
          ? `${c("redirection")}…`
          : c("payer", { montant: TARIFS.carteMembre })}
      </button>
    </form>
  );
}
