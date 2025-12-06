import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Flame, Wine, Pill, Brain, Crown, Check, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const bundles = [
  {
    name: "Metabolic / Anti-Obesity Bundle",
    emoji: "🟢",
    icon: Flame,
    color: "from-green-500/20 to-green-500/5",
    borderColor: "border-green-500/30",
    includes: ["Mito Power", "Lipo Detox", "NAD+ Booster", "Berberine", "Taurine", "Hydrogen Bottle"],
    benefits: ["fat metabolism", "insulin sensitivity", "appetite regulation", "energy boost", "inflammation reduction"]
  },
  {
    name: "Alcohol Detox & Liver Reset Bundle",
    emoji: "🍷",
    icon: Wine,
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    includes: ["Lipo Detox", "Colostrum", "NAC", "Glutathione", "BPC-157", "Baja Salt"],
    benefits: ["liver restoration", "mitochondrial repair", "inflammation healing", "brain clarity", "rehydration"]
  },
  {
    name: "Drug Detox & Neuro Reset Bundle",
    emoji: "💊",
    icon: Pill,
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    includes: ["Mind Focus", "Lion's Mane", "Omega-3", "NAD+ Booster", "Hydrogen water routine"],
    benefits: ["dopamine reset", "clarity", "mental stability", "sleep balance"]
  },
  {
    name: "Brain & Stress Reset Bundle",
    emoji: "🧠",
    icon: Brain,
    color: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    includes: ["Mind Focus", "Magnesium L-Threonate", "Reishi", "Ashwagandha", "Red Light Mask"],
    benefits: ["stress reduction", "mental clarity", "sleep quality", "cognitive performance"]
  },
  {
    name: "Longevity Elite Bundle",
    emoji: "🔥",
    icon: Crown,
    color: "from-accent/20 to-accent/5",
    borderColor: "border-accent/50",
    includes: ["All 4 ARTLUX supplements", "Hydrogen PRO", "Grounding Mat", "Red Light Mask"],
    benefits: ["complete anti-aging system", "maximum longevity support", "full protocol coverage"],
    featured: true
  }
];

const Bundles = () => {
  useEffect(() => {
    document.title = "ARTLUX Longevity Bundles – Detox, Weight Loss, Brain Health, Liver Recovery";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Clinically optimized supplement bundles targeting detox, metabolism, weight loss, recovery, brain performance and longevity.');
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              ARTLUX Longevity Bundles
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Sometimes one supplement is not enough.
            </p>
            <p className="text-xl text-foreground font-semibold">
              Your body needs synergy, not fragments.
            </p>
            <p className="text-lg text-accent mt-4">
              ARTLUX bundles combine science-backed formulas to create complete transformation systems.
            </p>
          </div>
        </section>

        {/* Bundles Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {bundles.map((bundle, idx) => (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-br ${bundle.color} rounded-2xl p-8 border ${bundle.borderColor} ${bundle.featured ? 'lg:col-span-2' : ''}`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-4xl">{bundle.emoji}</span>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground">{bundle.name}</h2>
                      {bundle.featured && (
                        <span className="text-accent text-sm font-medium">The ultimate anti-aging kit</span>
                      )}
                    </div>
                  </div>
                  
                  <div className={`grid ${bundle.featured ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Includes:</h3>
                      <ul className="space-y-2">
                        {bundle.includes.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-2 text-foreground">
                            <Check className="w-4 h-4 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Benefits:</h3>
                      <ul className="space-y-2">
                        {bundle.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Shop Bundle
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Save 20% When You Subscribe
            </h2>
            <p className="text-muted-foreground mb-8">
              Get your longevity bundle delivered monthly and never run out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Shop Bundles
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                Compare All Bundles
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Bundles;
