import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EnTetePage, Section, ListePuces } from "@/components/ui";
import { FormulaireStage } from "@/components/formulaire-stage";
import { lireStagesAVenir } from "@/lib/stages";

function PhotoStage({
  fichier,
  alt,
  fond,
}: {
  fichier: string;
  alt: string;
  fond?: boolean;
}) {
  return (
    <Section fond={fond} largeur="carte">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-marine">
        <Image
          src={fichier}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 42rem"
          className="object-cover"
        />
      </div>
    </Section>
  );
}

// Les places changent à chaque paiement : pas de mise en cache longue.
export const revalidate = 60;

export default async function PageStages({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stages" });
  const stages = await lireStagesAVenir();
  const infos = t.raw("infos") as string[];
  const chaineTexte = t.raw("chaineTexte") as string[];
  const limiteeTexte = t.raw("limiteeTexte") as string[];

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/stages.jpg"
        imageTailleNaturelle={{ largeur: 2000, hauteur: 3556 }}
      />

      <Section titre={t("equipesTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("equipesTexte")}
        </p>
      </Section>

      <PhotoStage
        fond
        fichier="/images/stages-groupe-equipe.jpg"
        alt="Un participant en compagnie de deux intervenants de Sauvetage Animal Rescue"
      />

      <Section titre={t("chaineTitre")} largeur="carte">
        <div className="space-y-4">
          {chaineTexte.map((p) => (
            <p key={p.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <PhotoStage
        fond
        fichier="/images/stages-manipulation-ecureuils.jpg"
        alt="Des participants manipulent de jeunes écureuils sous la supervision d'un intervenant"
      />

      <Section titre={t("engagerTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("engagerTexte")}
        </p>
      </Section>

      <Section fond titre={t("limiteeTitre")} largeur="carte">
        <div className="space-y-4">
          {limiteeTexte.map((p) => (
            <p key={p.slice(0, 40)} className="paragraphe text-lg leading-relaxed text-foreground/90">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <PhotoStage
        fichier="/images/stages-manipulation-lapin.jpg"
        alt="Une participante tient un jeune lapin sauvé"
      />

      <Section fond titre={t("infosTitre")} largeur="carte">
        <ListePuces items={infos} />
      </Section>

      <Section titre={t("horaireTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("horaireTexte")}
        </p>
      </Section>

      <Section fond titre={t("souvenirTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("souvenirTexte")}
        </p>
      </Section>

      <PhotoStage
        fichier="/images/stages-groupe-camion.jpg"
        alt="Trois intervenants souriants devant un véhicule de Sauvetage Animal Rescue"
      />

      <Section fond titre={t("formulaireTitre")} largeur="carte">
        <FormulaireStage stages={stages} />
      </Section>

      <Section titre={t("reservationTitre")} largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          {t("reservationTexte")}
        </p>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/stages">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stages" });
  return { title: t("titre"), description: t("intro") };
}
