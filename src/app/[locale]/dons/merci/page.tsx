import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconHeartFilled } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui";

export default async function PageMerciDon({
  params,
}: PageProps<"/[locale]/dons/merci">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dons" });
  const c = await getTranslations({ locale, namespace: "commun" });

  return (
    <Section etroite>
      <div className="rounded-xl border border-vert bg-vert-doux p-8 text-center">
        <IconHeartFilled className="mx-auto size-14 text-vert" aria-hidden />
        <h1 className="mt-4 font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine">
          {t("merciTitre")}
        </h1>
        <p className="mt-4 leading-relaxed text-foreground/90">
          {t("merciTexte")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair"
        >
          {c("retour")}
        </Link>
      </div>
    </Section>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dons/merci">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dons" });
  return { title: t("merciTitre"), robots: { index: false } };
}
