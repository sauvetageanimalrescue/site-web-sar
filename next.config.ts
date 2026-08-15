import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // La génération des cartes de membre lit les gabarits PDF et les polices ;
  // on force leur inclusion dans la fonction serverless sur Vercel.
  outputFileTracingIncludes: {
    "/api/carte/*": ["./src/lib/carte/**/*"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      // Le temps de la migration, les photos vivent encore sur le CDN Shopify.
      { protocol: "https", hostname: "sar.quebec" },
    ],
  },
};

export default withNextIntl(nextConfig);
