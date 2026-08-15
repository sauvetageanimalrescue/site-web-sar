import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  IconCircleCheckFilled,
  IconAlertTriangleFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { Section } from "@/components/ui";
import { creerClientAdmin } from "@/lib/supabase/admin";

// Page atteinte en scannant le code QR au dos d'une carte. Elle ne révèle que
// le strict nécessaire pour authentifier la carte : nom, numéro, validité.
// Jamais de courriel, de téléphone ni d'adresse.

type FicheCarte = {
  prenom: string;
  nom: string;
  numero: string;
  annee: number;
  expire_le: string;
  statut: string;
};

function formaterDate(iso: string) {
  const [a, m, j] = iso.split("-");
  return `${j}/${m}/${a}`;
}

export default async function PageVerification({
  params,
}: PageProps<"/[locale]/verification/[jeton]">) {
  const { locale, jeton } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "membre" });

  const { data } = await creerClientAdmin()
    .from("membres")
    .select("prenom, nom, numero, annee, expire_le, statut")
    .eq("jeton_verification", jeton)
    .maybeSingle();

  const carte = data as FicheCarte | null;
  const valide =
    carte !== null &&
    carte.statut === "actif" &&
    new Date(`${carte.expire_le}T23:59:59`) >= new Date();

  return (
    <Section etroite>
      <h1 className="mb-6 font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine">
        {t("verificationTitre")}
      </h1>

      {!carte ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <IconCircleXFilled className="mx-auto size-12 text-muted" aria-hidden />
          <p className="mt-4 text-xl font-semibold text-foreground">
            {t("verificationIntrouvable")}
          </p>
          <p className="mt-2 text-muted">{t("verificationIntrouvableTexte")}</p>
        </div>
      ) : (
        <div
          className={`rounded-xl border-2 p-8 ${
            valide
              ? "border-vert bg-vert-doux"
              : "border-urgence bg-urgence-doux"
          }`}
        >
          <p
            className={`flex items-center gap-2 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide ${
              valide ? "text-vert" : "text-urgence"
            }`}
          >
            {valide ? (
              <IconCircleCheckFilled className="size-7" aria-hidden />
            ) : (
              <IconAlertTriangleFilled className="size-7" aria-hidden />
            )}
            {valide ? t("verificationValide") : t("verificationExpiree")}
          </p>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                {t("verificationMembre")}
              </dt>
              <dd className="text-lg font-semibold text-marine">
                {carte.prenom} {carte.nom}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                {t("verificationNumero")}
              </dt>
              <dd className="chiffres-tabulaires text-lg font-semibold text-marine">
                {carte.numero}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                {t("verificationValidite")}
              </dt>
              <dd className="chiffres-tabulaires text-lg font-semibold text-marine">
                {formaterDate(carte.expire_le)}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </Section>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/verification/[jeton]">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "membre" });
  // Une carte nominative n'a rien à faire dans un index de moteur de recherche.
  return { title: t("verificationTitre"), robots: { index: false, follow: false } };
}
