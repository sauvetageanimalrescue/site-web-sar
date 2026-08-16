"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
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
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Logo />

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
          aria-label={t("menu")}
        >
          {MENU.map((section) => (
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
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
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
          ))}

          {LIENS_DIRECTS.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition hover:bg-surface-2 ${
                actif(lien.href) ? "text-marine" : "text-foreground"
              }`}
            >
              {t(lien.cle)}
            </Link>
          ))}

          {/* Connexion, dernier avant le sélecteur de langue. */}
          <div
            className="relative"
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
        </nav>

        {/* Le sélecteur de langue ferme la barre, collé au bord droit. */}
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
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

      {mobileOuvert && (
        <nav
          className="border-t border-border bg-surface lg:hidden"
          aria-label={t("menu")}
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            {SECTIONS_DEROULANTES.map((section) => (
              <div key={section.cle} className="border-t border-border py-2">
                <p className="px-1 py-1 font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-wider text-ciel">
                  {t(section.cle)}
                </p>
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
            ))}
            <div className="border-t border-border py-2">
              {LIENS_DIRECTS.map((lien) => (
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
