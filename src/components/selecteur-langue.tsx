"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const ETIQUETTES: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
};

// Trois langues : un menu déroulant natif reste plus fiable qu'un menu maison,
// surtout au clavier et sur mobile.
export function SelecteurLangue() {
  const chemin = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");

  return (
    <label className="relative">
      <span className="sr-only">{t("langue")}</span>
      <select
        value={locale}
        onChange={(e) =>
          router.replace(chemin, { locale: e.target.value as Locale })
        }
        className="cursor-pointer appearance-none rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-marine transition hover:bg-surface-2"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {ETIQUETTES[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
