import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { IconPhoneFilled } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { SectionAlternee, Chevron } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { FilInterventions } from "@/components/fil-interventions";
import { lireStatistiques } from "@/lib/statistiques";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

// Deux rangées de quatre. La première regroupe les gestes que le visiteur
// peut poser tout de suite, la seconde ce que l'organisation offre.
const CARTES = [
  { cle: "signalement", href: "/signalement", image: "/images/carte-signalement.jpg" },
  { cle: "membre", href: "/membre", image: "/images/carte-membre-2026.jpg" },
  { cle: "dons", href: "/dons", image: "/images/carte-dons.jpg" },
  { cle: "recrutement", href: "/recrutement", image: "/images/carte-benevole.jpg" },
  { cle: "services", href: "/services", image: "/images/carte-services.jpg" },
  { cle: "formations", href: "/formations", image: "/images/carte-formations.jpg" },
  { cle: "stages", href: "/stages", image: "/images/carte-stages.jpg" },
  { cle: "ateliers", href: "/ateliers/primaire", image: "/images/carte-ateliers.jpg" },
] as const;

function Hero() {
  const t = useTranslations("accueil");

  return (
    // Bannière sur aplat marine, avec l'écusson en filigrane à droite : le
    // titre reste parfaitement lisible et l'identité s'impose d'entrée.
    <section className="relative isolate overflow-hidden bg-marine">
      <Image
        src="/images/hero-filigrane.png"
        alt=""
        width={1400}
        height={1400}
        priority
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[190%] w-auto -translate-y-1/2 rotate-[15deg] opacity-[0.13] sm:-right-10"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <p className="font-[family-name:var(--font-titre)] text-lg font-semibold uppercase tracking-[0.22em] text-lime sm:text-2xl">
          {t("heroSurtitre")}
        </p>
        <h1 className="mt-4 max-w-3xl whitespace-pre-line font-[family-name:var(--font-titre)] text-4xl font-bold uppercase leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          {t("heroTitre")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          {t("heroTexte")}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/signalement"
            className="rounded-md bg-urgence px-6 py-3.5 font-semibold text-white transition hover:bg-urgence/90"
          >
            {t("heroSignaler")}
          </Link>
          <a
            href={lienTelephone(ORGANISATION.telephones.signalement)}
            className="flex items-center gap-2 rounded-md border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            <IconPhoneFilled className="size-5" aria-hidden />
            {ORGANISATION.telephones.signalement}
          </a>
        </div>
      </div>
    </section>
  );
}

// Aucun titre au-dessus des cartes : elles se lisent d'elles-mêmes et une
// phrase d'introduction ne faisait que retarder le clic.
function Cartes() {
  const t = useTranslations("accueil");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARTES.map((carte) => (
          // Le texte vit sur l'image, pas en dessous : la carte devient une
          // seule pièce plutôt qu'une vignette posée sur un bloc de texte.
          // Le dégradé part du marine opaque en bas pour garantir la lisibilité
          // quelle que soit la photo.
          <Link
            key={carte.cle}
            href={carte.href}
            className="group relative isolate flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-marine ring-1 ring-marine/20 transition hover:ring-2 hover:ring-lime"
          >
            <Image
              src={carte.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="-z-10 object-cover transition duration-700 group-hover:scale-105"
            />
            {/* Dégradé resserré vers le bas : il doit porter le titre, pas
                assombrir toute la photo. */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-marine from-8% via-marine/55 via-22% to-transparent to-50%" />

            {/* Le titre suffit : la carte entière est cliquable, et une
                description sous chaque vignette alourdissait la rangée. */}
            <div className="flex items-center justify-between gap-3 p-5">
              <h3 className="font-[family-name:var(--font-titre)] text-2xl font-bold uppercase leading-tight tracking-wide text-white">
                {t(`cartes.${carte.cle}.titre`)}
              </h3>
              <Chevron className="size-6 shrink-0 text-lime transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Sections() {
  const t = useTranslations("accueil");

  return (
    <>
      <SectionAlternee
        fond
        cote="droite"
        titre={t("soutienTitre")}
        texte={t("soutienTexte")}
        image="/images/carte-membre-2026-detouree.png"
        presentation="objet"
        actions={[
          { href: "/membre", libelle: t("soutienMembre"), principal: true },
          { href: "/dons", libelle: t("soutienDon") },
        ]}
      />

    </>
  );
}

export default async function PageAccueil({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = await lireStatistiques();

  return (
    <>
      <Hero />
      <CompteurSauvetages initiales={stats} />
      <Cartes />
      <Sections />
      <FilInterventions />
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // Titre absolu : le gabarit du layout ajouterait une seconde fois le nom
  // de l'organisation, qui est déjà dans le titre d'accueil.
  return { title: { absolute: t("titre") }, description: t("description") };
}
