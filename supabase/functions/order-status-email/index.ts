import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderStatusEmailRequest {
  order_id: string;
  status: "shipped" | "delivered";
  customer_email: string;
  customer_name: string;
  tracking_number?: string;
  tracking_url?: string;
  carrier?: string;
  order_total?: number;
  currency?: string;
}

// Verify that the authenticated user has admin role
async function verifyAdminRole(req: Request): Promise<{ isAdmin: boolean; error?: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return { isAdmin: false, error: "Missing authorization header" };
  }

  const token = authHeader.replace("Bearer ", "");
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    console.error("Auth error:", userError);
    return { isAdmin: false, error: "Invalid or expired token" };
  }

  // Check if user has admin role using the has_role function
  const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: isAdmin, error: roleError } = await serviceClient.rpc("has_role", {
    _user_id: user.id,
    _role: "admin"
  });

  if (roleError) {
    console.error("Role check error:", roleError);
    return { isAdmin: false, error: "Failed to verify admin role" };
  }

  console.log("Admin role check for user:", user.id, "result:", isAdmin);
  return { isAdmin: !!isAdmin };
}

const getShippedEmailHtml = (data: OrderStatusEmailRequest) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #d4af37; font-size: 28px; letter-spacing: 3px; margin: 0;">ARTLUX∞</h1>
      <p style="color: #888; font-size: 11px; letter-spacing: 2px; margin: 5px 0 0;">THE LUXURY LONGEVITY</p>
    </div>
    
    <div style="background: linear-gradient(145deg, #1a1a1a, #141414); border: 1px solid #333; border-radius: 12px; padding: 40px; margin-bottom: 30px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #fff; font-size: 24px; margin: 0 0 10px;">📦 Your Order Has Shipped!</h2>
        <p style="color: #888; margin: 0;">Great news, ${data.customer_name}!</p>
      </div>
      
      <p style="color: #ccc; line-height: 1.6; margin-bottom: 25px;">
        Your ARTLUX∞ order is on its way to you. We've carefully packaged your premium supplements 
        to ensure they arrive in perfect condition.
      </p>
      
      ${data.tracking_number ? `
      <div style="background: #0d0d0d; border: 1px solid #d4af37; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <p style="color: #d4af37; font-size: 12px; letter-spacing: 1px; margin: 0 0 10px; text-transform: uppercase;">Tracking Information</p>
        <p style="color: #fff; font-size: 16px; margin: 0 0 5px;">${data.carrier || 'Carrier'}: <strong>${data.tracking_number}</strong></p>
        ${data.tracking_url ? `<a href="${data.tracking_url}" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background: linear-gradient(135deg, #d4af37, #b8962d); color: #0a0a0a; text-decoration: none; border-radius: 6px; font-weight: 600;">Track Package</a>` : ''}
      </div>
      ` : ''}
      
      <div style="border-top: 1px solid #333; padding-top: 20px;">
        <p style="color: #888; font-size: 14px; margin: 0;">
          <strong style="color: #d4af37;">Order ID:</strong> ${data.order_id}
          ${data.order_total ? `<br><strong style="color: #d4af37;">Total:</strong> ${data.currency || 'USD'} ${data.order_total.toFixed(2)}` : ''}
        </p>
      </div>
    </div>
    
    <div style="text-align: center; color: #666; font-size: 12px;">
      <p style="margin: 0 0 10px;">Questions? <a href="mailto:contact@artlux8.com" style="color: #d4af37;">contact@artlux8.com</a></p>
      <p style="margin: 0;">© ${new Date().getFullYear()} ARTLUX LTD</p>
    </div>
  </div>
</body>
</html>
`;

const getDeliveredEmailHtml = (data: OrderStatusEmailRequest) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #d4af37; font-size: 28px; letter-spacing: 3px; margin: 0;">ARTLUX∞</h1>
      <p style="color: #888; font-size: 11px; letter-spacing: 2px; margin: 5px 0 0;">THE LUXURY LONGEVITY</p>
    </div>
    
    <div style="background: linear-gradient(145deg, #1a1a1a, #141414); border: 1px solid #333; border-radius: 12px; padding: 40px; margin-bottom: 30px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #fff; font-size: 24px; margin: 0 0 10px;">✓ Your Order Has Arrived!</h2>
        <p style="color: #888; margin: 0;">Congratulations, ${data.customer_name}!</p>
      </div>
      
      <p style="color: #ccc; line-height: 1.6; margin-bottom: 25px;">
        Your ARTLUX∞ order has been delivered. Begin your journey to optimal health and longevity today.
      </p>
      
      <div style="background: #0d0d0d; border: 1px solid #22c55e; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <p style="color: #22c55e; font-size: 12px; letter-spacing: 1px; margin: 0 0 15px; text-transform: uppercase;">Getting Started</p>
        <ul style="color: #ccc; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>Store supplements in a cool, dry place</li>
          <li>Take consistently for best results</li>
          <li>Join our FREE 7-Day Protocol Challenge!</li>
        </ul>
      </div>
      
      <div style="text-align: center;">
        <a href="https://artlux8.com/free-protocol" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #d4af37, #b8962d); color: #0a0a0a; text-decoration: none; border-radius: 6px; font-weight: 600;">Start Your Protocol</a>
      </div>
      
      <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 25px;">
        <p style="color: #888; font-size: 14px; margin: 0;"><strong style="color: #d4af37;">Order ID:</strong> ${data.order_id}</p>
      </div>
    </div>
    
    <div style="text-align: center; color: #666; font-size: 12px;">
      <p style="margin: 0 0 10px;">Questions? <a href="mailto:contact@artlux8.com" style="color: #d4af37;">contact@artlux8.com</a></p>
      <p style="margin: 0;">© ${new Date().getFullYear()} ARTLUX LTD</p>
    </div>
  </div>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  console.log("Order status email function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify admin role before processing
  const { isAdmin, error: authError } = await verifyAdminRole(req);
  if (!isAdmin) {
    console.error("Authorization failed:", authError);
    return new Response(
      JSON.stringify({ error: authError || "Unauthorized - Admin access required" }),
      { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const data: OrderStatusEmailRequest = await req.json();
    console.log("Processing order status email:", data.order_id, "status:", data.status);

    if (!data.order_id || !data.status || !data.customer_email || !data.customer_name) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailHtml = data.status === "shipped" 
      ? getShippedEmailHtml(data) 
      : getDeliveredEmailHtml(data);

    const subject = data.status === "shipped"
      ? `📦 Your ARTLUX∞ Order Has Shipped! - Order #${data.order_id.slice(0, 8)}`
      : `✓ Your ARTLUX∞ Order Has Been Delivered! - Order #${data.order_id.slice(0, 8)}`;

    console.log("Sending email to:", data.customer_email);

    // Send via Resend API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ARTLUX∞ <contact@artlux8.com>",
        reply_to: "artlux.ltd@gmail.com",
        to: [data.customer_email],
        subject: subject,
        html: emailHtml,
      }),
    });

    const emailResult = await resendResponse.json();
    console.log("Resend response:", emailResult);

    if (!resendResponse.ok) {
      throw new Error(emailResult.message || "Failed to send email");
    }

    // Update order record
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    await supabase
      .from("order_fulfillments")
      .update({ 
        notes: `${data.status} email sent at ${new Date().toISOString()}`,
        updated_at: new Date().toISOString()
      })
      .eq("order_id", data.order_id);

    return new Response(
      JSON.stringify({ success: true, message: `${data.status} email sent`, id: emailResult.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
