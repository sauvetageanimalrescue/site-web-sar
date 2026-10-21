# Rabais des formations

## Publication

Appliquer `supabase/migrations/0018_rabais_formations.sql` dans l'éditeur SQL Supabase avant de publier ce code. La migration est idempotente. Elle ne change ni les politiques RLS ni les droits des tables. La nouvelle fonction est SECURITY INVOKER; un appel anonyme ne peut pas lire ou modifier les commandes.

Ne pas publier le code sans cette migration : les paiements de formation auraient un webhook en erreur. Aucun accès SQL de production n'a été établi lors de cette intervention. Les droits de publication Vercel n'ont pas été validés. Aucun coupon, produit ou paiement réel n'a été créé pendant les tests.

Le catalogue public vérifié le 21/10/2026 associe :

- `b82840cb-f98e-4533-b31e-1d60fad2c501` : PSA-2611, 28–29/11/2026.
- `751f6092-be2b-43c0-a141-ee0e2c1b7093` : PSA-2702, 20–21/02/2027.

## Parcours général

Checkout affiche le champ de code promotionnel pour les formations. Le produit principal a un identifiant stable `sar_formation_<formation_id>` : un coupon peut donc cibler une occurrence précise. Les options restent des lignes séparées. Les dons, cartes de membre et stages ne reçoivent pas de nouveaux rabais dans cette correction.

Le serveur reprend le prix de la base et ajoute les options. La commande confirmée conserve le total réellement réglé, le sous-total, le rabais et les taxes fournis par Stripe. Le code n'active ni taxation automatique ni nouveaux taux. La réservation de place, l'inscription et la mise à jour financière sont atomiques. Le webhook ignore les paiements non confirmés, accepte les paiements différés réussis et les commandes gratuites, et ne compte pas deux fois une même commande. Une formation devenue complète produit une inscription annulée à traiter manuellement, tout en conservant le paiement reçu.

Les courriels demeurent des envois au mieux après transaction, sans file de relance persistante. Un arrêt du serveur entre la validation en base et l'envoi peut nécessiter un renvoi manuel. La page de retour n'affirme plus à elle seule que le paiement est confirmé.

## Crédit nominatif de 96 CAD : préparation après confirmation seulement

Ne pas créer ni émettre le crédit de Julia avant sa confirmation. Le paiement historique et l'absence de remboursement restent à vérifier. Ne pas ajouter d'expiration par défaut.

Une fois le dossier validé :

1. Vérifier le Customer Stripe destinataire et l'occurrence de novembre. Choisir avec la personne les options de son inscription.
2. Préparer la commande et la session depuis un contexte administratif serveur autorisé avec `creerPaiementFormation`, en fournissant explicitement `clientStripeId`. La fonction vérifie la concordance du courriel du Customer et utilise `customer` au lieu de `customer_email`. Le formulaire public ne transmet jamais ce paramètre. Ce point d'entrée serveur est prêt, mais aucune interface administrative ni commande d'émission de crédit n'est ajoutée.
3. Le produit novembre est alors disponible sous `sar_formation_b82840cb-f98e-4533-b31e-1d60fad2c501`. Créer un coupon `amount_off: 9600`, `currency: cad`, `max_redemptions: 1`, `applies_to.products` limité à ce produit. Créer son code promotionnel avec ce même Customer et `max_redemptions: 1`. Ne pas utiliser une restriction « première commande » pour un crédit historique.
4. Fournir uniquement au destinataire la session dédiée et le code. Un code nominatif n'est pas promis utilisable sur le formulaire public générique, qui ne connaît pas l'identité Stripe du visiteur.
5. Vérifier le total affiché sans payer. Sans taxe ajoutée et sans option, 24999 - 9600 = 15399 cents. Si une taxation est introduite ou déjà configurée ailleurs, confirmer si l'engagement de crédit porte sur le sous-total ou le total final avant émission.

Les restrictions Stripe portent sur le Customer et le produit, pas sur les seuls champs metadata. Aucun coupon global de 96 CAD ne doit être créé pour ce cas.

## Validation locale

- `node --test scripts/test-rabais.cjs` : vraie fonction de création de session avec Stripe/base simulés, toutes les options, session nominative, destinataire différent refusé, identité publique non associée, produit stable et erreurs Stripe, montants, gratuité et webhook différé.
- `npm install --no-save --package-lock=false --ignore-scripts @electric-sql/pglite`, puis `node --test scripts/test-rabais-sql.cjs` : exécution PostgreSQL locale des migrations, idempotence, contraintes, dernière place, rollback et refus de mutation anonyme. La dépendance est temporaire, absente du manifeste/lock de production.
- `npm ci --ignore-scripts`, puis `npm run build` : compilation avec dépendances verrouillées. Le build nécessite les polices Google.

À effectuer avant publication : appliquer et vérifier la migration de production via un accès autorisé, puis déployer et vérifier un Checkout sans facturation. Aucun test réel Stripe de bout en bout n'a été effectué ici. Les tests ne prétendent pas démontrer la configuration des taxes ou des événements webhook du compte de production.
