import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { HOMMAGES } from "@/contenu/memoriam";

export default async function PageMemoriam({
  params,
}: PageProps<"/[locale]/in-memoriam">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "memoriam" });

  return (
    <>
      {/* Pas de photo en bandeau, pas de bouton, pas de couleur vive : cette
          page est la seule du site où le silence vaut mieux que l'image. */}
      <section className="bg-marine py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-[0.28em] text-lime">
            {t("surtitre")}
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-titre)] text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
            {t("titre")}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/80">
            {t("dedicace")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        {HOMMAGES.length === 0 ? (
          <p className="text-center leading-relaxed text-muted">
            {t("aucun")}
          </p>
        ) : (
          <div className="space-y-10">
            {HOMMAGES.map((h) => (
              <article
                key={h.cle}
                className="flex flex-col items-center gap-6 border-b border-border pb-10 text-center last:border-0 sm:flex-row sm:items-start sm:text-left"
              >
                {h.image && (
                  <Image
                    src={h.image}
                    alt=""
                    width={160}
                    height={160}
                    className="size-40 shrink-0 rounded-full object-cover grayscale"
                  />
                )}
                <div>
                  <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
                    {h.nom}
                  </h2>
                  {(h.fonction || h.annees) && (
                    <p className="mt-1 text-sm uppercase tracking-wider text-ciel">
                      {[h.fonction, h.annees].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {h.texte?.map((paragraphe, i) => (
                    <p key={i} className="mt-4 leading-relaxed text-muted">
                      {paragraphe}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-16 text-center text-sm leading-relaxed text-muted">
          {t("contact")}
        </p>
      </section>
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
