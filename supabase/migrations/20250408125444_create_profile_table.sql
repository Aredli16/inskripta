-- ROLE ENUM
create type role_enum as enum (
  'admin',
  'user'
);

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role role_enum not null default 'user'
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
    enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
    returns trigger
    set search_path = ''
as $$
begin
insert into public.profiles (id, role)
values (new.id, default);
return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
