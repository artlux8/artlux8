import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, email } = await req.json();

    console.log('Order tracking request:', { orderId: orderId ? '***' : undefined, email: email ? '***@***' : undefined });

    // Require BOTH order ID AND email for verification (prevents email enumeration)
    if (!orderId || !email) {
      return new Response(
        JSON.stringify({ error: 'Both order ID and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic input validation
    const trimmedOrderId = String(orderId).trim().slice(0, 100);
    const trimmedEmail = String(email).toLowerCase().trim().slice(0, 255);

    if (!trimmedOrderId || !trimmedEmail || !trimmedEmail.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Invalid order ID or email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Query requires BOTH order ID match AND email match for security
    const query = supabase
      .from('order_fulfillments')
      .select('order_id, shopify_order_id, status, carrier, tracking_number, tracking_url, shipped_at, delivered_at, customer_name, created_at')
      .or(`order_id.eq.${trimmedOrderId},shopify_order_id.eq.${trimmedOrderId}`)
      .eq('customer_email', trimmedEmail)
      .limit(5);

    const { data: orders, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to look up order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!orders || orders.length === 0) {
      console.log('No orders found');
      return new Response(
        JSON.stringify({ orders: [], message: 'No orders found' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${orders.length} order(s)`);

    // Return sanitized order data
    const sanitizedOrders = orders.map(order => ({
      orderId: order.order_id || order.shopify_order_id,
      status: order.status,
      carrier: order.carrier,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      shippedAt: order.shipped_at,
      deliveredAt: order.delivered_at,
      customerName: order.customer_name ? order.customer_name.split(' ')[0] : null, // First name only
      createdAt: order.created_at,
    }));

    return new Response(
      JSON.stringify({ orders: sanitizedOrders }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});