/*
# Lock admin helper functions

1. Security
- Prevents browser users from directly calling the admin-assignment trigger function.
- Allows only signed-in users to call the internal admin-check function.
- The database trigger can still run the assignment function automatically.
*/

REVOKE EXECUTE ON FUNCTION public.assign_attendx_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_site_admin() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_site_admin() TO authenticated;
