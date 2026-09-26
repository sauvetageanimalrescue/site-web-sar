import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { ChiffresAnnuels, GraphiquesEspeces } from "@/components/chiffres-annuels";
import { StatistiquesDirect } from "@/components/statistiques-direct";
import { CarteVues } from "@/components/carte-vues";
import { lireStatistiques } from "@/lib/statistiques";
import {
  MISSIONS_PAR_MOIS,
  PAR_REGION,
  PAR_MUNICIPALITE,
  PAR_LIEU,
  PAR_DEMANDEUR,
  PAR_JOUR,
  PAR_HEURE,
} from "@/contenu/statistiques-2026";

// Le bilan initial et les compteurs doivent lire les chiffres du même instant.
export const dynamic = "force-dynamic";

export default async function PageStatistiques({
  params,
}: PageProps<"/[locale]/statistiques">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "statistiques" });
  const stats = await lireStatistiques();

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/statistiques-transporteurs-1900.jpg"
        imageTailleNaturelle={{ largeur: 1900, hauteur: 1268 }}
        imagePosition="right calc(50% - 80px)"
      />

      <StatistiquesDirect initiales={stats}>
      <CompteurSauvetages />

      {/* Les quatre chiffres qui résument l'année. */}
      <Section titre={t("anneeTitre")}>
        <ChiffresAnnuels />
      </Section>

      <Section titre={t("rythmeTitre")} fond largeur="carte">
        <CarteVues
          vues={[
            { titre: t("parMois"), donnees: MISSIONS_PAR_MOIS },
            { titre: t("parJour"), donnees: PAR_JOUR },
            { titre: t("parHeure"), donnees: PAR_HEURE },
          ]}
        />
        <p className="paragraphe mt-8 text-sm leading-relaxed text-muted">
          {t("rythmeTexte")}
        </p>
      </Section>

      <Section titre={t("animauxTitre")} largeur="carte">
        <GraphiquesEspeces />
      </Section>

      <Section titre={t("geoTitre")} fond largeur="carte">
        <CarteVues
          vues={[
            { titre: t("parRegion"), donnees: PAR_REGION },
            { titre: t("parMunicipalite"), donnees: PAR_MUNICIPALITE, couleur: "var(--vert)" },
          ]}
        />
      </Section>

      <Section titre={t("appelsTitre")} largeur="carte">
        <CarteVues
          vues={[
            { titre: t("parDemandeur"), donnees: PAR_DEMANDEUR },
            { titre: t("parLieu"), donnees: PAR_LIEU, couleur: "var(--vert)" },
          ]}
        />
        {/* La répartition des appels et le dénombrement des animaux n'ont pas
            la même unité; la précision évite de les confondre. */}
        <p className="paragraphe mt-8 text-xs leading-relaxed text-muted">
          {t("uniteBarres")}
        </p>
      </Section>

      <Section fond largeur="carte">
        <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
          {t("methodeTitre")}
        </h2>
        <p className="paragraphe mt-4 leading-relaxed text-foreground/90">
          {t("methodeTexte")}
        </p>
        <p className="paragraphe mt-4 leading-relaxed text-foreground/90">
          {t("note")}
        </p>
      </Section>
      </StatistiquesDirect>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/statistiques">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "statistiques" });
  return { title: t("titre"), description: t("intro") };
}
