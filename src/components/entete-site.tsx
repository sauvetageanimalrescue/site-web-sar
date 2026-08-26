"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  IconChevronDown,
  IconMenu2,
  IconX,
  IconAlertTriangleFilled,
} from "@tabler/icons-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { SelecteurLangue } from "@/components/selecteur-langue";
import { MENU, LIENS_DIRECTS, MENU_CONNEXION, type SectionMenu } from "@/lib/menu";

// Le menu Connexion se comporte comme les autres, mais il est rendu à la
// suite des liens directs pour rester le dernier avant le sélecteur de langue.
const SECTIONS_DEROULANTES: SectionMenu[] = [...MENU, MENU_CONNEXION];

export function EnteteSite() {
  const t = useTranslations("nav");
  const chemin = usePathname();
  const [mobileOuvert, setMobileOuvert] = useState(false);
  const [sectionOuverte, setSectionOuverte] = useState<string | null>(null);
  // Sur mobile, les sections se replient : sans quoi la coquille dépasse la
  // hauteur de l'écran, et comme elle vit dans l'en-tête collée en haut, la
  // page ne peut jamais défiler jusqu'à son bas. Organisation reste ouverte
  // par défaut, comme première section du menu.
  const [sectionMobileOuverte, setSectionMobileOuverte] = useState<string | null>(
    MENU[0]?.cle ?? null,
  );

  const actif = (href: string) =>
    chemin === href || chemin.startsWith(`${href}/`);

  // Une destination hors du site ne passe pas par le Link de next-intl, qui
  // préfixerait la locale à l'URL absolue.
  const LienMenu = ({
    href,
    className,
    children,
  }: {
    href: string;
    className: string;
    children: React.ReactNode;
  }) =>
    /^https?:\/\//.test(href) ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={() => setSectionOuverte(null)}
      >
        {children}
      </a>
    ) : (
      <Link
        href={href}
        className={className}
        onClick={() => {
          setSectionOuverte(null);
          setMobileOuvert(false);
        }}
      >
        {children}
      </Link>
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      {/* Rangée blanche: logo, signaler, connexion, langue. Toujours là, peu
          importe la taille d'écran ; c'est la rangée du dessous, le menu, qui
          change de forme selon la place disponible. */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Logo />

        <div className="ml-auto flex items-center gap-2">
          {/* Icône seule sous sm, faute de place à côté du logo et du
              hamburger ; le texte complet revient dès qu'il y a de la place. */}
          <Link
            href="/signalement"
            aria-label={t("signalerBouton")}
            className="flex items-center gap-2 rounded-md bg-urgence p-2.5 text-sm font-semibold text-white transition hover:bg-urgence/90 sm:px-4 sm:py-2"
          >
            <IconAlertTriangleFilled className="size-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{t("signalerBouton")}</span>
          </Link>

          {/* Connexion : à côté du sélecteur de langue plutôt que dans le
              menu, elle mène ailleurs qu'aux pages du site (registre des
              missions). */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setSectionOuverte(MENU_CONNEXION.cle)}
            onMouseLeave={() => setSectionOuverte(null)}
          >
            <button
              type="button"
              aria-expanded={sectionOuverte === MENU_CONNEXION.cle}
              onClick={() =>
                setSectionOuverte(
                  sectionOuverte === MENU_CONNEXION.cle ? null : MENU_CONNEXION.cle,
                )
              }
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
            >
              {t(MENU_CONNEXION.cle)}
              <IconChevronDown className="size-4 text-muted" aria-hidden />
            </button>
            {sectionOuverte === MENU_CONNEXION.cle && (
              <div className="absolute right-0 top-full w-64 rounded-lg border border-border bg-surface p-2 shadow-lg">
                {MENU_CONNEXION.liens.map((lien) => (
                  <LienMenu
                    key={lien.href}
                    href={lien.href}
                    className="block rounded-md px-3 py-2 text-sm text-foreground transition hover:bg-surface-2"
                  >
                    {t(lien.cle)}
                  </LienMenu>
                ))}
              </div>
            )}
          </div>

          <SelecteurLangue />

          <button
            type="button"
            onClick={() => setMobileOuvert((v) => !v)}
            aria-expanded={mobileOuvert}
            aria-label={mobileOuvert ? t("fermer") : t("menu")}
            className="rounded-md p-2 text-marine transition hover:bg-surface-2 lg:hidden"
          >
            {mobileOuvert ? (
              <IconX className="size-6" aria-hidden />
            ) : (
              <IconMenu2 className="size-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Rangée grise: la racine du menu, visible en entier sur un écran
          assez large. En dessous du seuil, elle disparaît complètement, le
          hamburger de la rangée du haut prend le relais. */}
      <nav
        className="hidden border-t border-border bg-surface-2 lg:block"
        aria-label={t("menu")}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          {MENU.map((section) =>
            section.href ? (
              <Link
                key={section.cle}
                href={section.href}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-surface ${
                  actif(section.href) ? "text-marine" : "text-foreground"
                }`}
              >
                {t(section.cle)}
              </Link>
            ) : (
            <div
              key={section.cle}
              className="relative"
              onMouseEnter={() => setSectionOuverte(section.cle)}
              onMouseLeave={() => setSectionOuverte(null)}
            >
              <button
                type="button"
                aria-expanded={sectionOuverte === section.cle}
                onClick={() =>
                  setSectionOuverte(
                    sectionOuverte === section.cle ? null : section.cle,
                  )
                }
                className="flex items-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface"
              >
                {t(section.cle)}
                <IconChevronDown className="size-4 text-muted" aria-hidden />
              </button>
              {sectionOuverte === section.cle && (
                <div className="absolute left-0 top-full w-64 rounded-lg border border-border bg-surface p-2 shadow-lg">
                  {section.liens.map((lien) => (
                    <LienMenu
                      key={lien.href}
                      href={lien.href}
                      className={`block rounded-md px-3 py-2 text-sm transition hover:bg-surface-2 ${
                        actif(lien.href)
                          ? "font-semibold text-marine"
                          : "text-foreground"
                      }`}
                    >
                      {t(lien.cle)}
                    </LienMenu>
                  ))}
                </div>
              )}
            </div>
            ),
          )}

          {LIENS_DIRECTS.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-surface ${
                actif(lien.href) ? "text-marine" : "text-foreground"
              }`}
            >
              {t(lien.cle)}
            </Link>
          ))}
        </div>
      </nav>

      {mobileOuvert && (
        <nav
          className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-border bg-surface lg:hidden"
          aria-label={t("menu")}
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            {SECTIONS_DEROULANTES.filter((s) => s.liens.length > 0).map((section) => {
              const ouverte = sectionMobileOuverte === section.cle;
              return (
                <div key={section.cle} className="border-t border-border py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSectionMobileOuverte(ouverte ? null : section.cle)
                    }
                    aria-expanded={ouverte}
                    className="flex w-full items-center justify-between px-1 py-1 text-left font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-wider text-ciel"
                  >
                    {t(section.cle)}
                    <IconChevronDown
                      className={`size-4 shrink-0 transition ${ouverte ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {ouverte && (
                    <div className="mt-1">
                      {section.liens.map((lien) => (
                        <LienMenu
                          key={lien.href}
                          href={lien.href}
                          className="block rounded-md px-1 py-2 text-sm text-foreground"
                        >
                          {t(lien.cle)}
                        </LienMenu>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-t border-border py-2">
              {[...MENU.filter((s) => s.href).map((s) => ({ cle: s.cle, href: s.href as string })), ...LIENS_DIRECTS].map((lien) => (
                <Link
                  key={lien.href}
                  href={lien.href}
                  onClick={() => setMobileOuvert(false)}
                  className="block rounded-md px-1 py-2 text-sm font-medium text-foreground"
                >
                  {t(lien.cle)}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
