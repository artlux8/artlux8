import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Target currencies we support
const SUPPORTED_CURRENCIES = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'HKD', 'SGD', 'AED', 'SAR', 'QAR', 'UAH', 'RUB'];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch rates from Frankfurter API (free, no API key needed)
    // Base currency is USD
    const targetCurrencies = SUPPORTED_CURRENCIES.filter(c => c !== 'USD').join(',');
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=USD&to=${targetCurrencies}`
    );

    if (!response.ok) {
      throw new Error(`Frankfurter API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Build rates object with USD as base (rate = 1)
    const rates: Record<string, number> = { USD: 1 };
    
    for (const [currency, rate] of Object.entries(data.rates)) {
      rates[currency] = rate as number;
    }

    // AED, SAR, QAR are pegged currencies not in Frankfurter, use fixed rates
    if (!rates.AED) rates.AED = 3.6725;  // UAE Dirham (pegged to USD)
    if (!rates.SAR) rates.SAR = 3.75;    // Saudi Riyal (pegged to USD)
    if (!rates.QAR) rates.QAR = 3.64;    // Qatari Riyal (pegged to USD)

    console.log('Exchange rates fetched successfully:', rates);

    return new Response(
      JSON.stringify({
        success: true,
        base: 'USD',
        date: data.date,
        rates,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching exchange rates:', errorMessage);
    
    // Return fallback rates if API fails
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        rates: {
          USD: 1,
          GBP: 0.79,
          EUR: 0.92,
          CAD: 1.36,
          AUD: 1.53,
          HKD: 7.82,
          SGD: 1.34,
          AED: 3.67,
          SAR: 3.75,
          QAR: 3.64,
          UAH: 41.50,
          RUB: 92.50,
        },
      }),
      {
        status: 200, // Return 200 with fallback data
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
