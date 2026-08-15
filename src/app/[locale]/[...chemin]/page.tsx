import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import {
  lirePageEditoriale,
  cheminsEditoriaux,
  type BlocPage,
} from "@/contenu/pages";
import { routing, type Locale } from "@/i18n/routing";

// Route attrape-tout des pages éditoriales. Next résout d'abord les segments
// statiques (/membre, /signalement, /statistiques...), donc seules les pages
// de contenu aboutissent ici.

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cheminsEditoriaux().map((chemin) => ({
      locale,
      chemin: chemin.split("/"),
    })),
  );
}

function Bloc({ bloc }: { bloc: BlocPage }) {
  if (bloc.encadre) {
    return (
      <div className="rounded-xl border border-border bg-surface-2 p-6">
        <h2 className="font-[family-name:var(--font-titre)] text-xl font-bold uppercase tracking-wide text-marine">
          {bloc.encadre.titre}
        </h2>
        <ul className="mt-4 space-y-1.5 text-foreground/90">
          {bloc.encadre.lignes.map((ligne) => (
            <li key={ligne}>{ligne}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {bloc.titre && (
        <h2 className="mb-4 font-[family-name:var(--font-titre)] text-2xl font-bold uppercase tracking-wide text-marine">
          {bloc.titre}
        </h2>
      )}
      {bloc.texte?.map((paragraphe) => (
        <p
          key={paragraphe.slice(0, 40)}
          className="mb-4 max-w-3xl text-lg leading-relaxed text-foreground/90"
        >
          {paragraphe}
        </p>
      ))}
      {bloc.liste &&
        // Une énumération très longue de noms propres (les 82 municipalités)
        // n'est pas un texte qu'on lit ligne à ligne : elle se replie en
        // colonnes. Toute autre liste reste en une seule colonne.
        (bloc.liste.length > 20 ? (
          <ul className="mt-2 columns-2 gap-8 text-foreground/90 sm:columns-3 lg:columns-4">
            {bloc.liste.map((item) => (
              <li key={item} className="mb-1.5 list-inside list-disc marker:text-ciel">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-2 max-w-3xl space-y-2.5">
            {bloc.liste.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/90">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-ciel"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}

export default async function PageEditorialeVue({
  params,
}: PageProps<"/[locale]/[...chemin]">) {
  const { locale, chemin } = await params;
  setRequestLocale(locale);

  const page = lirePageEditoriale(chemin.join("/"), locale as Locale);
  if (!page) notFound();

  return (
    <>
      <EnTetePage
        surtitre={page.surtitre}
        titre={page.titre}
        intro={page.intro}
        image={page.image}
      />

      <Section>
        <div className="space-y-12">
          {page.blocs.map((bloc, index) => (
            <Bloc key={bloc.titre ?? bloc.encadre?.titre ?? index} bloc={bloc} />
          ))}
        </div>
      </Section>

      {page.actions && page.actions.length > 0 && (
        <AppelAction titre={page.titre} actions={page.actions} />
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[...chemin]">) {
  const { locale, chemin } = await params;
  const page = lirePageEditoriale(chemin.join("/"), locale as Locale);
  if (!page) return {};
  return {
    title: page.titre,
    description: page.intro,
    ...(page.sansIndexation ? { robots: { index: false } } : {}),
  };
}
