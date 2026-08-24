-- Le registre des missions passe des codes d'espèce à 2 chiffres aux codes
-- 2027 à 3 chiffres (000-999, famille = centaine). Ancien code : famille
-- déduite de la dizaine, avec un cas spécial pour "Déclaration obligatoire"
-- (80-99). Nouveau code : famille = centaine, plus de cas spécial (les
-- "Oiseaux de proie" 800-899 restent une famille à part de "Animaux à
-- déclaration obligatoire" 900-999, exactement comme dans la nomenclature).
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
    -- Répartition par grande famille d'espèces. Le code espèce 2027 est à
    -- trois chiffres et la centaine donne la famille (000 inconnu, 100
    -- domestiques, 200 mammifères sauvages, 300 oiseaux sauvages, 400
    -- ferme, 500 reptiles/amphibiens, 600 aquatique/marine, 700 exotiques,
    -- 800 oiseaux de proie, 900 déclaration obligatoire).
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
    -- Douze derniers mois glissants, pour le graphique de la page statistiques.
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

grant execute on function public.statistiques_publiques() to anon, authenticated;
