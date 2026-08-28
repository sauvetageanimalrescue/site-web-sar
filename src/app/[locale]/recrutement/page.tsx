import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";
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
        imageTailleNaturelle={{ largeur: 1620, hauteur: 1080 }}
      />

      {/* Mêmes cartes que la page d'accueil : image pleine, titre posé dessus,
          chevron. Une grille cohérente d'un bout à l'autre du site. */}
      <Section titre={t("postesTitre")}>
        <GrilleCartes>
          {POSTES.map((poste) => (
            <CarteImage
              key={poste.cle}
              image={poste.image}
              titre={fichePoste(poste.cle, langue).titre}
              href={`/recrutement/${poste.cle}`}
            />
          ))}
        </GrilleCartes>
      </Section>

      {/* Pas de formulaire ici : on postule à une fonction précise, après
          avoir lu sa description. Le formulaire vit au bas de chaque fiche,
          avec la fonction déjà sélectionnée. */}
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
