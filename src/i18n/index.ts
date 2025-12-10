import { en, TranslationKeys } from './translations/en';
import { ru } from './translations/ru';
import { uk } from './translations/uk';
import { es } from './translations/es';
import { de } from './translations/de';

export const translations: Record<string, TranslationKeys> = {
  en,
  ru,
  uk,
  es,
  de,
};

export const SUPPORTED_LANGUAGES = ['en', 'ru', 'uk', 'es', 'de'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export function getTranslation(lang: string): TranslationKeys {
  return translations[lang] || translations.en;
}

export type { TranslationKeys };
