import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Brain, Flame, Snowflake, Users, Target, Dna, Activity, FlaskConical, LucideIcon } from "lucide-react";

interface Pioneer {
  name: string;
  initials: string;
  title: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
  quote: string;
  detail: string;
}

const pioneers: Pioneer[] = [
  {
    name: "Bryan Johnson",
    initials: "BJ",
    title: "Blueprint Founder",
    icon: Target,
    gradient: "from-amber-500 to-orange-600",
    description: "After selling Braintree Venmo for $800 million, Bryan Johnson dedicated his life to becoming the most measured human in history. His Blueprint protocol has achieved the world's best biomarkers.",
    quote: "Don't die. Don't kill each other. Don't destroy the planet.",
    detail: "With 30+ medical professionals monitoring every aspect of his biology, Johnson proves that aging can be slowed and even reversed through rigorous protocol adherence."
  },
  {
    name: "Gary Brecka",
    initials: "GB",
    title: "Human Biologist",
    icon: Brain,
    gradient: "from-emerald-500 to-teal-600",
    description: "Co-Founder of 10X Health System, Brecka's work in genetic testing and personalized supplementation has revolutionized individual health optimization.",
    quote: "The goal is to empower people to become the best version of themselves.",
    detail: "His approach identifies genetic weaknesses and addresses them through targeted supplementation, helping elite athletes and everyday people achieve peak performance."
  },
  {
    name: "Wim Hof",
    initials: "WH",
    title: "The Iceman",
    icon: Snowflake,
    gradient: "from-cyan-500 to-blue-600",
    description: '"The Iceman" proved humans can consciously influence their autonomic nervous system through breathing techniques and cold exposure—previously thought impossible.',
    quote: "I'm not afraid of death. I'm afraid not to have lived fully.",
    detail: "His scientifically-validated method enables anyone to develop extraordinary control over inflammation and stress resilience."
  },
  {
    name: "Peter Attia",
    initials: "PA",
    title: "Longevity Physician",
    icon: Activity,
    gradient: "from-violet-500 to-purple-600",
    description: 'Stanford-trained physician and author of "Outlive," Dr. Attia focuses on extending lifespan while improving healthspan through evidence-based medicine.',
    quote: "Medicine 3.0 is about delaying the onset of chronic disease and extending healthspan.",
    detail: "His framework for longevity—combining exercise, nutrition, sleep, and emotional health—has become the gold standard for preventive medicine."
  },
  {
    name: "David Sinclair",
    initials: "DS",
    title: "Harvard Geneticist",
    icon: Dna,
    gradient: "from-rose-500 to-pink-600",
    description: 'Harvard professor and author of "Lifespan," Dr. Sinclair\'s research on sirtuins and NAD+ has fundamentally changed our understanding of why we age.',
    quote: "Aging is a disease, and that disease is treatable.",
    detail: "His Information Theory of Aging suggests that aging is caused by loss of epigenetic information—and that it can be reversed."
  },
  {
    name: "Andrew Huberman",
    initials: "AH",
    title: "Neuroscientist",
    icon: FlaskConical,
    gradient: "from-indigo-500 to-blue-700",
    description: "Stanford neuroscientist whose Huberman Lab podcast has democratized cutting-edge science on sleep, focus, and performance optimization.",
    quote: "The nervous system is the most powerful pharmacy in the world.",
    detail: "His protocols for leveraging light, cold, heat, and supplementation have helped millions optimize their daily routines for peak performance."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About ARTLUX8 | Premium Biohacking & Longevity Brand Story"
        description="Discover the ARTLUX8 story - where science meets luxury in human optimization. Inspired by Bryan Johnson, Gary Brecka, Peter Attia, and leading longevity pioneers. Our mission to democratize longevity science."
        keywords="ARTLUX8 story, premium biohacking brand, luxury longevity store, biohacking lifestyle, human optimization brand, longevity pioneers, Bryan Johnson inspired, Gary Brecka protocols"
        url="https://artlux8.com/about"
        type="website"
      />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {pioneers.map((pioneer) => (
              <div key={pioneer.name} className="bg-card border border-border/50 rounded-lg p-6 hover:border-gold/30 transition-all hover:shadow-lg hover:shadow-gold/5 group">
                <div className="flex items-center gap-4 mb-5">
                  {/* Stylized Avatar with Initials */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pioneer.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                      <span className="text-white font-logo font-bold text-lg tracking-wider">
                        {pioneer.initials}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-gold/50 flex items-center justify-center">
                      <pioneer.icon className="w-3 h-3 text-gold" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-logo font-semibold">{pioneer.name}</h4>
                    <p className="text-xs text-gold">{pioneer.title}</p>
                  </div>
                </div>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>{pioneer.description}</p>
                  <blockquote className="border-l-2 border-gold/50 pl-3 italic text-foreground text-xs">
                    "{pioneer.quote}"
                  </blockquote>
                  <p>{pioneer.detail}</p>
                </div>
              </div>
            ))}
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
