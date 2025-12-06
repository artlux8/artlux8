import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Syringe, Heart, Brain, Sparkles, Moon, AlertTriangle, Download, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const peptides = [
  {
    name: "BPC-157",
    nickname: "The Wolverine Peptide",
    benefits: ["gut healing", "tendon repair", "inflammation reduction", "recovery from injuries", "mental clarity"],
    icon: Heart
  },
  {
    name: "TB-500",
    nickname: "Regeneration Master Peptide",
    benefits: ["tissue healing", "wound repair", "muscle recovery"],
    icon: Sparkles
  },
  {
    name: "GHK-Cu",
    nickname: "Skin, Collagen & Anti-Aging",
    benefits: ["reduces wrinkles", "stimulates collagen", "protects DNA"],
    icon: Sparkles
  },
  {
    name: "Epitalon",
    nickname: "Telomere Support & Longevity",
    benefits: ["supports circadian rhythm", "improves sleep", "may slow aging"],
    icon: Moon
  },
  {
    name: "Melanotan II",
    nickname: "Hormonal & Mood Effects",
    benefits: ["(educational only)"],
    icon: Brain
  }
];

const pharmaReasons = [
  "They can't patent them.",
  "They heal too quickly.",
  "They reduce dependency on drugs.",
  "They repair instead of suppressing symptoms."
];

const Peptides = () => {
  useEffect(() => {
    document.title = "ARTLUX Peptide Education – BPC-157, TB-500, GHK-Cu & Regeneration Science";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Learn about the world\'s most powerful regenerative peptides: BPC-157, TB-500, GHK-Cu, Epitalon and more. Science-based educational resource inspired by Gary Brecka.');
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
              <Syringe className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">Educational Resource</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Peptides for Regeneration, Recovery & Longevity
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Peptides are one of the most powerful tools in longevity science — and the biggest threat to pharmaceutical profit models.
            </p>
            <p className="text-lg text-foreground font-medium">Why? Because they:</p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["heal tendons", "repair the gut", "reduce inflammation", "improve recovery", "boost collagen", "support hormones", "improve skin", "enhance mood"].map((item, idx) => (
                <span key={idx} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm border border-accent/20">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-accent font-semibold text-lg mt-8">
              And they do it without patented drugs.
            </p>
          </div>
        </section>

        {/* Peptides List */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              The Peptides Everyone Is Talking About
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peptides.map((peptide, idx) => (
                <div key={idx} className="bg-background rounded-2xl p-6 border border-border hover:border-accent/30 transition-colors">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <peptide.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{peptide.name}</h3>
                  <p className="text-accent text-sm font-medium mb-4">"{peptide.nickname}"</p>
                  <ul className="space-y-2">
                    {peptide.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-muted-foreground text-sm">
                        <ArrowRight className="w-3 h-3 text-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Pharma Fears */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl p-8 border border-destructive/20">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Why Pharma Fears Peptides
                </h2>
              </div>
              <ul className="space-y-3">
                {pharmaReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 bg-destructive rounded-full" />
                    {reason}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-6">
                This is why peptide education is suppressed.
              </p>
              <p className="text-accent font-semibold mt-2">
                ARTLUX brings the truth into the open.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Explore Peptide Science
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Learn More
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                <Download className="w-4 h-4 mr-2" />
                Download Peptide Guide
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                Get Personalized Protocol
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Peptides;
