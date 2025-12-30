-- Update verify_webhook_source to properly deny access
-- All verification should now happen in the webhook-receiver Edge Function
-- This function now serves as a fallback that denies access if called directly
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
  
  -- IMPORTANT: HMAC verification must happen in the Edge Function
  -- This database function cannot perform proper HMAC verification
  -- Always return false to force use of the webhook-receiver Edge Function
  -- which has access to the raw request body for proper signature verification
  RETURN false;
END;
$$;