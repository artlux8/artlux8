-- Add policy allowing users to view their own order fulfillments based on email
CREATE POLICY "Users can view their own order fulfillments" 
ON public.order_fulfillments 
FOR SELECT 
USING (
  auth.jwt() ->> 'email' = customer_email
);