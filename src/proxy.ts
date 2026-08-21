import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "@/i18n/routing";

// Next.js 16 : « Middleware » s'appelle désormais « Proxy » (fichier proxy.ts,
// fonction proxy). Le comportement est identique.
const handleI18n = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. next-intl gère la négociation/redirection de locale et produit la réponse.
  const response = handleI18n(request);

  // 2. On rafraîchit la session Supabase en écrivant ses cookies sur cette réponse.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (url && cle) {
    const supabase = createServerClient(url, cle, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    });

    // Rafraîchit le cookie de session au besoin ; requis pour que les Server
    // Components lisent une session valide à la requête suivante.
    await supabase.auth.getUser();
  }

  // 3. Toute adresse autre que le domaine officiel est marquée « ne pas
  // indexer » : l'adresse vercel.app, les déploiements de prévisualisation et
  // les domaines de rechange servent le même contenu, et Google pénalise le
  // contenu dupliqué. Le contrôle se fait ici parce qu'il dépend de l'hôte
  // demandé, ce que le fichier robots, calculé une seule fois à la
  // compilation, ne peut pas savoir.
  const hote = request.headers.get("host") ?? "";
  if (!/^(www.)?sar.quebec$/i.test(hote)) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Tout sauf les fichiers statiques, l'API, le callback d'auth et les
  // ressources internes Next.
  matcher: ["/((?!api|auth|_next|_vercel|.*\\..*).*)"],
};
