import { getLocale, getTranslations } from "next-intl/server";
import { IconPawFilled, IconMapPin } from "@tabler/icons-react";
import type { Locale } from "@/i18n/routing";
import { libelleEspece, libelleCodeFin } from "@/lib/especes";
import { lireInterventionsRecentes } from "@/lib/statistiques";

// Date en jour / mois / année, la convention de l'organisation.
function formaterDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function FilInterventions({ limite = 8 }: { limite?: number }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("accueil");
  const interventions = await lireInterventionsRecentes(limite);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine sm:text-4xl">
        {t("interventionsTitre")}
      </h2>
      <p className="mt-2 max-w-2xl text-muted">{t("interventionsTexte")}</p>

      {interventions.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-border p-8 text-center text-muted">
          {t("interventionsVide")}
        </p>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {interventions.map((i, index) => (
            <li
              key={`${i.ferme_a}-${index}`}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-2 font-semibold text-marine">
                  <IconPawFilled className="size-5 shrink-0 text-ciel" aria-hidden />
                  {libelleEspece(i.espece_code, locale)}
                </span>
                {i.sauves > 1 && (
                  <span className="rounded-full bg-vert-doux px-2 py-0.5 text-xs font-semibold text-vert">
                    ×{i.sauves}
                  </span>
                )}
              </div>
              {i.ville && (
                <p className="mt-2 flex items-center gap-1 text-sm text-muted">
                  <IconMapPin className="size-4 shrink-0" aria-hidden />
                  {i.ville}
                </p>
              )}
              <p className="mt-1 text-sm text-vert">
                {libelleCodeFin(i.code_fin, locale)}
              </p>
              <p className="mt-3 text-xs text-muted">
                {formaterDate(i.ferme_a, locale)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
