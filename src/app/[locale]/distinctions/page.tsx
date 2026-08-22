import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, AppelAction } from "@/components/ui";

export default async function PageDistinctions({
  params,
}: PageProps<"/[locale]/distinctions">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "distinctions" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/distinctions-ecusson.jpg"
      />

      {/* Le système de reconnaissance n'existe pas encore. Tant qu'il n'est
          pas arrêté, la page ne montre aucune distinction: en annoncer qui
          ne sont pas décernées serait faux. Le détail des barrettes reste
          dans src/contenu/distinctions.ts, à titre de proposition. */}
      <Section titre={t("aVenirTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("aVenirTexte")}
        </p>
      </Section>

      <AppelAction
        titre={t("titre")}
        actions={[
          { href: "/membre", libelle: t("membreBouton"), principal: true },
          { href: "/equipe", libelle: t("equipeBouton") },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/distinctions">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "distinctions" });
  return { title: t("titre"), description: t("intro") };
}
