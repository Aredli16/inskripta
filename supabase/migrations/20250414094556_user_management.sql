create type user_role as enum ('super_admin');

create table user_roles
(
    id   uuid references auth.users (id) on delete cascade primary key,
    role user_role
);

create table organizations
(
    id   uuid primary key default gen_random_uuid(),
    name varchar(255) not null unique
);

create table organization_administration
(
    id              uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations (id) on delete cascade,
    user_id         uuid references auth.users (id) on delete cascade,
    constraint organization_administration_organization_id_user_id_unique unique (organization_id, user_id)
);

create function public.handle_new_user()
    returns trigger
    set search_path = ''
as
$$
begin
    insert into public.user_roles (id)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute procedure public.handle_new_user();