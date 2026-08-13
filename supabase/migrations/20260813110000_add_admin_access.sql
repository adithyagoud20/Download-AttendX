/*
  AttendX admin access

  This migration keeps administrator identities separate from public site
  content. Passwords remain in Supabase Auth and are never stored in a table
  or exposed to the frontend.

  Creating getattendx@gmail.com in Supabase Auth automatically makes that
  account a site administrator.
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_can_view_their_own_record" ON public.admin_users;
CREATE POLICY "admins_can_view_their_own_record"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

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
  IF lower(NEW.email) = 'getattendx@gmail.com' THEN
    INSERT INTO public.admin_users (user_id, email)
    VALUES (NEW.id, lower(NEW.email))
    ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS assign_attendx_admin_on_signup ON auth.users;
CREATE TRIGGER assign_attendx_admin_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_attendx_admin();

-- Also grant access if the Auth account was created before this migration.
INSERT INTO public.admin_users (user_id, email)
SELECT id, lower(email)
FROM auth.users
WHERE lower(email) = 'getattendx@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;

-- Apply the same administrator-only write protection to every content table.
DROP POLICY IF EXISTS "auth_update_site_config" ON public.site_config;
CREATE POLICY "admin_update_site_config"
  ON public.site_config FOR UPDATE
  TO authenticated
  USING (public.is_site_admin())
  WITH CHECK (public.is_site_admin());

DROP POLICY IF EXISTS "auth_insert_features" ON public.features;
DROP POLICY IF EXISTS "auth_update_features" ON public.features;
DROP POLICY IF EXISTS "auth_delete_features" ON public.features;
CREATE POLICY "admin_insert_features" ON public.features FOR INSERT TO authenticated WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_update_features" ON public.features FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_features" ON public.features FOR DELETE TO authenticated USING (public.is_site_admin());

DROP POLICY IF EXISTS "auth_insert_screenshots" ON public.screenshots;
DROP POLICY IF EXISTS "auth_update_screenshots" ON public.screenshots;
DROP POLICY IF EXISTS "auth_delete_screenshots" ON public.screenshots;
CREATE POLICY "admin_insert_screenshots" ON public.screenshots FOR INSERT TO authenticated WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_update_screenshots" ON public.screenshots FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_screenshots" ON public.screenshots FOR DELETE TO authenticated USING (public.is_site_admin());

DROP POLICY IF EXISTS "auth_insert_installation_steps" ON public.installation_steps;
DROP POLICY IF EXISTS "auth_update_installation_steps" ON public.installation_steps;
DROP POLICY IF EXISTS "auth_delete_installation_steps" ON public.installation_steps;
CREATE POLICY "admin_insert_installation_steps" ON public.installation_steps FOR INSERT TO authenticated WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_update_installation_steps" ON public.installation_steps FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_installation_steps" ON public.installation_steps FOR DELETE TO authenticated USING (public.is_site_admin());

DROP POLICY IF EXISTS "auth_insert_faqs" ON public.faqs;
DROP POLICY IF EXISTS "auth_update_faqs" ON public.faqs;
DROP POLICY IF EXISTS "auth_delete_faqs" ON public.faqs;
CREATE POLICY "admin_insert_faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_update_faqs" ON public.faqs FOR UPDATE TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE POLICY "admin_delete_faqs" ON public.faqs FOR DELETE TO authenticated USING (public.is_site_admin());
