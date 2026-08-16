import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { EnTetePage, Section, Chevron } from "@/components/ui";
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
      />

      {/* Mêmes cartes que la page d'accueil : image pleine, titre posé dessus,
          chevron. Une grille cohérente d'un bout à l'autre du site. */}
      <Section titre={t("postesTitre")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POSTES.map((poste) => {
            const fiche = fichePoste(poste.cle, langue);
            return (
              <Link
                key={poste.cle}
                href={`/equipe/${poste.cle}`}
                className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-marine transition"
              >
                <Image
                  src={poste.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine from-8% via-marine/55 via-22% to-transparent to-50%" />
                <div className="flex items-center justify-between gap-3 p-5">
                  <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase leading-tight tracking-wide text-white">
                    {fiche.titre}
                  </h3>
                  <Chevron className="size-6 shrink-0 text-lime transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
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
