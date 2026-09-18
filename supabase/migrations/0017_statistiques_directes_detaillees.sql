-- La définition active doit inclure les déplacements et les espèces depuis
-- le 22 août 2026, en complément du rapport historique du site public.
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
    select m.fermee_at at time zone 'America/Toronto' as ferme_local
    from public.missions m
    where m.statut = 'fermee'
      and m.fermee_at is not null
      and m.code_fin = any (public.codes_deplacement())
      and (m.fermee_at at time zone 'America/Toronto')::date > date '2026-08-21'
  ),
  maintenant as (
    select now() at time zone 'America/Toronto' as local
  )
  select json_build_object(
    'jour', (select coalesce(sum(sauves), 0) from reussies, maintenant where ferme_local >= date_trunc('day', local)),
    'semaine', (select coalesce(sum(sauves), 0) from reussies, maintenant where ferme_local >= date_trunc('week', local)),
    'mois', (select coalesce(sum(sauves), 0) from reussies, maintenant where ferme_local >= date_trunc('month', local)),
    'annee', (select coalesce(sum(sauves), 0) from reussies, maintenant where ferme_local >= date_trunc('year', local)),
    'total', (select coalesce(sum(sauves), 0) from reussies),
    'missions_annee', (select count(*) from deplacements, maintenant where ferme_local >= date_trunc('year', local)),
    'deplacements', json_build_object(
      'jour', (select count(*) from deplacements, maintenant where ferme_local >= date_trunc('day', local)),
      'semaine', (select count(*) from deplacements, maintenant where ferme_local >= date_trunc('week', local)),
      'mois', (select count(*) from deplacements, maintenant where ferme_local >= date_trunc('month', local)),
      'annee', (select count(*) from deplacements, maintenant where ferme_local >= date_trunc('year', local)),
      'total', (select count(*) from deplacements)
    ),
    'especes', (
      select coalesce(json_agg(e order by e.sauves desc), '[]'::json)
      from (
        select espece_code as code, sum(sauves)::int as sauves
        from reussies
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
        from reussies, maintenant
        where ferme_local >= date_trunc('year', local)
        group by 1
        having sum(sauves) > 0
      ) f
    ),
    'mensuel', (
      select coalesce(json_agg(m order by m.mois), '[]'::json)
      from (
        select to_char(date_trunc('month', ferme_local), 'YYYY-MM') as mois, sum(sauves)::int as sauves
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
