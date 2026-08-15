# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Conventions du projet

- **Langue du code** : noms de fichiers, variables, routes et commentaires en français. Les commentaires expliquent le *pourquoi*, pas le *quoi*.
- **Trois langues** : `fr` (défaut), `en`, `es`. Toute chaîne visible passe par `next-intl` (`messages/*.json`). Aucun texte en dur dans les composants.
- **Rédaction** : éviter les tirets cadratins (—) dans la copie publique ; préférer la virgule ou le deux-points.
- **Dates** : toujours jour / mois / année.
- **Sécurité** : dire « niveau de sécurité », jamais « niveau d'accès ».
- **Supabase** : caster un résultat de jointure via `as unknown as X[]`, jamais `as X[]` directement.
- **Migrations** : le CLI Supabase n'est pas utilisé. Chaque migration dans `supabase/migrations/` doit être **idempotente** (`if not exists`, `create or replace`, `drop policy if exists`) car elle est collée à la main dans l'éditeur SQL.
- **Avant de pousser** : lancer un vrai `npm run build`. Le mode dev ne détecte pas toutes les erreurs TypeScript qui cassent le build Vercel. Node est à `C:\Program Files\nodejs` (absent du PATH).
- **Port de dev** : 3003 (3000 = registre des missions, 3001 = animALERTE, 3002 = heaven-stadium).
