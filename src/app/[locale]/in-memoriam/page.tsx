import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { CarteImage } from "@/components/cartes";
import { HOMMAGES } from "@/contenu/memoriam";

export default async function PageMemoriam({
  params,
}: PageProps<"/[locale]/in-memoriam">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "memoriam" });

  return (
    <>
      {/* Même en-tête que partout ailleurs : cette page se distingue par son
          contenu, pas par une mise en page à part. */}
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("dedicace")}
      />

      <Section>
        {HOMMAGES.length === 0 ? (
          <p className="max-w-3xl leading-relaxed text-muted">{t("aucun")}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {HOMMAGES.map((h) => (
              <article key={h.cle}>
                {/* La carte du site, avec le nom posé sur la photo. Le noir et
                    blanc distingue ces portraits de toutes les autres images. */}
                <CarteImage
                  image={h.image}
                  titre={h.nom}
                  sousTitre={[h.fonction, h.annees].filter(Boolean).join(" · ")}
                  grisaille
                  statique
                  taille="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {h.texte?.map((paragraphe, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-muted">
                    {paragraphe}
                  </p>
                ))}
              </article>
            ))}
          </div>
        )}

        <p className="mt-14 max-w-3xl text-sm leading-relaxed text-muted">
          {t("contact")}
        </p>
      </Section>
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
