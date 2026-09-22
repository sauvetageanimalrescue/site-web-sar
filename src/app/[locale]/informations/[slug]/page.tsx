import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { EnTetePage, Section } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";
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

      <Section largeur="texte">
        {!ficheEstTraduite(slug, langue) && (
          <p className="mb-6 rounded-md border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
            {t("nonTraduite")}
          </p>
        )}
        <div className="space-y-4">
          {texte.intro.map((paragraphe) => (
            <p key={paragraphe.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
              {paragraphe}
            </p>
          ))}
        </div>

        {texte.contact && (
          <div className="mt-8 rounded-xl border border-urgence/30 bg-urgence-doux p-5">
            <h2 className="font-[family-name:var(--font-titre)] text-xl font-bold uppercase tracking-wide text-urgence">
              {texte.contact.titre}
            </h2>
            {texte.contact.texte && <p className="paragraphe mt-3 text-foreground/90">{texte.contact.texte}</p>}
            <ul className="mt-4 space-y-2">
              {texte.contact.lignes.map((ligne) => (
                <li key={ligne} className="text-sm text-foreground/90">{ligne}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              {texte.contact.actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={action.principal ? "flex items-center gap-2 rounded-md bg-urgence px-5 py-3 font-semibold text-white transition hover:bg-urgence/90" : "rounded-md border border-urgence px-5 py-3 font-semibold text-urgence transition hover:bg-urgence hover:text-white"}
                >
                  {action.principal && <IconPhoneFilled className="size-5" aria-hidden />}
                  {action.libelle}
                </a>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section titre={t("faire")} fond largeur="texte">
        <ul className="space-y-3">
          {texte.faire.map((item) => (
            <li key={item} className="flex gap-3 text-foreground/90">
              <IconCircleCheckFilled className="mt-1 size-5 shrink-0 text-vert" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section titre={t("eviter")} largeur="texte">
        <ul className="space-y-3">
          {texte.eviter.map((item) => (
            <li key={item} className="flex gap-3 text-foreground/90">
              <IconCircleXFilled className="mt-1 size-5 shrink-0 text-urgence" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {texte.sections?.map((section, index) => (
        <Section key={section.titre} titre={section.titre} fond={index % 2 === 0} largeur="texte">
          <div className="space-y-4">
            {section.texte.map((paragraphe) => (
              <p key={paragraphe.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
                {paragraphe}
              </p>
            ))}
          </div>
        </Section>
      ))}

      <Section titre={texte.question} fond={(texte.sections?.length ?? 0) % 2 === 0} largeur="texte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">{texte.reponse}</p>
      </Section>

      {!texte.contact && (
        <Section titre={t("appeler")} largeur="texte">
          <ul className="space-y-3">
            {texte.appeler.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/90">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-urgence" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={lienTelephone(ORGANISATION.telephones.signalement)} className="flex items-center gap-2 rounded-md bg-urgence px-6 py-3.5 font-semibold text-white transition hover:bg-urgence/90">
              <IconPhoneFilled className="size-5" aria-hidden />
              {ORGANISATION.telephones.signalement}
            </a>
            <Link href="/signalement" className="rounded-md border border-urgence px-6 py-3.5 font-semibold text-urgence transition hover:bg-urgence hover:text-white">
              {t("ctaAction")}
            </Link>
          </div>
        </Section>
      )}

      {texte.sources && (
        <Section titre={t("sources")} fond largeur="texte">
          <ul className="space-y-3">
            {texte.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer" className="font-semibold text-ciel underline-offset-4 hover:underline">
                  {source.libelle}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section titre={t("autresFiches")} largeur="pleine">
        <GrilleCartes colonnes={3}>
          {autres.map((autre) => {
            const texteAutre = texteFiche(autre.slug, langue);
            if (!texteAutre) return null;
            return <CarteImage key={autre.slug} href={`/informations/${autre.slug}`} image={autre.image} titre={texteAutre.titre} sousTitre={t(`categories.${autre.categorie}`)} taille="(max-width: 640px) 100vw, 33vw" />;
          })}
        </GrilleCartes>
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
