insert into auth.users ("instance_id",
                        "id",
                        "aud",
                        "role",
                        "email",
                        "encrypted_password",
                        "email_confirmed_at",
                        "raw_app_meta_data",
                        "raw_user_meta_data",
                        "created_at",
                        "updated_at",
                        "confirmation_token",
                        "recovery_token",
                        "email_change_token_new",
                        "email_change")
values ('00000000-0000-0000-0000-000000000000',
        '2d6ccd6e-3f0c-49f5-a999-6b657232376a',
        'authenticated',
        'authenticated',
        'user@inskripta.com',
        '$2a$10$pQIHRUzgnZh2/nvwFmxqyeZqzHzBZxDyCh3vHnybL9rN9AVRl.kXm',
        timezone('utc'::text, now()),
        '{
          "provider": "email",
          "providers": [
            "email"
          ]
        }',
        '{
          "sub": "2d6ccd6e-3f0c-49f5-a999-6b657232376a",
          "email": "user@inskripta.com",
          "email_verified": true,
          "phone_verified": false
        }',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        '',
        '',
        '',
        ''),
       ('00000000-0000-0000-0000-000000000000',
        'ef782a44-80cf-4798-aba0-6d8482a7e1e8',
        'authenticated',
        'authenticated',
        'superadmin@inskripta.com',
        '$2a$10$pQIHRUzgnZh2/nvwFmxqyeZqzHzBZxDyCh3vHnybL9rN9AVRl.kXm',
        timezone('utc'::text, now()),
        '{
          "provider": "email",
          "providers": [
            "email"
          ]
        }',
        '{
          "sub": "ef782a44-80cf-4798-aba0-6d8482a7e1e8",
          "email": "superadmin@inskripta.com",
          "email_verified": true,
          "phone_verified": false
        }',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        '',
        '',
        '',
        ''),
       ('00000000-0000-0000-0000-000000000000',
        'a223ee75-cc41-4d52-9557-ffa239c8dba3',
        'authenticated',
        'authenticated',
        'test.admin@inskripta.com',
        '$2a$10$pQIHRUzgnZh2/nvwFmxqyeZqzHzBZxDyCh3vHnybL9rN9AVRl.kXm',
        timezone('utc'::text, now()),
        '{
          "provider": "email",
          "providers": [
            "email"
          ]
        }',
        '{
          "sub": "a223ee75-cc41-4d52-9557-ffa239c8dba3",
          "email": "test.admin@inskripta.com",
          "email_verified": true,
          "phone_verified": false
        }',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        '',
        '',
        '',
        ''),
       ('00000000-0000-0000-0000-000000000000',
        '4d62fe5c-0900-43b9-98ce-7e012bd3fc1a',
        'authenticated',
        'authenticated',
        'test2.admin@inskripta.com',
        '$2a$10$pQIHRUzgnZh2/nvwFmxqyeZqzHzBZxDyCh3vHnybL9rN9AVRl.kXm',
        timezone('utc'::text, now()),
        '{
          "provider": "email",
          "providers": [
            "email"
          ]
        }',
        '{
          "sub": "4d62fe5c-0900-43b9-98ce-7e012bd3fc1a",
          "email": "test2.admin@inskripta.com",
          "email_verified": true,
          "phone_verified": false
        }',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        '',
        '',
        '',
        '');

insert into auth.identities ("provider_id",
                             "user_id",
                             "identity_data",
                             "provider",
                             "created_at",
                             "updated_at",
                             "id")
values ('2d6ccd6e-3f0c-49f5-a999-6b657232376a',
        '2d6ccd6e-3f0c-49f5-a999-6b657232376a',
        '{
          "sub": "2d6ccd6e-3f0c-49f5-a999-6b657232376a",
          "email": "user@inskripta.com",
          "email_verified": false,
          "phone_verified": false
        }',
        'email',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        gen_random_uuid()),
       ('ef782a44-80cf-4798-aba0-6d8482a7e1e8',
        'ef782a44-80cf-4798-aba0-6d8482a7e1e8',
        '{
          "sub": "ef782a44-80cf-4798-aba0-6d8482a7e1e8",
          "email": "superadmin@inskripta.com",
          "email_verified": false,
          "phone_verified": false
        }',
        'email',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        gen_random_uuid()),
       ('a223ee75-cc41-4d52-9557-ffa239c8dba3',
        'a223ee75-cc41-4d52-9557-ffa239c8dba3',
        '{
          "sub": "a223ee75-cc41-4d52-9557-ffa239c8dba3",
          "email": "test.admin@inskripta.com",
          "email_verified": false,
          "phone_verified": false
        }',
        'email',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        gen_random_uuid()),
       ('4d62fe5c-0900-43b9-98ce-7e012bd3fc1a',
        '4d62fe5c-0900-43b9-98ce-7e012bd3fc1a',
        '{
          "sub": "4d62fe5c-0900-43b9-98ce-7e012bd3fc1a",
          "email": "test2.admin@inskripta.com",
          "email_verified": false,
          "phone_verified": false
        }',
        'email',
        timezone('utc'::text, now()),
        timezone('utc'::text, now()),
        gen_random_uuid());


insert into public.super_admins (id)
values ('ef782a44-80cf-4798-aba0-6d8482a7e1e8');

insert into public.organizations (id, name)
values ('05f24f29-5263-47b7-bf88-36e9423c2a32',
        'test'),
       ('15c1a76e-2df3-4860-b8ec-400095d82f36',
        'test2');

insert into organization_administration (organization_id, user_id)
values ('05f24f29-5263-47b7-bf88-36e9423c2a32',
        'a223ee75-cc41-4d52-9557-ffa239c8dba3'),
       ('15c1a76e-2df3-4860-b8ec-400095d82f36',
        '4d62fe5c-0900-43b9-98ce-7e012bd3fc1a');;

insert into school_years (start_date, end_date, organization_id, current)
values ('2023-09-01',
        '2024-06-30',
        '05f24f29-5263-47b7-bf88-36e9423c2a32',
        true),
       ('2023-09-01',
        '2024-06-30',
        '15c1a76e-2df3-4860-b8ec-400095d82f36',
        true);
