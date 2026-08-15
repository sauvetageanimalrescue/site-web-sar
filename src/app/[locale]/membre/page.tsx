import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { EnTetePage, Section } from "@/components/ui";
import { FormulaireAdhesion } from "@/components/formulaire-adhesion";

export default async function PageMembre({
  params,
}: PageProps<"/[locale]/membre">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "membre" });
  const avantages = t.raw("avantages") as string[];

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/carte-membre-2026.jpg"
      />

      <Section>
        <div className="space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("avantagesTitre")}
            </h2>
            <ul className="mt-5 max-w-3xl space-y-2.5">
              {avantages.map((a) => (
                <li key={a} className="flex gap-3 text-foreground/90">
                  <IconCircleCheckFilled
                    className="mt-0.5 size-5 shrink-0 text-vert"
                    aria-hidden
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[21/9] overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/carte-membre-2026.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("formulaireTitre")}
            </h2>
            <div className="mt-6 max-w-3xl">
              <FormulaireAdhesion />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/membre">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "membre" });
  return { title: t("titre"), description: t("intro") };
}
