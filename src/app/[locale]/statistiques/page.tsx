import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { Chiffre } from "@/components/barres";
import { CarteVues } from "@/components/carte-vues";
import { lireStatistiques } from "@/lib/statistiques";
import {
  TOTAL_MISSIONS,
  ANIMAUX,
  MUNICIPALITES_DESSERVIES,
  MISSIONS_PAR_MOIS,
  PAR_ESPECE,
  PAR_ETAT,
  PAR_REGION,
  PAR_MUNICIPALITE,
  PAR_LIEU,
  PAR_DEMANDEUR,
  PAR_JOUR,
  PAR_HEURE,
} from "@/contenu/statistiques-2026";

// Les compteurs du haut bougent en continu ; le reste de la page est figé.
export const revalidate = 60;

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
        image="/images/statistiques-transporteurs.jpg"
        imageTailleNaturelle={{ largeur: 700, hauteur: 467 }}
      />

      <CompteurSauvetages initiales={stats} />

      {/* Les quatre chiffres qui résument l'année. */}
      <Section titre={t("anneeTitre")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Chiffre valeur={TOTAL_MISSIONS.toString()} legende={t("chiffreMissions")} />
          <Chiffre valeur={ANIMAUX.toString()} legende={t("chiffreAnimaux")} />
          <Chiffre
            valeur={MUNICIPALITES_DESSERVIES.toString()}
            legende={t("chiffreMunicipalites")}
          />
          <Chiffre
            valeur={PAR_ESPECE[0].valeur.toString()}
            legende={t("chiffreEspece", { espece: PAR_ESPECE[0].libelle.toLowerCase() })}
          />
        </div>
        {/* La provenance des chiffres se lit après eux, discrètement. */}
        <p className="paragraphe mt-4 text-xs leading-relaxed text-muted">
          {t("anneeIntro")}
        </p>
      </Section>

      <Section titre={t("rythmeTitre")} fond largeur="carte">
        {/* Les deux chiffres du haut sont en direct, à l'inverse des trois
            graphiques qui suivent : ils viennent du rapport figé 2026. Les
            deux comptent la même unité, le déplacement, pour que le lecteur
            passe de l'un à l'autre sans changer de repère. */}
        {stats && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-ciel">
              {t("deplacementsDirectTitre")}
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Chiffre
                valeur={stats.deplacements.annee.toString()}
                legende={t("deplacementsAnnee")}
              />
              <Chiffre
                valeur={stats.deplacements.mois.toString()}
                legende={t("deplacementsMois")}
              />
            </div>
          </>
        )}
        <CarteVues
          className={stats ? "mt-8" : undefined}
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
        <CarteVues
          vues={[
            { titre: t("parEspece"), donnees: PAR_ESPECE },
            { titre: t("parEtat"), donnees: PAR_ETAT, couleur: "var(--vert)" },
          ]}
        />
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
        {/* L'unité de toutes ces barres est le déplacement, jamais l'animal :
            sans cette ligne, la section des espèces se lirait comme un nombre
            d'animaux. */}
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
