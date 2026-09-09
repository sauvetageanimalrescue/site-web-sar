-- Les photos de candidature restent privées: elles sont accessibles seulement
-- par le serveur du site avec la clé service_role, jamais par un lien public.
insert into storage.buckets (id, name, public, file_size_limit)
values (
  'candidatures',
  'candidatures',
  false,
  4000000
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = null;
