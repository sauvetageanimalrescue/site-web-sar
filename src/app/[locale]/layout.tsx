import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { EnteteSite } from "@/components/entete-site";
import { PiedSite } from "@/components/pied-site";
import "../globals.css";

const inter = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
// Titres en condensé : la typographie des véhicules et des écussons de service.
const barlow = Barlow_Condensed({
  variable: "--font-titre",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL("https://sar.quebec"),
    title: { default: t("titre"), template: `%s • Sauvetage Animal Rescue` },
    description: t("description"),
    openGraph: {
      title: t("titre"),
      description: t("description"),
      locale,
      type: "website",
      siteName: "Sauvetage Animal Rescue",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <EnteteSite />
          <main className="flex-1">{children}</main>
          <PiedSite />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
