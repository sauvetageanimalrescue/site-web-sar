import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { libelleFamille } from "@/lib/especes";
import type { Statistiques } from "@/lib/statistiques";

// Une seule série par graphique, donc une seule teinte : le bleu ciel de
// l'écusson. Pas de légende (le titre nomme la série), les valeurs sont
// écrites en encre de texte et non dans la couleur de la barre, et un tableau
// replié donne la même information sans dépendre de la couleur.

function nomMois(cleMois: string, locale: Locale) {
  const [annee, mois] = cleMois.split("-").map(Number);
  return new Date(annee, mois - 1, 1).toLocaleDateString(locale, {
    month: "short",
  });
}

export async function GraphiqueMensuel({ stats }: { stats: Statistiques }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("statistiques");
  const donnees = stats.mensuel;
  const maximum = Math.max(1, ...donnees.map((d) => d.sauves));

  return (
    <figure className="rounded-xl border border-border bg-surface p-6">
      <figcaption>
        <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
          {t("mensuelTitre")}
        </h3>
        <p className="text-sm text-muted">{t("mensuelSousTitre")}</p>
      </figcaption>

      <div className="mt-8 flex h-64 items-end gap-2" role="presentation">
        {donnees.map((d) => (
          <div key={d.mois} className="flex flex-1 flex-col items-center gap-2">
            <span className="chiffres-tabulaires text-xs font-semibold text-foreground">
              {d.sauves.toLocaleString(locale)}
            </span>
            <div
              className="w-full rounded-t bg-ciel transition-[height]"
              style={{
                height: `${Math.max((d.sauves / maximum) * 100, 1.5)}%`,
              }}
              title={`${nomMois(d.mois, locale)} : ${d.sauves}`}
            />
            <span className="text-xs capitalize text-muted">
              {nomMois(d.mois, locale)}
            </span>
          </div>
        ))}
      </div>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm font-medium text-ciel">
          {t("tableauTitre")}
        </summary>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th scope="col" className="py-1.5 font-medium">
                {t("colonneMois")}
              </th>
              <th scope="col" className="py-1.5 text-right font-medium">
                {t("colonneSauves")}
              </th>
            </tr>
          </thead>
          <tbody>
            {donnees.map((d) => (
              <tr key={d.mois} className="border-b border-border/60">
                <td className="py-1.5 capitalize">{nomMois(d.mois, locale)}</td>
                <td className="chiffres-tabulaires py-1.5 text-right">
                  {d.sauves.toLocaleString(locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

export async function GraphiqueFamilles({ stats }: { stats: Statistiques }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("statistiques");
  const donnees = stats.familles;
  const maximum = Math.max(1, ...donnees.map((d) => d.sauves));

  return (
    <figure className="rounded-xl border border-border bg-surface p-6">
      <figcaption>
        <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
          {t("famillesTitre")}
        </h3>
        <p className="text-sm text-muted">{t("famillesSousTitre")}</p>
      </figcaption>

      <ul className="mt-8 space-y-3">
        {donnees.map((d) => (
          <li key={d.famille}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-foreground">
                {libelleFamille(d.famille, locale)}
              </span>
              <span className="chiffres-tabulaires font-semibold text-foreground">
                {d.sauves.toLocaleString(locale)}
              </span>
            </div>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded bg-surface-2">
              <div
                className="h-full rounded bg-ciel"
                style={{ width: `${Math.max((d.sauves / maximum) * 100, 2)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
