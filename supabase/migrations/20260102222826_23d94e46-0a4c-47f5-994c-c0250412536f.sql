-- Security Migration: Strengthen RLS policies

-- 1. Drop the weak "Block anonymous access to profiles" policy that only checks auth.uid() IS NOT NULL
DROP POLICY IF EXISTS "Block anonymous access to profiles" ON public.profiles;

-- 2. Add user_id column to order_fulfillments for proper ownership tracking
ALTER TABLE public.order_fulfillments 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Create index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_order_fulfillments_user_id ON public.order_fulfillments(user_id);

-- 4. Drop the weak email-based policy on order_fulfillments
DROP POLICY IF EXISTS "Users can view their own order fulfillments" ON public.order_fulfillments;

-- 5. Create strict user_id based policy for order_fulfillments
CREATE POLICY "Users can view their own orders by user_id"
ON public.order_fulfillments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 6. Create policy for admin to link orders to users
CREATE POLICY "Admins can update order user_id"
ON public.order_fulfillments
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 7. Ensure all anonymous access is blocked on profiles
CREATE POLICY "Block all anonymous access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 8. Ensure all anonymous access is blocked on order_fulfillments  
DROP POLICY IF EXISTS "Block anonymous access to order_fulfillments" ON public.order_fulfillments;
DROP POLICY IF EXISTS "Block anonymous insert on order_fulfillments" ON public.order_fulfillments;
DROP POLICY IF EXISTS "Block anonymous update on order_fulfillments" ON public.order_fulfillments;
DROP POLICY IF EXISTS "Block anonymous delete on order_fulfillments" ON public.order_fulfillments;

CREATE POLICY "Block all anonymous access to order_fulfillments"
ON public.order_fulfillments
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 9. Create audit log table for sensitive data access tracking
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  user_id UUID,
  action TEXT NOT NULL,
  record_id UUID,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. Enable RLS on audit log - only admins can view
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Block anonymous access to audit logs"
ON public.security_audit_log
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- 11. Create audit function for data modifications
CREATE OR REPLACE FUNCTION public.log_data_modification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.security_audit_log (table_name, user_id, action, record_id)
  VALUES (
    TG_TABLE_NAME,
    auth.uid(),
    TG_OP,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id
      ELSE NEW.id
    END
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- 12. Add audit trigger to profiles table for modifications
DROP TRIGGER IF EXISTS audit_profiles_modifications ON public.profiles;
CREATE TRIGGER audit_profiles_modifications
AFTER INSERT OR UPDATE OR DELETE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.log_data_modification();

-- 13. Add audit trigger to order_fulfillments table for modifications
DROP TRIGGER IF EXISTS audit_order_fulfillments_modifications ON public.order_fulfillments;
CREATE TRIGGER audit_order_fulfillments_modifications
AFTER INSERT OR UPDATE OR DELETE ON public.order_fulfillments
FOR EACH ROW
EXECUTE FUNCTION public.log_data_modification();