import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Dna, Heart } from "lucide-react";

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

      {/* Gold accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <Sparkles className="w-4 h-4 text-accent" />
            <p className="text-accent font-medium text-sm md:text-base tracking-widest uppercase">
              Longevity Supplements • Hydrogen Technology • Cold Therapy
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 opacity-0 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Unlock Your Longest,
            <br />
            <span className="text-accent">Healthiest Life</span>
          </h1>

          {/* Subheadline */}
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Longevity supplements, hydrogen technology, cold therapy & advanced protocols 
            inspired by real science — not pharmaceutical profits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 rounded-full font-semibold group">
              <Link to="/longevity-protocol">
                Start Your Protocol
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-full font-semibold">
              <Link to="/genetic-testing">
                Take Genetic Test
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Dna className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">50+</p>
                <p className="text-primary-foreground/60 text-sm">Active Compounds</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">500+</p>
                <p className="text-primary-foreground/60 text-sm">Clinical Studies</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">25K+</p>
                <p className="text-primary-foreground/60 text-sm">Happy Customers</p>
              </div>
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
            backgroundImage: `url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1920&auto=format&fit=crop')`
          }}
        />
        {/* Floating accent element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border border-accent/20 rounded-3xl z-20" />
      </div>
    </section>
  );
};

export default Hero;
