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

const FICHE = [
  "titre",
  "genre",
  "diffuseur",
  "production",
  "saison",
] as const;

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
        image="/images/carte-services.jpg"
      />

      <Section titre={t("serieTitre")}>
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-4 leading-relaxed text-muted">
            <p>{t("seriePara1")}</p>
            <p>{t("seriePara2")}</p>
          </div>
          <div className="h-fit rounded-xl border border-border bg-surface-2 p-5">
            <p className="font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-wider text-marine">
              {t("ficheTitre")}
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {FICHE.map((champ) => (
                <div key={champ}>
                  <dt className="text-xs uppercase tracking-wide text-ciel">
                    {t(`fiche.${champ}.label`)}
                  </dt>
                  <dd className="text-foreground">
                    {t(`fiche.${champ}.valeur`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section titre={t("contenuTitre")} fond>
        <div className="max-w-3xl space-y-4 leading-relaxed text-muted">
          <p>{t("contenuPara1")}</p>
          <p>{t("contenuPara2")}</p>
        </div>
      </Section>

      {/* Les épisodes ouvrent la liste de lecture sur YouTube plutôt qu'un
          lecteur intégré : la vidéo se poursuit d'un épisode à l'autre et le
          site ne charge aucun script de suivi. */}
      <Section titre={t("episodesTitre")}>
        <p className="mb-8 max-w-3xl text-muted">{t("episodesIntro")}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EPISODES.map((episode) => (
            <a
              key={episode.video}
              href={lienEpisode(episode.video)}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-surface transition hover:border-ciel"
            >
              <div className="relative aspect-video overflow-hidden bg-marine">
                <Image
                  src={vignette(episode.video)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-marine/20 opacity-0 transition group-hover:opacity-100">
                  <span className="flex size-14 items-center justify-center rounded-full bg-lime text-marine">
                    <IconPlayerPlayFilled className="size-6" aria-hidden />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-[family-name:var(--font-titre)] text-lg font-bold uppercase tracking-wide text-marine">
                  {t("episode", { numero: episode.numero })}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section titre={t("voirTitre")} fond>
        <div className="max-w-3xl">
          <p className="leading-relaxed text-muted">{t("voirTexte")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
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
