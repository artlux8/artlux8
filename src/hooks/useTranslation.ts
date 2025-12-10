import { useLocalizationStore } from '@/stores/localizationStore';
import { getTranslation, TranslationKeys, SUPPORTED_LANGUAGES } from '@/i18n';

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string 
      ? T[K] extends object 
        ? `${K}.${NestedKeyOf<T[K]>}` | K
        : K 
      : never 
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationKeys>;

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) || path;
}

export function useTranslation() {
  const { language } = useLocalizationStore();
  
  const t = (key: TranslationKey): string => {
    const translations = getTranslation(language.code);
    return getNestedValue(translations, key);
  };

  const isSupported = SUPPORTED_LANGUAGES.includes(language.code as any);

  return { t, language: language.code, isSupported };
}
