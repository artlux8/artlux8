import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Gift } from "lucide-react";

const FreeProtocolCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gold/10 via-secondary/50 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 mb-6">
            <Gift className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Free Program</span>
          </div>
          
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
          
          <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
            Longevity Should Be Free
          </h2>
          
          <p className="text-muted-foreground text-lg mb-6">
            Join the 7-Day ARTLUX Protocol Challenge and get a{" "}
            <span className="text-gold font-semibold">FREE Hydrogen Water Bottle</span> — just cover shipping.
          </p>
          
          <p className="text-foreground italic mb-8">
            Because real health shouldn't require permission from Big Pharma.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
              <Link to="/free-protocol">
                Join Free Challenge
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold/50 hover:bg-gold/10">
              <Link to="/free-protocol">
                Download Free Program
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeProtocolCTA;