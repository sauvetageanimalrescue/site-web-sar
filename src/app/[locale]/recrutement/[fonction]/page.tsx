import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, ListePuces } from "@/components/ui";
import { FormulaireCandidature } from "@/components/formulaire-candidature";
import { POSTES, fichePoste, type Poste } from "@/contenu/postes";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    POSTES.map((p) => ({ locale, fonction: p.cle })),
  );
}

function trouverFonction(cle: string): Poste | undefined {
  return POSTES.find((p) => p.cle === cle);
}

const TITRES = {
  taches: { fr: "Tâches principales", en: "Main duties", es: "Tareas principales" },
  avantages: { fr: "Avantages", en: "What you get", es: "Ventajas" },
  profil: {
    fr: "Profil recherché",
    en: "Who we're looking for",
    es: "Perfil buscado",
  },
} as const;

export default async function PageFonction({
  params,
}: PageProps<"/[locale]/recrutement/[fonction]">) {
  const { locale, fonction: cle } = await params;
  setRequestLocale(locale);

  const poste = trouverFonction(cle);
  if (!poste) notFound();

  const langue = locale as Locale;
  const fiche = fichePoste(poste.cle, langue);
  const t = await getTranslations({ locale, namespace: "recrutement" });

  return (
    <>
      <EnTetePage
        surtitre={
          poste.niveau ? `${t("surtitre")} • ${poste.niveau}` : t("surtitre")
        }
        titre={fiche.titre}
        intro={fiche.resume}
        image={poste.image}
      />

      <Section largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {fiche.description}
        </p>
      </Section>

      <Section fond largeur="carte" titre={TITRES.taches[langue]}>
        <ListePuces items={fiche.taches} />
      </Section>

      <Section largeur="carte" titre={TITRES.avantages[langue]}>
        <ListePuces items={fiche.avantages} />
      </Section>

      <Section fond largeur="carte" titre={TITRES.profil[langue]}>
        <ListePuces items={fiche.profil} />
      </Section>

      <Section largeur="carte" titre={t("formulaireTitre")}>
        <FormulaireCandidature posteInitial={poste.cle} />
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/recrutement/[fonction]">) {
  const { locale, fonction: cle } = await params;
  const poste = trouverFonction(cle);
  if (!poste) return {};
  const fiche = fichePoste(poste.cle, locale as Locale);
  return { title: fiche.titre, description: fiche.resume };
}
