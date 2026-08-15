"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  IconChevronDown,
  IconMenu2,
  IconX,
  IconUserCircle,
} from "@tabler/icons-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { SelecteurLangue } from "@/components/selecteur-langue";
import { MENU, LIENS_DIRECTS } from "@/lib/menu";

export function EnteteSite() {
  const t = useTranslations("nav");
  const chemin = usePathname();
  const [mobileOuvert, setMobileOuvert] = useState(false);
  const [sectionOuverte, setSectionOuverte] = useState<string | null>(null);

  const actif = (href: string) =>
    chemin === href || chemin.startsWith(`${href}/`);

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
                    <Link
                      key={lien.href}
                      href={lien.href}
                      onClick={() => setSectionOuverte(null)}
                      className={`block rounded-md px-3 py-2 text-sm transition hover:bg-surface-2 ${
                        actif(lien.href)
                          ? "font-semibold text-marine"
                          : "text-foreground"
                      }`}
                    >
                      {t(lien.cle)}
                    </Link>
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
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <SelecteurLangue />
          <Link
            href="/espace-membre"
            aria-label={t("espaceMembre")}
            className="hidden rounded-md p-2 text-muted transition hover:bg-surface-2 hover:text-marine sm:block"
          >
            <IconUserCircle className="size-6" aria-hidden />
          </Link>
          <Link
            href="/signalement"
            className="hidden rounded-md bg-urgence px-4 py-2 text-sm font-semibold text-white transition hover:bg-urgence/90 sm:block"
          >
            {t("signalement")}
          </Link>
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
            <Link
              href="/signalement"
              onClick={() => setMobileOuvert(false)}
              className="mb-3 block rounded-md bg-urgence px-4 py-3 text-center text-sm font-semibold text-white"
            >
              {t("signalement")}
            </Link>
            {MENU.map((section) => (
              <div key={section.cle} className="border-t border-border py-2">
                <p className="px-1 py-1 font-[family-name:var(--font-titre)] text-sm font-semibold uppercase tracking-wider text-ciel">
                  {t(section.cle)}
                </p>
                {section.liens.map((lien) => (
                  <Link
                    key={lien.href}
                    href={lien.href}
                    onClick={() => setMobileOuvert(false)}
                    className="block rounded-md px-1 py-2 text-sm text-foreground"
                  >
                    {t(lien.cle)}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-border py-2">
              {[...LIENS_DIRECTS, { cle: "espaceMembre", href: "/espace-membre" }].map(
                (lien) => (
                  <Link
                    key={lien.href}
                    href={lien.href}
                    onClick={() => setMobileOuvert(false)}
                    className="block rounded-md px-1 py-2 text-sm font-medium text-foreground"
                  >
                    {t(lien.cle)}
                  </Link>
                ),
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
