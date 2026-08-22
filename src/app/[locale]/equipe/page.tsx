import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";
import { MEMBRES, initiales } from "@/contenu/equipe";

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

      <Section titre={t("quiTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("quiTexte")}
        </p>
      </Section>

      <Section titre={t("engagementTitre")} fond largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("engagementTexte")}
        </p>
      </Section>

      {/* Une carte par personne. Sans photo, la carte reste sur fond marine
          avec les initiales : une silhouette générique serait pire. */}
      <Section titre={t("membresTitre")}>
        <p className="mb-8 max-w-2xl text-muted">{t("membresTexte")}</p>
        <GrilleCartes>
          {MEMBRES.map((m) => (
            <CarteImage
              key={m.cle}
              image={m.photo}
              titre={`${m.prenom} ${m.nom}`}
              sousTitre={m.fonction}
              href={`/equipe/${m.cle}`}
              icone={
                m.photo ? undefined : (
                  <span className="font-[family-name:var(--font-titre)] text-3xl font-bold text-lime">
                    {initiales(m)}
                  </span>
                )
              }
            />
          ))}
        </GrilleCartes>
      </Section>

      <AppelAction
        titre={t("rejoindreTitre")}
        texte={t("rejoindreTexte")}
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
