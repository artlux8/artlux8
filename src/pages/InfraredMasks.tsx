import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sun, Sparkles, Clock, Shield, Zap } from "lucide-react";

const InfraredMasks = () => {
  const redLightFAQ = [
    { question: "What is red light therapy?", answer: "Red light therapy uses specific wavelengths of red and near-infrared light to support cellular energy production. It's a non-invasive wellness technology used for skin optimization and general wellness support." },
    { question: "How often should I use an LED mask?", answer: "Most users incorporate LED mask sessions 3-5 times per week, with each session lasting 10-20 minutes. Consistency is key for experiencing the full benefits of light therapy as a lifestyle practice." },
    { question: "What wavelengths are most effective?", answer: "Red light at 630-660nm and near-infrared at 830-850nm are commonly used in LED therapy devices. Different wavelengths penetrate to different depths, supporting various aspects of skin and cellular wellness." },
    { question: "Is LED light therapy safe?", answer: "LED light therapy at appropriate intensities is considered safe for most people. It's a non-thermal, non-invasive technology. Those with photosensitivity conditions should consult a professional before use." },
  ];

  const benefits = [
    { icon: Sparkles, title: "Collagen Production", description: "Stimulates fibroblasts for natural collagen synthesis" },
    { icon: Sun, title: "Cellular Energy", description: "Enhances mitochondrial ATP production" },
    { icon: Shield, title: "Skin Repair", description: "Accelerates healing and reduces inflammation" },
    { icon: Clock, title: "Anti-Aging", description: "Reduces fine lines, wrinkles, and age spots" },
    { icon: Zap, title: "Acne Treatment", description: "Blue light kills acne-causing bacteria" },
  ];

  const products = [
    {
      name: "ARTLUX LED Mask",
      price: "$299",
      description: "Entry-level LED therapy with red and blue light.",
      features: ["Red 630nm", "Blue 415nm", "15min Sessions", "Wireless"],
    },
    {
      name: "ARTLUX Pro Mask",
      price: "$599",
      description: "Multi-wavelength therapy with near-infrared penetration.",
      features: ["Red 630nm", "NIR 850nm", "Blue 415nm", "App Control", "Clinical Grade"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Red Light LED Masks | Professional Light Therapy Devices"
        description="Premium red light LED masks and therapy devices for skin optimization and cellular wellness. Professional-grade LED light therapy with red and near-infrared wavelengths for your biohacking lifestyle."
        keywords="red light LED mask, red light therapy, LED light therapy, near-infrared therapy, skin optimization, cellular wellness, biohacking light therapy, photobiomodulation, red light devices, premium LED mask"
        url="https://artlux8.com/infrared-masks"
        faq={redLightFAQ}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-red-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,100,100,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Sun className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">LED Light Therapy</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Infrared LED Masks
              <br />
              <span className="text-accent">Light Your Skin</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Clinical-grade LED light therapy for collagen production, skin repair, 
              and cellular rejuvenation. Professional results at home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Shop LED Masks
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
              The Science of Light Therapy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specific wavelengths of light penetrate skin to stimulate cellular processes 
              and enhance natural healing.
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
              Choose Your LED Mask
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className={`bg-card border-border hover:border-accent/50 transition-all ${index === 1 ? 'ring-2 ring-accent' : ''}`}>
                <CardContent className="p-8">
                  {index === 1 && (
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

export default InfraredMasks;
