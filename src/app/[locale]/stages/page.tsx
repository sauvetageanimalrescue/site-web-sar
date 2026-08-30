import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, ListePuces } from "@/components/ui";
import { FormulaireStage } from "@/components/formulaire-stage";
import { lireStagesAVenir } from "@/lib/stages";

// Les places changent à chaque paiement : pas de mise en cache longue.
export const revalidate = 60;

export default async function PageStages({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stages" });
  const stages = await lireStagesAVenir();
  const infos = t.raw("infos") as string[];
  const chaineTexte = t.raw("chaineTexte") as string[];
  const limiteeTexte = t.raw("limiteeTexte") as string[];
  const reservationTexte = t.raw("reservationTexte") as string[];

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/stages.jpg"
        imageTailleNaturelle={{ largeur: 2000, hauteur: 3556 }}
      />

      <Section titre={t("equipesTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("equipesTexte")}
        </p>
      </Section>

      <Section fond titre={t("chaineTitre")} largeur="carte">
        <div className="space-y-4">
          {chaineTexte.map((p) => (
            <p key={p.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section titre={t("limiteeTitre")} largeur="carte">
        <div className="space-y-4">
          {limiteeTexte.map((p) => (
            <p key={p.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section fond titre={t("infosTitre")} largeur="carte">
        <ListePuces items={infos} />
      </Section>

      <Section titre={t("reservationTitre")} largeur="carte">
        <div className="space-y-4">
          {reservationTexte.map((p) => (
            <p key={p.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section fond titre={t("souvenirTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("souvenirTexte")}
        </p>
      </Section>

      <Section titre={t("formulaireTitre")} largeur="carte">
        <FormulaireStage stages={stages} />
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stages" });
  return { title: t("titre"), description: t("intro") };
}
