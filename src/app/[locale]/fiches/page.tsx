import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { FICHES, texteFiche, type Urgence } from "@/contenu/fiches";
import type { Locale } from "@/i18n/routing";

// Pastille d'urgence : sur fond clair, on reste sur des teintes lisibles et on
// double la couleur par le mot lui-même, jamais la couleur seule.
const TEINTES: Record<Urgence, string> = {
  urgente: "bg-urgence-doux text-urgence",
  moderee: "bg-ciel-doux text-ciel",
  faible: "bg-surface-2 text-muted",
};

export default async function PageFiches({
  params,
}: PageProps<"/[locale]/fiches">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const langue = locale as Locale;
  const t = await getTranslations({ locale, namespace: "fiches" });
  const c = await getTranslations({ locale, namespace: "commun" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/formations.jpg"
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FICHES.map((fiche) => {
            const texte = texteFiche(fiche.slug, langue);
            if (!texte) return null;
            return (
              <Link
                key={fiche.slug}
                href={`/fiches/${fiche.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-ciel hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <Image
                    src={fiche.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TEINTES[fiche.urgence]}`}
                    >
                      {t(`urgence.${fiche.urgence}`)}
                    </span>
                    <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted">
                      {t(`categories.${fiche.categorie}`)}
                    </span>
                  </div>
                  <h2 className="mt-3 font-[family-name:var(--font-titre)] text-xl font-semibold uppercase leading-tight tracking-wide text-marine">
                    {texte.titre}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {texte.resume}
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-ciel">
                    {c("enSavoirPlus")}
                    <IconArrowRight
                      className="size-4 transition group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <AppelAction
        titre={t("ctaTitre")}
        texte={t("ctaTexte")}
        actions={[
          { href: "/signalement", libelle: t("ctaAction"), principal: true },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/fiches">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fiches" });
  return { title: t("titre"), description: t("intro") };
}
