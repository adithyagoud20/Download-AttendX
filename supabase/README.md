# Supabase setup

1. Create a Supabase project and run both SQL migrations in this folder, in filename order, using the SQL Editor or the Supabase CLI.
2. In **Authentication → Users**, add `getattendx@gmail.com` with the password supplied for this project. Mark the email as confirmed if confirmation is enabled.
3. In the deployment environment, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the project's API settings.

The second migration automatically adds the specified Auth account to `public.admin_users`. Only entries in that table can edit site content through the admin portal.
