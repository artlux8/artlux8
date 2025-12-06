import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Heart, Moon, Zap, Shield } from "lucide-react";

const Grounding = () => {
  useEffect(() => {
    document.title = "ARTLUX Grounding & Earthing – Reduce Inflammation Naturally";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Premium grounding mats, sheets, and earthing products. Reduce inflammation, improve sleep, and balance cortisol through earth connection.");
    }
  }, []);

  const benefits = [
    { icon: Shield, title: "Reduced Inflammation", description: "Free electrons neutralize inflammatory free radicals" },
    { icon: Moon, title: "Better Sleep", description: "Normalizes cortisol rhythm and improves sleep quality" },
    { icon: Heart, title: "Heart Health", description: "Improves blood viscosity and circulation" },
    { icon: Zap, title: "More Energy", description: "Enhanced cellular function and reduced fatigue" },
    { icon: Leaf, title: "Stress Relief", description: "Calms nervous system and reduces anxiety" },
  ];

  const products = [
    {
      name: "Grounding Mat",
      price: "$79",
      description: "Desktop mat for daily grounding during work.",
      features: ["Desk Size", "Conductive Carbon", "15ft Cord", "Easy Setup"],
    },
    {
      name: "Grounding Sheet",
      price: "$149",
      description: "Full-size sheet for grounding while you sleep.",
      features: ["Queen/King Size", "Silver Thread", "Machine Washable", "Soft Cotton"],
    },
    {
      name: "Grounding Bundle",
      price: "$199",
      description: "Complete grounding kit with mat, sheet, and accessories.",
      features: ["Mat + Sheet", "Wrist Band", "Tester Included", "Travel Bag"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(100,200,100,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Earthing Technology</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Grounding & Earthing
              <br />
              <span className="text-accent">Connect to Earth</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Reconnect with the Earth's natural electric field. Reduce inflammation, 
              improve sleep, and restore balance to your body's electrical system.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop Grounding
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Science of Grounding
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Direct contact with the Earth transfers free electrons into your body, 
              neutralizing free radicals and reducing chronic inflammation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Grounding Products
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className={`bg-card border-border hover:border-accent/50 transition-all ${index === 2 ? 'ring-2 ring-accent' : ''}`}>
                <CardContent className="p-8">
                  {index === 2 && (
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-4">
                      Best Value
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-3xl font-bold text-accent mb-4">{product.price}</p>
                  <p className="text-muted-foreground text-sm mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
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

      <Footer />
    </div>
  );
};

export default Grounding;
