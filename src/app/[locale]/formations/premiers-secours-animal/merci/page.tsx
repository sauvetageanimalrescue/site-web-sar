import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";

export default async function MerciFormation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("paiementFormation");
  return <><EnTetePage titre={t("retourTitre")} intro={t("retourIntro")} /><Section largeur="carte"><p className="paragraphe text-lg leading-relaxed text-foreground/90">{t("retourAide")}</p></Section></>;
}
