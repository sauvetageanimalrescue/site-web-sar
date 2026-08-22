import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { IconPhoneFilled } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { Declaration } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { lireStatistiques } from "@/lib/statistiques";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

// Deux rangées de quatre, séparées par une déclaration. La première regroupe
// les gestes que le visiteur peut poser tout de suite, la seconde ce que
// l'organisation offre.
const CARTES = [
  { cle: "signalement", href: "/signalement", image: "/images/carte-signalement.jpg" },
  { cle: "membre", href: "/membre", image: "/images/carte-membre-2026.jpg" },
  { cle: "dons", href: "/dons", image: "/images/carte-dons.jpg" },
  { cle: "recrutement", href: "/recrutement", image: "/images/carte-benevole.jpg" },
  { cle: "services", href: "/services", image: "/images/carte-services.jpg" },
  { cle: "secteurs", href: "/secteurs", image: "/images/carte-secteurs.jpg" },
  { cle: "formations", href: "/formations", image: "/images/carte-formations.jpg" },
  { cle: "ateliers", href: "/ateliers/primaire", image: "/images/carte-ateliers.jpg" },
  { cle: "mission", href: "/mission", image: "/images/carte-mission.jpg" },
  { cle: "direction", href: "/direction", image: "/images/carte-direction.jpg" },
  { cle: "equipe", href: "/equipe", image: "/images/carte-equipe.jpg" },
  { cle: "territoire", href: "/territoire", image: "/images/carte-territoire.jpg" },
] as const;

function Hero() {
  const t = useTranslations("accueil");

  return (
    // Bannière sur aplat marine, avec l'écusson en filigrane à droite : le
    // titre reste parfaitement lisible et l'identité s'impose d'entrée.
    <section className="relative isolate overflow-hidden bg-marine">
      {/* Fond en image de style plutôt qu'en composant Image : l'optimiseur de
          Next ré-encode en WebP et un grand aplat marine s'y dégrade en
          aplats visibles. Ajusté sur la hauteur et ancré à droite, il n'est
          jamais agrandi au-delà de sa taille réelle ; le marine de la section
          prend le relais à gauche, dans la même teinte exactement. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-right bg-no-repeat"
        style={{
          backgroundImage: "url(/images/hero-fond.png)",
          backgroundSize: "auto 100%",
        }}
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
function Cartes({ debut, fin }: { debut: number; fin: number }) {
  const t = useTranslations("accueil");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <GrilleCartes>
        {CARTES.slice(debut, fin).map((carte) => (
          <CarteImage
            key={carte.cle}
            image={carte.image}
            titre={t(`cartes.${carte.cle}.titre`)}
            href={carte.href}
          />
        ))}
      </GrilleCartes>
    </section>
  );
}

export default async function PageAccueil({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "accueil" });
  const stats = await lireStatistiques();

  return (
    <>
      <Hero />
      {/* La déclaration coupe la grille en deux : sur un téléphone, huit
          cartes à la suite se traversent sans jamais rencontrer de texte. */}
      <Cartes debut={0} fin={4} />
      <Declaration
        titre={t("soutienTitre")}
        texte={t("soutienTexte")}
        actions={[
          { href: "/membre", libelle: t("soutienA"), principal: true },
          { href: "/dons", libelle: t("soutienB") },
        ]}
      />
      <Cartes debut={4} fin={8} />
      <Declaration
        titre={t("benevolesTitre")}
        texte={t("benevolesTexte")}
        actions={[
          { href: "/equipe", libelle: t("benevolesA"), principal: true },
          { href: "/recrutement", libelle: t("benevolesB") },
        ]}
      />
      <Cartes debut={8} fin={12} />
      {/* Le compteur ferme la page : après l'argument du financement, il en
          apporte la preuve chiffrée. Le fil des interventions vit désormais
          uniquement sur la page des statistiques. */}
      <CompteurSauvetages initiales={stats} />
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
