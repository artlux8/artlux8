-- Fix profiles table: Add policy to block anonymous/public access
CREATE POLICY "Block anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Fix newsletter_subscribers: Drop any existing public SELECT policies and restrict to admin only
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Only admins can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Block anonymous access to newsletter_subscribers SELECT
CREATE POLICY "Block anonymous read access to subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO anon
USING (false);

-- Fix challenge_enrollments: Block anonymous access
CREATE POLICY "Block anonymous access to enrollments"
ON public.challenge_enrollments
FOR SELECT
TO anon
USING (false);