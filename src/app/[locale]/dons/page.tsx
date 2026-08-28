import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { FormulaireDon } from "@/components/formulaire-don";

export default async function PageDons({ params }: PageProps<"/[locale]/dons">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dons" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/carte-dons-1900.jpg"
        imageTailleNaturelle={{ largeur: 1900, hauteur: 1900 }}
      />

      <Section largeur="carte">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
          <FormulaireDon />
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/dons">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dons" });
  return { title: t("titre"), description: t("intro") };
}
