import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";

// Les quatre familles de l'équipe. Elles ne sont pas cliquables pour
// l'instant: leurs pages viendront quand il y aura de la matière à y mettre.
const CATEGORIES = [
  { cle: "secouristes", image: "/images/poste-secouriste.jpg" },
  { cle: "sauveteurs", image: "/images/poste-sauveteur.jpg" },
  { cle: "soutien", image: "/images/poste-repartiteur.jpg" },
  { cle: "direction", image: "/images/carte-direction.jpg" },
] as const;

export default async function PageEquipe({
  params,
}: PageProps<"/[locale]/equipe">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "equipe" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/recrutement.jpg"
      />

      <Section>
        <GrilleCartes>
          {CATEGORIES.map((c) => (
            <CarteImage
              key={c.cle}
              image={c.image}
              titre={t(`categories.${c.cle}.titre`)}
            />
          ))}
        </GrilleCartes>
      </Section>

      <Section titre={t("quiTitre")} fond largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("quiTexte")}
        </p>
      </Section>

      <Section titre={t("engagementTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("engagementTexte")}
        </p>
      </Section>

      <AppelAction
        titre={t("titre")}
        actions={[
          { href: "/membre", libelle: t("membreBouton"), principal: true },
          { href: "/recrutement", libelle: t("rejoindreBouton") },
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
