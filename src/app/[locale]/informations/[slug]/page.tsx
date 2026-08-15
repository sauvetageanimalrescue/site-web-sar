import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconPhoneFilled,
  IconArrowRight,
} from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { EnTetePage, Section } from "@/components/ui";
import {
  FICHES,
  trouverFiche,
  texteFiche,
  ficheEstTraduite,
} from "@/contenu/fiches";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    FICHES.map((f) => ({ locale, slug: f.slug })),
  );
}

export default async function PageFiche({
  params,
}: PageProps<"/[locale]/informations/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const langue = locale as Locale;

  const fiche = trouverFiche(slug);
  const texte = fiche ? texteFiche(slug, langue) : null;
  if (!fiche || !texte) notFound();

  const t = await getTranslations({ locale, namespace: "fiches" });
  const autres = FICHES.filter((f) => f.slug !== slug).slice(0, 3);

  // Données structurées FAQ : c'est ce qui permet à la question et à la
  // réponse d'apparaître directement dans les résultats de recherche.
  const donneesStructurees = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: texte.question,
        acceptedAnswer: { "@type": "Answer", text: texte.reponse },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees) }}
      />

      <EnTetePage
        surtitre={t(`categories.${fiche.categorie}`)}
        titre={texte.titre}
        intro={texte.resume}
        image={fiche.image}
      />

      <Section>
        {/* Tout s'empile : le texte garde sa largeur de lecture et les blocs
            secondaires passent dessous, en pleine largeur. */}
        <div className="space-y-14">
          <article className="max-w-3xl">
            {!ficheEstTraduite(slug, langue) && (
              <p className="mb-6 rounded-md border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
                {t("nonTraduite")}
              </p>
            )}

            {texte.intro.map((paragraphe) => (
              <p
                key={paragraphe.slice(0, 40)}
                className="mb-4 text-lg leading-relaxed text-foreground/90"
              >
                {paragraphe}
              </p>
            ))}

            <h2 className="mt-10 flex items-center gap-2 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-vert">
              <IconCircleCheckFilled className="size-6" aria-hidden />
              {t("faire")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {texte.faire.map((item) => (
                <li key={item} className="flex gap-3 text-foreground/90">
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-vert"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 flex items-center gap-2 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-urgence">
              <IconCircleXFilled className="size-6" aria-hidden />
              {t("eviter")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {texte.eviter.map((item) => (
                <li key={item} className="flex gap-3 text-foreground/90">
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-urgence"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            {texte.sections?.map((section) => (
              <section key={section.titre} className="mt-10">
                <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
                  {section.titre}
                </h2>
                {section.texte.map((paragraphe) => (
                  <p
                    key={paragraphe.slice(0, 40)}
                    className="mt-4 text-lg leading-relaxed text-foreground/90"
                  >
                    {paragraphe}
                  </p>
                ))}
              </section>
            ))}

            <section className="mt-10">
              <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
                {texte.question}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                {texte.reponse}
              </p>
            </section>
          </article>

          <section className="max-w-3xl border-t border-border pt-10">
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-urgence">
              {t("appeler")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {texte.appeler.map((item) => (
                <li key={item} className="flex gap-3 text-foreground/90">
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-urgence"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={lienTelephone(ORGANISATION.telephones.signalement)}
                className="flex items-center gap-2 rounded-md bg-urgence px-6 py-3.5 font-semibold text-white transition hover:bg-urgence/90"
              >
                <IconPhoneFilled className="size-5" aria-hidden />
                {ORGANISATION.telephones.signalement}
              </a>
              <Link
                href="/signalement"
                className="rounded-md border border-urgence px-6 py-3.5 font-semibold text-urgence transition hover:bg-urgence hover:text-white"
              >
                {t("ctaAction")}
              </Link>
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("autresFiches")}
            </h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((autre) => {
                const texteAutre = texteFiche(autre.slug, langue);
                if (!texteAutre) return null;
                return (
                  <li key={autre.slug}>
                    <Link
                      href={`/informations/${autre.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-ciel hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                        <Image
                          src={autre.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="font-[family-name:var(--font-titre)] text-lg font-semibold uppercase leading-tight tracking-wide text-marine">
                          {texteAutre.titre}
                        </span>
                        <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-ciel">
                          {t("faire")}
                          <IconArrowRight
                            className="size-4 transition group-hover:translate-x-1"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/informations/[slug]">) {
  const { locale, slug } = await params;
  const texte = texteFiche(slug, locale as Locale);
  if (!texte) return {};
  return {
    title: texte.titre,
    description: texte.resume,
    alternates: { canonical: `/${locale}/informations/${slug}` },
  };
}
