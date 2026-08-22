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

      <Section>
        <div className="space-y-12">
          <div className="space-y-12">
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
              {fiche.description}
            </p>

            <div>
              <h2 className="mb-4 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
                {TITRES.taches[langue]}
              </h2>
              <ListePuces items={fiche.taches} />
            </div>

            <div>
              <h2 className="mb-4 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
                {TITRES.avantages[langue]}
              </h2>
              <ListePuces items={fiche.avantages} />
            </div>
          </div>

          <section className="max-w-3xl border-t border-border pt-10">
            <h2 className="mb-4 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
              {TITRES.profil[langue]}
            </h2>
            <ul className="space-y-2.5">
              {fiche.profil.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/90">
                  <span
                    className="mt-2 size-2 shrink-0 rounded-full bg-ciel"
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Section>

      <Section fond>
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
            {t("formulaireTitre")}
          </h2>
          <div className="mt-6">
            <FormulaireCandidature posteInitial={poste.cle} />
          </div>
        </div>
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
