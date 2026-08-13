/*
# AttendX landing site schema

## Purpose
Stores all editable content for the AttendX public landing/download website:
app metadata, hero copy, APK download info, YouTube tutorial link, features,
screenshots, installation steps, and FAQ entries. An authenticated admin
(managed via Supabase Auth) edits this content from the /admin dashboard;
the public site reads it with the anon key.

## Tables
1. `site_config` — single-row config table (id fixed = 1).
2. `features` — feature cards (title, description, icon name, sort_order).
3. `screenshots` — screenshot gallery (label, caption, image_url, sort_order).
4. `installation_steps` — ordered installation guide steps (step_number, text).
5. `faqs` — FAQ entries (question, answer, sort_order).

## Security
- RLS enabled on every table.
- Public read access (anon + authenticated) on all content tables.
- Write access restricted to authenticated admin only.
*/

CREATE TABLE IF NOT EXISTS site_config (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  app_name text NOT NULL DEFAULT 'AttendX',
  tagline text NOT NULL DEFAULT 'Smart Attendance, Built Around Your Timetable',
  version text NOT NULL DEFAULT '1.0.0',
  hero_headline text NOT NULL DEFAULT 'Smart Attendance, Built Around Your Timetable',
  hero_description text NOT NULL DEFAULT 'Track attendance, manage your timetable, and understand your attendance at a glance.',
  hero_image_url text DEFAULT '',
  apk_url text DEFAULT '',
  apk_version text NOT NULL DEFAULT '1.0.0',
  apk_release_date date DEFAULT NULL,
  apk_size text DEFAULT '',
  apk_release_notes text DEFAULT '',
  youtube_url text DEFAULT '',
  youtube_title text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_config" ON site_config;
CREATE POLICY "public_read_site_config"
  ON site_config FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_site_config" ON site_config;
CREATE POLICY "auth_update_site_config"
  ON site_config FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

INSERT INTO site_config (id) VALUES (1)
  ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'Check',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE features ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_features" ON features;
CREATE POLICY "public_read_features"
  ON features FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_features" ON features;
CREATE POLICY "auth_insert_features"
  ON features FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_features" ON features;
CREATE POLICY "auth_update_features"
  ON features FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_features" ON features;
CREATE POLICY "auth_delete_features"
  ON features FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  caption text DEFAULT '',
  image_url text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_screenshots" ON screenshots;
CREATE POLICY "public_read_screenshots"
  ON screenshots FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_screenshots" ON screenshots;
CREATE POLICY "auth_insert_screenshots"
  ON screenshots FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_screenshots" ON screenshots;
CREATE POLICY "auth_update_screenshots"
  ON screenshots FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_screenshots" ON screenshots;
CREATE POLICY "auth_delete_screenshots"
  ON screenshots FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS installation_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number integer NOT NULL DEFAULT 0,
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE installation_steps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_installation_steps" ON installation_steps;
CREATE POLICY "public_read_installation_steps"
  ON installation_steps FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_installation_steps" ON installation_steps;
CREATE POLICY "auth_insert_installation_steps"
  ON installation_steps FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_installation_steps" ON installation_steps;
CREATE POLICY "auth_update_installation_steps"
  ON installation_steps FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_installation_steps" ON installation_steps;
CREATE POLICY "auth_delete_installation_steps"
  ON installation_steps FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_faqs" ON faqs;
CREATE POLICY "public_read_faqs"
  ON faqs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_faqs" ON faqs;
CREATE POLICY "auth_insert_faqs"
  ON faqs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_faqs" ON faqs;
CREATE POLICY "auth_update_faqs"
  ON faqs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_faqs" ON faqs;
CREATE POLICY "auth_delete_faqs"
  ON faqs FOR DELETE
  TO authenticated USING (true);

INSERT INTO features (title, description, icon, sort_order) VALUES
  ('Timetable-based tracking', 'Mark attendance straight from your timetable — no manual setup each day.', 'CalendarCheck', 1),
  ('Attendance calendar', 'See every class and its attendance status on a clean monthly calendar.', 'CalendarDays', 2),
  ('Attendance statistics', 'Understand your attendance at a glance with per-subject stats and totals.', 'BarChart3', 3),
  ('Multiple timetables', 'Create separate timetables for different semesters, terms, or routines.', 'LayoutGrid', 4),
  ('Flexible subjects', 'Add, rename, and organize subjects to match exactly how you study.', 'BookOpen', 5),
  ('Custom attendance start dates', 'Set when attendance tracking begins for each timetable.', 'CalendarPlus', 6),
  ('Cloud synchronization', 'Sign in to keep your timetables and attendance synced across devices.', 'Cloud', 7),
  ('Community timetables', 'Share and reuse timetables created by other students.', 'Users', 8),
  ('Light, Dark & System themes', 'Choose a theme that fits your style — or let your system decide.', 'SunMoon', 9),
  ('Simple student-focused interface', 'A clean, distraction-free UI built for fast everyday use.', 'Sparkles', 10)
ON CONFLICT DO NOTHING;

INSERT INTO screenshots (label, caption, image_url, sort_order) VALUES
  ('Home', 'Your attendance overview at a glance', '', 1),
  ('Timetable', 'Your weekly timetable in one view', '', 2),
  ('Calendar', 'A monthly attendance calendar', '', 3),
  ('Statistics', 'Per-subject attendance statistics', '', 4),
  ('Profile', 'Manage your account and settings', '', 5)
ON CONFLICT DO NOTHING;

INSERT INTO installation_steps (step_number, text) VALUES
  (1, 'Tap "Download APK" on the AttendX website.'),
  (2, 'Open the downloaded APK file on your phone.'),
  (3, 'If Android asks for permission to install apps from your browser, allow it.'),
  (4, 'Install AttendX.'),
  (5, 'Open AttendX and sign in or create your account.')
ON CONFLICT DO NOTHING;

INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Is AttendX free?', 'Yes. AttendX is free to download and use for tracking your attendance.', 1),
  ('Is AttendX available on Android?', 'AttendX is currently distributed directly as an Android APK. It is not on Google Play yet.', 2),
  ('How do I install the APK?', 'Download the APK from the website, open it on your phone, allow installs from your browser if asked, and install. See the installation guide above.', 3),
  ('Does AttendX support multiple timetables?', 'Yes. You can create and switch between multiple timetables for different semesters or routines.', 4),
  ('Can I change my attendance tracking start date?', 'Yes. Each timetable has its own attendance tracking start date that you can set.', 5),
  ('Does AttendX sync my data?', 'Yes. Sign in to your account to sync timetables and attendance across your devices with cloud sync.', 6),
  ('Is an account required?', 'You can explore AttendX without an account, but signing in is needed for cloud sync and keeping your data safe.', 7)
ON CONFLICT DO NOTHING;
