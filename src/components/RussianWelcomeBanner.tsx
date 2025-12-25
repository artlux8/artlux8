import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const RussianWelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem("russian-banner-dismissed");
    if (dismissed) return;

    // Detect Russian language preference
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const languages = navigator.languages || [browserLang];
    
    const isRussian = languages.some(lang => 
      lang.toLowerCase().startsWith("ru")
    );

    if (isRussian) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("russian-banner-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative mx-4 max-w-lg bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-primary/30 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6">
          {/* Russian Welcome */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              Добро пожаловать в ARTLUX∞
            </h2>
            <p className="text-muted-foreground">
              Рады видеть вас на нашем сайте!
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />

          {/* English Explanation */}
          <div className="space-y-3 text-sm">
            <p className="text-foreground">
              Наш сайт работает только на английском языке.
            </p>
            <p className="text-muted-foreground">
              Our website is available in English only. We deliver premium longevity supplements worldwide, including Russia and CIS countries.
            </p>
          </div>

          {/* Features in Russian */}
          <div className="text-left bg-black/30 rounded-xl p-4 space-y-2 text-sm">
            <p className="text-primary font-medium">🌍 Доставка по всему миру</p>
            <p className="text-muted-foreground">💳 Оплата в рублях доступна</p>
            <p className="text-muted-foreground">📦 Быстрая доставка в Россию и СНГ</p>
          </div>

          <Button 
            onClick={handleDismiss}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Продолжить на сайт / Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RussianWelcomeBanner;
