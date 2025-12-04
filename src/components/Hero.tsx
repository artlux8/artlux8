import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 40%)`
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-accent font-medium text-sm md:text-base tracking-widest uppercase mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Precision Health • Built for Your Biology
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Stay Unstoppable.
            <br />
            <span className="text-accent">Feel Incredible.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Science-backed supplements and protocols designed to optimize your health, 
            extend your lifespan, and unlock peak performance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 rounded-full font-semibold group">
              Explore Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-full font-semibold">
              Take The Quiz
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">500K+</p>
              <p className="text-primary-foreground/60 text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">98%</p>
              <p className="text-primary-foreground/60 text-sm">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">50+</p>
              <p className="text-primary-foreground/60 text-sm">Research Studies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Image Area */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary z-10" />
        <div 
          className="w-full h-full bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop')`
          }}
        />
      </div>
    </section>
  );
};

export default Hero;