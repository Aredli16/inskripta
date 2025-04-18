create type user_role as enum ('super_admin');

create table super_admins
(
    id uuid references auth.users (id) on delete cascade primary key
);

alter table super_admins
    enable row level security;

create policy "All can see super_admins"
    on super_admins
    for select
    using (true);

create policy "Only super_admin can insert super_admins"
    on super_admins
    for insert
    with check (exists (select 1
                        from super_admins sa
                        where sa.id = auth.uid()));

create policy "Only super_admin can update super_admins"
    on super_admins
    for update
    using (exists (select 1
                   from super_admins sa
                   where sa.id = auth.uid()))
    with check (exists (select 1
                        from super_admins sa
                        where sa.id = auth.uid()));

create policy "Only super_admin can delete super_admins"
    on super_admins
    for delete
    using (exists (select 1
                   from super_admins sa
                   where sa.id = auth.uid()));

create table organizations
(
    id   uuid primary key default gen_random_uuid(),
    name varchar(255) not null unique
);

alter table organizations
    enable row level security;

create policy "All can see organizations"
    on organizations
    for select
    using (true);

create policy "Only super_admin can insert organizations"
    on organizations
    for insert
    with check (exists (select 1
                        from super_admins sa
                        where sa.id = auth.uid()));

create policy "Only super_admin can update organizations"
    on organizations
    for update
    using (exists (select 1
                   from super_admins sa
                   where sa.id = auth.uid()))
    with check (exists (select 1
                        from super_admins sa
                        where sa.id = auth.uid()));

create policy "Only super_admin can delete organizations"
    on organizations
    for delete
    using (exists (select 1
                   from super_admins sa
                   where sa.id = auth.uid()));

create table organization_administration
(
    organization_id uuid references organizations (id) on delete cascade,
    user_id         uuid references auth.users (id) on delete cascade,
    primary key (organization_id, user_id)
);

alter table organization_administration
    enable row level security;

create policy "All can see organization_administration"
    on organization_administration
    for select
    using (true);

create policy "Only superadmin/orga admin can insert orga admin"
    on organization_administration
    for insert
    with check (exists (select 1
                        from super_admins sa
                        where sa.id = auth.uid()) or exists (select 1
                                                             from organization_administration oa
                                                             where oa.user_id = auth.uid()
                                                               and oa.organization_id = organization_administration.organization_id));

create policy "Only superadmin/orga admin can update orga admin"
    on organization_administration
    for update
    using (exists (select 1
                   from super_admins sa
                   where sa.id = auth.uid()) or exists (select 1
                                                        from organization_administration oa
                                                        where oa.user_id = auth.uid()
                                                          and oa.organization_id = organization_administration.organization_id))
    with check (exists (select 1
                        from super_admins sa
                        where sa.id = auth.uid()) or exists (select 1
                                                             from organization_administration oa
                                                             where oa.user_id = auth.uid()
                                                               and oa.organization_id = organization_administration.organization_id));

create policy "Only superadmin/orga admin can delete orga admin"
    on organization_administration
    for delete
    using (exists (select 1
                   from super_admins sa
                   where sa.id = auth.uid()) or exists (select 1
                                                        from organization_administration oa
                                                        where oa.user_id = auth.uid()
                                                          and oa.organization_id = organization_administration.organization_id));

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

create table school_years
(
    id              uuid primary key default gen_random_uuid(),
    start_date      date                                                 not null,
    end_date        date                                                 not null,
    current         boolean          default false                       not null,
    organization_id uuid references organizations (id) on delete cascade not null,
    created_at      timestamp        default now(),
    updated_at      timestamp        default now()
);

alter table school_years
    enable row level security;

create policy "All can see current school_years and admin can see all"
    on school_years
    for select
    using (
    current = true
        or exists(select 1
                  from organization_administration
                  where organization_id = school_years.organization_id
                    and user_id = auth.uid())
    );

create policy "Only orga admins can insert school_years"
    on school_years
    for insert
    with check (exists(select 1
                       from organization_administration
                       where organization_id = school_years.organization_id
                         and user_id = auth.uid()));

create policy "Only orga admins can update school_years"
    on school_years
    for update
    using (exists(select 1
                  from organization_administration
                  where organization_id = school_years.organization_id
                    and user_id = auth.uid()))
    with check (exists(select 1
                       from organization_administration
                       where organization_id = school_years.organization_id
                         and user_id = auth.uid()));

create policy "Only orga admins can delete school_years"
    on school_years
    for delete
    using (exists(select 1
                  from organization_administration
                  where organization_id = school_years.organization_id
                    and user_id = auth.uid()));

create table registrations
(
    id             uuid primary key                                                                                  default gen_random_uuid(),
    last_name      varchar(255),
    first_name     varchar(255),
    user_id        uuid                                                references auth.users (id) on delete set null default auth.uid(),
    school_year_id uuid references school_years (id) on delete cascade not null,
    created_at     timestamp                                                                                         default now(),
    updated_at     timestamp                                                                                         default now()
);

alter table registrations
    enable row level security;

create policy "All can see owned registrations and orga admins can see all"
    on registrations
    for select
    using (
    user_id = auth.uid()
        or exists(select 1
                  from organization_administration
                  where organization_id = (select organization_id
                                           from school_years
                                           where id = registrations.school_year_id)
                    and user_id = auth.uid())
    );

create policy "All can insert self registrations and orga admins can insert"
    on registrations
    for insert
    with check (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from school_years
                                       where id = registrations.school_year_id)
                and user_id = auth.uid()));


create policy "All can update self registrations and orga admins can update"
    on registrations
    for update
    using (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from school_years
                                       where id = registrations.school_year_id)
                and user_id = auth.uid()))
    with check (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from school_years
                                       where id = registrations.school_year_id)
                and user_id = auth.uid()));

create policy "All can delete self registrations and orga admins can delete"
    on registrations
    for delete
    using (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from school_years
                                       where id = registrations.school_year_id)
                and user_id = auth.uid()));