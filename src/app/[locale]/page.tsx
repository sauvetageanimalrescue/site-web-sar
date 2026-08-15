import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { IconArrowRight, IconPhoneFilled } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { SectionAlternee } from "@/components/ui";
import { CompteurSauvetages } from "@/components/compteur-sauvetages";
import { FilInterventions } from "@/components/fil-interventions";
import { lireStatistiques } from "@/lib/statistiques";
import { ORGANISATION, lienTelephone } from "@/lib/constantes";

// Quatre portes d'entrée seulement : au-delà, une grille de cartes cesse
// d'orienter le visiteur et devient un mur à parcourir.
const CARTES = [
  { cle: "signalement", href: "/signalement", image: "/images/hero-accueil.png" },
  { cle: "membre", href: "/membre", image: "/images/carte-membre-2026.jpg" },
  { cle: "recrutement", href: "/recrutement", image: "/images/recrutement.jpg" },
  { cle: "fiches", href: "/informations", image: "/images/formations.jpg" },
] as const;

function Hero() {
  const t = useTranslations("accueil");

  return (
    <section className="relative isolate overflow-hidden bg-marine">
      <Image
        src="/images/hero-accueil.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-marine via-marine/90 to-marine/40" />
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

function Cartes() {
  const t = useTranslations("accueil");
  const c = useTranslations("commun");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="font-[family-name:var(--font-titre)] text-3xl font-bold uppercase tracking-wide text-marine sm:text-4xl">
        {t("sectionsTitre")}
      </h2>
      <p className="mt-2 max-w-2xl text-muted">{t("sectionsTexte")}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARTES.map((carte) => (
          <Link
            key={carte.cle}
            href={carte.href}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-ciel hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <Image
                src={carte.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-[family-name:var(--font-titre)] text-xl font-semibold uppercase tracking-wide text-marine">
                {t(`cartes.${carte.cle}.titre`)}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {t(`cartes.${carte.cle}.texte`)}
              </p>
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-ciel">
                {c("enSavoirPlus")}
                <IconArrowRight
                  className="size-4 transition group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
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
        image="/images/carte-membre-2026.jpg"
        actions={[
          { href: "/membre", libelle: t("soutienMembre"), principal: true },
          { href: "/dons", libelle: t("soutienDon") },
        ]}
      />

      <SectionAlternee
        cote="gauche"
        surtitre={t("territoireSurtitre")}
        titre={t("territoireTitre")}
        texte={t("territoireTexte")}
        points={t.raw("territoirePoints") as string[]}
        image="/images/territoire.jpg"
        actions={[{ href: "/territoire", libelle: t("territoireAction") }]}
      />

      <SectionAlternee
        fond
        cote="droite"
        surtitre={t("formationsSurtitre")}
        titre={t("formationsTitre")}
        texte={t("formationsTexte")}
        points={t.raw("formationsPoints") as string[]}
        image="/images/formations.jpg"
        actions={[{ href: "/formations", libelle: t("formationsAction") }]}
      />

      <SectionAlternee
        cote="gauche"
        surtitre={t("stagesSurtitre")}
        titre={t("stagesTitre")}
        texte={t("stagesTexte")}
        points={t.raw("stagesPoints") as string[]}
        image="/images/stages.png"
        actions={[
          { href: "/stages", libelle: t("stagesAction"), principal: true },
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
