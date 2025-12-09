import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocalizationStore, CURRENCIES } from "@/stores/localizationStore";

const LocalizationSelector = () => {
  const { currency, setCurrency } = useLocalizationStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
          <span className="text-base">{currency.flag}</span>
          <span className="hidden sm:inline text-xs font-medium">{currency.code}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto bg-background border-border z-50">
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">Currency</DropdownMenuLabel>
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
  );
};

export default LocalizationSelector;
