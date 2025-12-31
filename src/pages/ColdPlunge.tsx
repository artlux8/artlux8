import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Snowflake, Heart, Brain, Zap, Timer, ThermometerSnowflake } from "lucide-react";

const ColdPlunge = () => {
  const coldPlungeFAQ = [
    { question: "What are the benefits of cold exposure?", answer: "Cold exposure is associated with dopamine enhancement, improved circulation, metabolic activation, and recovery support. Many athletes and longevity enthusiasts incorporate cold therapy as part of their optimization routine." },
    { question: "How cold should the water be?", answer: "Most cold plunge protocols recommend water temperatures between 50-59°F (10-15°C). Beginners often start at the warmer end and gradually work toward colder temperatures as tolerance develops." },
    { question: "How long should I stay in a cold plunge?", answer: "Sessions typically range from 2-10 minutes depending on experience level and water temperature. Start with shorter sessions and gradually increase duration as your body adapts." },
    { question: "Is cold plunge safe for everyone?", answer: "Cold exposure is a lifestyle practice that may not be suitable for everyone. Those with cardiovascular conditions or other health concerns should consult with a healthcare professional before beginning cold therapy." },
  ];

  const benefits = [
    { icon: Snowflake, title: "Reduced Inflammation", description: "Cold exposure activates anti-inflammatory pathways" },
    { icon: Heart, title: "Improved Circulation", description: "Enhances blood flow and cardiovascular health" },
    { icon: Brain, title: "Mental Clarity", description: "Dopamine boost for focus and mood elevation" },
    { icon: Zap, title: "Faster Recovery", description: "Accelerated muscle recovery post-workout" },
    { icon: Timer, title: "Longevity Activation", description: "Triggers autophagy and cellular renewal" },
    { icon: ThermometerSnowflake, title: "Metabolic Boost", description: "Activates brown fat and increases metabolism" },
  ];

  const products = [
    {
      name: "Cold Plunge Basic",
      price: "$2,499",
      description: "Entry-level cold therapy. Manual ice system with premium insulation.",
      features: ["150L Capacity", "Manual Ice Cooling", "Premium Insulation", "Easy Setup"],
    },
    {
      name: "Cold Plunge Pro",
      price: "$4,999",
      description: "Automated cooling system with precise temperature control.",
      features: ["200L Capacity", "Chiller System", "Digital Controls", "Ozone Purification"],
    },
    {
      name: "Cold Plunge Elite",
      price: "$8,999",
      description: "Professional-grade with advanced features and larger capacity.",
      features: ["300L Capacity", "WiFi Connected", "App Control", "UV + Ozone", "Contrast Therapy Ready"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Portable Cold Plunge Systems | Ice Bath & Cold Therapy"
        description="Premium portable cold plunge tubs and ice bath systems for cold exposure lifestyle. Support recovery optimization, dopamine enhancement, and metabolic activation. Elite cold therapy technology for biohackers."
        keywords="portable cold plunge, ice bath, cold therapy systems, cold exposure lifestyle, dopamine boost, recovery optimization, metabolic activation, biohacking cold therapy, Wim Hof method, longevity cold exposure"
        url="https://artlux8.com/cold-plunge"
        faq={coldPlungeFAQ}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(100,200,255,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Snowflake className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">Cold Therapy Technology</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Cold Plunge Systems
              <br />
              <span className="text-accent">Embrace the Cold</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Professional-grade ice bath systems for dopamine enhancement, inflammation reduction, 
              and metabolic activation. Used by elite athletes and longevity enthusiasts worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop Cold Plunges
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                Watch Video
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
              The Science of Cold Exposure
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cold therapy triggers powerful physiological responses that enhance longevity, 
              mental clarity, and physical performance.
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
              Choose Your Cold Plunge
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From entry-level to professional-grade, find the perfect cold therapy system for your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className={`bg-card border-border hover:border-accent/50 transition-all ${index === 1 ? 'ring-2 ring-accent' : ''}`}>
                <CardContent className="p-8">
                  {index === 1 && (
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-4">
                      Most Popular
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

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Recovery?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands who have enhanced their longevity and performance with cold therapy.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
            Shop Cold Plunges
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ColdPlunge;
