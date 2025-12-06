import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Brain, Shield, Heart, Sparkles } from "lucide-react";

const BioactiveNutrients = () => {
  useEffect(() => {
    document.title = "ARTLUX Bioactive Nutrients – Mushrooms, Colostrum & Peptides";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Premium bioactive supplements including medicinal mushrooms, colostrum, and bioactive peptides for immune support, cognitive enhancement, and longevity.");
    }
  }, []);

  const products = [
    {
      icon: Leaf,
      name: "Lion's Mane Extract",
      price: "$49",
      description: "Neurogenesis support for brain health and cognitive enhancement.",
      benefits: ["Nerve Growth Factor", "Memory Support", "Focus Enhancement"],
    },
    {
      icon: Shield,
      name: "Reishi Mushroom",
      price: "$39",
      description: "Adaptogenic mushroom for stress resilience and immune support.",
      benefits: ["Immune Modulation", "Stress Adaptation", "Sleep Quality"],
    },
    {
      icon: Brain,
      name: "Cordyceps Militaris",
      price: "$45",
      description: "Athletic performance and energy enhancement.",
      benefits: ["ATP Production", "Oxygen Utilization", "Endurance"],
    },
    {
      icon: Heart,
      name: "Bovine Colostrum",
      price: "$59",
      description: "Immune support and gut healing with growth factors.",
      benefits: ["IgG Antibodies", "Gut Healing", "Growth Factors"],
    },
    {
      icon: Sparkles,
      name: "Turkey Tail",
      price: "$35",
      description: "Powerful immune support and gut microbiome enhancement.",
      benefits: ["Beta-Glucans", "Prebiotic Fiber", "Immune Support"],
    },
    {
      icon: Shield,
      name: "Chaga Extract",
      price: "$42",
      description: "Antioxidant powerhouse with anti-inflammatory benefits.",
      benefits: ["High ORAC Score", "Anti-Inflammatory", "Melanin Support"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(200,150,100,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Nature's Intelligence</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Bioactive Nutrients
              <br />
              <span className="text-accent">Mushrooms. Colostrum. Peptides.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Harness the power of nature's most potent compounds. Medicinal mushrooms, 
              bovine colostrum, and bioactive peptides for immune support, cognition, and longevity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop Bioactives
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Bioactive Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clinically-dosed extracts from medicinal mushrooms and bioactive compounds.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <product.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold text-accent mb-3">{product.price}</p>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <ul className="space-y-1 mb-6">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bioactives Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Bioactive Nutrients?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              While synthetic supplements focus on isolated compounds, bioactive nutrients 
              contain the full spectrum of co-factors and compounds that work synergistically 
              for optimal absorption and effectiveness.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2">Full Spectrum</h4>
                <p className="text-muted-foreground text-sm">Complete matrix of compounds, not isolated synthetics.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2">Synergistic Action</h4>
                <p className="text-muted-foreground text-sm">Co-factors enhance absorption and effectiveness.</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-2">Time-Tested</h4>
                <p className="text-muted-foreground text-sm">Thousands of years of traditional use backed by modern science.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BioactiveNutrients;
