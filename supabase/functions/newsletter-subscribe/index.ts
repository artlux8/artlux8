import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (per IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS) {
    return true;
  }
  
  record.count++;
  return false;
}

// Verify Cloudflare Turnstile token
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  // Use test secret key if no real key configured
  // Test secret: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
  const secretKey = Deno.env.get('TURNSTILE_SECRET_KEY') || '1x0000000000000000000000000000000AA';
  
  try {
    console.log('Verifying Turnstile token...');
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });
    
    const result = await response.json();
    console.log('Turnstile verification result:', result);
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('cf-connecting-ip') || 
               'unknown';
    
    console.log(`Newsletter subscription attempt from IP: ${ip}`);
    
    // Check rate limit
    if (isRateLimited(ip)) {
      console.log(`Rate limited: ${ip}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { email, turnstileToken, discountCode } = await req.json();
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      console.log('Invalid email format:', email);
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Verify Turnstile CAPTCHA
    if (!turnstileToken) {
      console.log('Missing Turnstile token');
      return new Response(
        JSON.stringify({ error: 'CAPTCHA verification required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const isValidCaptcha = await verifyTurnstile(turnstileToken, ip);
    if (!isValidCaptcha) {
      console.log('Invalid Turnstile token');
      return new Response(
        JSON.stringify({ error: 'CAPTCHA verification failed. Please try again.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Initialize Supabase with service role key for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Insert subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({ 
        email: email.toLowerCase().trim(), 
        discount_code: discountCode || null 
      })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        console.log('Email already subscribed:', email);
        return new Response(
          JSON.stringify({ error: 'This email is already subscribed' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.error('Database error:', error);
      throw error;
    }
    
    console.log('Successfully subscribed:', email);
    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed!' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
