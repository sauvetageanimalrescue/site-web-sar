-- Le CRAP 2027 (référence opérationnelle de l'organisation) tranche la
-- question posée par Eric le 24 août 2026 : « les codes 70 décrivent
-- l'issue après prise en charge; les codes 80 couvrent les situations où
-- SAR ne prend pas réellement l'animal en charge. » Un animal compte donc
-- comme secouru dès qu'il a été pris en charge, quelle que soit l'issue,
-- y compris 10-76 à 10-79 (remis aux autorités, échappé pendant la
-- manipulation, récupéré décédé, décédé lors de la mission). La série 80
-- (10-80 à 10-89), où SAR ne prend jamais l'animal en charge, reste hors
-- du compteur : ces missions relèvent d'un compteur de déplacements
-- distinct, pas encore construit.
create or replace function public.codes_fin_succes()
returns text[]
language sql
immutable
as $$
  select array[
    '10-70', '10-71', '10-72', '10-73', '10-74',
    '10-75', '10-76', '10-77', '10-78', '10-79'
  ]::text[];
$$;
