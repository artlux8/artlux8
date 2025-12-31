import { useState, useCallback } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import TurnstileWidget from "@/components/TurnstileWidget";

const emailSchema = z.string().email("Please enter a valid email address");

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

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
      toast.success("Welcome to the ARTLUX∞ Expert Newsletter!");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    setDiscountCode("");
    setTurnstileToken(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-accent/30 bg-background [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>Expert Newsletter Signup</DialogTitle>
        </VisuallyHidden>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          {/* Accent gradient header */}
          <div className="h-2 bg-gradient-to-r from-accent via-accent/80 to-accent" />
          
          <div className="p-8 text-center">
            {!isSubmitted ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                </div>
                
                <h2 className="font-logo text-2xl font-bold text-foreground mb-2">
                  Expert Newsletter
                </h2>
                <p className="text-accent text-sm tracking-widest uppercase mb-4">
                  Advanced Biohacking Insights
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Get 15% Off + Expert Content
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Join our expert community for advanced protocols, deep-dives into longevity science, and an exclusive discount.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border focus:border-accent"
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
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  >
                    {isLoading ? "Subscribing..." : "Join Expert Newsletter"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-accent/20">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to the Expert Circle!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your exclusive discount code for 15% off orders over $100:
                </p>

                <div className="bg-secondary/50 border border-accent/30 rounded-lg p-4 mb-6">
                  <p className="text-2xl font-mono font-bold text-accent tracking-wider">
                    {discountCode}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Use this code at checkout. Valid for first-time orders over $100.
                </p>

                <Button
                  onClick={handleClose}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Start Exploring
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
