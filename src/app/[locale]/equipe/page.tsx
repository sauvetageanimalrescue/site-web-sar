import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { POSTES, fichePoste } from "@/contenu/postes";
import type { Locale } from "@/i18n/routing";

export default async function PageEquipe({
  params,
}: PageProps<"/[locale]/equipe">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const langue = locale as Locale;
  const t = await getTranslations({ locale, namespace: "equipe" });
  const r = await getTranslations({ locale, namespace: "recrutement" });
  const c = await getTranslations({ locale, namespace: "commun" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/recrutement.jpg"
      />

      <Section titre={t("chaineTitre")}>
        <p className="-mt-2 mb-8 max-w-3xl text-muted">{t("chaineTexte")}</p>

        <ol className="space-y-4">
          {POSTES.map((poste, index) => {
            const fiche = fichePoste(poste.cle, langue);
            return (
              <li key={poste.cle}>
                <Link
                  href={`/equipe/${poste.cle}`}
                  className="group grid gap-5 overflow-hidden rounded-xl border border-border bg-surface transition hover:border-ciel hover:shadow-lg sm:grid-cols-[220px_1fr]"
                >
                  <div className="relative aspect-[16/10] sm:aspect-auto">
                    <Image
                      src={poste.image}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 sm:py-6 sm:pr-6">
                    <p className="chiffres-tabulaires font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-[0.2em] text-ciel">
                      {String(index + 1).padStart(2, "0")}
                      {poste.niveau ? ` • ${poste.niveau}` : ""}
                    </p>
                    <h2 className="mt-1 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
                      {fiche.titre}
                    </h2>
                    <p className="mt-2 text-muted">{fiche.resume}</p>
                    <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-ciel">
                      {c("enSavoirPlus")}
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
        </ol>
      </Section>

      <AppelAction
        titre={r("titre")}
        texte={r("intro")}
        actions={[
          { href: "/recrutement", libelle: r("formulaireTitre"), principal: true },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/equipe">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "equipe" });
  return { title: t("titre"), description: t("intro") };
}
