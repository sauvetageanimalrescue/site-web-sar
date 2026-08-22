import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";
import {
  EPISODES,
  PLAYLISTE,
  vignette,
  lienEpisode,
} from "@/contenu/episodes";

export default async function PageSerie({
  params,
}: PageProps<"/[locale]/serie-televisee">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "serie" });

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/serie-sauvetage-animal.jpg"
      />

      {/* Les cartes du site, appliquées aux épisodes : la vignette occupe
          toute la carte, le titre est posé dessus. Format seize neuf plutôt
          que carré, parce que les vignettes de YouTube le sont : un carré y
          ajouterait des bandes noires. Les épisodes ouvrent la liste de
          lecture sur YouTube, ce qui enchaîne le suivant et évite de charger
          les scripts de Google sur nos pages. */}
      <Section>
        <GrilleCartes colonnes={3}>
          {EPISODES.map((episode) => (
            <CarteImage
              key={episode.video}
              image={vignette(episode.video)}
              titre={t("episode", { numero: episode.numero })}
              href={lienEpisode(episode.video)}
              externe
              format="video"
              taille="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              icone={
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lime text-marine transition group-hover:scale-110">
                  <IconPlayerPlayFilled className="size-5" aria-hidden />
                </span>
              }
            />
          ))}
        </GrilleCartes>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`https://www.youtube.com/playlist?list=${PLAYLISTE}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine-clair"
          >
            {t("voirYoutube")}
          </a>
          <a
            href="https://urbania.media/fr/productions/sauvetage-animal"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-marine px-6 py-3.5 font-semibold text-marine transition hover:bg-marine hover:text-white"
          >
            {t("voirUrbania")}
          </a>
        </div>
      </Section>

      <AppelAction
        titre={t("titre")}
        actions={[
          { href: "/membre", libelle: t("membreBouton"), principal: true },
          { href: "/medias", libelle: t("mediasBouton") },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/serie-televisee">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "serie" });
  return { title: t("titre"), description: t("intro") };
}
