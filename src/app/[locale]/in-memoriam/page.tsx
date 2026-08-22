import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { HOMMAGES } from "@/contenu/memoriam";

export default async function PageMemoriam({
  params,
}: PageProps<"/[locale]/in-memoriam">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "memoriam" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("dedicace")}
        image="/images/memoriam-ruban.jpg"
      />

      {/* Même gabarit que partout ailleurs: une image en seize neuf, coins
          arrondis, à la largeur d'une carte, puis le texte en dessous. */}
      {HOMMAGES.map((h) => (
        <Section key={h.cle} largeur="carte">
          {h.image && (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-marine">
              <Image
                src={h.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 42rem"
                className="object-cover object-top grayscale"
              />
            </div>
          )}

          <h2 className="mt-6 font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine">
            {h.nom}
          </h2>
          {(h.fonction || h.annees) && (
            <p className="mt-1 text-sm uppercase tracking-wider text-ciel">
              {[h.fonction, h.annees].filter(Boolean).join(" · ")}
            </p>
          )}

          <div className="mt-6">
            {h.texte?.map((paragraphe) => (
              <p
                key={paragraphe.slice(0, 40)}
                className="paragraphe mb-4 text-lg leading-relaxed text-foreground/90"
              >
                {paragraphe}
              </p>
            ))}
          </div>
        </Section>
      ))}

      <Section fond largeur="carte">
        <p className="paragraphe text-sm leading-relaxed text-muted">
          {t("contact")}
        </p>
      </Section>

      <AppelAction
        titre={t("titre")}
        actions={[
          { href: "/membre", libelle: t("membreBouton"), principal: true },
          { href: "/equipe", libelle: t("equipeBouton") },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/in-memoriam">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "memoriam" });
  return { title: t("titre"), description: t("dedicace") };
}
