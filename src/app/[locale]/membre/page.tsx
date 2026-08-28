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
        imageTailleNaturelle={{ largeur: 1246, hauteur: 700 }}
      />

      <Section titre={t("avantagesTitre")} largeur="carte">
        <ul className="space-y-2.5">
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
      </Section>

      <Section fond largeur="carte">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-marine">
          <Image
            src="/images/carte-membre-2026.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 42rem"
            className="object-cover"
          />
        </div>
      </Section>

      <Section titre={t("formulaireTitre")} largeur="carte">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
          <FormulaireAdhesion />
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
