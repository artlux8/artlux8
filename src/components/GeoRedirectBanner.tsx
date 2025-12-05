import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalizationStore } from "@/stores/localizationStore";

const GeoRedirectBanner = () => {
  const { geoData, showRedirectBanner, dismissRedirectBanner } = useLocalizationStore();

  if (!showRedirectBanner || !geoData) return null;

  const isUK = geoData.countryCode === 'GB';
  const targetDomain = isUK ? 'artlux8.co.uk' : 'artlux8.com';
  const message = isUK
    ? 'You appear to be in the UK. Visit our UK site for local pricing and faster shipping.'
    : `You appear to be in ${geoData.country}. Visit our international site for the best experience.`;

  const handleRedirect = () => {
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `https://${targetDomain}${currentPath}`;
  };

  return (
    <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-b border-primary/30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-foreground flex-1">
          {message}
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleRedirect}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
          >
            Go to {targetDomain}
            <ArrowRight className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissRedirectBanner}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeoRedirectBanner;
