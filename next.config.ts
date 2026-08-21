import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { REDIRECTIONS, MOTIFS } from "./src/lib/redirections";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // La génération des cartes de membre lit les gabarits PDF et les polices ;
  // on force leur inclusion dans la fonction serverless sur Vercel.
  outputFileTracingIncludes: {
    "/api/carte/*": ["./src/lib/carte/**/*"],
  },
  // Redirections permanentes depuis l'ancien site Shopify. Chaque entrée est
  // déclinée en trois : la version sans préfixe part vers le français, et les
  // versions /en/ et /es/ conservent la langue du visiteur.
  async redirects() {
    const regles = [];
    for (const [ancien, nouveau] of Object.entries(REDIRECTIONS)) {
      regles.push({ source: ancien, destination: `/fr${nouveau}`, permanent: true });
      regles.push({
        source: `/:langue(en|es)${ancien}`,
        destination: `/:langue${nouveau}`,
        permanent: true,
      });
    }
    // Les motifs viennent après : Next applique la première règle qui
    // correspond, donc les adresses précises doivent passer avant les familles.
    for (const { source, destination } of MOTIFS) {
      // Une destination réduite à la racine ne doit pas produire « /fr/ ».
      const suffixe = destination === "/" ? "" : destination;
      regles.push({ source, destination: `/fr${suffixe}`, permanent: true });
      regles.push({
        source: `/:langue(en|es)${source}`,
        destination: `/:langue${suffixe}`,
        permanent: true,
      });
    }
    return regles;
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      // Le temps de la migration, les photos vivent encore sur le CDN Shopify.
      { protocol: "https", hostname: "sar.quebec" },
      // Vignettes des épisodes de la série, servies par YouTube.
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
