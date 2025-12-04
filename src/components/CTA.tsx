import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Truck } from "lucide-react";

const benefits = [
  { icon: Shield, text: "Third-Party Tested" },
  { icon: Clock, text: "Subscribe & Save 15%" },
  { icon: Truck, text: "Free Shipping $75+" },
];

const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative bg-primary rounded-3xl p-10 md:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-1/2 h-full" style={{
              backgroundImage: `radial-gradient(circle at 100% 0%, hsl(var(--gold)) 0%, transparent 50%)`
            }} />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2" style={{
              backgroundImage: `radial-gradient(circle at 0% 100%, hsl(var(--gold)) 0%, transparent 50%)`
            }} />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-gold-light font-medium text-sm tracking-widest uppercase mb-4">
                Start Your Journey
              </p>
              <h2 className="font-logo text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                Ready to Optimize Your Healthspan?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-8">
                Take our free health assessment and get personalized supplement recommendations 
                based on your unique biology, lifestyle, and longevity goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-primary text-base px-8 py-6 rounded-full font-semibold group">
                  Take the Quiz
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-full font-semibold">
                  Shop All Products
                </Button>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-2 text-primary-foreground/80">
                    <benefit.icon className="w-4 h-4 text-gold-light" />
                    <span className="text-sm">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
              <h3 className="font-logo text-xl font-semibold text-primary-foreground mb-6">
                Why Choose ARTLUX∞?
              </h3>
              <div className="space-y-4">
                {[
                  { stat: "50+", label: "Clinically-dosed active compounds" },
                  { stat: "500+", label: "Peer-reviewed studies referenced" },
                  { stat: "100%", label: "Third-party tested for purity" },
                  { stat: "25K+", label: "Customers optimizing their health" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 pb-4 border-b border-primary-foreground/10 last:border-0 last:pb-0">
                    <span className="text-2xl font-bold text-gold-light min-w-[60px]">{item.stat}</span>
                    <span className="text-primary-foreground/70 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;