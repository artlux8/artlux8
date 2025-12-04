import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-foreground">
                VITALITY
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Products
              </a>
              <a href="#science" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Science
              </a>
              <a href="#protocols" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Protocols
              </a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors">
                <User className="w-5 h-5 text-foreground" />
              </button>
              <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">
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
              <a href="#products" className="text-lg font-medium py-2 border-b border-border">Products</a>
              <a href="#science" className="text-lg font-medium py-2 border-b border-border">Science</a>
              <a href="#protocols" className="text-lg font-medium py-2 border-b border-border">Protocols</a>
              <a href="#about" className="text-lg font-medium py-2 border-b border-border">About</a>
              <Button className="mt-4 w-full bg-primary text-primary-foreground">Shop Now</Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;