import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { encode as hexEncode } from "https://deno.land/std@0.168.0/encoding/hex.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-signature, x-webhook-timestamp',
};

// Timing-safe comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Verify HMAC-SHA256 signature
async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const data = encoder.encode(payload);
    
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
    const expectedSignature = new TextDecoder().decode(hexEncode(new Uint8Array(signatureBuffer)));
    
    // Remove any prefix like "sha256=" if present
    const cleanSignature = signature.replace(/^sha256=/, '').toLowerCase();
    
    return timingSafeEqual(expectedSignature.toLowerCase(), cleanSignature);
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

// Validate timestamp to prevent replay attacks (5 minute window)
function isTimestampValid(timestamp: string | null): boolean {
  if (!timestamp) return false;
  
  const webhookTime = parseInt(timestamp, 10);
  if (isNaN(webhookTime)) return false;
  
  const now = Math.floor(Date.now() / 1000);
  const fiveMinutes = 5 * 60;
  
  return Math.abs(now - webhookTime) <= fiveMinutes;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      console.warn("Webhook rejected: Invalid method", req.method);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get supplier from query parameter
    const url = new URL(req.url);
    const supplier = url.searchParams.get('supplier');
    
    if (!supplier || !['supliful', 'okcapsule'].includes(supplier.toLowerCase())) {
      console.warn("Webhook rejected: Invalid or missing supplier", supplier);
      return new Response(JSON.stringify({ error: 'Invalid supplier' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get signature and timestamp from headers
    const signature = req.headers.get('x-webhook-signature') || 
                      req.headers.get('x-hub-signature-256') ||
                      req.headers.get('x-signature');
    const timestamp = req.headers.get('x-webhook-timestamp') ||
                      req.headers.get('x-timestamp');

    if (!signature) {
      console.warn("Webhook rejected: Missing signature header for", supplier);
      return new Response(JSON.stringify({ error: 'Missing signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get raw body for signature verification
    const rawBody = await req.text();
    
    if (!rawBody) {
      console.warn("Webhook rejected: Empty body for", supplier);
      return new Response(JSON.stringify({ error: 'Empty request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client with service role for vault access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get webhook secret from vault
    const { data: secretData, error: secretError } = await supabase
      .from('vault.decrypted_secrets')
      .select('decrypted_secret')
      .eq('name', `webhook_secret_${supplier.toLowerCase()}`)
      .single();

    if (secretError || !secretData?.decrypted_secret) {
      console.error("Webhook secret not found for supplier:", supplier, secretError);
      return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const webhookSecret = secretData.decrypted_secret;

    // Verify signature
    const isValidSignature = await verifyWebhookSignature(rawBody, signature, webhookSecret);
    
    if (!isValidSignature) {
      console.warn("Webhook rejected: Invalid signature for", supplier);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate timestamp if provided (optional but recommended)
    if (timestamp && !isTimestampValid(timestamp)) {
      console.warn("Webhook rejected: Timestamp outside valid window for", supplier);
      return new Response(JSON.stringify({ error: 'Request expired' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the webhook payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.warn("Webhook rejected: Invalid JSON for", supplier);
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Webhook verified successfully for", supplier, "event:", payload.event || payload.type || 'unknown');

    // Process webhook based on event type
    const eventType = payload.event || payload.type || payload.action;
    
    // Handle order status updates
    if (eventType === 'order.shipped' || eventType === 'order.delivered' || eventType === 'order.updated') {
      const orderId = payload.order_id || payload.orderId || payload.data?.order_id;
      const trackingNumber = payload.tracking_number || payload.trackingNumber || payload.data?.tracking_number;
      const trackingUrl = payload.tracking_url || payload.trackingUrl || payload.data?.tracking_url;
      const carrier = payload.carrier || payload.data?.carrier;
      
      if (orderId) {
        const updateData: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };

        if (eventType === 'order.shipped') {
          updateData.status = 'shipped';
          updateData.shipped_at = new Date().toISOString();
        } else if (eventType === 'order.delivered') {
          updateData.status = 'delivered';
          updateData.delivered_at = new Date().toISOString();
        }

        if (trackingNumber) updateData.tracking_number = trackingNumber;
        if (trackingUrl) updateData.tracking_url = trackingUrl;
        if (carrier) updateData.carrier = carrier;

        const { error: updateError } = await supabase
          .from('order_fulfillments')
          .update(updateData)
          .eq('supplier_order_id', orderId)
          .eq('supplier', supplier.toLowerCase());

        if (updateError) {
          console.error("Failed to update order fulfillment:", updateError);
        } else {
          console.log("Order fulfillment updated:", orderId);
        }
      }
    }

    // Update last sync timestamp for the supplier
    await supabase
      .from('supplier_integrations')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('supplier', supplier.toLowerCase());

    return new Response(JSON.stringify({ success: true, message: 'Webhook processed' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
