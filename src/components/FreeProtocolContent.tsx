import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Dna, 
  Zap, 
  Activity, 
  Droplets,
  Wind,
  Snowflake,
  Sun,
  Moon,
  Download,
  ArrowRight,
  Shield,
  Heart,
  FileText
} from "lucide-react";
import { generateProtocolPDF } from "@/lib/generateProtocolPDF";
import { toast } from "sonner";
const pillars = [
  {
    number: "1",
    title: "Autophagy — Cellular Reset",
    icon: Dna,
    description: "Trigger autophagy daily using:",
    items: ["Fasting", "Hydrogen water", "Cold exposure", "Spermidine", "Trehalose", "Red light therapy"],
    highlight: "Autophagy = longevity."
  },
  {
    number: "2",
    title: "NAD+ Activation — Your Energy Currency",
    icon: Zap,
    description: "Boost naturally with:",
    items: ["Morning sunlight", "Cold exposure", "Niacinamide-free NAD boosters"]
  },
  {
    number: "3",
    title: "Mitochondrial Optimization",
    icon: Activity,
    description: "Your mitochondria decide how fast you age. ARTLUX provides the exact nutrients:",
    items: ["Urolithin A", "PQQ", "CoQ10 Ubiquinol", "ALCAR"]
  },
  {
    number: "4",
    title: "Water Quality",
    icon: Droplets,
    description: "The #1 source of toxins is tap water. You need:",
    items: ["Filters", "Hydrogen water", "Mineral restoration", "Baja Salt for electrolytes"]
  },
  {
    number: "5",
    title: "Breathwork & Oxygen",
    icon: Wind,
    description: "Simple protocols:",
    items: ["Wim Hof", "Brecka-style oxygen resets"],
    highlight: "Improve HRV, mood and detox."
  },
  {
    number: "6",
    title: "Cold Exposure Routine",
    icon: Snowflake,
    description: "Start with 15 seconds → build to 2 minutes.",
    items: [],
    highlight: "This resets dopamine, inflammation and mitochondrial output."
  },
  {
    number: "7",
    title: "Light, Sleep & Circadian Rhythm",
    icon: Sun,
    description: "",
    items: ["Morning sunlight = natural antidepressant", "Evening red light = melatonin increase", "Grounding = cortisol reset"]
  }
];

const downloads = [
  "Daily Autophagy Routine",
  "Fasting Guide",
  "Anti-Inflammation Food List",
  "Supplement Timing Plan",
  "Cold Plunge Beginner Guide",
  "Red Light Quick Start",
  "Hydrogen Water Daily Protocol",
  "Longevity Sleep Formula",
  "Breathwork Guide",
  "Grounding Protocol",
  "Morning Sunlight Routine",
  "Detox Protocol",
  "Mitochondria Optimization"
];

const FreeProtocolContent = () => {
  return (
    <div className="space-y-0">
      {/* Intro Text */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              You don't need a doctor to tell you how to live longer.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              You don't need pharmaceuticals to feel better.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              You don't need complicated medical routines to improve your health.
            </p>
            <p className="text-xl text-gold font-semibold mb-8">
              You need biology, not bureaucracy.
            </p>
            <p className="text-muted-foreground">
              And biology follows simple, powerful rules.
            </p>
            <p className="text-foreground mt-6">
              This is the <span className="text-gold font-semibold">Free ARTLUX Longevity Protocol</span> —
              the same foundational system used by biohackers, researchers and thousands of people who reclaimed their health naturally.
            </p>
          </div>
        </div>
      </section>

      {/* 7 Pillars Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              The 7 Pillars of Natural Longevity
            </h2>

            <div className="space-y-6">
              {pillars.map((pillar) => (
                <div 
                  key={pillar.number}
                  className="bg-card rounded-2xl border border-border p-6 md:p-8 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                        <pillar.icon className="w-6 h-6 text-gold" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-foreground mb-2">
                        {pillar.number}. {pillar.title}
                      </h3>
                      {pillar.description && (
                        <p className="text-muted-foreground mb-3">{pillar.description}</p>
                      )}
                      {pillar.items.length > 0 && (
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                          {pillar.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {pillar.highlight && (
                        <p className="text-gold font-medium">{pillar.highlight}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Pharma Manifesto */}
      <section className="py-20 bg-gradient-to-br from-destructive/5 via-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-6">
              Anti-Pharma Manifesto
            </h2>
            <div className="bg-card rounded-2xl border border-border p-8">
              <p className="text-2xl text-foreground font-medium mb-4">
                Pharma makes money when you stay sick.
              </p>
              <p className="text-muted-foreground mb-4">
                We make zero money from this free protocol.
              </p>
              <p className="text-gold font-semibold text-lg">
                We teach you how to avoid pills for life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Download className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
                FREE DOWNLOADS (PDFs)
              </h2>
              <p className="text-muted-foreground">
                Download our complete protocol guides — absolutely free.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {downloads.map((download, index) => (
                <button
                  key={index}
                  onClick={() => {
                    generateProtocolPDF(download);
                    toast.success(`Downloading ${download}...`);
                  }}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-gold/50 transition-colors text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-foreground font-medium">{download}</span>
                  <Download className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-gold transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gold/10 via-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Your Longevity Routine Today
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join the 7-day challenge and earn your free hydrogen water bottle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary" asChild>
                <a href="#join-form">
                  Download the Free Protocol
                  <Download className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-gold/50 hover:bg-gold/10" asChild>
                <a href="#join-form">
                  Start Your Longevity Routine Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeProtocolContent;
