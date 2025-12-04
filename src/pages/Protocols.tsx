import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Target, Brain, Snowflake, Activity, Dna, FlaskConical,
  Clock, Pill, Flame, Moon, Sun, Zap, Heart, Shield, Sparkles
} from "lucide-react";

interface Protocol {
  id: string;
  name: string;
  tagline: string;
  inspiredBy: string;
  gradient: string;
  icon: React.ElementType;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  benefits: string[];
  overview: string;
  keyPractices: { icon: React.ElementType; title: string; description: string }[];
}

const protocols: Protocol[] = [
  {
    id: "blueprint",
    name: "The Blueprint Protocol",
    tagline: "Algorithmic Self-Care",
    inspiredBy: "Bryan Johnson",
    gradient: "from-amber-500 to-orange-600",
    icon: Target,
    duration: "Daily Routine",
    difficulty: "Advanced",
    benefits: ["Biological Age Reversal", "Optimal Biomarkers", "Peak Performance"],
    overview: "A comprehensive, data-driven approach to health optimization. Every decision is guided by measurable outcomes, removing the guesswork from longevity.",
    keyPractices: [
      { icon: Sun, title: "Morning Protocol", description: "Wake at 5am, light exposure, precise supplementation timing" },
      { icon: Pill, title: "111+ Supplements", description: "Scientifically-dosed compounds targeting all aging pathways" },
      { icon: Clock, title: "Time-Restricted Eating", description: "Final meal by 11am, 18-hour daily fast" },
      { icon: Moon, title: "Sleep Optimization", description: "8.5 hours, temperature-controlled, tracked nightly" }
    ]
  },
  {
    id: "genetic",
    name: "Genetic Optimization",
    tagline: "Personalized Biohacking",
    inspiredBy: "Gary Brecka",
    gradient: "from-emerald-500 to-teal-600",
    icon: Brain,
    duration: "12-Week Program",
    difficulty: "Intermediate",
    benefits: ["Methylation Support", "Energy Enhancement", "Mental Clarity"],
    overview: "Based on your unique genetic blueprint, this protocol addresses specific methylation defects and nutrient deficiencies that are holding you back.",
    keyPractices: [
      { icon: Dna, title: "Gene Testing", description: "Identify MTHFR and other key genetic variants" },
      { icon: Pill, title: "Targeted Supplementation", description: "Methylated B-vitamins, CoQ10, specific cofactors" },
      { icon: Zap, title: "Hydrogen Water", description: "Molecular hydrogen for cellular optimization" },
      { icon: Activity, title: "Biomarker Tracking", description: "Regular blood panels to measure progress" }
    ]
  },
  {
    id: "iceman",
    name: "The Iceman Method",
    tagline: "Master Your Physiology",
    inspiredBy: "Wim Hof",
    gradient: "from-cyan-500 to-blue-600",
    icon: Snowflake,
    duration: "10-Week Journey",
    difficulty: "Intermediate",
    benefits: ["Immune Boosting", "Stress Resilience", "Mental Fortitude"],
    overview: "Harness the power of cold exposure and controlled breathing to unlock your body's innate ability to heal and adapt.",
    keyPractices: [
      { icon: Snowflake, title: "Cold Exposure", description: "Progressive cold immersion from showers to ice baths" },
      { icon: Flame, title: "Breathwork", description: "Cyclic hyperventilation followed by breath retention" },
      { icon: Brain, title: "Mindset Training", description: "Mental commitment exercises and visualization" },
      { icon: Heart, title: "Autonomic Control", description: "Learn to influence heart rate and inflammation" }
    ]
  },
  {
    id: "medicine3",
    name: "Medicine 3.0",
    tagline: "Prevent, Don't React",
    inspiredBy: "Peter Attia",
    gradient: "from-violet-500 to-purple-600",
    icon: Activity,
    duration: "Lifestyle System",
    difficulty: "Intermediate",
    benefits: ["Healthspan Extension", "Disease Prevention", "Metabolic Health"],
    overview: "Shift from reactive medicine to proactive longevity. Address the four horsemen of chronic disease before they arrive.",
    keyPractices: [
      { icon: Activity, title: "Zone 2 Cardio", description: "3-4 hours weekly of aerobic base building" },
      { icon: Zap, title: "Strength Training", description: "Focus on grip, leg strength, and functional capacity" },
      { icon: Shield, title: "Metabolic Health", description: "Continuous glucose monitoring, insulin sensitivity" },
      { icon: Brain, title: "Emotional Health", description: "The often-neglected pillar of longevity" }
    ]
  },
  {
    id: "sirtuins",
    name: "Sirtuin Activation",
    tagline: "Reprogram Your Genes",
    inspiredBy: "David Sinclair",
    gradient: "from-rose-500 to-pink-600",
    icon: Dna,
    duration: "Ongoing Protocol",
    difficulty: "Advanced",
    benefits: ["Epigenetic Rejuvenation", "NAD+ Restoration", "Cellular Repair"],
    overview: "Target the biological mechanisms of aging at the epigenetic level. Restore youthful gene expression patterns.",
    keyPractices: [
      { icon: Pill, title: "NMN/NR Supplementation", description: "Restore NAD+ levels to support sirtuin function" },
      { icon: Flame, title: "Hormetic Stressors", description: "Fasting, exercise, cold/heat exposure" },
      { icon: Sparkles, title: "Resveratrol & Fisetin", description: "Polyphenols that activate longevity genes" },
      { icon: Moon, title: "Circadian Optimization", description: "Light exposure patterns that support epigenetics" }
    ]
  },
  {
    id: "neuroscience",
    name: "Neuroscience Protocol",
    tagline: "Optimize Your Brain",
    inspiredBy: "Andrew Huberman",
    gradient: "from-indigo-500 to-blue-700",
    icon: FlaskConical,
    duration: "Daily Practices",
    difficulty: "Beginner",
    benefits: ["Enhanced Focus", "Better Sleep", "Dopamine Regulation"],
    overview: "Evidence-based tools from neuroscience to optimize focus, motivation, and recovery through simple daily practices.",
    keyPractices: [
      { icon: Sun, title: "Morning Sunlight", description: "10-30 min outdoor light within 1 hour of waking" },
      { icon: Clock, title: "Caffeine Timing", description: "Delay coffee 90-120 min after waking" },
      { icon: Snowflake, title: "Cold Exposure", description: "1-3 min cold shower for dopamine boost" },
      { icon: Moon, title: "Sleep Protocols", description: "Temperature, light, and timing optimization" }
    ]
  }
];

