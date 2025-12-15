import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sun, Clock, Moon, Zap, Shield, Brain, Heart, Flame, Dna, Sparkles, ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { fetchProducts, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

interface Supplement {
  name: string;
  dosage: string;
  benefit: string;
}

// Mapping of formula supplements to Shopify product keywords
const STACK_PRODUCT_MAPPINGS = {
  morning: [
    "NAD+ BOOSTER", "Vitamin D3", "Ashwagandha", "CoQ10", "Alpha Lipoic"
  ],
  day: [
    "Omega-3", "Berberine", "Magnesium", "B Complex"
  ],
  night: [
    "Sleep", "Magnesium", "Ashwagandha", "Mushroom"
  ]
};

const LongevityProtocol = () => {
  const [loadingStack, setLoadingStack] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  const handleBuyStack = async (stackType: 'morning' | 'day' | 'night') => {
    setLoadingStack(stackType);
    try {
      const products = await fetchProducts(100, 'vendor:ARTLUX');
      
      if (!products || products.length === 0) {
        toast.error("No products available", {
          description: "Please check back later or visit our shop.",
        });
        return;
      }

      const keywords = STACK_PRODUCT_MAPPINGS[stackType];
      const matchedProducts = products.filter((p: ShopifyProduct) => 
        keywords.some(keyword => 
          p.node.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      if (matchedProducts.length === 0) {
        toast.info(`${stackType.charAt(0).toUpperCase() + stackType.slice(1)} Stack`, {
          description: "Visit our shop to explore supplements for this protocol.",
          action: {
            label: "Shop Now",
            onClick: () => window.location.href = "/shop"
          }
        });
        return;
      }

      let addedCount = 0;
      matchedProducts.forEach((product: ShopifyProduct) => {
        const variant = product.node.variants.edges[0]?.node;
        if (variant && variant.availableForSale) {
          const cartItem: CartItem = {
            product,
            variantId: variant.id,
            variantTitle: variant.title,
            price: variant.price,
            quantity: 1,
            selectedOptions: variant.selectedOptions || []
          };
          addItem(cartItem);
          addedCount++;
        }
      });

      if (addedCount > 0) {
        toast.success(`${stackType.charAt(0).toUpperCase() + stackType.slice(1)} Stack Added!`, {
          description: `${addedCount} supplement${addedCount > 1 ? 's' : ''} added to your cart.`,
        });
      }
    } catch (error) {
      console.error('Error adding stack to cart:', error);
      toast.error("Failed to add stack", {
        description: "Please try again or visit the shop directly.",
      });
    } finally {
      setLoadingStack(null);
    }
  };

  useEffect(() => {
    document.title = "ULTIMATE LONGEVITY FORMULA V2.0 – Morning, Day & Night Anti-Aging System | ARTLUX∞";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "The complete ARTLUX∞ Ultimate Longevity Formula V2.0. Science-backed morning, day, and night supplement system for NAD+ activation, SIRT1-7, mitochondrial biogenesis, autophagy, and cellular renewal.");
    }
  }, []);

  const morningStack: Supplement[] = [
    { name: "Urolithin A", dosage: "500 mg", benefit: "Main mitophagy stimulator. Clears damaged mitochondria." },
    { name: "NMN (Sublingual-grade)", dosage: "500–750 mg", benefit: "Direct NAD+ elevation." },
    { name: "PQQ (Pyrroloquinoline Quinone)", dosage: "20 mg", benefit: "New mitochondria growth." },
    { name: "Ubiquinol CoQ10", dosage: "200 mg", benefit: "Optimal form for mitochondria." },
    { name: "R-Lipoic Acid (R-ALA)", dosage: "150 mg", benefit: "Antioxidant recycling + insulin sensitivity." },
    { name: "Acetyl-L-Carnitine (ALCAR)", dosage: "1000 mg", benefit: "Fatty acid transport to mitochondria, energy." },
    { name: "Trans-Resveratrol (Micronized)", dosage: "300 mg", benefit: "SIRT1 activation, geroprotector." },
    { name: "Fisetin", dosage: "200 mg", benefit: "Senolytic (kills old cells). Cyclic use." },
    { name: "TMG (Betaine)", dosage: "500 mg", benefit: "Methylation + NMN support." },
    { name: "Selenium (Selenomethionine)", dosage: "200 mcg", benefit: "Glutathione peroxidase, DNA protection." },
    { name: "Vitamin D3 + K2 MK7", dosage: "4000 IU + 200 mcg", benefit: "Immunity, calcium, longevity, inflammation reduction." },
  ];

  const dayStack: Supplement[] = [
    { name: "Omega-3 (EPA 900mg / DHA 600mg)", dosage: "1500 mg total", benefit: "Best combo for brain and blood vessels." },
    { name: "Curcumin (Liposomal)", dosage: "500 mg", benefit: "Strongest anti-inflammatory agent." },
    { name: "Quercetin Phytosome", dosage: "500 mg", benefit: "Antioxidant, senolytic effect." },
    { name: "Glutathione (S-acetyl)", dosage: "300 mg", benefit: "Main cellular detox and antioxidant." },
    { name: "NAC", dosage: "900 mg", benefit: "Glutathione precursor." },
    { name: "Berberine HCL", dosage: "500 mg", benefit: "AMPK activation, glucose stabilization, 'natural metformin'." },
    { name: "Carnosine", dosage: "500 mg", benefit: "Anti-glycation (slows protein and skin aging)." },
    { name: "Apigenin", dosage: "50 mg", benefit: "Protects telomeres, reduces stress-cortisol." },
    { name: "Magnesium L-threonate (Magtein)", dosage: "1000 mg", benefit: "For brain, synapses, neurodegeneration protection." },
    { name: "Taurine", dosage: "1000 mg", benefit: "Heart, mitochondria, longevity (2023 research data)." },
    { name: "Vitamin C (Liposomal)", dosage: "1000 mg", benefit: "Antioxidant booster, collagen, blood vessels." },
  ];

  const nightStack: Supplement[] = [
    { name: "Spermidine", dosage: "10 mg", benefit: "Strongest autophagy activator." },
    { name: "Melatonin", dosage: "1-3 mg (low dose)", benefit: "DNA repair + antioxidant + sleep." },
    { name: "Magnesium Bisglycinate", dosage: "200–300 mg", benefit: "Relax, recovery." },
    { name: "L-Theanine", dosage: "200 mg", benefit: "Nervous system calm." },
    { name: "Ashwagandha (Sensoril)", dosage: "250 mg", benefit: "Reduces cortisol, improves sleep." },
    { name: "Glycine", dosage: "3 g (powder or capsules)", benefit: "Deep sleep + collagen support." },
    { name: "Astaxanthin", dosage: "12 mg", benefit: "Most powerful antioxidant. Brain, eyes, skin." },
    { name: "Trehalose", dosage: "1000 mg", benefit: "Autophagy + protein folding protection." },
    { name: "Green Tea Extract (EGCG)", dosage: "200 mg", benefit: "Autophagy, anti-cancer profile." },
    { name: "Grape Seed Extract (OPC 95%)", dosage: "300 mg", benefit: "Capillaries, skin, antioxidant." },
    { name: "Reishi Mushroom Extract", dosage: "500 mg", benefit: "Immunity + anti-stress + longevity." },
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Dna className="w-6 h-6 text-accent animate-pulse" />
              <span className="text-accent font-medium tracking-widest uppercase text-sm">My Success Formula</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
              <span className="text-accent">🧬</span> ULTIMATE LONGEVITY
              <br />
              FORMULA V2.0
            </h1>
            <p className="text-primary-foreground/90 text-xl md:text-2xl mb-4">
              Morning – Day – Night / Capsules / Extended Powerful Composition
            </p>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
              Complete anti-aging system designed to maximize NAD+ levels, activate SIRT1-7, 
              stimulate mitochondrial biogenesis, and trigger deep autophagy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full" asChild>
                <Link to="/shop">
                  Start Full Protocol
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full" asChild>
                <Link to="/free-protocol">
                  Free 7-Day Challenge
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Morning Stack */}
      <section className="py-20 bg-gradient-to-b from-amber-950/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-amber-500/20 rounded-full border border-amber-500/30">
                <Sun className="w-8 h-8 text-amber-500" />
                <span className="text-amber-500 font-bold text-2xl">🌅 1. MORNING COMPLEX</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Maximum Mitochondrial & Sirtuins Activation
              </h2>
              <p className="text-accent text-xl font-medium mb-6">
                "Energy, Youth & Repair Start"
              </p>
              <div className="bg-secondary/50 rounded-xl p-6 border border-border max-w-3xl mx-auto">
                <h4 className="font-semibold text-foreground mb-3">Purpose:</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  ↑ NAD+ – ↑ AMPK – ↑ SIRT1–7 – ↑ Mitochondrial biogenesis (new mitochondria) – 
                  DNA protection – Inflammation reduction – All-day energy activation
                </p>
              </div>
            </div>

            {/* Supplements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {morningStack.map((item, index) => (
                <Card key={index} className="bg-card border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{index + 1}. {item.name}</h4>
                      <span className="text-amber-500 font-bold text-xs whitespace-nowrap ml-2">{item.dosage}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{item.benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Timing & Buy Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-foreground font-medium">After Breakfast</span>
              </div>
              <Button 
                onClick={() => handleBuyStack('morning')}
                disabled={loadingStack === 'morning'}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-full"
              >
                {loadingStack === 'morning' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Morning Stack
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Day Stack */}
      <section className="py-20 bg-gradient-to-b from-blue-950/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-blue-500/20 rounded-full border border-blue-500/30">
                <Sparkles className="w-8 h-8 text-blue-500" />
                <span className="text-blue-500 font-bold text-2xl">☀️ 2. DAY COMPLEX</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cell Protection, Anti-Inflammatory System, Brain, Capillaries
              </h2>
              <p className="text-accent text-xl font-medium mb-6">
                "Cellular Shield & Anti-Inflammation Stack"
              </p>
              <div className="bg-secondary/50 rounded-xl p-6 border border-border max-w-3xl mx-auto">
                <h4 className="font-semibold text-foreground mb-3">Purpose:</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  ↓ Chronic inflammation – DNA protection – Vessel improvement – 
                  Attention improvement – Glycation reduction – Antioxidant system enhancement
                </p>
              </div>
            </div>

            {/* Supplements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {dayStack.map((item, index) => (
                <Card key={index} className="bg-card border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{index + 1}. {item.name}</h4>
                      <span className="text-blue-500 font-bold text-xs whitespace-nowrap ml-2">{item.dosage}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{item.benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Timing & Buy Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-foreground font-medium">After Lunch or Daytime Meal</span>
              </div>
              <Button 
                onClick={() => handleBuyStack('day')}
                disabled={loadingStack === 'day'}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
              >
                {loadingStack === 'day' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Day Stack
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Night Stack */}
      <section className="py-20 bg-gradient-to-b from-purple-950/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-purple-500/20 rounded-full border border-purple-500/30">
                <Moon className="w-8 h-8 text-purple-500" />
                <span className="text-purple-500 font-bold text-2xl">🌙 3. EVENING COMPLEX</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Autophagy, Rejuvenation, Cell & DNA Restoration
              </h2>
              <p className="text-accent text-xl font-medium mb-6">
                "Night Repair, Autophagy & Longevity Stack"
              </p>
              <div className="bg-secondary/50 rounded-xl p-6 border border-border max-w-3xl mx-auto">
                <h4 className="font-semibold text-foreground mb-3">Purpose:</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Maximum autophagy – DNA restoration – Deep sleep – Inflammation reduction – 
                  Cell cleansing – Night regeneration
                </p>
              </div>
            </div>

            {/* Supplements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {nightStack.map((item, index) => (
                <Card key={index} className="bg-card border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{index + 1}. {item.name}</h4>
                      <span className="text-purple-500 font-bold text-xs whitespace-nowrap ml-2">{item.dosage}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{item.benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Timing & Buy Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-foreground font-medium">1–2 Hours Before Sleep</span>
              </div>
              <Button 
                onClick={() => handleBuyStack('night')}
                disabled={loadingStack === 'night'}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full"
              >
                {loadingStack === 'night' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Night Stack
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Complete Daily Protocol Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-2xl p-6 border border-amber-500/20">
                <Sun className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="font-bold text-foreground text-lg mb-2">Morning</h3>
                <p className="text-muted-foreground text-sm mb-2">11 supplements</p>
                <p className="text-amber-500 font-medium text-sm">NAD+ & Mitochondria Activation</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20">
                <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-foreground text-lg mb-2">Day</h3>
                <p className="text-muted-foreground text-sm mb-2">11 supplements</p>
                <p className="text-blue-500 font-medium text-sm">Anti-Inflammation & Protection</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
                <Moon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-foreground text-lg mb-2">Night</h3>
                <p className="text-muted-foreground text-sm mb-2">11 supplements</p>
                <p className="text-purple-500 font-medium text-sm">Autophagy & Regeneration</p>
              </div>
            </div>
            <div className="bg-accent/10 rounded-2xl p-8 border border-accent/20">
              <Dna className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">33 Total Compounds</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This comprehensive formula targets all major aging pathways: NAD+ decline, mitochondrial dysfunction, 
                chronic inflammation, glycation, telomere shortening, and impaired autophagy.
              </p>
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
            Start the complete ARTLUX∞ Ultimate Longevity Formula V2.0 and experience science-backed anti-aging.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full" asChild>
              <Link to="/shop">
                Shop Supplements
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full" asChild>
              <Link to="/genetic-testing">
                Take Genetic Test
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LongevityProtocol;
