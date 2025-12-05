import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  setGeoData: (data: GeoData) => void;
  dismissRedirectBanner: () => void;
  formatPrice: (amount: number | string, round?: boolean) => string;
  convertPrice: (usdAmount: number | string) => number;
  detectAndSetLocale: () => Promise<void>;
}

// Round to attractive price points
const roundToAttractive = (price: number): number => {
  if (price < 10) return Math.round(price);
  if (price < 50) return Math.round(price / 5) * 5;
  if (price < 100) return Math.round(price / 10) * 10;
  return Math.round(price / 25) * 25;
};

export const useLocalizationStore = create<LocalizationStore>()(
  persist(
    (set, get) => ({
      currency: CURRENCIES[0], // USD default
      language: LANGUAGES[0], // English default
      geoData: null,
      showRedirectBanner: false,
      hasCheckedGeo: false,

      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      setGeoData: (geoData) => set({ geoData }),
      dismissRedirectBanner: () => set({ showRedirectBanner: false }),

      formatPrice: (amount, round = true) => {
        const { currency } = get();
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        const converted = numAmount * currency.rate;
        const finalAmount = round ? roundToAttractive(converted) : converted;
        
        return `${currency.symbol}${finalAmount.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: round ? 0 : 2,
        })}`;
      },

      convertPrice: (usdAmount) => {
        const { currency } = get();
        const numAmount = typeof usdAmount === 'string' ? parseFloat(usdAmount) : usdAmount;
        return roundToAttractive(numAmount * currency.rate);
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

          // Check if UK user should be redirected to .co.uk
          const currentHost = window.location.hostname;
          const isUK = data.country_code === 'GB';
          const isOnCoUk = currentHost.includes('.co.uk');
          const isOnCom = currentHost.includes('.com') && !currentHost.includes('.co.uk');

          if (isUK && isOnCom) {
            set({ showRedirectBanner: true });
          } else if (!isUK && isOnCoUk) {
            set({ showRedirectBanner: true });
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
