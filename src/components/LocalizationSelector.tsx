import { Globe, ChevronDown } from "lucide-react";
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

const LocalizationSelector = () => {
  const { currency, language, setCurrency, setLanguage } = useLocalizationStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">{currency.code}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto bg-background border-border">
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Currency</DropdownMenuLabel>
        {CURRENCIES.map((c) => (
          <DropdownMenuItem
            key={c.code}
            onClick={() => setCurrency(c)}
            className={`cursor-pointer ${currency.code === c.code ? 'bg-primary/10 text-primary' : ''}`}
          >
            <span className="w-8 font-medium">{c.symbol}</span>
            <span>{c.code}</span>
            <span className="ml-auto text-xs text-muted-foreground">{c.name}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Language</DropdownMenuLabel>
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLanguage(l)}
            className={`cursor-pointer ${language.code === l.code ? 'bg-primary/10 text-primary' : ''}`}
          >
            <span>{l.nativeName}</span>
            <span className="ml-auto text-xs text-muted-foreground">{l.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocalizationSelector;
