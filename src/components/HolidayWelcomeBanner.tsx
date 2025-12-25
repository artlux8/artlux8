import { useState, useEffect } from "react";
import { Snowflake, Gift, Sparkles } from "lucide-react";

interface LanguageGreeting {
  code: string;
  greeting: string;
  wishes: string;
  flag: string;
}

const languageGreetings: LanguageGreeting[] = [
  { code: "ru", greeting: "С Рождеством!", wishes: "Счастливого Нового Года и крепкого здоровья!", flag: "🇷🇺" },
  { code: "lv", greeting: "Priecīgus Ziemassvētkus!", wishes: "Laimīgu Jauno gadu un labu veselību!", flag: "🇱🇻" },
  { code: "et", greeting: "Häid jõule!", wishes: "Head uut aastat ja tugevat tervist!", flag: "🇪🇪" },
  { code: "lt", greeting: "Linksmų Kalėdų!", wishes: "Laimingų Naujųjų metų ir geros sveikatos!", flag: "🇱🇹" },
  { code: "es", greeting: "¡Feliz Navidad!", wishes: "¡Próspero Año Nuevo y mucha salud!", flag: "🇪🇸" },
  { code: "uk", greeting: "З Різдвом!", wishes: "Щасливого Нового Року та міцного здоров'я!", flag: "🇺🇦" },
  { code: "de", greeting: "Frohe Weihnachten!", wishes: "Ein gesundes neues Jahr!", flag: "🇩🇪" },
  { code: "fr", greeting: "Joyeux Noël!", wishes: "Bonne année et bonne santé!", flag: "🇫🇷" },
  { code: "it", greeting: "Buon Natale!", wishes: "Felice Anno Nuovo e tanta salute!", flag: "🇮🇹" },
  { code: "pt", greeting: "Feliz Natal!", wishes: "Feliz Ano Novo e muita saúde!", flag: "🇧🇷" },
  { code: "pl", greeting: "Wesołych Świąt!", wishes: "Szczęśliwego Nowego Roku i zdrowia!", flag: "🇵🇱" },
  { code: "nl", greeting: "Vrolijk Kerstfeest!", wishes: "Gelukkig Nieuwjaar en een goede gezondheid!", flag: "🇳🇱" },
  { code: "zh", greeting: "圣诞快乐!", wishes: "新年快乐，身体健康!", flag: "🇨🇳" },
  { code: "ja", greeting: "メリークリスマス!", wishes: "良いお年を、健康でありますように!", flag: "🇯🇵" },
  { code: "ko", greeting: "메리 크리스마스!", wishes: "새해 복 많이 받으시고 건강하세요!", flag: "🇰🇷" },
  { code: "ar", greeting: "!عيد ميلاد مجيد", wishes: "!سنة جديدة سعيدة وصحة جيدة", flag: "🇸🇦" },
  { code: "hi", greeting: "मेरी क्रिसमस!", wishes: "नया साल मुबारक और अच्छी सेहत!", flag: "🇮🇳" },
  { code: "tr", greeting: "Mutlu Noeller!", wishes: "Mutlu Yıllar ve sağlıklı günler!", flag: "🇹🇷" },
];

const HolidayWelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [greeting, setGreeting] = useState<LanguageGreeting | null>(null);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem("holiday-banner-shown");
    if (shown) return;

    // Detect browser language
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const languages = navigator.languages || [browserLang];
    
    // Find matching language (exclude English)
    let matchedGreeting: LanguageGreeting | null = null;
    
    for (const lang of languages) {
      const langCode = lang.toLowerCase().split("-")[0];
      if (langCode === "en") continue; // Skip English
      
      const found = languageGreetings.find(g => g.code === langCode);
      if (found) {
        matchedGreeting = found;
        break;
      }
    }

    if (matchedGreeting) {
      setGreeting(matchedGreeting);
      setIsVisible(true);
      sessionStorage.setItem("holiday-banner-shown", "true");
      
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  }, []);

  if (!isVisible || !greeting) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in pointer-events-none">
      <div className="relative mx-4 max-w-md bg-gradient-to-br from-red-950 via-zinc-900 to-green-950 border border-gold/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Floating Snowflakes */}
        <div className="absolute top-4 left-4 animate-pulse">
          <Snowflake className="w-6 h-6 text-blue-300/60" />
        </div>
        <div className="absolute top-8 right-6 animate-pulse delay-75">
          <Snowflake className="w-4 h-4 text-blue-200/50" />
        </div>
        <div className="absolute bottom-6 left-8 animate-pulse delay-150">
          <Snowflake className="w-5 h-5 text-blue-300/40" />
        </div>
        
        {/* Gift Icon */}
        <div className="absolute -top-2 -right-2">
          <Gift className="w-12 h-12 text-red-500/30" />
        </div>

        <div className="text-center space-y-4 relative z-10">
          {/* Flag & Sparkles */}
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-4xl">{greeting.flag}</span>
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          </div>

          {/* Native Language Greeting */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
              {greeting.greeting}
            </h2>
            <p className="text-lg text-green-300/90">
              {greeting.wishes}
            </p>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />

          {/* English Message */}
          <div className="space-y-1">
            <p className="text-foreground font-medium">
              Merry Christmas & Happy New Year!
            </p>
            <p className="text-sm text-muted-foreground">
              Wishing you health and longevity ✨
            </p>
          </div>

          {/* ARTLUX Branding */}
          <p className="text-xs text-gold/70 font-logo tracking-wider">
            — ARTLUX∞ —
          </p>
        </div>
      </div>
    </div>
  );
};

export default HolidayWelcomeBanner;