const Protocols = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-gold mb-4 block">
              ARTLUX∞ PROTOCOLS
            </span>
            <h1 className="text-4xl md:text-6xl font-logo font-bold tracking-wider mb-6">
              Science-Backed <span className="text-gold">Longevity</span> Systems
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Curated protocols from the world's leading longevity experts, adapted for practical daily implementation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gold hover:bg-gold-dark text-primary font-medium px-8">
                Start Your Journey
              </Button>
              <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                Compare Protocols
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-7xl mx-auto">
            {protocols.map((protocol, index) => (
              <div 
                key={protocol.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Protocol Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${protocol.gradient} flex items-center justify-center shadow-lg`}>
                      <protocol.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-gold font-medium tracking-wider uppercase">
                        Inspired by {protocol.inspiredBy}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-logo font-semibold">
                        {protocol.name}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground italic mb-4">
                    "{protocol.tagline}"
                  </p>
                  
                  <p className="text-muted-foreground mb-6">
                    {protocol.overview}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {protocol.benefits.map((benefit) => (
                      <span 
                        key={benefit}
                        className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {protocol.duration}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      protocol.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      protocol.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {protocol.difficulty}
                    </span>
                  </div>
                  
                  <Button className={`bg-gradient-to-r ${protocol.gradient} text-white hover:opacity-90`}>
                    Explore Protocol
                  </Button>
                </div>
                
                {/* Key Practices Card */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-gold/20 transition-colors">
                    <h3 className="text-lg font-logo font-semibold mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold" />
                      Key Practices
                    </h3>
                    <div className="space-y-4">
                      {protocol.keyPractices.map((practice, i) => (
                        <div 
                          key={practice.title}
                          className="flex gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${protocol.gradient} flex items-center justify-center shrink-0`}>
                            <practice.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{practice.title}</h4>
                            <p className="text-xs text-muted-foreground">{practice.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-logo font-semibold mb-6">
              Ready to Start Your Longevity Journey?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Our premium supplements are formulated to support each protocol. Get personalized recommendations based on your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-primary font-medium">
                Shop All Products
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground">
                Take the Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Protocols;
