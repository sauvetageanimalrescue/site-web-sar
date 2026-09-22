import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { LocalisateurRefuges } from "@/components/localisateur-refuges";

export default async function PageLocalisateurRefuges({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("localisateur");
  return <>
    <EnTetePage surtitre={t("surtitre")} titre={t("titre")} intro={t("intro")} />
    <Section titre={t("commentTitre")} largeur="carte">
      <p className="paragraphe text-lg leading-relaxed text-foreground/90">{t("commentTexte")}</p>
    </Section>
    <Section fond titre={t("rechercherTitre")} largeur="carte"><LocalisateurRefuges /></Section>
  </>;
}
