-- Case à cocher « je veux aussi une carte physique par la poste » sur le
-- formulaire d'adhésion. Quand elle est cochée, l'adresse devient
-- obligatoire côté formulaire; cette colonne dit qui a vraiment demandé
-- l'envoi, pour la future file d'expédition du tableau de bord admin.
--
-- Les 231 membres importés de Shopify (voir 0010) sont rétroactivement
-- marqués vrai: leur commande Shopify prévoyait déjà l'envoi d'une carte
-- physique, il n'y avait pas de case à cocher à l'époque.
alter table public.membres add column if not exists carte_physique boolean not null default false;

update public.membres set carte_physique = true where source = 'shopify';
