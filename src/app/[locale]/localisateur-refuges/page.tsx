import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import { LocalisateurRefuges } from "@/components/localisateur-refuges";

export default async function PageLocalisateurRefuges({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("localisateur");
  return <>
    <EnTetePage surtitre={t("surtitre")} titre={t("titre")} intro={t("intro")} />
    <Section titre={t("commentTitre")} largeur="carte">
      <p className="paragraphe text-lg leading-relaxed text-foreground/90">{t("commentTexte")}</p>
      <aside className="mt-6 space-y-3 text-red-700" aria-labelledby="avertissement-refuges">
        <h3 id="avertissement-refuges" className="font-bold">{t("avertissementTitre")}</h3>
        <p className="paragraphe">{t("restrictions")}</p>
        <p className="paragraphe">{t("signalement")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><a className="underline" href="https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/sante-animale/animaux-sauvages/rehabilitation" target="_blank" rel="noopener noreferrer">{t("reglesLien")}</a></li>
          <li><a className="underline" href="https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/chasse-sportive/regles-generales/animaux-declaration-obligatoire" target="_blank" rel="noopener noreferrer">{t("declarationLien")}</a></li>
        </ul>
      </aside>
    </Section>
    <Section fond titre={t("rechercherTitre")} largeur="carte"><LocalisateurRefuges cleGoogle={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} /></Section>
  </>;
}
