import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import {
  GraphiqueMensuel,
  GraphiqueFamilles,
} from "@/components/graphiques-statistiques";
import { FilInterventions } from "@/components/fil-interventions";
import { lireStatistiques } from "@/lib/statistiques";
import type { Locale } from "@/i18n/routing";

// Les compteurs bougent en continu ; on ne met en cache que 60 secondes.
export const revalidate = 60;

export default async function PageStatistiques({
  params,
}: PageProps<"/[locale]/statistiques">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "statistiques" });
  const stats = await lireStatistiques();
  const langue = (await getLocale()) as Locale;

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/territoire.jpg"
      />

      <CompteurSauvetages initiales={stats} />

      {stats ? (
        <>
          <Section>
            <p className="mb-8 text-lg text-muted">
              <span className="chiffres-tabulaires font-[family-name:var(--font-titre)] text-4xl font-bold text-marine">
                {stats.missions_annee.toLocaleString(langue)}
              </span>{" "}
              {t("missionsAnnee")}
            </p>
            <div className="space-y-6">
              <GraphiqueMensuel stats={stats} />
              <GraphiqueFamilles stats={stats} />
            </div>
          </Section>

          <FilInterventions limite={12} />
        </>
      ) : (
        <Section>
          <p className="rounded-lg border border-dashed border-border p-10 text-center text-muted">
            {t("vide")}
          </p>
        </Section>
      )}

      <Section fond etroite>
        <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
          {t("methodeTitre")}
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/90">
          {t("methodeTexte")}
        </p>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/statistiques">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "statistiques" });
  return { title: t("titre"), description: t("intro") };
}
