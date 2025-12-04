import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Brain, Flame, Snowflake, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-logo font-bold tracking-wider mb-6">
              THE <span className="logo-infinity">ARTLUX∞</span> STORY
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Where science meets luxury in the pursuit of human optimization
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Pills */}
      <nav className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {[
              { id: "vision", label: "THE VISION" },
              { id: "pioneers", label: "THE PIONEERS" },
              { id: "science", label: "THE SCIENCE" },
              { id: "mission", label: "OUR MISSION" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-4 py-2 text-xs md:text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* The Vision Section */}
      <section id="vision" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-gold mb-4">
                THE VISION
              </h2>
              <h3 className="text-3xl md:text-4xl font-logo font-semibold mb-6">
                The Younger Years
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At the age of 21, witnessing the fragility of human life and the desperate pursuit of health amongst those who had already lost it, we made a decision that would define our path: to devote our existence to making the largest and most meaningful impact on human longevity.
                </p>
                <p>
                  We observed how the wealthy sought wellness only after disease struck, how preventive care remained a luxury, and how the science of longevity was locked behind academic walls, inaccessible to those who needed it most.
                </p>
                <p className="text-foreground font-medium">
                  ARTLUX∞ was born from a simple yet profound belief: everyone deserves access to the science of living longer, living better.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 to-gold-dark/10 rounded-lg flex items-center justify-center">
                <Heart className="w-24 h-24 text-gold/40" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* The Pioneers Section */}
      <section id="pioneers" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-gold mb-4">
              THE PIONEERS
            </h2>
            <h3 className="text-3xl md:text-4xl font-logo font-semibold mb-6">
              Standing on the Shoulders of Giants
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our philosophy is shaped by the revolutionary minds who challenged conventional medicine and proved that human potential has no limits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Gary Brecka */}
            <div className="bg-card border border-border/50 rounded-lg p-8 hover:border-gold/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h4 className="text-xl font-logo font-semibold">Gary Brecka</h4>
                  <p className="text-sm text-gold">Human Biologist & Biohacker</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  Gary Brecka is a professional Human Biologist and Co-Founder of 10X Health System. His revolutionary work in genetic testing and personalized supplementation has transformed how we understand individual health optimization.
                </p>
                <p>
                  With over two decades of experience studying mortality prediction and life expectancy, Brecka discovered that the human body has an extraordinary capacity for self-healing when given the precise nutrients it needs.
                </p>
                <blockquote className="border-l-2 border-gold/50 pl-4 italic text-foreground">
                  "The goal is not just to extend life, but to empower people to become the best version of themselves."
                </blockquote>
                <p>
                  His approach of identifying genetic weaknesses and addressing them through targeted supplementation has helped countless individuals—from elite athletes to everyday people—achieve unprecedented levels of health and performance.
                </p>
              </div>
            </div>

            {/* Wim Hof */}
            <div className="bg-card border border-border/50 rounded-lg p-8 hover:border-gold/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                  <Snowflake className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h4 className="text-xl font-logo font-semibold">Wim Hof</h4>
                  <p className="text-sm text-gold">The Iceman</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  Dutch extreme athlete Wim Hof earned his nickname "The Iceman" by breaking numerous records related to cold exposure—climbing Mount Kilimanjaro in shorts, running a half marathon above the Arctic Circle barefoot, and standing submerged in ice for nearly two hours.
                </p>
                <p>
                  But beyond the spectacular feats lies a profound discovery: through specific breathing techniques and cold exposure, humans can consciously influence their autonomic nervous system and immune response—something previously thought impossible.
                </p>
                <blockquote className="border-l-2 border-gold/50 pl-4 italic text-foreground">
                  "I'm not afraid of death. I'm afraid not to have lived fully."
                </blockquote>
                <p>
                  The Wim Hof Method has since been validated by multiple scientific studies, proving that with proper training, anyone can develop extraordinary control over their body's inflammatory response and stress resilience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section id="science" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gold-dark/20 to-gold/10 rounded-lg flex items-center justify-center">
                <Flame className="w-24 h-24 text-gold/40" />
              </div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-gold mb-4">
                THE SCIENCE
              </h2>
              <h3 className="text-3xl md:text-4xl font-logo font-semibold mb-6">
                Blueprint for Longevity
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Modern longevity science has revealed what ancient wisdom always suspected: the human body is not designed to deteriorate. With the right inputs—precise nutrition, strategic supplementation, and evidence-based protocols—we can dramatically slow and even reverse biological aging.
                </p>
                <p>
                  Our formulations are built on peer-reviewed research, combining the latest discoveries in cellular senescence, mitochondrial function, and epigenetic regulation with bioavailable, pharmaceutical-grade ingredients.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { label: "Peer-Reviewed Studies", value: "500+" },
                    { label: "Active Ingredients", value: "50+" },
                    { label: "Quality Certifications", value: "12" },
                    { label: "Countries Served", value: "30+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-secondary/50 rounded-lg">
                      <div className="text-2xl font-logo font-bold text-gold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-medium tracking-[0.3em] uppercase text-gold-light mb-4">
              OUR MISSION
            </h2>
            <h3 className="text-3xl md:text-4xl font-logo font-semibold mb-8">
              Don't Just Live—Thrive
            </h3>
            <div className="space-y-6 text-primary-foreground/80 text-lg">
              <p>
                Now is the first time in human history when the science of longevity has advanced enough to make a meaningful difference. We are potentially the first generation with access to tools that can add not just years to life, but life to years.
              </p>
              <p>
                ARTLUX∞ exists to bridge the gap between cutting-edge longevity research and accessible daily practice. We believe that optimal health should not be a luxury reserved for the few, but a fundamental right accessible to all who seek it.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Target,
                  title: "Don't Die",
                  description: "Maximize healthspan through evidence-based protocols"
                },
                {
                  icon: Users,
                  title: "Don't Settle",
                  description: "Push the boundaries of human performance"
                },
                {
                  icon: Heart,
                  title: "Don't Wait",
                  description: "Start your longevity journey today"
                },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
                  <item.icon className="w-8 h-8 text-gold-light mx-auto mb-4" />
                  <h4 className="font-logo font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-primary-foreground/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
