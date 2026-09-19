-- Chaque carte d'appel vaut un déplacement. Les animaux sont uniquement la
-- somme du dénombrement adultes + juvéniles, sans dépendre du code de fin.
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
  with cartes as (
    select
      m.created_at at time zone 'America/Toronto' as cree_local,
      m.espece_code,
      greatest(coalesce(m.nb_adultes, 0), 0) + greatest(coalesce(m.nb_juveniles, 0), 0) as sauves
    from public.missions m
    where (m.created_at at time zone 'America/Toronto')::date > date '2026-08-21'
  ),
  maintenant as (
    select now() at time zone 'America/Toronto' as local
  )
  select json_build_object(
    'jour', (select coalesce(sum(sauves), 0) from cartes, maintenant where cree_local::date = local::date),
    'semaine', (select coalesce(sum(sauves), 0) from cartes, maintenant where cree_local::date >= date_trunc('week', local)::date),
    'mois', (select coalesce(sum(sauves), 0) from cartes, maintenant where cree_local::date >= date_trunc('month', local)::date),
    'annee', (select coalesce(sum(sauves), 0) from cartes, maintenant where cree_local::date >= date_trunc('year', local)::date),
    'total', (select coalesce(sum(sauves), 0) from cartes),
    'missions_annee', (select count(*) from cartes, maintenant where cree_local::date >= date_trunc('year', local)::date),
    'deplacements', json_build_object(
      'jour', (select count(*) from cartes, maintenant where cree_local::date = local::date),
      'semaine', (select count(*) from cartes, maintenant where cree_local::date >= date_trunc('week', local)::date),
      'mois', (select count(*) from cartes, maintenant where cree_local::date >= date_trunc('month', local)::date),
      'annee', (select count(*) from cartes, maintenant where cree_local::date >= date_trunc('year', local)::date),
      'total', (select count(*) from cartes)
    ),
    'especes', (
      select coalesce(json_agg(e order by e.sauves desc), '[]'::json)
      from (
        select espece_code as code, sum(sauves)::int as sauves
        from cartes
        where espece_code is not null
        group by espece_code
        having sum(sauves) > 0
      ) e
    ),
    'familles', (
      select coalesce(json_agg(f order by f.sauves desc), '[]'::json)
      from (
        select
          case when espece_code is null or espece_code !~ '^\\d{3}$' then '000' else left(espece_code, 1) || '00' end as famille,
          sum(sauves)::int as sauves
        from cartes, maintenant
        where cree_local::date >= date_trunc('year', local)::date
        group by 1
        having sum(sauves) > 0
      ) f
    ),
    'mensuel', (
      select coalesce(json_agg(m order by m.mois), '[]'::json)
      from (
        select to_char(date_trunc('month', cree_local), 'YYYY-MM') as mois, sum(sauves)::int as sauves
        from cartes, maintenant
        where cree_local::date >= (date_trunc('month', local) - interval '11 months')::date
        group by 1
      ) m
    ),
    'genere_a', now()
  );
$$;

grant execute on function public.codes_deplacement() to anon, authenticated;
grant execute on function public.statistiques_publiques() to anon, authenticated;
