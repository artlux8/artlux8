-- Remove the insecure public INSERT policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Create a new policy that only allows service role to insert (via edge function)
-- Regular users cannot insert directly into this table anymore
CREATE POLICY "Only service role can insert subscribers"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (false);

-- Note: The edge function uses service role key which bypasses RLS,
-- so legitimate subscriptions will still work through the protected endpoint