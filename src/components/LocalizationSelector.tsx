import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocalizationStore, CURRENCIES, LANGUAGES } from "@/stores/localizationStore";
import { SUPPORTED_LANGUAGES } from "@/i18n";
import GoogleTranslate from "./GoogleTranslate";

const LocalizationSelector = () => {
  const { currency, language, setCurrency, setLanguage } = useLocalizationStore();

  // Native translations available for these languages
  const nativeLanguages = LANGUAGES.filter(l => 
    SUPPORTED_LANGUAGES.includes(l.code as any)
  );

  // Show Google Translate only if current language is NOT natively supported
  const showGoogleTranslate = !SUPPORTED_LANGUAGES.includes(language.code as any);

  return (
    <div className="flex items-center gap-1">
      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground px-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium uppercase">{language.code}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-background border-border z-50">
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            {language.code === 'ru' ? 'Язык' : language.code === 'uk' ? 'Мова' : 'Language'}
          </DropdownMenuLabel>
          {nativeLanguages.map((l) => (
            <DropdownMenuItem
              key={l.code}
              onClick={() => setLanguage(l)}
              className={`cursor-pointer ${language.code === l.code ? 'bg-primary/10 text-primary' : ''}`}
            >
              <span className="font-medium">{l.nativeName}</span>
              <span className="ml-auto text-xs text-muted-foreground">{l.name}</span>
            </DropdownMenuItem>
          ))}
          
          {showGoogleTranslate && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <p className="text-xs text-muted-foreground mb-2">Auto-translate:</p>
                <GoogleTranslate />
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Currency Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground px-2">
            <span className="text-base">{currency.flag}</span>
            <span className="hidden sm:inline text-xs font-medium">{currency.code}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto bg-background border-border z-50">
          <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            {language.code === 'ru' ? 'Валюта' : language.code === 'uk' ? 'Валюта' : 'Currency'}
          </DropdownMenuLabel>
          {CURRENCIES.map((c) => (
            <DropdownMenuItem
              key={c.code}
              onClick={() => setCurrency(c)}
              className={`cursor-pointer ${currency.code === c.code ? 'bg-primary/10 text-primary' : ''}`}
            >
              <span className="text-base mr-2">{c.flag}</span>
              <span className="w-10 font-medium">{c.symbol}</span>
              <span className="w-10">{c.code}</span>
              <span className="ml-auto text-xs text-muted-foreground">{c.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LocalizationSelector;
