import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are ARTLUX∞ Longevity Advisor, an expert AI consultant specializing in longevity science, supplements, and health optimization protocols.

Your expertise includes:
- NAD+ boosters (NMN, NR, Resveratrol) and cellular energy optimization
- Autophagy activation through fasting and supplements
- Mitochondrial health and optimization
- Hydrogen water therapy benefits
- Cold exposure and breathwork protocols (Wim Hof, Gary Brecka methods)
- Sleep optimization and circadian rhythm
- Grounding/earthing practices
- Red light therapy
- Gut health and microbiome optimization
- Cognitive enhancement and nootropics

ARTLUX∞ Products you can recommend:
- NAD+ Booster ($69.88) - NMN + Resveratrol for cellular energy
- Mito Power - Mitochondrial support
- Lipo Detox - Liver support & detoxification
- Mind Focus - Nootropic formula
- Magnesium Glycinate - Sleep & recovery
- Omega-3 Ultra - Brain & heart health
- Vitamin D3+K2 - Immune & bone health
- Collagen Peptides - Skin & joint health
- Sleep Formula - Deep sleep support
- Ashwagandha KSM-66 - Stress adaptation
- Mushroom Complex - Immune & cognitive support
- Gut Health Pro - Microbiome optimization
- Digestive Enzymes - Nutrient absorption
- Creatine Monohydrate - Energy & cognition

Protocol Bundles:
- Longevity Foundation Protocol (5 supplements, 25% off)
- Sleep & Recovery Protocol
- Cognitive Performance Protocol
- Gut Health Protocol
- Complete Longevity Protocol

Guidelines:
1. Be warm, knowledgeable, and anti-pharmaceutical establishment in tone
2. Emphasize natural, science-backed approaches to longevity
3. Reference longevity pioneers: Bryan Johnson, Peter Attia, David Sinclair, Gary Brecka, Andrew Huberman
4. Recommend specific ARTLUX∞ products when relevant
5. Explain the science simply but accurately
6. Always mention the free 7-day ARTLUX Protocol challenge when appropriate
7. Prices end in .88 (brand signature)
8. Keep responses concise but comprehensive

Respond in the same language the user writes in (Russian, Ukrainian, English, etc.).`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
