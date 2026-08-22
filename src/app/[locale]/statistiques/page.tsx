import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { Barres, Chiffre } from "@/components/barres";
import { FilInterventions } from "@/components/fil-interventions";
import { lireStatistiques } from "@/lib/statistiques";
import {
  PERIODE,
  TOTAL_MISSIONS,
  ANIMAUX_PRIS_EN_CHARGE,
  ANIMAUX_SECOURUS,
  MISSIONS_REUSSIES,
  MISSIONS_AVEC_ISSUE_CONNUE,
  SUR_TERRITOIRE,
  MISSIONS_PAR_MOIS,
  PAR_FAMILLE,
  PAR_ESPECE,
  PAR_ISSUE,
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

const TAUX = Math.round((MISSIONS_REUSSIES / MISSIONS_AVEC_ISSUE_CONNUE) * 100);

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
        image="/images/territoire.jpg"
      />

      <CompteurSauvetages initiales={stats} />

      {/* Les quatre chiffres qui résument l'année. */}
      <Section titre={t("anneeTitre")}>
        <p className="mb-8 max-w-3xl text-muted">
          {t("anneeIntro", { periode: PERIODE })}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Chiffre
            valeur={TOTAL_MISSIONS.toString()}
            legende={t("chiffreMissions")}
            precision={t("chiffreMissionsPrecision", { territoire: SUR_TERRITOIRE })}
          />
          <Chiffre
            valeur={ANIMAUX_PRIS_EN_CHARGE.toString()}
            legende={t("chiffreAnimaux")}
            precision={t("chiffreAnimauxPrecision", { secourus: ANIMAUX_SECOURUS })}
          />
          <Chiffre
            valeur={`${TAUX} %`}
            legende={t("chiffreTaux")}
            precision={t("chiffreTauxPrecision", { reussies: MISSIONS_REUSSIES })}
          />
          <Chiffre
            valeur={PAR_ESPECE[0].valeur.toString()}
            legende={t("chiffreEspece", { espece: PAR_ESPECE[0].libelle })}
            precision={t("chiffreEspecePrecision")}
          />
        </div>
      </Section>

      <Section titre={t("rythmeTitre")} fond>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
              {t("parMois")}
            </h3>
            <Barres donnees={MISSIONS_PAR_MOIS} />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
                {t("parJour")}
              </h3>
              <Barres donnees={PAR_JOUR} couleur="var(--vert)" />
            </div>
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
                {t("parHeure")}
              </h3>
              <Barres donnees={PAR_HEURE} couleur="var(--vert)" />
            </div>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          {t("rythmeTexte")}
        </p>
      </Section>

      <Section titre={t("animauxTitre")}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
              {t("parEspece")}
            </h3>
            <Barres donnees={PAR_ESPECE} />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
                {t("parFamille")}
              </h3>
              <Barres donnees={PAR_FAMILLE} couleur="var(--vert)" />
            </div>
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
                {t("parEtat")}
              </h3>
              <Barres donnees={PAR_ETAT} couleur="var(--urgence)" />
            </div>
          </div>
        </div>
      </Section>

      <Section titre={t("issuesTitre")} fond>
        <p className="mb-8 max-w-3xl text-muted">{t("issuesTexte")}</p>
        <div className="max-w-3xl">
          <Barres donnees={PAR_ISSUE} />
        </div>
      </Section>

      <Section titre={t("geoTitre")}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
              {t("parRegion")}
            </h3>
            <Barres donnees={PAR_REGION} />
          </div>
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
              {t("parMunicipalite")}
            </h3>
            <Barres donnees={PAR_MUNICIPALITE} couleur="var(--vert)" />
          </div>
        </div>
      </Section>

      <Section titre={t("appelsTitre")} fond>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
              {t("parDemandeur")}
            </h3>
            <Barres donnees={PAR_DEMANDEUR} />
          </div>
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
              {t("parLieu")}
            </h3>
            <Barres donnees={PAR_LIEU} couleur="var(--vert)" />
          </div>
        </div>
      </Section>

      {stats && <FilInterventions limite={12} />}

      <Section fond etroite>
        <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
          {t("methodeTitre")}
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/90">
          {t("methodeTexte")}
        </p>
        <p className="mt-4 leading-relaxed text-foreground/90">{t("note")}</p>
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
