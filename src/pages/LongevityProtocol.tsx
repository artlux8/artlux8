import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sun, Clock, Moon, Zap, Shield, Brain, Heart, Flame } from "lucide-react";

const LongevityProtocol = () => {
  useEffect(() => {
    document.title = "ARTLUX Longevity Protocol – Morning, Day & Night Anti-Aging System";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "The complete ARTLUX Longevity Protocol. Science-backed morning, day, and night supplement system for NAD+ activation, autophagy, and cellular renewal.");
    }
  }, []);

  const morningStack = [
    { name: "NAD+ Booster", benefit: "Cellular energy & DNA repair", icon: Zap },
    { name: "Mito Power", benefit: "Mitochondrial biogenesis", icon: Flame },
  ];

  const dayStack = [
    { name: "Lipo Detox", benefit: "Liver support & detoxification", icon: Shield },
    { name: "Omega-3 Ultra", benefit: "Anti-inflammatory support", icon: Heart },
  ];

  const nightStack = [
    { name: "Mind Focus", benefit: "Cognitive restoration", icon: Brain },
    { name: "Magnesium", benefit: "Sleep & recovery", icon: Moon },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Science-Backed System</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              ARTLUX Longevity Protocol™
              <br />
              <span className="text-accent">Morning. Day. Night.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              A comprehensive anti-aging system designed to optimize NAD+ levels, 
              activate autophagy, and support mitochondrial health throughout your day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Start Full Protocol
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                Download Protocol Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Science Background */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Science Behind the Protocol
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Aging is driven by a decline in cellular energy production, accumulation of damaged mitochondria, 
              and reduced autophagy. The ARTLUX Protocol targets all three mechanisms simultaneously.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-card p-6 rounded-xl border border-border">
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">NAD+ Activation</h4>
                <p className="text-muted-foreground text-sm">Restore cellular energy and DNA repair capacity.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Flame className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Mitochondrial Support</h4>
                <p className="text-muted-foreground text-sm">Optimize energy production at the cellular level.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Shield className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Autophagy Activation</h4>
                <p className="text-muted-foreground text-sm">Clear damaged cells and promote cellular renewal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Morning Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-500" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">Morning Stack</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-8">
                Kickstart your day with cellular energy activation. NAD+ and mitochondrial support 
                for all-day vitality and mental clarity.
              </p>
              <div className="space-y-4 mb-8">
                {morningStack.map((item, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Morning Stack
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Sun className="w-24 h-24 text-amber-500 mx-auto mb-4" />
                <p className="text-foreground font-medium">6:00 AM - 9:00 AM</p>
                <p className="text-muted-foreground text-sm">With breakfast</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Stack */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Clock className="w-24 h-24 text-blue-500 mx-auto mb-4" />
                <p className="text-foreground font-medium">12:00 PM - 2:00 PM</p>
                <p className="text-muted-foreground text-sm">With lunch</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">Day Stack</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-8">
                Mid-day support for detoxification and inflammation control. 
                Keep your system clean and inflammation-free.
              </p>
              <div className="space-y-4 mb-8">
                {dayStack.map((item, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Day Stack
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Night Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">Night Stack</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-8">
                Support deep sleep and overnight recovery. Cognitive restoration 
                and muscle repair while you rest.
              </p>
              <div className="space-y-4 mb-8">
                {nightStack.map((item, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Night Stack
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Moon className="w-24 h-24 text-purple-500 mx-auto mb-4" />
                <p className="text-foreground font-medium">8:00 PM - 10:00 PM</p>
                <p className="text-muted-foreground text-sm">Before bed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Start the complete ARTLUX Longevity Protocol and experience the difference of science-backed supplementation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
              Start Full Protocol
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
              Take Genetic Test
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LongevityProtocol;
