import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { FormulaireDon } from "@/components/formulaire-don";

type Impact = { montant: string; texte: string };

export default async function PageDons({ params }: PageProps<"/[locale]/dons">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dons" });
  const impact = t.raw("impact") as Impact[];

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/carte-dons.jpg"
      />

      <Section>
        <div className="space-y-12">
          <div>
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("impactTitre")}
            </h2>
            <ul className="mt-5 max-w-3xl space-y-3">
              {impact.map((i) => (
                <li key={i.montant} className="flex gap-4">
                  <span className="chiffres-tabulaires w-16 shrink-0 font-[family-name:var(--font-titre)] text-xl font-bold text-ciel">
                    {i.montant}
                  </span>
                  <span className="text-foreground/90">{i.texte}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <div className="max-w-xl">
              <FormulaireDon />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/dons">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dons" });
  return { title: t("titre"), description: t("intro") };
}
