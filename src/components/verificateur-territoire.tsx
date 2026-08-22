"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { IconCircleCheckFilled, IconAlertTriangleFilled } from "@tabler/icons-react";
import { MUNICIPALITES } from "@/contenu/municipalites";

// Ramène un nom à une forme comparable: sans accent, sans ponctuation, et
// avec « saint » et « sainte » réduits à « st » et « ste ». Quelqu'un qui
// tape « st-eustache » cherche bien Saint-Eustache, et l'inverse est vrai
// aussi. La réduction s'applique des deux côtés, donc les deux graphies se
// rejoignent.
function normaliser(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/sainte/g, "ste")
    .replace(/saint/g, "st")
    .replace(/[^a-z0-9]/g, "");
}

const INDEX = MUNICIPALITES.map((m) => ({ nom: m, cle: normaliser(m) }));

export function VerificateurTerritoire() {
  const t = useTranslations("territoire");
  const [saisie, setSaisie] = useState("");
  const [ouvert, setOuvert] = useState(false);

  const cle = normaliser(saisie);
  // Trois lettres au minimum : en dessous, la liste de suggestions serait
  // aussi longue que la liste complète.
  const suggestions = useMemo(
    () => (cle.length < 3 ? [] : INDEX.filter((m) => m.cle.includes(cle)).slice(0, 6)),
    [cle],
  );
  const exact = INDEX.find((m) => m.cle === cle);
  const chercheVraiment = cle.length >= 3;

  return (
    <div>
      <label className="block">
        <span className="mb-2 block font-medium text-foreground">
          {t("verifTitre")}
        </span>
        <input
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          placeholder={t("verifPlaceholder")}
          className="w-full rounded-md border border-border bg-surface px-4 py-3 text-lg text-foreground outline-none transition focus:border-ciel focus:ring-2 focus:ring-ciel/30"
        />
      </label>

      {chercheVraiment && (
        <div className="mt-4">
          {exact || suggestions.length > 0 ? (
            <div className="rounded-md border border-vert bg-vert-doux p-4">
              <p className="flex items-center gap-2 font-semibold text-vert">
                <IconCircleCheckFilled className="size-5 shrink-0" aria-hidden />
                {t("verifOui")}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/90">
                {(exact ? [exact] : suggestions).map((m) => (
                  <li key={m.nom}>{m.nom}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-md border border-urgence bg-urgence-doux p-4">
              <p className="flex items-center gap-2 font-semibold text-urgence">
                <IconAlertTriangleFilled className="size-5 shrink-0" aria-hidden />
                {t("verifNon")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {t("verifNonTexte")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* La liste complète reste accessible, mais repliée : elle répond à une
          question que le champ ci-dessus règle déjà en deux secondes. */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          className="text-sm font-semibold text-ciel underline-offset-4 hover:underline"
        >
          {ouvert ? t("listeFermer") : t("listeOuvrir", { total: MUNICIPALITES.length })}
        </button>
        {ouvert && (
          <ul className="mt-4 columns-2 gap-6 text-sm text-foreground/90">
            {MUNICIPALITES.map((m) => (
              <li key={m} className="mb-1 list-inside list-disc marker:text-ciel">
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
