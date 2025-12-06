import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Dna, 
  Sparkles, 
  Sun, 
  Snowflake, 
  Zap,
  Heart,
  ArrowRight,
  Shield,
  Leaf,
  Brain,
  Activity
} from "lucide-react";

const ecosystemFeatures = [
  { icon: Droplets, label: "Hydrogen water" },
  { icon: Dna, label: "Autophagy activation" },
  { icon: Zap, label: "NAD+ boosting" },
  { icon: Activity, label: "Mitochondrial repair" },
  { icon: Snowflake, label: "Cold exposure" },
  { icon: Leaf, label: "Grounding" },
  { icon: Sun, label: "Red light therapy" },
  { icon: Shield, label: "Clean supplements" },
];

const HomeLongContent = () => {
  return (
    <div className="space-y-0">
      {/* Intro Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Welcome to <span className="text-gold font-semibold">ARTLUX∞</span> — a next-generation longevity ecosystem 
              built for people who want more out of life than simply "not being sick."
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-card rounded-2xl border border-border">
                <Heart className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="text-foreground font-medium">Health is your birthright.</p>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <Zap className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="text-foreground font-medium">Energy is your foundation.</p>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-border">
                <Sparkles className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="text-foreground font-medium">Longevity is your purpose.</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-8 text-lg">
              And unlike Big Pharma, we don't profit from sickness — <span className="text-gold">we empower you to stay healthy.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
              The ARTLUX<span className="logo-infinity">∞</span> Longevity Ecosystem
            </h2>
            <p className="text-muted-foreground text-center text-lg mb-12 max-w-3xl mx-auto">
              The modern world is built to age you faster — processed food, polluted water, poor sleep, 
              chronic stress, low-quality supplements and pharmaceutical dependency.
            </p>
            <p className="text-foreground text-center text-lg mb-12 font-medium">
              ARTLUX brings together the world's most effective tools for natural health optimization:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ecosystemFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border hover:border-gold/30 transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-gold mb-3" />
                  <span className="text-foreground text-sm font-medium text-center">{feature.label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8">
              Everything your body actually needs to stay alive, young, strong and clear-minded.
            </p>
          </div>
        </div>
      </section>

      {/* Autophagy Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Dna className="w-6 h-6 text-gold" />
              <span className="text-gold text-sm tracking-widest uppercase font-medium">
                Nobel Prize-Winning Science
              </span>
            </div>
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
              Autophagy — Your Built-In Healing System
            </h2>
            <p className="text-muted-foreground text-center text-lg mb-8">
              Autophagy is the Nobel Prize–winning process of cellular self-cleaning.
              It removes damaged cells, regenerates tissue, boosts energy and slows aging.
            </p>
            <div className="bg-card rounded-2xl border border-border p-8">
              <p className="text-foreground font-medium mb-4">ARTLUX integrates autophagy boosters into every product line:</p>
              <ul className="space-y-3">
                {[
                  "Fasting guidance",
                  "Hydrogen water synergy",
                  "Cold exposure routine",
                  "Longevity supplements (urolithin A, spermidine, trehalose)"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gold font-medium mt-6 text-center text-lg">
                You don't need drugs — your body already knows how to heal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hydrogen Water Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-gold" />
              <span className="text-gold text-sm tracking-widest uppercase font-medium">
                Molecular Antioxidant
              </span>
            </div>
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
              Hydrogen Water Technology
            </h2>
            <p className="text-muted-foreground text-center text-lg mb-8">
              Hydrogen is one of the most powerful antioxidants in existence.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-foreground font-semibold mb-4">Benefits include:</h3>
                <ul className="space-y-2">
                  {[
                    "Reduced inflammation",
                    "Improved mitochondrial function",
                    "Better recovery",
                    "Increased NAD+",
                    "Enhanced autophagy",
                    "Sharper thinking"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gold/10 to-secondary rounded-2xl border border-gold/20 p-6 flex flex-col justify-center">
                <p className="text-foreground text-center">
                  Our GO and PRO bottles use premium <span className="text-gold font-semibold">SPE/PEM membranes</span> to 
                  deliver medical-grade hydrogen concentration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grounding & Red Light */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
              Grounding & Red Light Therapy
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-2xl border border-border p-6">
                <Leaf className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-foreground font-semibold text-lg mb-2">Grounding</h3>
                <p className="text-muted-foreground">
                  Reduces inflammation and improves sleep in ways pharmaceuticals cannot match.
                </p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <Sun className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-foreground font-semibold text-lg mb-2">Red Light Therapy</h3>
                <p className="text-muted-foreground">
                  Boosts collagen, repairs skin, and enhances mitochondria.
                </p>
              </div>
            </div>
            <p className="text-center text-foreground mt-8">
              ARTLUX makes these tools <span className="text-gold font-medium">portable, affordable and infinitely effective.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Free Challenge CTA */}
      <section className="py-20 bg-gradient-to-br from-gold/10 via-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Free Hydrogen Bottle Challenge
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              We believe longevity knowledge should be free.
            </p>
            <p className="text-foreground text-lg mb-8">
              Join the challenge and get an <span className="text-gold font-semibold">ARTLUX Hydrogen GO Bottle for FREE</span> — just cover shipping.
            </p>
            <p className="text-muted-foreground italic mb-8">
              Because real health shouldn't require permission from Big Pharma.
            </p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
              <Link to="/free-protocol">
                Join Free Challenge
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Anti-Pharma Truth */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
              The Truth Big Pharma Doesn't Want You To Know
            </h2>
            <div className="bg-card rounded-2xl border border-border p-8 mb-8">
              <p className="text-center text-2xl text-foreground font-medium mb-6">
                Sickness is profitable. Health is not.
              </p>
              <p className="text-muted-foreground text-center mb-6">This is why:</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  "No one teaches autophagy",
                  "No one teaches NAD+",
                  "No one teaches epigenetics",
                  "No one teaches cold exposure",
                  "No one teaches clean supplements"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-gold font-logo text-2xl font-bold">
              ARTLUX∞ exists to break that cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-8">
            Start Your Longevity Journey Today
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
              <Link to="/protocols">
                Start Your Protocol
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold/50 hover:bg-gold/10">
              <Link to="/free-protocol">
                Join Free Protocol
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
              <Link to="/shop">
                Explore Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLongContent;
