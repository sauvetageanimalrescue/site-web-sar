import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { IconPhoneFilled, IconArrowNarrowRight } from "@tabler/icons-react";
import { EnTetePage, Section } from "@/components/ui";
import { FormulaireSignalement } from "@/components/formulaire-signalement";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

type CasHorsMandat = { cas: string; vers: string };

function BlocUrgence() {
  const t = useTranslations("signalement");
  const { telephones } = ORGANISATION;

  return (
    <div>
      <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-urgence sm:text-3xl">
        {t("urgenceTitre")}
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-foreground/90">
        {t("urgenceTexte")}
      </p>
      <div className="mt-6 flex max-w-3xl flex-wrap gap-3">
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

function AvantAppel() {
  const t = useTranslations("signalement");
  const liste = t.raw("avantListe") as string[];

  return (
    <div>
      <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
        {t("avantTitre")}
      </h2>
      <ul className="mt-4 max-w-3xl space-y-2.5">
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
    </div>
  );
}

function HorsMandat() {
  const t = useTranslations("signalement");
  const cas = t.raw("hors") as CasHorsMandat[];

  return (
    <Section fond>
      <h2 className="font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine">
        {t("horsTitre")}
      </h2>
      <p className="mt-2 max-w-3xl text-muted">{t("horsTexte")}</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cas.map((c) => (
          <li
            key={c.cas}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="font-semibold text-marine">{c.cas}</p>
            <p className="mt-2 flex items-start gap-2 text-sm text-muted">
              <IconArrowNarrowRight
                className="mt-0.5 size-4 shrink-0 text-ciel"
                aria-hidden
              />
              {c.vers}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default async function PageSignalement({
  params,
}: PageProps<"/[locale]/signalement">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "signalement" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/hero-accueil.png"
      />

      <Section>
        <div className="space-y-12">
          <BlocUrgence />
          <AvantAppel />
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {t("formulaireTitre")}
            </h2>
            <p className="mt-2 max-w-3xl text-muted">{t("formulaireTexte")}</p>
            <div className="mt-6 max-w-3xl">
              <FormulaireSignalement />
            </div>
          </div>
        </div>
      </Section>

      <HorsMandat />
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
