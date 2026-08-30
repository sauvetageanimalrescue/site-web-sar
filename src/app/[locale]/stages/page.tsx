import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, ListePuces } from "@/components/ui";
import { FormulaireStage } from "@/components/formulaire-stage";
import { lireStagesAVenir } from "@/lib/stages";

// Les places changent à chaque paiement : pas de mise en cache longue.
export const revalidate = 60;

export default async function PageStages({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stages" });
  const stages = await lireStagesAVenir();
  const infos = t.raw("infos") as string[];

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/stages.jpg"
        imageTailleNaturelle={{ largeur: 2000, hauteur: 3556 }}
      />

      <Section titre={t("infosTitre")} largeur="carte">
        <ListePuces items={infos} />
      </Section>

      <Section fond titre={t("formulaireTitre")} largeur="carte">
        <FormulaireStage stages={stages} />
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
