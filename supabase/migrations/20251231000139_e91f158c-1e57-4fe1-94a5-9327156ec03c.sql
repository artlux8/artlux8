-- Fix the profiles table RLS policy conflict
-- The current "Block anonymous access to profiles" policy uses USING (false) 
-- which blocks ALL access including legitimate authenticated users.
-- We need to change it to only block when there's no authenticated user.

-- Drop the problematic policy
DROP POLICY IF EXISTS "Block anonymous access to profiles" ON public.profiles;

-- Create a corrected policy that blocks only anonymous (unauthenticated) users
-- This uses auth.uid() IS NOT NULL which returns true for authenticated users
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
AS RESTRICTIVE
FOR SELECT 
USING (auth.uid() IS NOT NULL);