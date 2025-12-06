-- Drop existing SELECT policy and recreate as permissive (admin-only)
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;

-- Create proper permissive SELECT policy for admins only
CREATE POLICY "Admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));