import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { EnTetePage, Section } from "@/components/ui";
import {
  DISTINCTIONS,
  ficheDistinction,
  type Distinction,
} from "@/contenu/distinctions";
import type { Locale } from "@/i18n/routing";

const GROUPES = ["actes", "service", "deploiements"] as const;

// Étoile de citation, posée au centre de la barrette.
function Etoile() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 drop-shadow">
      <polygon
        points="12,2 14.9,8.9 22.4,9.5 16.7,14.4 18.4,21.7 12,17.8 5.6,21.7 7.3,14.4 1.6,9.5 9.1,8.9"
        fill="#e8edf1"
        stroke="rgba(0,0,0,.45)"
        strokeWidth="1"
      />
    </svg>
  );
}

// Feuille d'érable : le dispositif des missions menées à l'étranger.
function Feuille() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 drop-shadow">
      <path
        d="M12 2.2l1.6 3.4 2.7-.9-.7 3.1 3.3-.6-1.4 2.6 2.9 1.3-2.6 1.8 1.6 1.9-3.9.6.3 2.4-3.2-1.3-.6 4.3h-.6l-.6-4.3-3.2 1.3.3-2.4-3.9-.6 1.6-1.9L3 12.9l2.9-1.3-1.4-2.6 3.3.6-.7-3.1 2.7.9z"
        fill="#e8edf1"
        stroke="rgba(0,0,0,.45)"
        strokeWidth=".8"
      />
    </svg>
  );
}

// La barrette elle-même. Les bandes sont dessinées en CSS plutôt qu'en image :
// aucun fichier à produire, et le rendu reste net sur tous les écrans.
function Ruban({ distinction }: { distinction: Distinction }) {
  return (
    <div className="relative flex h-12 w-40 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-black/25 shadow-md">
      <div className="absolute inset-0 flex">
        {distinction.bandes.map((bande, i) => (
          <div
            key={i}
            style={{ backgroundColor: bande.couleur, flexGrow: bande.poids ?? 1 }}
          />
        ))}
      </div>
      {/* Reflet de la soie : sans lui, la barrette a l'air d'un simple aplat. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/25"
      />
      <div className="relative">
        {distinction.dispositif === "etoile" && <Etoile />}
        {distinction.dispositif === "feuille" && <Feuille />}
      </div>
    </div>
  );
}

export default async function PageDistinctions({
  params,
}: PageProps<"/[locale]/distinctions">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "distinctions" });
  const langue = (await getLocale()) as Locale;

  return (
    <>
      <EnTetePage
        surtitre={t("surtitre")}
        titre={t("titre")}
        intro={t("intro")}
        image="/images/remise-certificat.jpg"
      />

      {GROUPES.map((groupe, index) => (
        <Section
          key={groupe}
          titre={t(`groupes.${groupe}.titre`)}
          fond={index % 2 === 1}
        >
          <p className="mb-6 max-w-3xl text-muted">
            {t(`groupes.${groupe}.intro`)}
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {DISTINCTIONS.filter((d) => d.groupe === groupe).map((d) => {
              const fiche = ficheDistinction(d.cle, langue);
              return (
                <div
                  key={d.cle}
                  className="flex gap-5 rounded-xl border border-border bg-surface p-5"
                >
                  <Ruban distinction={d} />
                  <div>
                    <h3 className="font-[family-name:var(--font-titre)] text-lg font-bold uppercase leading-tight tracking-wide text-marine">
                      {fiche.titre}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {fiche.critere}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      ))}

      <Section titre={t("portTitre")}>
        <div className="mx-auto max-w-3xl space-y-4 text-muted">
          <p>{t("portTexte")}</p>
          <p>{t("attributionTexte")}</p>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/distinctions">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "distinctions" });
  return { title: t("titre"), description: t("intro") };
}
