import { useState, useEffect, useCallback } from "react";
import { X, Gift, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

type OfferLevel = 1 | 2 | 3;

interface OfferConfig {
  discount: string;
  discountValue: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  minOrder?: number;
  specialOffer?: string;
}

const OFFERS: Record<OfferLevel, OfferConfig> = {
  1: {
    discount: "8.88%",
    discountValue: 8.88,
    title: "Wait! Don't Leave Yet",
    subtitle: "Exclusive Exit Offer",
    description: "Get 8.88% off your first order when you join our longevity community.",
    buttonText: "Claim 8.88% Off",
    icon: <Sparkles className="w-8 h-8 text-gold" />,
  },
  2: {
    discount: "18.88%",
    discountValue: 18.88,
    title: "One More Thing...",
    subtitle: "Special Hydrogen Bottle Offer",
    description: "Get 18.88% off our premium Hydrogen Water Bottle — the ultimate longevity tool.",
    buttonText: "Get Hydrogen Bottle Deal",
    icon: <Gift className="w-8 h-8 text-gold" />,
    specialOffer: "Hydrogen Water Bottle",
  },
  3: {
    discount: "88.88%",
    discountValue: 88.88,
    title: "Final Offer — Our Best Deal",
    subtitle: "Legendary Discount Unlocked",
    description: "Get an incredible 88.88% off your entire order when you spend over $200!",
    buttonText: "Claim 88.88% Off Now",
    icon: <Zap className="w-8 h-8 text-gold" />,
    minOrder: 200,
  },
};

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [offerLevel, setOfferLevel] = useState<OfferLevel>(1);
  const [hasTriggered, setHasTriggered] = useState(false);

  const currentOffer = OFFERS[offerLevel];

  const handleExitIntent = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves from top of page
    if (e.clientY <= 0 && !hasTriggered) {
      const exitIntentSeen = localStorage.getItem("artlux-exit-intent-level");
      const seenLevel = exitIntentSeen ? parseInt(exitIntentSeen) : 0;
      
      if (seenLevel < 3) {
        const nextLevel = Math.min(seenLevel + 1, 3) as OfferLevel;
        setOfferLevel(nextLevel);
        setIsOpen(true);
        setHasTriggered(true);
      }
    }
  }, [hasTriggered]);

  useEffect(() => {
    // Add exit intent listener
    document.addEventListener("mouseout", handleExitIntent);
    
    return () => {
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, [handleExitIntent]);

  const generateDiscountCode = (level: OfferLevel) => {
    const prefix = level === 1 ? "ARTLUX888" : level === 2 ? "HYDRO1888" : "MEGA8888";
    return `${prefix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
    } catch {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const code = generateDiscountCode(offerLevel);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ 
          email, 
          discount_code: code,
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
        return;
      }

      setDiscountCode(code);
      setIsSubmitted(true);
      localStorage.setItem("artlux-exit-intent-level", "3"); // Mark as fully seen
      toast.success(`${currentOffer.discount} discount unlocked!`);
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    // Store current level and close
    localStorage.setItem("artlux-exit-intent-level", offerLevel.toString());
    setIsOpen(false);
    setHasTriggered(false); // Allow next level to trigger on next exit
  };

  const handleClose = () => {
    if (!isSubmitted) {
      // If closing without subscribing, prepare for next offer
      handleDecline();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isSubmitted) {
        handleDecline();
      } else {
        setIsOpen(open);
      }
    }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-gold/30 bg-background">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          {/* Gold gradient header with intensity based on offer level */}
          <div 
            className="h-2"
            style={{
              background: offerLevel === 3 
                ? "linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37, #FFD700, #D4AF37)"
                : offerLevel === 2 
                ? "linear-gradient(90deg, #D4AF37, #C5A028, #D4AF37)"
                : "linear-gradient(90deg, #D4AF37, #C5A028)"
            }}
          />
          
          <div className="p-8 text-center">
            {!isSubmitted ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${offerLevel === 3 ? 'bg-gold/30 animate-pulse' : 'bg-gold/10'}`}>
                    {currentOffer.icon}
                  </div>
                </div>
                
                <h2 className="font-logo text-2xl font-bold text-foreground mb-1">
                  ARTLUX<span className="logo-infinity">∞</span>
                </h2>
                <p className="text-gold text-sm tracking-widest uppercase mb-4">
                  {currentOffer.subtitle}
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {currentOffer.title}
                </h3>
                
                {/* Big discount display */}
                <div className={`my-4 ${offerLevel === 3 ? 'animate-pulse' : ''}`}>
                  <span className="text-4xl font-bold text-gold">
                    {currentOffer.discount}
                  </span>
                  <span className="text-lg text-muted-foreground ml-2">OFF</span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-2">
                  {currentOffer.description}
                </p>
                
                {currentOffer.minOrder && (
                  <p className="text-gold text-xs mb-4">
                    *Minimum order ${currentOffer.minOrder} required
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border focus:border-gold"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full font-semibold ${
                      offerLevel === 3 
                        ? 'bg-gradient-to-r from-gold via-gold-light to-gold hover:opacity-90 text-primary animate-shimmer'
                        : 'bg-gold hover:bg-gold/90 text-primary'
                    }`}
                  >
                    {isLoading ? "Processing..." : currentOffer.buttonText}
                  </Button>
                </form>

                <button
                  onClick={handleDecline}
                  className="text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors underline"
                >
                  No thanks, I prefer paying full price
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gold/20">
                    <Sparkles className="w-8 h-8 text-gold" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {currentOffer.discount} Discount Unlocked!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your exclusive discount code:
                </p>

                <div className="bg-secondary/50 border border-gold/30 rounded-lg p-4 mb-6">
                  <p className="text-2xl font-mono font-bold text-gold tracking-wider">
                    {discountCode}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {currentOffer.minOrder 
                    ? `Valid for orders over $${currentOffer.minOrder}.`
                    : currentOffer.specialOffer
                    ? `Apply at checkout for ${currentOffer.discount} off ${currentOffer.specialOffer}.`
                    : `Apply at checkout for ${currentOffer.discount} off your order.`
                  }
                </p>

                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Shopping
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;