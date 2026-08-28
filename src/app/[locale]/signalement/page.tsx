import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { IconPhoneFilled } from "@tabler/icons-react";
import { EnTetePage, Section } from "@/components/ui";
import { FormulaireSignalement } from "@/components/formulaire-signalement";
import { Accordeon, type ItemAccordeon } from "@/components/accordeon";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

function BlocUrgence() {
  const t = useTranslations("signalement");
  const { telephones } = ORGANISATION;

  return (
    <div>
      <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-urgence sm:text-3xl">
        {t("urgenceTitre")}
      </h2>
      <p className="mt-3 leading-relaxed text-foreground/90">
        {t("urgenceTexte")}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={lienTelephone(telephones.signalement)}
          className="flex items-center gap-3 rounded-lg bg-urgence px-5 py-4 text-white transition hover:bg-urgence/90"
        >
          <IconPhoneFilled className="size-6 shrink-0" aria-hidden />
          <span>
            <span className="block text-xs uppercase tracking-wider text-white/70">
              {t("urgenceLigne")}
            </span>
            <span className="font-[family-name:var(--font-titre)] text-2xl font-bold">
              {telephones.signalement}
            </span>
          </span>
        </a>
        <a
          href={lienTelephone(telephones.sansFrais)}
          className="flex items-center gap-3 rounded-lg border border-urgence px-5 py-4 text-urgence transition hover:bg-urgence hover:text-white"
        >
          <IconPhoneFilled className="size-6 shrink-0" aria-hidden />
          <span>
            <span className="block text-xs uppercase tracking-wider opacity-70">
              {t("urgenceSansFrais")}
            </span>
            <span className="font-[family-name:var(--font-titre)] text-2xl font-bold">
              {telephones.sansFrais}
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

function ListeAvant() {
  const t = useTranslations("signalement");
  const liste = t.raw("avantListe") as string[];

  return (
    <ul className="space-y-2.5">
      {liste.map((item) => (
        <li key={item} className="flex gap-3 text-foreground/90">
          <span
            className="mt-2 size-2 shrink-0 rounded-full bg-ciel"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function PageSignalement({
  params,
}: PageProps<"/[locale]/signalement">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "signalement" });
  const hors = t.raw("hors") as ItemAccordeon[];

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/hero-accueil.jpg"
        imageTailleNaturelle={{ largeur: 2400, hauteur: 1350 }}
      />

      <Section largeur="carte">
        <BlocUrgence />
      </Section>

      <Section titre={t("avantTitre")} fond largeur="carte">
        <ListeAvant />
      </Section>

      <Section titre={t("formulaireTitre")} largeur="carte">
        <p className="text-muted">{t("formulaireTexte")}</p>
        <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-7">
          <FormulaireSignalement />
        </div>
      </Section>

      <Section titre={t("horsTitre")} fond largeur="carte">
        <p className="text-muted">{t("horsTexte")}</p>
        <div className="mt-6">
          <Accordeon items={hors} />
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/signalement">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "signalement" });
  return { title: t("titre"), description: t("intro") };
}
