-- Import des 231 membres 2026 vendus sur l'ancien Shopify, avant le passage
-- à Stripe. Deux changements préparent le terrain.
--
-- 1. Le format des numéros de membre passe de AAAA-NNNNN (ex. 2026-00001) à
-- M-AAAA-NNNN (ex. M-2026-0001), pour matcher exactement la numérotation
-- déjà utilisée dans le fichier d'export Shopify. Personne n'a encore reçu
-- de numéro avec l'ancien format (aucun membre créé avant cette migration),
-- donc rien à migrer côté données existantes.
create or replace function public.generer_numero_membre(p_annee smallint)
returns text
language plpgsql
as $$
declare
  prochain_sequentiel int;
begin
  insert into public.membre_compteurs (annee, dernier_sequentiel)
  values (p_annee, 1)
  on conflict (annee) do update
    set dernier_sequentiel = public.membre_compteurs.dernier_sequentiel + 1
  returning dernier_sequentiel into prochain_sequentiel;

  return 'M-' || p_annee::text || '-' || lpad(prochain_sequentiel::text, 4, '0');
end;
$$;

-- 2. Colonnes propres à l'historique Shopify : adresse complète (le
-- formulaire Stripe ne demande que ville et code postal, les nouveaux
-- membres n'auront jamais ces champs), ventilation financière de la
-- commande, et traçabilité de la source. nom_complet accueille les 231
-- noms importés tels quels: le fichier ne sépare pas prénom et nom, et une
-- séparation automatique se trompe sur les noms composés et les particules
-- (« Karine de pessemier », « Denis T Morin »). prenom/nom perdent donc leur
-- contrainte not null, pour les seules fiches où seul nom_complet est
-- rempli.
alter table public.membres alter column prenom drop not null;
alter table public.membres alter column nom drop not null;

alter table public.membres add column if not exists nom_complet text;
alter table public.membres add column if not exists adresse text;
alter table public.membres add column if not exists appartement text;
alter table public.membres add column if not exists province text;
alter table public.membres add column if not exists pays text;
alter table public.membres add column if not exists don_certificat numeric(10, 2);
alter table public.membres add column if not exists pourboire numeric(10, 2);
alter table public.membres add column if not exists total_paye numeric(10, 2);
alter table public.membres add column if not exists source text not null default 'stripe';
alter table public.membres add column if not exists commande_shopify int;
alter table public.membres add column if not exists note text;
