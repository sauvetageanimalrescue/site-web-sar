import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Declaration } from "@/components/ui";
import { CarteImage, GrilleCartes } from "@/components/cartes";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { lireStatistiques } from "@/lib/statistiques";

// Deux rangées de quatre, séparées par une déclaration. La première regroupe
// les gestes que le visiteur peut poser tout de suite, la seconde ce que
// l'organisation offre.
const CARTES = [
  { cle: "signalement", href: "/signalement", image: "/images/carte-signalement.jpg" },
  { cle: "membre", href: "/membre", image: "/images/carte-membre-2026.jpg" },
  { cle: "dons", href: "/dons", image: "/images/carte-dons.jpg" },
  { cle: "recrutement", href: "/recrutement", image: "/images/carte-benevole.jpg" },
  { cle: "services", href: "/services", image: "/images/carte-services.jpg" },
  { cle: "solutions", href: "/solutions", image: "/images/carte-secteurs.jpg" },
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
    // Photo pleine largeur, intacte : c'est le dégradé par-dessus qui
    // garantit la lecture du texte, pas la photo elle-même qui est coupée
    // ou masquée. Le dégradé bascule plus tard que le centre, pour laisser
    // le plus de place possible au texte sans pour autant cacher la photo.
    // Il ne descend jamais sous 20 % d'opacité, même tout à droite: sur un
    // téléphone, le texte s'étend sur presque toute la largeur, et une photo
    // qui redevient complètement nette y nuit à la lecture.
    // Le rapport largeur/hauteur est fixe, comme pour les bannières des
    // pages intérieures : sans ça, une fenêtre plus ou moins large fait
    // varier la hauteur du bandeau de façon imprévisible. Un plancher
    // garde la place nécessaire au titre, au texte et aux boutons sur un
    // petit écran.
    <section className="relative isolate flex aspect-[8/3] min-h-[28rem] items-center overflow-hidden bg-marine">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover"
        style={{
          backgroundImage: "url(/images/hero-raton-laveur.jpg)",
          backgroundPosition: "center 35%",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to right, var(--marine) 0%, var(--marine) 42%, rgba(11, 35, 56, 0.4) 78%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4">
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
            href="/membre"
            className="rounded-md bg-lime px-6 py-3.5 font-semibold text-marine transition hover:bg-lime-fonce"
          >
            {t("heroMembre")}
          </Link>
          <Link
            href="/dons"
            className="rounded-md border border-white/40 bg-marine px-6 py-3.5 font-semibold text-white transition hover:bg-marine/80"
          >
            {t("heroDons")}
          </Link>
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
