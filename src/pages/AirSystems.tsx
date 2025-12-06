import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Wind, Filter, Zap, Shield, Sparkles } from "lucide-react";

const AirSystems = () => {
  useEffect(() => {
    document.title = "ARTLUX Oxygen & Air Systems – HEPA, Ozone & UV Air Purification";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Premium air purification systems including HEPA filters, ozone generators, UV air cleaners, and oxygen concentrators for optimal respiratory health.");
    }
  }, []);

  const categories = [
    {
      icon: Filter,
      title: "HEPA Air Purifiers",
      description: "Medical-grade HEPA filtration removing 99.97% of airborne particles.",
      products: ["ARTLUX Air Pure", "ARTLUX Air Pro"],
    },
    {
      icon: Zap,
      title: "Ozone Generators",
      description: "Powerful sanitization for mold, bacteria, and odor elimination.",
      products: ["ARTLUX Ozone Mini", "ARTLUX Ozone Pro"],
    },
    {
      icon: Sparkles,
      title: "UV Air Cleaners",
      description: "UV-C light technology destroying pathogens and viruses.",
      products: ["ARTLUX UV Clean", "ARTLUX UV Sterilizer"],
    },
    {
      icon: Wind,
      title: "Oxygen Concentrators",
      description: "Medical-grade oxygen delivery for enhanced performance and recovery.",
      products: ["ARTLUX O2 Portable", "ARTLUX O2 Home"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(200,200,255,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Wind className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Air Quality Technology</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Oxygen & Air Systems
              <br />
              <span className="text-accent">Breathe Better. Live Better.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Premium air purification and oxygen delivery systems for optimal respiratory health, 
              enhanced performance, and faster recovery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop Air Systems
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Air Quality Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From HEPA purification to oxygen concentrators, breathe cleaner and live longer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <category.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <ul className="space-y-1 mb-6">
                    {category.products.map((product, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {product}
                      </li>
                    ))}
                  </ul>
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Air Quality Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Why Air Quality Matters for Longevity
            </h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p className="text-center mb-8">
                Indoor air is often 2-5x more polluted than outdoor air. We spend 90% of our time indoors. 
                The quality of air you breathe directly impacts cellular oxygenation, detoxification, and longevity.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Remove Pollutants</h4>
                  <p className="text-sm">HEPA filters capture dust, allergens, mold spores, and fine particulate matter (PM2.5).</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Kill Pathogens</h4>
                  <p className="text-sm">UV-C and ozone technology destroy bacteria, viruses, and fungi in the air.</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Boost Oxygen</h4>
                  <p className="text-sm">Oxygen concentrators enhance O2 levels for improved energy and recovery.</p>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Reduce Inflammation</h4>
                  <p className="text-sm">Clean air reduces respiratory inflammation and supports immune function.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AirSystems;
