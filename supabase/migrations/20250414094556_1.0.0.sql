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
    set search_path = ''
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

create or replace function handle_unique_current_school_year()
    returns trigger as
$$
begin
    if NEW.current = true then
        update school_years
        set current = false
        where organization_id = NEW.organization_id
          and id != NEW.id;
    end if;

    NEW.updated_at = now();

    return NEW;
end;
$$ language plpgsql;

create trigger trg_set_unique_current_school_year
    before insert or update
    on school_years
    for each row
execute function handle_unique_current_school_year();

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

create table students
(
    id              uuid primary key                                  default gen_random_uuid(),
    last_name       varchar(255),
    first_name      varchar(255),
    user_id         uuid references auth.users (id) on delete cascade default auth.uid(),
    organization_id uuid not null references organizations (id) on delete cascade,
    created_at      timestamp                                         default now(),
    updated_at      timestamp                                         default now()
);

alter table students
    enable row level security;

create policy "All can see owned student and orga admins can see all"
    on students
    for select
    using (
    user_id = auth.uid()
        or exists (select 1
                   from organization_administration
                   where organization_id = students.organization_id
                     and user_id = auth.uid())
    );

create policy "All can insert self students and orga admins can insert"
    on students
    for insert
    with check (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = students.organization_id
                and user_id = auth.uid()));

create policy "All can update self students and orga admins can update"
    on students
    for update
    using (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = students.organization_id
                and user_id = auth.uid()))
    with check (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = students.organization_id
                and user_id = auth.uid()));

create policy "All can delete self students and orga admins can delete"
    on students
    for delete
    using (user_id = auth.uid()
    or exists(select 1
              from organization_administration
              where organization_id = students.organization_id
                and user_id = auth.uid()));


create type day_of_week as enum (
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
    );

create table lessons
(
    id              uuid primary key default gen_random_uuid(),
    name            varchar(255)                                         not null,
    level           varchar(255)                                         not null,
    day_of_week     day_of_week,
    start_time      time,
    end_time        time,
    organization_id uuid references organizations (id) on delete cascade not null,
    created_at      timestamp        default now(),
    updated_at      timestamp        default now()
);

create table registrations
(
    id             uuid primary key default gen_random_uuid(),
    student_id     uuid references students (id) on delete cascade     not null,
    school_year_id uuid references school_years (id) on delete cascade not null,
    created_at     timestamp        default now(),
    updated_at     timestamp        default now()
);

alter table registrations
    enable row level security;

create policy "All can see owned registrations and orga admins can see all"
    on registrations
    for select
    using (
    student_id in (select id
                   from students
                   where user_id = auth.uid())
        or exists (select 1
                   from organization_administration
                   where organization_id = (select organization_id
                                            from students
                                            where id = registrations.student_id)
                     and user_id = auth.uid())
    );

create policy "All can insert self registrations and orga admins can insert"
    on registrations
    for insert
    with check (student_id in (select id
                               from students
                               where user_id = auth.uid())
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from students
                                       where id = registrations.student_id)
                and user_id = auth.uid()));

create policy "All can update self registrations and orga admins can update"
    on registrations
    for update
    using (student_id in (select id
                          from students
                          where user_id = auth.uid())
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from students
                                       where id = registrations.student_id)
                and user_id = auth.uid()))
    with check (student_id in (select id
                               from students
                               where user_id = auth.uid())
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from students
                                       where id = registrations.student_id)
                and user_id = auth.uid()));

create policy "All can delete self registrations and orga admins can delete"
    on registrations
    for delete
    using (student_id in (select id
                          from students
                          where user_id = auth.uid())
    or exists(select 1
              from organization_administration
              where organization_id = (select organization_id
                                       from students
                                       where id = registrations.student_id)
                and user_id = auth.uid()));

create table registrations_lessons
(
    registration_id uuid references registrations (id) on delete cascade not null,
    lesson_id       uuid references lessons (id) on delete cascade       not null,
    primary key (registration_id, lesson_id)
);