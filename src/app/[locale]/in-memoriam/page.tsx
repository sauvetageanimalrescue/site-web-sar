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

      {/* Un hommage n'est pas une carte cliquable dans une grille. Le
          portrait est centré, seul, et le texte se lit dessous. */}
      {HOMMAGES.map((h) => (
        <Section key={h.cle} largeur="carte">
          <figure className="text-center">
            {h.image && (
              <Image
                src={h.image}
                alt=""
                width={288}
                height={360}
                className="mx-auto h-auto w-64 rounded-xl object-cover grayscale sm:w-72"
              />
            )}
            <figcaption className="mt-6">
              <h2 className="font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine">
                {h.nom}
              </h2>
              {(h.fonction || h.annees) && (
                <p className="mt-1 text-sm uppercase tracking-wider text-ciel">
                  {[h.fonction, h.annees].filter(Boolean).join(" · ")}
                </p>
              )}
            </figcaption>
          </figure>

          <div className="mt-8">
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
