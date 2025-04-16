create type user_role as enum ('super_admin');

create table super_admins
(
    id uuid references auth.users (id) on delete cascade primary key
);

create table organizations
(
    id   uuid primary key default gen_random_uuid(),
    name varchar(255) not null unique
);

create table organization_administration
(
    organization_id uuid references organizations (id) on delete cascade,
    user_id         uuid references auth.users (id) on delete cascade,
    primary key (organization_id, user_id)
);

create or replace function get_user_by_email(search_email text)
    returns table
            (
                id    uuid,
                email text
            )
    security definer
    language plpgsql
as
$$
begin
    return query
        select u.id, u.email::text
        from auth.users u
        where u.email ilike '%' || search_email || '%';
end;
$$;
