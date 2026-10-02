import { getTranslations, setRequestLocale } from "next-intl/server";

const PERMIS = "/documents/L-06362_loterieclasseB.pdf";

export default async function PageLoterie({
  params,
}: PageProps<"/[locale]/loterie">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <iframe
      src={PERMIS}
      title={t("loterie")}
      className="mx-auto block min-h-[900px] w-full max-w-5xl border-0"
    />
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/loterie">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("loterie") };
}
