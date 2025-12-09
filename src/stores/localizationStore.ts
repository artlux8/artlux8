import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate from USD
  flag: string; // Country flag emoji
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53, flag: '🇦🇺' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 7.82, flag: '🇭🇰' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34, flag: '🇸🇬' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 3.75, flag: '🇸🇦' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', rate: 3.64, flag: '🇶🇦' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', rate: 41.50, flag: '🇺🇦' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', rate: 92.50, flag: '🇷🇺' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rate: 4.05, flag: '🇵🇱' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 6.05, flag: '🇧🇷' },
  { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', rate: 4380, flag: '🇨🇴' },
  { code: 'CLP', symbol: 'CL$', name: 'Chilean Peso', rate: 980, flag: '🇨🇱' },
  { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso', rate: 1050, flag: '🇦🇷' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
];

interface GeoData {
  country: string;
  countryCode: string;
  currency?: string;
  language?: string;
}

interface LocalizationStore {
  currency: Currency;
  language: Language;
  geoData: GeoData | null;
  showRedirectBanner: boolean;
  hasCheckedGeo: boolean;
  ratesLastUpdated: string | null;
  isLoadingRates: boolean;
  
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  setGeoData: (data: GeoData) => void;
  dismissRedirectBanner: () => void;
  formatPrice: (amount: number | string, round?: boolean) => string;
  convertPrice: (usdAmount: number | string) => number;
  detectAndSetLocale: () => Promise<void>;
  fetchLiveRates: () => Promise<void>;
  updateCurrencyRates: (rates: Record<string, number>) => void;
}

// Round to .88 ending (ARTLUX brand signature)
const roundTo88 = (price: number): number => {
  const wholeNumber = Math.floor(price);
  return wholeNumber + 0.88;
};

// Store mutable rates that can be updated
let currentRates: Record<string, number> = {};
CURRENCIES.forEach(c => { currentRates[c.code] = c.rate; });

export const useLocalizationStore = create<LocalizationStore>()(
  persist(
    (set, get) => ({
      currency: CURRENCIES[0], // USD default
      language: LANGUAGES[0], // English default
      geoData: null,
      showRedirectBanner: false,
      hasCheckedGeo: false,
      ratesLastUpdated: null,
      isLoadingRates: false,

      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      setGeoData: (geoData) => set({ geoData }),
      dismissRedirectBanner: () => set({ showRedirectBanner: false }),
      
      updateCurrencyRates: (rates) => {
        // Update mutable rates object
        Object.assign(currentRates, rates);
        
        // Update the current currency with new rate if available
        const { currency } = get();
        if (rates[currency.code]) {
          set({ 
            currency: { ...currency, rate: rates[currency.code] },
            ratesLastUpdated: new Date().toISOString()
          });
        }
      },

      fetchLiveRates: async () => {
        const { isLoadingRates, ratesLastUpdated, updateCurrencyRates } = get();
        
        // Only fetch if not already loading and rates are older than 1 hour
        if (isLoadingRates) return;
        
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        if (ratesLastUpdated && new Date(ratesLastUpdated).getTime() > oneHourAgo) {
          console.log('Using cached exchange rates');
          return;
        }

        set({ isLoadingRates: true });
        
        try {
          const { data, error } = await supabase.functions.invoke('exchange-rates');
          
          if (error) {
            console.error('Error fetching exchange rates:', error);
            return;
          }

          if (data?.rates) {
            console.log('Live exchange rates loaded:', data.rates);
            updateCurrencyRates(data.rates);
          }
        } catch (error) {
          console.error('Failed to fetch live rates:', error);
        } finally {
          set({ isLoadingRates: false });
        }
      },

      formatPrice: (amount, round = true) => {
        const { currency } = get();
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        // Use live rate from currentRates if available
        const rate = currentRates[currency.code] || currency.rate;
        const converted = numAmount * rate;
        const finalAmount = round ? roundTo88(converted) : converted;
        
        return `${currency.symbol}${finalAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      },

      convertPrice: (usdAmount) => {
        const { currency } = get();
        const numAmount = typeof usdAmount === 'string' ? parseFloat(usdAmount) : usdAmount;
        // Use live rate from currentRates if available
        const rate = currentRates[currency.code] || currency.rate;
        return roundTo88(numAmount * rate);
      },

      detectAndSetLocale: async () => {
        const { hasCheckedGeo } = get();
        if (hasCheckedGeo) return;

        try {
          // Use free IP geolocation API
          const response = await fetch('https://ipapi.co/json/');
          if (!response.ok) return;
          
          const data = await response.json();
          const geoData: GeoData = {
            country: data.country_name,
            countryCode: data.country_code,
            currency: data.currency,
            language: data.languages?.split(',')[0],
          };

          set({ geoData, hasCheckedGeo: true });

          // Auto-redirect UK users to .co.uk domain
          const currentHost = window.location.hostname;
          const isUK = data.country_code === 'GB';
          const isOnCoUk = currentHost.includes('.co.uk');
          const isOnCom = currentHost.includes('artlux8.com');
          const isLocalhost = currentHost.includes('localhost') || currentHost.includes('lovable.app');

          // Only redirect on production domains, not localhost/preview
          if (isUK && isOnCom && !isLocalhost) {
            const currentPath = window.location.pathname + window.location.search;
            window.location.href = `https://artlux8.co.uk${currentPath}`;
            return;
          }

          // Auto-suggest currency based on location
          const suggestedCurrency = CURRENCIES.find(c => c.code === data.currency);
          if (suggestedCurrency) {
            set({ currency: suggestedCurrency });
          }

        } catch (error) {
          console.log('Geo detection unavailable');
          set({ hasCheckedGeo: true });
        }
      },
    }),
    {
      name: 'artlux-localization',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
