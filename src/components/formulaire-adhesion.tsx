"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { IconAlertTriangleFilled, IconRepeat, IconMailbox } from "@tabler/icons-react";
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
  valeurParDefaut,
}: {
  nom: string;
  libelle: string;
  requis?: boolean;
  type?: string;
  facultatif: string;
  valeurParDefaut?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">
        {libelle}
        {!requis && (
          <span className="ml-1 font-normal text-muted">({facultatif})</span>
        )}
      </span>
      <input
        type={type}
        name={nom}
        required={requis}
        defaultValue={valeurParDefaut}
        className={CLASSE_CHAMP}
      />
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
  // L'adresse ne sert qu'à poster une carte physique: elle ne s'affiche, et
  // ne devient obligatoire, que si la personne en demande une.
  const [cartePhysique, setCartePhysique] = useState(false);

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
      <Champ
        nom="telephone"
        libelle={c("telephone")}
        type="tel"
        facultatif={c("facultatif")}
      />

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface-2 p-4">
        <input
          type="checkbox"
          name="cartePhysique"
          checked={cartePhysique}
          onChange={(e) => setCartePhysique(e.target.checked)}
          className="mt-1 size-4 accent-[var(--marine)]"
        />
        <span>
          <span className="flex items-center gap-2 font-semibold text-marine">
            <IconMailbox className="size-4" aria-hidden />
            {t("cartePhysiqueTitre")}
          </span>
          <span className="mt-1 block text-sm text-muted">
            {t("cartePhysiqueTexte")}
          </span>
        </span>
      </label>

      {cartePhysique && (
        <div className="space-y-5 rounded-lg border border-border p-4">
          <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
            <Champ nom="adresse" libelle={c("adresse")} requis facultatif={c("facultatif")} />
            <Champ
              nom="appartement"
              libelle={c("appartement")}
              facultatif={c("facultatif")}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Champ nom="ville" libelle={c("ville")} requis facultatif={c("facultatif")} />
            <Champ
              nom="codePostal"
              libelle={c("codePostal")}
              requis
              facultatif={c("facultatif")}
            />
          </div>
          {/* Préremplis pour le Québec, mais modifiables: des membres
              écrivent de l'étranger. */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Champ
              nom="province"
              libelle={c("province")}
              requis
              facultatif={c("facultatif")}
              valeurParDefaut="Québec"
            />
            <Champ
              nom="pays"
              libelle={c("pays")}
              requis
              facultatif={c("facultatif")}
              valeurParDefaut="Canada"
            />
          </div>
        </div>
      )}

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
