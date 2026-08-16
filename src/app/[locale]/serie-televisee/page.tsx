import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { EnTetePage, Section } from "@/components/ui";
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EPISODES.map((episode) => (
            <a
              key={episode.video}
              href={lienEpisode(episode.video)}
              target="_blank"
              rel="noreferrer"
              className="group relative isolate flex aspect-video flex-col justify-end overflow-hidden rounded-xl bg-marine transition"
            >
              <Image
                src={vignette(episode.video)}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="-z-10 object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine from-8% via-marine/55 via-22% to-transparent to-50%" />
              <div className="flex items-center justify-between gap-3 p-5">
                <h2 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase leading-tight tracking-wide text-white">
                  {t("episode", { numero: episode.numero })}
                </h2>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lime text-marine transition group-hover:scale-110">
                  <IconPlayerPlayFilled className="size-5" aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>

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
