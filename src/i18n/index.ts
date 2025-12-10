import { en, TranslationKeys } from './translations/en';
import { ru } from './translations/ru';
import { uk } from './translations/uk';

export const translations: Record<string, TranslationKeys> = {
  en,
  ru,
  uk,
};

export const SUPPORTED_LANGUAGES = ['en', 'ru', 'uk'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export function getTranslation(lang: string): TranslationKeys {
  return translations[lang] || translations.en;
}

export type { TranslationKeys };
