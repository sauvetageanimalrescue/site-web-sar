import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppelAction, Section, EnTetePage } from "@/components/ui";
import { WidgetTirage } from "@/components/lotterie/widget-tirage";

const PERMIS = "/documents/L-06362_loterieclasseB.pdf";
const REGLEMENTS = "/documents/Regles_Tirage-O-SAR_2026-2027.pdf";

export default async function PageLoterie({
  params,
}: PageProps<"/[locale]/loterie">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "loterie" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/loterie-hero.jpg"
        imagePosition="right center"
      />

      <Section largeur="pleine">
        <WidgetTirage chargement={t("widgetChargement")} erreur={t("widgetErreur")} />
      </Section>

      <Section titre={t("documentsTitre")} fond largeur="carte">
        <div className="flex flex-wrap gap-3">
          <a
            href={REGLEMENTS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair"
          >
            {t("reglements")}
          </a>
          <a
            href={PERMIS}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-md border border-marine px-6 py-3.5 font-semibold text-marine transition hover:bg-marine hover:text-white"
          >
            {t("licence")}
          </a>
        </div>
      </Section>

      <AppelAction
        titre={t("titre")}
        actions={[
          { href: "/membre", libelle: t("membreBouton"), principal: true },
          { href: "/dons", libelle: t("donBouton") },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/loterie">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "loterie" });
  return { title: t("titre"), description: t("intro") };
}
