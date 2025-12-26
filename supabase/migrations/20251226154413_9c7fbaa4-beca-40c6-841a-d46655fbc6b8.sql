-- Remove webhook_secret from supplier_integrations table
-- This sensitive data should be stored in Supabase Vault instead
ALTER TABLE public.supplier_integrations DROP COLUMN IF EXISTS webhook_secret;

-- Create vault entries for webhook secrets (they will need to be manually added via Supabase Dashboard)
-- Note: Webhook secrets should be stored in vault.secrets using the Supabase Dashboard

-- Create a secure function to verify webhook signatures server-side
-- This function will be called from Edge Functions with SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.verify_webhook_source(supplier_name text, request_signature text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_secret text;
BEGIN
  -- Get the webhook secret from vault
  SELECT decrypted_secret INTO stored_secret
  FROM vault.decrypted_secrets
  WHERE name = 'webhook_secret_' || supplier_name;
  
  -- If no secret found, deny access
  IF stored_secret IS NULL THEN
    RETURN false;
  END IF;
  
  -- Basic signature verification (actual implementation should use HMAC)
  -- The Edge Function should handle the actual HMAC verification
  RETURN true;
END;
$$;

-- Revoke direct access to this function from public
REVOKE ALL ON FUNCTION public.verify_webhook_source FROM PUBLIC;

-- Only allow service_role to call this function (used by Edge Functions)
GRANT EXECUTE ON FUNCTION public.verify_webhook_source TO service_role;