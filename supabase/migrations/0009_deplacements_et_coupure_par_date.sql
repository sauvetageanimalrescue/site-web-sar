-- Deux changements demandés par Eric le 24 août 2026.
--
-- 1. Un compteur de déplacements, à côté de celui des animaux secourus.
-- Le CRAP 2027 définit le déplacement comme toute mission fermée où une
-- équipe s'est réellement rendue sur les lieux, prise en charge ou non :
-- la série 70 (issue après prise en charge) et la série 80 (SAR ne prend
-- pas l'animal en charge), à l'exception de 10-03 (mission annulée, aucun
-- départ) et 10-29 (animal non localisé, aucune intervention réelle), qui
-- ne font partie ni de l'une ni de l'autre série.
--
-- 2. La coupure entre le report et le registre se fait maintenant par
-- date, jamais en soustrayant des missions précises. L'ancienne méthode
-- suppose que certaines missions de test restent en permanence à la fois
-- dans le report figé et dans le registre en direct ; si ces missions sont
-- supprimées (fin d'un test, remise à zéro), le compteur public reste
-- sous-compté sans que rien ne le signale. Cette date doit rester
-- synchronisée avec REPORT_ARRETE_LE dans src/contenu/compteur.ts : le
-- report couvre tout ce qui est fermé jusqu'au 21 août 2026 inclus, le
-- registre reprend le relais le 22.
create or replace function public.codes_deplacement()
returns text[]
language sql
immutable
as $$
  select array[
    '10-70', '10-71', '10-72', '10-73', '10-74',
    '10-75', '10-76', '10-77', '10-78', '10-79',
    '10-80', '10-81', '10-82', '10-83', '10-84',
    '10-85', '10-86', '10-87', '10-88', '10-89'
  ]::text[];
$$;

create or replace function public.statistiques_publiques()
returns json
language sql
security definer
set search_path = public
as $$
  with reussies as (
    select
      m.fermee_at at time zone 'America/Toronto' as ferme_local,
      m.espece_code,
      public.animaux_sauves(m.nb_adultes, m.nb_juveniles, m.nb_deces) as sauves
    from public.missions m
    where m.statut = 'fermee'
      and m.fermee_at is not null
      and m.code_fin = any (public.codes_fin_succes())
      and (m.fermee_at at time zone 'America/Toronto')::date > date '2026-08-21'
  ),
  deplacements as (
    select
      m.fermee_at at time zone 'America/Toronto' as ferme_local
    from public.missions m
    where m.statut = 'fermee'
      and m.fermee_at is not null
      and m.code_fin = any (public.codes_deplacement())
      and (m.fermee_at at time zone 'America/Toronto')::date > date '2026-08-21'
  ),
  maintenant as (
    select (now() at time zone 'America/Toronto') as local
  )
  select json_build_object(
    'jour', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('day', local)
    ),
    'semaine', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('week', local)
    ),
    'mois', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('month', local)
    ),
    'annee', (
      select coalesce(sum(sauves), 0) from reussies, maintenant
      where ferme_local >= date_trunc('year', local)
    ),
    'total', (select coalesce(sum(sauves), 0) from reussies),
    'missions_annee', (
      select count(*) from reussies, maintenant
      where ferme_local >= date_trunc('year', local)
    ),
    -- Même structure que les champs ci-dessus, mais en comptant des
    -- déplacements plutôt que des animaux : chaque ligne vaut 1, prise en
    -- charge ou non.
    'deplacements', json_build_object(
      'jour', (
        select count(*) from deplacements, maintenant
        where ferme_local >= date_trunc('day', local)
      ),
      'semaine', (
        select count(*) from deplacements, maintenant
        where ferme_local >= date_trunc('week', local)
      ),
      'mois', (
        select count(*) from deplacements, maintenant
        where ferme_local >= date_trunc('month', local)
      ),
      'annee', (
        select count(*) from deplacements, maintenant
        where ferme_local >= date_trunc('year', local)
      ),
      'total', (select count(*) from deplacements)
    ),
    'familles', (
      select coalesce(json_agg(f order by f.sauves desc), '[]'::json)
      from (
        select
          case
            when espece_code is null or espece_code !~ '^\d{3}$' then '000'
            else left(espece_code, 1) || '00'
          end as famille,
          sum(sauves)::int as sauves
        from reussies, maintenant
        where ferme_local >= date_trunc('year', local)
        group by 1
        having sum(sauves) > 0
      ) f
    ),
    'mensuel', (
      select coalesce(json_agg(m order by m.mois), '[]'::json)
      from (
        select
          to_char(date_trunc('month', ferme_local), 'YYYY-MM') as mois,
          sum(sauves)::int as sauves
        from reussies, maintenant
        where ferme_local >= date_trunc('month', local) - interval '11 months'
        group by 1
      ) m
    ),
    'genere_a', now()
  );
$$;

grant execute on function public.codes_deplacement() to anon, authenticated;
grant execute on function public.statistiques_publiques() to anon, authenticated;
