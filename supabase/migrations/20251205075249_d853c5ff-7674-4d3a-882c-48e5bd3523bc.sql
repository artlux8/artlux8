-- Create table for tracking orders and fulfillment from multiple suppliers
CREATE TABLE public.order_fulfillments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL,
  shopify_order_id TEXT,
  supplier TEXT NOT NULL CHECK (supplier IN ('supliful', 'okcapsule', 'artlux')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'failed')),
  tracking_number TEXT,
  tracking_url TEXT,
  carrier TEXT,
  customer_email TEXT,
  customer_name TEXT,
  shipping_address JSONB,
  line_items JSONB,
  total_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  notes TEXT,
  supplier_order_id TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for supplier integration status
CREATE TABLE public.supplier_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier TEXT NOT NULL UNIQUE CHECK (supplier IN ('supliful', 'okcapsule')),
  is_connected BOOLEAN DEFAULT false,
  api_status TEXT DEFAULT 'unknown',
  last_sync_at TIMESTAMP WITH TIME ZONE,
  webhook_url TEXT,
  webhook_secret TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.order_fulfillments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_integrations ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for order_fulfillments
CREATE POLICY "Admins can view all fulfillments"
  ON public.order_fulfillments
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert fulfillments"
  ON public.order_fulfillments
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update fulfillments"
  ON public.order_fulfillments
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Admin-only policies for supplier_integrations
CREATE POLICY "Admins can view integrations"
  ON public.supplier_integrations
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage integrations"
  ON public.supplier_integrations
  FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Insert default supplier records
INSERT INTO public.supplier_integrations (supplier, is_connected, api_status)
VALUES 
  ('supliful', false, 'not_configured'),
  ('okcapsule', false, 'not_configured');

-- Add trigger for updated_at
CREATE TRIGGER update_order_fulfillments_updated_at
  BEFORE UPDATE ON public.order_fulfillments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_supplier_integrations_updated_at
  BEFORE UPDATE ON public.supplier_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();