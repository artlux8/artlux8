import { useState, useEffect, useCallback } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import TurnstileWidget from "@/components/TurnstileWidget";

const emailSchema = z.string().email("Please enter a valid email address");

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("artlux-newsletter-seen");
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const generateDiscountCode = () => {
    return `ARTLUX15-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
    } catch {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!turnstileToken) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    setIsLoading(true);
    const code = generateDiscountCode();

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { 
          email, 
          turnstileToken,
          discountCode: code 
        }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        if (data.error.includes('already subscribed')) {
          toast.error("This email is already subscribed!");
        } else {
          toast.error(data.error);
        }
        return;
      }

      setDiscountCode(code);
      setIsSubmitted(true);
      localStorage.setItem("artlux-newsletter-seen", "true");
      toast.success("Welcome to ARTLUX∞!");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("artlux-newsletter-seen", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-gold/30 bg-background [&>button]:hidden" aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Newsletter Signup</DialogTitle>
        </VisuallyHidden>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          {/* Gold gradient header */}
          <div className="h-2 bg-gradient-to-r from-gold via-gold-light to-gold" />
          
          <div className="p-8 text-center">
            {!isSubmitted ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-teal/10">
                    <Sparkles className="w-8 h-8 text-teal" />
                  </div>
                </div>
                
                <h2 className="font-logo text-2xl font-bold text-foreground mb-2">
                  ARTLUX<span className="logo-infinity">∞</span>
                </h2>
                <p className="text-gold text-sm tracking-widest uppercase mb-4">
                  The Luxury Longevity
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Get 15% Off Your First Order
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Join our community and receive an exclusive discount on orders over $100.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border focus:border-gold"
                    required
                  />
                  
                  <TurnstileWidget
                    onVerify={handleTurnstileVerify}
                    onExpire={handleTurnstileExpire}
                    theme="dark"
                    size="normal"
                  />
                  
                  <Button
                    type="submit"
                    disabled={isLoading || !turnstileToken}
                    className="w-full bg-gold hover:bg-gold/90 text-primary font-semibold"
                  >
                    {isLoading ? "Subscribing..." : "Get My 15% Off"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-teal/20">
                    <Sparkles className="w-8 h-8 text-teal" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to ARTLUX∞!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your exclusive discount code for 15% off orders over $100:
                </p>

                <div className="bg-secondary/50 border border-gold/30 rounded-lg p-4 mb-6">
                  <p className="text-2xl font-mono font-bold text-gold tracking-wider">
                    {discountCode}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Use this code at checkout. Valid for first-time orders over $100.
                </p>

                <Button
                  onClick={handleClose}
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

export default NewsletterPopup;
