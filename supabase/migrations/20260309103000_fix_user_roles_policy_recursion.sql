-- Fix admin refresh stack errors caused by recursive role policy evaluation.
-- The previous policy referenced has_role() against the same table, which can recurse
-- in environments where SECURITY DEFINER ownership is not preserved.
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
