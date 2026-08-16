import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
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
                <div className="relative isolate flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-marine">
                  {h.image && (
                    <Image
                      src={h.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="-z-10 object-cover grayscale"
                    />
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine from-8% via-marine/55 via-22% to-transparent to-50%" />
                  <div className="p-5">
                    <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase leading-tight tracking-wide text-white">
                      {h.nom}
                    </h2>
                    {(h.fonction || h.annees) && (
                      <p className="mt-1 text-sm uppercase tracking-wider text-lime">
                        {[h.fonction, h.annees].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>

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
