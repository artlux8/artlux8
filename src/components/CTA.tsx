import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-accent/20 via-secondary to-accent/10 rounded-3xl p-10 md:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 100% 0%, hsl(var(--accent)) 0%, transparent 50%)`
          }} />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to Transform Your Health?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Take our free health assessment and get personalized recommendations 
              based on your unique biology and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 rounded-full font-semibold group">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-base px-8 py-6 rounded-full font-semibold">
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;