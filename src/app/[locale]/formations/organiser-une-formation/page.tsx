import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";

export default async function PageOrganiserFormation({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <EnTetePage
        surtitre="Dans vos installations"
        titre="Organiser une formation"
        intro="Vous avez accès à un local et souhaitez offrir une formation à votre clientèle, à votre équipe ou à votre milieu? Sauvetage Animal Rescue peut planifier une date et se déplacer jusqu’à vous."
        image="/images/formations.jpg"
        imageTailleNaturelle={{ largeur: 2000, hauteur: 1125 }}
      />

      <Section titre="Une formation chez vous" largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          Une écurie, une ferme, un commerce, une organisation ou tout autre milieu disposant d’un local peut accueillir une formation de Sauvetage Animal Rescue. Nous pouvons convenir d’une date avec l’instructeur et offrir soit l’Initiation Secours Animal, sur une journée, soit Premiers Secours Animal, sur deux journées. Les groupes sont limités à 20 participants afin de conserver une formation pratique, accessible et adaptée aux questions du groupe.
        </p>
      </Section>

      <Section fond largeur="carte">
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/formation-organiser.jpg"
              alt="Salle de formation équipée d’ordinateurs"
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        </figure>
      </Section>

      <Section titre="Organiser une date" largeur="carte">
        <p className="paragraphe text-lg leading-relaxed text-foreground/90">
          Pour connaître les disponibilités de nos instructeurs et les possibilités offertes dans votre région, communiquez avec nous. Nous pourrons discuter du lieu, du format souhaité et d’une date adaptée à votre groupe. Écrivez à <a className="font-semibold text-ciel underline underline-offset-4" href="mailto:e.dussault@sar.quebec">e.dussault@sar.quebec</a>.
        </p>
      </Section>
    </>
  );
}
