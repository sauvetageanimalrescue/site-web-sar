import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { EnTetePage, Section, CarteLien } from "@/components/ui";
import { FormulaireCandidature } from "@/components/formulaire-candidature";
import { POSTES, fichePoste } from "@/contenu/postes";
import type { Locale } from "@/i18n/routing";

export default async function PageRecrutement({
  params,
}: PageProps<"/[locale]/recrutement">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "recrutement" });
  const c = await getTranslations({ locale, namespace: "commun" });
  const langue = (await getLocale()) as Locale;

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/recrutement.jpg"
      />

      <Section titre={t("postesTitre")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {POSTES.map((poste) => {
            const fiche = fichePoste(poste.cle, langue);
            return (
              <CarteLien
                key={poste.cle}
                href={`/equipe/${poste.cle}`}
                titre={fiche.titre}
                texte={fiche.resume}
                libelleLien={c("enSavoirPlus")}
                image={poste.image}
              />
            );
          })}
        </div>
      </Section>

      <Section fond>
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
            {t("formulaireTitre")}
          </h2>
          <p className="mt-2 text-muted">{t("formulaireTexte")}</p>
          <div className="mt-6">
            <FormulaireCandidature />
          </div>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/recrutement">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recrutement" });
  return { title: t("titre"), description: t("intro") };
}
