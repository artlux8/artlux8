import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CartSheet from "./CartSheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium">
        Subscribe & Save 15% on All Protocols • Free Shipping on Orders $75+
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
            <nav className="hidden md:flex items-center gap-8">
              <a href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </a>
              <a href="#science" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Science
              </a>
              <a href="/protocols" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Protocols
              </a>
              <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5 text-foreground" />
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
              <CartSheet />
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
              <a href="/shop" className="text-lg font-medium py-2 border-b border-border">Shop</a>
              <a href="#science" className="text-lg font-medium py-2 border-b border-border">Science</a>
              <a href="/protocols" className="text-lg font-medium py-2 border-b border-border">Protocols</a>
              <a href="/about" className="text-lg font-medium py-2 border-b border-border">About</a>
              {user ? (
                <Button onClick={() => signOut()} variant="outline" className="mt-4 w-full">Sign Out</Button>
              ) : (
                <Button onClick={() => navigate('/auth')} className="mt-4 w-full bg-primary text-primary-foreground">Sign In</Button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
