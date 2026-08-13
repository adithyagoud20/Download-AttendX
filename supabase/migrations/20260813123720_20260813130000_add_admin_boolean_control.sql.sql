/*
# Add simple boolean admin control

1. Changes
- Adds `is_admin` to `public.admin_users`.
- Existing administrator records stay enabled.
- New Auth users receive an admin_users row with `is_admin = false`.

2. Authorization
- The server-side admin check now requires `is_admin = true`.
- The dashboard remains protected by Supabase Auth and this database check.

3. How to use
- Create a user in Supabase Authentication.
- Open `public.admin_users` in Table Editor.
- Set that user's `is_admin` value to true.
*/

ALTER TABLE public.admin_users
ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

UPDATE public.admin_users
SET is_admin = true
WHERE lower(email) = 'getattendx@gmail.com';

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
      AND is_admin = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_site_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_site_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.assign_attendx_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_users (user_id, email, is_admin)
  VALUES (NEW.id, lower(NEW.email), false)
  ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$;
