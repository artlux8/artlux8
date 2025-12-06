import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Droplets, Zap, Shield, Brain, Heart } from "lucide-react";

const HydrogenBottles = () => {
  useEffect(() => {
    document.title = "ARTLUX Hydrogen Water Bottles – Portable H2 Generators";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Premium portable hydrogen water bottles with SPE/PEM technology. Generate antioxidant-rich hydrogen water on the go for enhanced energy and recovery.");
    }
  }, []);

  const benefits = [
    { icon: Zap, title: "Antioxidant Power", description: "Molecular hydrogen neutralizes harmful free radicals" },
    { icon: Brain, title: "Mental Clarity", description: "Crosses blood-brain barrier for cognitive support" },
    { icon: Heart, title: "Athletic Recovery", description: "Reduces lactic acid and speeds muscle recovery" },
    { icon: Shield, title: "Anti-Inflammatory", description: "Modulates inflammatory response naturally" },
    { icon: Droplets, title: "Cellular Hydration", description: "Smaller molecules for better cell penetration" },
  ];

  const products = [
    {
      name: "ARTLUX H2 GO",
      price: "$149",
      description: "Portable hydrogen bottle for daily use on the go.",
      features: ["350ml Capacity", "SPE/PEM Technology", "USB-C Charging", "3-min Cycle", "1000+ PPB"],
    },
    {
      name: "ARTLUX H2 PRO",
      price: "$299",
      description: "Premium hydrogen generator with higher concentration and capacity.",
      features: ["500ml Capacity", "Dual PEM Membrane", "Self-Cleaning Mode", "5-min Max Cycle", "1500+ PPB", "Glass Body"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-sky-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(100,180,255,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Droplets className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Hydrogen Water Technology</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Hydrogen Water Bottles
              <br />
              <span className="text-accent">Antioxidants On-The-Go</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Generate antioxidant-rich hydrogen water anywhere with portable SPE/PEM electrolysis technology. 
              The most powerful antioxidant, small enough to fit in your bag.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop H2 Bottles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                Learn the Science
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
              The Science of Hydrogen Water
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Molecular hydrogen (H2) is the smallest antioxidant molecule, able to penetrate 
              cell membranes and even cross the blood-brain barrier.
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
              Choose Your Hydrogen Bottle
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className={`bg-card border-border hover:border-accent/50 transition-all ${index === 1 ? 'ring-2 ring-accent' : ''}`}>
                <CardContent className="p-8">
                  {index === 1 && (
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-4">
                      Best Seller
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

export default HydrogenBottles;
