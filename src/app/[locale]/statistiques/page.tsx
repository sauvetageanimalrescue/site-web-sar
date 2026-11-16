import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { StatistiquesAnnuelles } from "@/components/statistiques-annuelles";
import { StatistiquesDirect } from "@/components/statistiques-direct";
import { lireStatistiques } from "@/lib/statistiques";
// Le bilan initial et les compteurs doivent lire les chiffres du même instant.
export const dynamic = "force-dynamic";

export default async function PageStatistiques({
  params,
}: PageProps<"/[locale]/statistiques">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "statistiques" });
  const stats = await lireStatistiques();

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/statistiques-transporteurs-1900.jpg"
        imageTailleNaturelle={{ largeur: 1900, hauteur: 1268 }}
        imagePosition="right calc(50% - 80px)"
      />

      <StatistiquesDirect initiales={stats}>
      <CompteurSauvetages />

      <StatistiquesAnnuelles />
      </StatistiquesDirect>
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
