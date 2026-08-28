import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { IconCalendarEvent, IconMapPin, IconClock } from "@tabler/icons-react";
import { EnTetePage, Section } from "@/components/ui";
import { FormulaireStage } from "@/components/formulaire-stage";
import { lireStagesAVenir } from "@/lib/stages";
import { ORGANISATION } from "@/lib/constantes";

// Les places changent à chaque paiement : pas de mise en cache longue.
export const revalidate = 60;

export default async function PageStages({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stages" });
  const langue = await getLocale();
  const stages = await lireStagesAVenir();
  const infos = t.raw("infos") as string[];

  const formaterDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(langue, {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/stages.jpg"
        imageTailleNaturelle={{ largeur: 2000, hauteur: 3556 }}
      />

      <Section>
        <div className="space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("infosTitre")}
            </h2>
            <ul className="mt-5 max-w-3xl space-y-2.5">
              {infos.map((info) => (
                <li key={info} className="flex gap-3 text-foreground/90">
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-ciel"
                    aria-hidden
                  />
                  {info}
                </li>
              ))}
            </ul>

          </div>

          <div>
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("datesTitre")}
            </h2>

            {stages.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-border p-6 text-muted">
                {t("aucuneDate", { courriel: ORGANISATION.courriels.direction })}
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {stages.map((stage) => (
                  <li
                    key={stage.id}
                    className={`rounded-xl border p-5 ${
                      stage.restantes > 0
                        ? "border-border bg-surface"
                        : "border-border bg-surface-2 opacity-70"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="flex items-center gap-2 font-semibold text-marine">
                        <IconCalendarEvent
                          className="size-5 shrink-0 text-ciel"
                          aria-hidden
                        />
                        <span className="first-letter:uppercase">
                          {formaterDate(stage.date_stage)}
                        </span>
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          stage.restantes > 0
                            ? "bg-vert-doux text-vert"
                            : "bg-surface-2 text-muted"
                        }`}
                      >
                        {stage.restantes === 0
                          ? t("complet")
                          : stage.restantes === 1
                            ? t("unePlace")
                            : t("plusieursPlaces", { places: stage.restantes })}
                      </span>
                    </div>
                    <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <IconClock className="size-4 shrink-0" aria-hidden />
                        {stage.heure_debut.slice(0, 5)} — {stage.heure_fin.slice(0, 5)}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconMapPin className="size-4 shrink-0" aria-hidden />
                        {stage.lieu}
                      </span>
                      <span className="chiffres-tabulaires">{stage.code}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("formulaireTitre")}
            </h2>
            <div className="mt-6 max-w-3xl">
              <FormulaireStage stages={stages} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stages" });
  return { title: t("titre"), description: t("intro") };
}
