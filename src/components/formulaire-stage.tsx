"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { demarrerStage, type EtatPaiement } from "@/lib/actions/adhesion";
import { TARIFS } from "@/lib/constantes";
import type { StageDisponible } from "@/lib/stages";

const CLASSE_CHAMP =
  "w-full rounded-md border border-border bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30";

type Scenario = "seul" | "avec" | "autre1" | "autres2";

function formaterPrix(montant: number) {
  return montant.toFixed(2).replace(".", ",");
}

export function FormulaireStage({ stages, stageInitial }: { stages: StageDisponible[]; stageInitial?: string }) {
  const t = useTranslations("stages");
  const c = useTranslations("stages.champs");
  const locale = useLocale();
  const [etat, action, enCours] = useActionState<EtatPaiement, FormData>(demarrerStage, { etat: "inactif" });
  const [scenario, setScenario] = useState<Scenario>("seul");
  const [mineur1, setMineur1] = useState(false);
  const [mineur2, setMineur2] = useState(false);
  const ouverts = stages.filter((s) => s.restantes > 0);
  const nombrePersonnes = scenario === "avec" || scenario === "autres2" ? 2 : 1;
  const responsableParticipe = scenario === "seul" || scenario === "avec";
  const unMineur = (!responsableParticipe && mineur1) || (nombrePersonnes === 2 && mineur2);
  const prix = nombrePersonnes === 2 ? TARIFS.stageDuo : TARIFS.stage;

  const formaterDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(locale, {
      weekday: "long", day: "2-digit", month: "long", year: "numeric",
    });

  return (
    <form action={action} className="space-y-7">
      {etat.etat === "erreur" && (
        <p className="flex items-start gap-2 rounded-md border border-urgence bg-urgence-doux p-4 text-sm text-urgence">
          <IconAlertTriangleFilled className="mt-0.5 size-5 shrink-0" aria-hidden />
          {etat.motif === "champs" ? t("erreurChamps") : etat.motif === "complet" ? t("erreurComplet") : t("erreurPaiement")}
        </p>
      )}

      <fieldset className="space-y-5">
        <legend className="font-semibold text-marine">{c("reservationTitre")}</legend>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{t("choisirDate")}</span>
          <select name="stage" required defaultValue={stageInitial ?? ""} className={CLASSE_CHAMP}>
            <option value="">{c("choisir")}</option>
            {ouverts.map((s) => (
              <option key={s.id} value={s.id}>
                {formaterDate(s.date_stage)}{s.maitre_stage ? ` - ${s.maitre_stage}` : ""}{s.vehicule ? ` (${s.vehicule})` : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{c("scenario")}</span>
          <select
            name="scenario"
            value={scenario}
            onChange={(e) => {
              const valeur = e.target.value as Scenario;
              setScenario(valeur);
              if (valeur === "seul" || valeur === "avec") setMineur1(false);
              if (valeur === "seul" || valeur === "autre1") setMineur2(false);
            }}
            className={CLASSE_CHAMP}
          >
            <option value="seul">{c("scenarioSeul")}</option>
            <option value="avec">{c("scenarioAvec")}</option>
            <option value="autre1">{c("scenarioAutre1")}</option>
            <option value="autres2">{c("scenarioAutres2")}</option>
          </select>
        </label>
        <p className="text-sm text-muted">{c("tarif", { montant: formaterPrix(prix) })}</p>
      </fieldset>

      <fieldset className="space-y-5 border-t border-border pt-6">
        <legend className="font-semibold text-marine">{c("responsableTitre")}</legend>
        <p className="text-sm text-muted">{c("responsableAide")}</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Champ nom="responsablePrenom" libelle={c("prenom")} />
          <Champ nom="responsableNom" libelle={c("nom")} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Champ nom="courriel" libelle={c("courriel")} type="email" />
          <Champ nom="telephone" libelle={c("telephone")} type="tel" />
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-border pt-6">
        <legend className="font-semibold text-marine">{c("participantsTitre")}</legend>
        {responsableParticipe ? (
          <p className="rounded-md bg-surface-2 p-4 text-sm text-foreground/90">{c("responsableParticipant1")}</p>
        ) : (
          <Participant numero={1} mineur={mineur1} onMineur={setMineur1} c={c} />
        )}
        {nombrePersonnes === 2 && <Participant numero={2} mineur={mineur2} onMineur={setMineur2} c={c} />}
      </fieldset>

      {unMineur && (
        <fieldset className="space-y-5 rounded-md border border-lime/50 bg-lime/5 p-5">
          <legend className="px-1 font-semibold text-marine">{c("autorisationTitre")}</legend>
          <p className="text-sm leading-relaxed text-foreground/90">{c("autorisationTexte")}</p>
          <label className="flex items-start gap-3 text-sm text-foreground/90">
            <input type="checkbox" name="autorisationAcceptee" required className="mt-0.5 size-4 rounded border-border" />
            <span>{c("autorisationConfirmation")}</span>
          </label>
          <Champ nom="autorisationSignature" libelle={c("signature")} aide={c("signatureAide")} />
        </fieldset>
      )}

      <button type="submit" disabled={enCours || ouverts.length === 0} className="w-full rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair disabled:opacity-60">
        {enCours ? `${c("redirection")}.` : c("payer", { montant: formaterPrix(prix) })}
      </button>
    </form>
  );
}

function Champ({ nom, libelle, type = "text", aide }: { nom: string; libelle: string; type?: string; aide?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{libelle}</span>
      <input type={type} name={nom} required className={CLASSE_CHAMP} />
      {aide && <span className="mt-1 block text-xs text-muted">{aide}</span>}
    </label>
  );
}

function Participant({ numero, mineur, onMineur, c }: { numero: 1 | 2; mineur: boolean; onMineur: (valeur: boolean) => void; c: ReturnType<typeof useTranslations<"stages.champs">> }) {
  return (
    <div className="space-y-4 rounded-md border border-border p-5">
      <p className="font-medium text-marine">{c("participant", { numero })}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Champ nom={`participant${numero}Prenom`} libelle={c("prenom")} />
        <Champ nom={`participant${numero}Nom`} libelle={c("nom")} />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground/90">
        <input type="checkbox" name={`mineur${numero}`} checked={mineur} onChange={(e) => onMineur(e.target.checked)} className="size-4 rounded border-border" />
        {c("mineur")}
      </label>
    </div>
  );
}
