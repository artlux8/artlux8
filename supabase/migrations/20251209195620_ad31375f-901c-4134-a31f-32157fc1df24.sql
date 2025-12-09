-- Block anonymous access to order_fulfillments
CREATE POLICY "Block anonymous access to order_fulfillments"
ON public.order_fulfillments
FOR SELECT
TO anon
USING (false);

-- Block anonymous access to supplier_integrations
CREATE POLICY "Block anonymous access to supplier_integrations"
ON public.supplier_integrations
FOR SELECT
TO anon
USING (false);

-- Block anonymous INSERT/UPDATE/DELETE on order_fulfillments
CREATE POLICY "Block anonymous insert on order_fulfillments"
ON public.order_fulfillments
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Block anonymous update on order_fulfillments"
ON public.order_fulfillments
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Block anonymous delete on order_fulfillments"
ON public.order_fulfillments
FOR DELETE
TO anon
USING (false);

-- Block anonymous INSERT/UPDATE/DELETE on supplier_integrations
CREATE POLICY "Block anonymous insert on supplier_integrations"
ON public.supplier_integrations
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Block anonymous update on supplier_integrations"
ON public.supplier_integrations
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Block anonymous delete on supplier_integrations"
ON public.supplier_integrations
FOR DELETE
TO anon
USING (false);