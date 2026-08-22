import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, AppelAction } from "@/components/ui";
import { MEMBRES, trouverMembre, anneesDeService } from "@/contenu/equipe";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MEMBRES.map((m) => ({ locale, membre: m.cle })),
  );
}

export default async function PageMembre({
  params,
}: PageProps<"/[locale]/equipe/[membre]">) {
  const { locale, membre } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "equipe" });

  const m = trouverMembre(membre);
  if (!m) notFound();

  const annees = anneesDeService(m, new Date().getFullYear());

  return (
    <>
      <EnTetePage
        surtitre={m.fonction}
        titre={`${m.prenom} ${m.nom}`}
        intro={m.texte?.[0]}
        image={m.photo}
      />

      {/* La fiche : ce qu'on veut savoir d'un coup d'oeil. */}
      <Section largeur="carte">
        <dl className="grid gap-4 sm:grid-cols-3">
          <Donnee terme={t("ficheFonction")} valeur={m.fonction} />
          {m.depuis && <Donnee terme={t("ficheDepuis")} valeur={m.depuis} />}
          {annees !== null && (
            <Donnee
              terme={t("ficheService")}
              valeur={t("ficheAnnees", { annees })}
            />
          )}
          {m.grade && <Donnee terme={t("ficheGrade")} valeur={m.grade} />}
        </dl>
      </Section>

      {m.texte && m.texte.length > 1 && (
        <Section titre={t("parcoursTitre")} fond largeur="carte">
          {m.texte.slice(1).map((p) => (
            <p
              key={p.slice(0, 40)}
              className="paragraphe mb-4 text-lg leading-relaxed text-foreground/90"
            >
              {p}
            </p>
          ))}
        </Section>
      )}

      {m.sauvetageMarquant && (
        <Section titre={t("marquantTitre")} largeur="carte">
          <p className="paragraphe text-lg leading-relaxed text-foreground/90">
            {m.sauvetageMarquant}
          </p>
        </Section>
      )}

      {/* L'entrevue ouvre sur YouTube plutôt que dans un lecteur intégré :
          les vues comptent sur notre chaîne et aucun script de suivi n'est
          chargé sur le site. */}
      {m.video && (
        <Section titre={t("entrevueTitre")} fond largeur="carte">
          <a
            href={`https://www.youtube.com/watch?v=${m.video}`}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-video overflow-hidden rounded-xl bg-marine"
          >
            <Image
              src={`https://i.ytimg.com/vi/${m.video}/hqdefault.jpg`}
              alt=""
              fill
              sizes="42rem"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </a>
        </Section>
      )}

      <AppelAction
        titre={t("rejoindreTitre")}
        texte={t("rejoindreTexte")}
        actions={[
          { href: "/membre", libelle: t("membreBouton"), principal: true },
          { href: "/equipe", libelle: t("retourBouton") },
        ]}
      />
    </>
  );
}

function Donnee({ terme, valeur }: { terme: string; valeur: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <dt className="text-xs uppercase tracking-wide text-ciel">{terme}</dt>
      <dd className="mt-1 font-medium text-foreground">{valeur}</dd>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/equipe/[membre]">) {
  const { locale, membre } = await params;
  const m = trouverMembre(membre);
  if (!m) return {};
  return { title: `${m.prenom} ${m.nom}`, description: m.texte?.[0] };
}
