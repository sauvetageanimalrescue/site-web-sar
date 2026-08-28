import Image from "next/image";
import { notFound } from "next/navigation";
import { VerificateurTerritoire } from "@/components/verificateur-territoire";
import { RevuePresse } from "@/components/revue-presse";
import { TexteRiche } from "@/components/texte-riche";
import { Accordeon } from "@/components/accordeon";
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

// Le contenu d'un bloc. Le titre et le cadre de la section sont posés par
// la page, qui alterne les fonds : un bloc clair, un bloc gris, un bloc
// clair. C'est le rythme de la page des statistiques, appliqué partout.
function Bloc({ bloc }: { bloc: BlocPage }) {
  if (bloc.composant === "territoire") return <VerificateurTerritoire />;
  if (bloc.composant === "presse") return <RevuePresse />;
  if (bloc.questions) return <Accordeon items={bloc.questions} />;

  if (bloc.image) {
    return (
      <figure>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-marine">
          <Image
            src={bloc.image.fichier}
            alt={bloc.image.alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 42rem"
            className="object-cover"
            style={
              bloc.image.position
                ? { objectPosition: bloc.image.position }
                : undefined
            }
          />
        </div>
        {bloc.image.legende && (
          <figcaption className="mt-3 text-sm text-muted">
            {bloc.image.legende}
          </figcaption>
        )}
      </figure>
    );
  }

  if (bloc.encadre) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="font-[family-name:var(--font-titre)] text-xl font-bold uppercase tracking-wide text-marine">
          {bloc.encadre.titre}
        </p>
        <ul className="mt-4 space-y-1.5 text-foreground/90">
          {bloc.encadre.lignes.map((ligne) => (
            <li key={ligne}>{ligne}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      {bloc.texte?.map((paragraphe) => (
        <p
          key={paragraphe.slice(0, 40)}
          className="paragraphe mb-4 text-lg leading-relaxed text-foreground/90"
        >
          <TexteRiche texte={paragraphe} />
        </p>
      ))}
      {bloc.liste &&
        // Une énumération très longue de noms propres (les 82 municipalités)
        // n'est pas un texte qu'on lit ligne à ligne : elle se replie en
        // colonnes. Toute autre liste reste en une seule colonne, sans boîte.
        (bloc.liste.length > 20 ? (
          <ul className="mt-2 columns-2 gap-8 text-foreground/90 sm:columns-3 lg:columns-4">
            {bloc.liste.map((item) => (
              <li key={item} className="mb-1.5 list-inside list-disc marker:text-ciel">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-2 space-y-2.5">
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
    </>
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
        imagePosition={page.imagePosition}
        imageFit={page.imageFit}
      />

      {page.blocs.map((bloc, index) => (
        <Section
          key={bloc.titre ?? bloc.encadre?.titre ?? index}
          titre={bloc.titre}
          fond={index % 2 === 1}
          // Une longue énumération a besoin de toute la largeur ; tout le
          // reste s'aligne sur la largeur d'une carte, comme ailleurs.
          largeur={bloc.liste && bloc.liste.length > 20 ? "pleine" : "carte"}
        >
          <Bloc bloc={bloc} />
        </Section>
      ))}

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
