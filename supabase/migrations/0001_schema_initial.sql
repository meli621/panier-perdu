-- Panier Perdu : schéma initial (déjà exécuté dans l'éditeur SQL de Supabase)
-- Conservé ici pour garder une trace de la structure de la base.

create table public.abonnements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  statut text not null default 'incomplete'
    check (statut in ('incomplete', 'active', 'past_due', 'canceled')),
  periode_fin timestamptz,
  cree_le timestamptz not null default now(),
  maj_le timestamptz not null default now()
);

create table public.boutiques (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plateforme text not null check (plateforme in ('shopify', 'woocommerce')),
  nom text not null,
  domaine text not null,
  jeton_acces text,
  delai_relance_1_heures integer not null default 4 check (delai_relance_1_heures between 1 and 72),
  delai_relance_2_heures integer not null default 24 check (delai_relance_2_heures between 2 and 168),
  code_promo text,
  code_promo_pourcentage integer check (code_promo_pourcentage between 1 and 90),
  actif boolean not null default true,
  cree_le timestamptz not null default now(),
  unique (user_id, domaine)
);

create table public.paniers_abandonnes (
  id uuid primary key default gen_random_uuid(),
  boutique_id uuid not null references public.boutiques (id) on delete cascade,
  id_externe text not null,
  email_client text not null,
  prenom_client text,
  produits jsonb not null default '[]'::jsonb,
  montant_centimes integer not null check (montant_centimes >= 0),
  devise text not null default 'EUR',
  lien_reprise text,
  abandonne_le timestamptz not null,
  statut text not null default 'abandonne'
    check (statut in ('abandonne', 'relance_1', 'relance_2', 'recupere', 'desinscrit')),
  recupere_le timestamptz,
  montant_recupere_centimes integer check (montant_recupere_centimes >= 0),
  unique (boutique_id, id_externe)
);

create index paniers_boutique_statut_idx
  on public.paniers_abandonnes (boutique_id, statut, abandonne_le);

create table public.relances (
  id uuid primary key default gen_random_uuid(),
  panier_id uuid not null references public.paniers_abandonnes (id) on delete cascade,
  numero smallint not null check (numero in (1, 2)),
  statut text not null default 'envoyee' check (statut in ('envoyee', 'echec')),
  id_message text,
  envoyee_le timestamptz not null default now(),
  unique (panier_id, numero)
);

create table public.desinscriptions (
  id uuid primary key default gen_random_uuid(),
  boutique_id uuid not null references public.boutiques (id) on delete cascade,
  email_client text not null,
  cree_le timestamptz not null default now(),
  unique (boutique_id, email_client)
);

alter table public.abonnements enable row level security;
alter table public.boutiques enable row level security;
alter table public.paniers_abandonnes enable row level security;
alter table public.relances enable row level security;
alter table public.desinscriptions enable row level security;

create policy "abonnements_lecture" on public.abonnements
  for select using (user_id = (select auth.uid()));

create policy "boutiques_acces" on public.boutiques
  for all using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "paniers_lecture" on public.paniers_abandonnes
  for select using (
    exists (select 1 from public.boutiques b
            where b.id = boutique_id and b.user_id = (select auth.uid()))
  );

create policy "relances_lecture" on public.relances
  for select using (
    exists (select 1 from public.paniers_abandonnes p
            join public.boutiques b on b.id = p.boutique_id
            where p.id = panier_id and b.user_id = (select auth.uid()))
  );

create policy "desinscriptions_lecture" on public.desinscriptions
  for select using (
    exists (select 1 from public.boutiques b
            where b.id = boutique_id and b.user_id = (select auth.uid()))
  );
