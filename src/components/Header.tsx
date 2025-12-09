import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ShopifyCartDrawer from "./ShopifyCartDrawer";
import LocalizationSelector from "./LocalizationSelector";
import GeoRedirectBanner from "./GeoRedirectBanner";
import GoogleTranslate from "./GoogleTranslate";
import { useLocalizationStore } from "@/stores/localizationStore";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/longevity-protocol", label: "Protocol" },
  { href: "/genetic-testing", label: "Genetic Test" },
  { href: "/bundles", label: "Bundles" },
  { href: "/free-protocol", label: "Free Protocol" },
  { href: "/blog", label: "Blog" },
  { href: "/expert-biohacker", label: "Expert" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { detectAndSetLocale, fetchLiveRates, currency } = useLocalizationStore();

  useEffect(() => {
    detectAndSetLocale();
    fetchLiveRates();
  }, [detectAndSetLocale, fetchLiveRates]);

  const freeShippingThreshold = currency.code === 'GBP' ? '£60' : currency.code === 'EUR' ? '€70' : '$75';

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Geo Redirect Banner */}
      <GeoRedirectBanner />
      
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium">
        Subscribe & Save 15% on All Protocols • Free Shipping on Orders {freeShippingThreshold}+
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex flex-col group">
              <span className="text-2xl md:text-3xl font-logo font-semibold tracking-[0.25em] text-foreground">
                ARTLUX<span className="logo-infinity text-3xl md:text-4xl font-bold ml-0.5 group-hover:scale-110 transition-transform inline-block">∞</span>
              </span>
              <span className="text-[9px] md:text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-medium">
                The Luxury Longevity
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  } ${link.href === "/free-protocol" ? "text-gold hover:text-gold/80" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <GoogleTranslate />
              <LocalizationSelector />
              {user ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
                  title="Dashboard"
                >
                  <User className="w-5 h-5 text-foreground" />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
                  title="Sign In"
                >
                  <User className="w-5 h-5 text-foreground" />
                </button>
              )}
              <ShopifyCartDrawer />
              <Button onClick={() => navigate('/shop')} className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Now
              </Button>
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2 border-b border-border ${
                    isActive(link.href) ? "text-gold" : ""
                  } ${link.href === "/free-protocol" ? "text-gold" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <>
                  <a href="/dashboard" className="text-lg font-medium py-2 border-b border-border" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </a>
                  <Button onClick={() => { signOut(); setIsMenuOpen(false); }} variant="outline" className="mt-4 w-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button onClick={() => { navigate('/auth'); setIsMenuOpen(false); }} className="mt-4 w-full bg-primary text-primary-foreground">
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
