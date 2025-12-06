import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Droplets, Filter, Zap, Shield } from "lucide-react";

const WaterSystems = () => {
  useEffect(() => {
    document.title = "ARTLUX Water Systems – Ionizers, Filters & Hydrogen-On-Tap";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Premium water ionizers, filtration systems, and hydrogen water generators. Transform your water into a powerful health tool.");
    }
  }, []);

  const categories = [
    {
      icon: Zap,
      title: "Water Ionizers",
      description: "Electrolysis-based systems that create alkaline, antioxidant-rich water.",
      products: ["ARTLUX Ionizer Pro", "ARTLUX Ionizer Elite"],
    },
    {
      icon: Filter,
      title: "Filtration Systems",
      description: "Multi-stage filtration removing contaminants while preserving minerals.",
      products: ["ARTLUX Pure Filter", "ARTLUX Whole-House System"],
    },
    {
      icon: Droplets,
      title: "Hydrogen-On-Tap",
      description: "Under-sink hydrogen water generators for unlimited H2 water.",
      products: ["ARTLUX H2 Tap", "ARTLUX H2 Pro System"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-cyan-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(100,200,255,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Droplets className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Luxury Water Technology</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Water Systems
              <br />
              <span className="text-accent">Pure. Structured. Alive.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Transform your water into a powerful health tool with ionizers, filtration systems, 
              and hydrogen generators designed for optimal hydration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop Water Systems
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
              Water Technology Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ionizers to hydrogen generators, find the perfect water system for your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-all">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <category.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{category.description}</p>
                  <ul className="space-y-2 mb-8">
                    {category.products.map((product, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {product}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    View Products
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Water Quality Matters */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Water Quality Matters
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your body is 70% water. The quality of water you drink directly impacts cellular function, 
              detoxification, and overall longevity. Standard tap water contains chlorine, fluoride, 
              heavy metals, and microplastics that accumulate over time.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-card p-6 rounded-xl border border-border">
                <Shield className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Remove Toxins</h4>
                <p className="text-muted-foreground text-sm">Filter out chlorine, fluoride, heavy metals, and microplastics.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Add Antioxidants</h4>
                <p className="text-muted-foreground text-sm">Hydrogen-rich water provides powerful antioxidant benefits.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Droplets className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-semibold text-foreground mb-2">Optimal Hydration</h4>
                <p className="text-muted-foreground text-sm">Structured water is more easily absorbed by cells.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WaterSystems;
