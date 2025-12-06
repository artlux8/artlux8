import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dna, ArrowRight, Beaker, Brain, Zap, Heart } from "lucide-react";

const sciencePoints = [
  { icon: Dna, label: "Autophagy Activation", desc: "Cellular self-cleaning" },
  { icon: Zap, label: "NAD+ Optimization", desc: "Energy currency boost" },
  { icon: Brain, label: "Mitochondrial Health", desc: "Cellular powerhouses" },
  { icon: Heart, label: "Inflammation Control", desc: "Root cause healing" }
];

const ScienceAutophagy = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Beaker className="w-5 h-5 text-gold" />
                <span className="text-gold text-sm tracking-widest uppercase font-medium">
                  Nobel Prize-Winning Science
                </span>
              </div>
              
              <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-6">
                Autophagy — Your Built-In Healing System
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6">
                Autophagy is the Nobel Prize–winning process of cellular self-cleaning.
                It removes damaged cells, regenerates tissue, boosts energy and slows aging.
              </p>
              
              <p className="text-foreground font-medium mb-8">
                ARTLUX integrates autophagy boosters into every product line:
                fasting guidance, hydrogen water synergy, cold exposure routines, 
                and longevity supplements like urolithin A, spermidine, and trehalose.
              </p>
              
              <Button asChild className="bg-gold hover:bg-gold/90 text-primary">
                <Link to="/expert-biohacker">
                  Explore Advanced Science
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            {/* Visual Grid */}
            <div className="grid grid-cols-2 gap-4">
              {sciencePoints.map((point, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 hover:border-gold/30 transition-colors"
                >
                  <point.icon className="w-8 h-8 text-gold mb-3" />
                  <h3 className="text-foreground font-semibold mb-1">{point.label}</h3>
                  <p className="text-muted-foreground text-sm">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 bg-card rounded-2xl border border-gold/20 p-8 text-center">
            <p className="text-gold font-logo text-xl font-bold">
              You don't need drugs — your body already knows how to heal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceAutophagy;