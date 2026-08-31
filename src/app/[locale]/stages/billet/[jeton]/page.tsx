import { setRequestLocale, getTranslations } from "next-intl/server";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { Section } from "@/components/ui";
import { creerClientAdmin } from "@/lib/supabase/admin";

type Billet = {
  code: string;
  date: string;
  prenom: string;
  nom: string;
};

function formaterDate(iso: string) {
  const [a, m, j] = iso.split("-");
  return `${j}/${m}/${a}`;
}

export default async function PageBillet({ params }: PageProps<"/[locale]/stages/billet/[jeton]">) {
  const { locale, jeton } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "stages" });
  const supabase = creerClientAdmin();

  const { data: premier } = await supabase
    .from("inscriptions_stage")
    .select("participant1_prenom, participant1_nom, stages!inner(code, date_stage)")
    .eq("billet1_jeton", jeton)
    .eq("statut", "confirmee")
    .maybeSingle();

  let billet: Billet | null = null;
  if (premier) {
    const p = premier as unknown as {
      participant1_prenom: string;
      participant1_nom: string;
      stages: { code: string; date_stage: string };
    };
    billet = { code: p.stages.code, date: p.stages.date_stage, prenom: p.participant1_prenom, nom: p.participant1_nom };
  } else {
    const { data: second } = await supabase
      .from("inscriptions_stage")
      .select("participant2_prenom, participant2_nom, stages!inner(code, date_stage)")
      .eq("billet2_jeton", jeton)
      .eq("statut", "confirmee")
      .maybeSingle();
    if (second) {
      const p = second as unknown as {
        participant2_prenom: string;
        participant2_nom: string;
        stages: { code: string; date_stage: string };
      };
      billet = { code: p.stages.code, date: p.stages.date_stage, prenom: p.participant2_prenom, nom: p.participant2_nom };
    }
  }

  return (
    <Section largeur="carte">
      {!billet ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <IconCircleXFilled className="mx-auto size-12 text-muted" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold uppercase text-marine">{t("billetIntrouvable")}</h1>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-vert bg-vert-doux p-8">
          <h1 className="flex items-center gap-2 text-2xl font-bold uppercase text-vert">
            <IconCircleCheckFilled className="size-7" aria-hidden />
            {t("billetValide")}
          </h1>
          <dl className="mt-6 space-y-4">
            <div><dt className="text-xs uppercase text-muted">{t("billetParticipant")}</dt><dd className="text-lg font-semibold text-marine">{billet.prenom} {billet.nom}</dd></div>
            <div><dt className="text-xs uppercase text-muted">{t("billetDate")}</dt><dd className="text-lg font-semibold text-marine">{formaterDate(billet.date)}</dd></div>
            <div><dt className="text-xs uppercase text-muted">{t("billetReservation")}</dt><dd className="text-lg font-semibold text-marine">{billet.code}</dd></div>
          </dl>
        </div>
      )}
    </Section>
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/stages/billet/[jeton]">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stages" });
  return { title: t("billetValide"), robots: { index: false, follow: false } };
}
