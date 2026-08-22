# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Conventions du projet

- **Langue du code** : noms de fichiers, variables, routes et commentaires en français. Les commentaires expliquent le *pourquoi*, pas le *quoi*.
- **Trois langues** : `fr` (défaut), `en`, `es`. Toute chaîne visible passe par `next-intl` (`messages/*.json`). Aucun texte en dur dans les composants.
- **Rédaction** : éviter les tirets cadratins (—) dans la copie publique ; préférer la virgule ou le deux-points.
- **Dates** : toujours jour / mois / année.
- **Sécurité** : dire « niveau de sécurité », jamais « niveau d'accès ».
- **Ne jamais employer « SPCA » comme nom générique.** La SPCA est une organisation précise, pas une catégorie : ailleurs au Québec, il s'agit d'un service animalier, d'un refuge ou d'une fourrière selon les cas. On écrit « votre service animalier municipal ». Le sigle ne s'emploie que lorsqu'on parle nommément de la SPCA elle-même.
- **Supabase** : caster un résultat de jointure via `as unknown as X[]`, jamais `as X[]` directement.
- **Migrations** : le CLI Supabase n'est pas utilisé. Chaque migration dans `supabase/migrations/` doit être **idempotente** (`if not exists`, `create or replace`, `drop policy if exists`) car elle est collée à la main dans l'éditeur SQL.
- **Avant de pousser** : lancer un vrai `npm run build`. Le mode dev ne détecte pas toutes les erreurs TypeScript qui cassent le build Vercel. Node est à `C:\Program Files\nodejs` (absent du PATH).
- **Port de dev** : 3003 (3000 = registre des missions, 3001 = animALERTE, 3002 = heaven-stadium).

# Le système visuel du site

Toute nouvelle page se compose de ces blocs. Ne pas en inventer d'autres sans raison ; si l'apparence d'un bloc doit changer, elle change dans son composant, jamais dans une page.

## Les largeurs

| Nom | Mesure | Usage |
|---|---|---|
| `pleine` | `max-w-7xl` | bannières, grilles de cartes, longues énumérations |
| `carte` | `max-w-2xl` | tout contenu étroit : diapositive, paragraphe, encadré |
| `texte` | `max-w-3xl` | réservé au composant `Prose` des pages éditoriales longues |

**Le titre d'une section s'aligne toujours sur le bord gauche de son contenu**, jamais sur le bord de la page : `<Section largeur="carte">` place le titre au bord de la carte. Un titre à gauche au-dessus d'un bloc centré donne l'impression que les deux éléments n'appartiennent pas ensemble.

## Les blocs

- **`EnTetePage`** : la bannière. Surtitre lime, titre blanc en majuscules, intro, photo sur fond marine. **Toujours alignée à gauche, sur toute la largeur, et de hauteur fixe** pour que le site ne tressaute pas d'une page à l'autre ; le contenu se centre verticalement dans cette hauteur.
- **`Section`** : le conteneur de base. `titre`, `fond` pour le gris, `largeur`. **Les sections d'une même page alternent `fond` une fois sur deux**, ce qui donne son rythme à la page.
- **`CarteImage` + `GrilleCartes`** (`components/cartes.tsx`) : le canevas unique de toutes les cartes. Photo pleine, dégradé marine montant du bas, titre en majuscules posé dessus, pastille d'action à droite. Jamais plus de quatre cartes d'affilée sans un bloc de texte entre les rangées.
- **`Declaration`** : affirmation courte centrée sur fond gris, suivie de deux boutons. Sert de respiration entre deux rangées de cartes.
- **`CarteVues`** : plusieurs graphiques dans une seule carte que l'on feuillette avec deux chevrons. Les vues sont empilées dans la même case de grille pour que la hauteur ne saute pas.
- **`Chiffre`** : un nombre et sa légende, rien d'autre. Aucune précision en gris sous la carte.
- **Le bloc image** : dans une page éditoriale, `image: { fichier, alt }` insère une photo centrée à la largeur d'une carte, en seize neuf, coins arrondis. Une légende facultative se place dessous, en petits caractères : elle sert à situer la photo, surtout quand elle vient des archives, sans quoi le lecteur croit voir une scène d'aujourd'hui. On ne met jamais une image à gauche et du texte à droite.
- **`AppelAction`**, le bas de page à deux boutons : bandeau marine qui ferme une page, à la largeur d'une carte pour s'aligner sur les paragraphes qui le précèdent.

## Le texte

- Les paragraphes portent la classe **`paragraphe`** : justifiés, **sans césure**. Un mot coupé en fin de ligne dérange plus que l'espacement un peu large qu'il évite. Ne pas justifier un texte court et centré.
- **Ponctuation** : jamais d'espace entre la dernière lettre d'un mot et la ponctuation qui suit, y compris les deux points, le point-virgule, le point d'interrogation et le point d'exclamation. Seuls les guillemets français gardent leurs espaces intérieures.
- **Les légendes de photo** suivent toujours la forme `AAAA - qui ou quoi`, année en chiffres, trait d'union simple, aucun point final. Elles nomment, elles ne racontent pas : « 2012 - Eric Dussault accompagné de Milo, le chat, et son propriétaire ».
- **Éviter les millésimes dans la prose** : « à l'époque », « l'année suivante », « dans la foulée » plutôt qu'une date, sauf quand l'année elle-même est l'information.
- **Un paragraphe qui se suffit vaut mieux que deux.** Ne pas écrire par paires par réflexe : un second paragraphe de vingt mots affaiblit le premier. On en met deux ou trois quand le propos l'exige, pas autrement.
- Les listes courtes restent en une seule colonne, à puces, **sans boîte**. Au-delà de vingt entrées, elles se replient en colonnes sur toute la largeur.
