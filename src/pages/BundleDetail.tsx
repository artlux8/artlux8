import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Beaker, Zap, Clock, Target, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { protocolBundles, getBundleProducts, products as allProducts, Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

// Synergy explanations for supplement combinations
const synergyExplanations: Record<string, { combination: string; explanation: string; scientificRationale: string }[]> = {
  'longevity-essentials': [
    {
      combination: 'Vitamin D3 + K2 + Omega-3',
      explanation: 'K2 directs calcium mobilized by D3 away from arteries and into bones, while omega-3s reduce inflammation. This trinity protects cardiovascular health while optimizing bone density.',
      scientificRationale: 'Studies show D3 supplementation without K2 can lead to arterial calcification. K2 activates matrix GLA protein (MGP) which prevents calcium deposition in soft tissues.'
    },
    {
      combination: 'CoQ10 + Essential Multi+',
      explanation: 'B vitamins in the multi support cellular energy production via the Krebs cycle, while CoQ10 directly powers the electron transport chain. Together they maximize ATP synthesis.',
      scientificRationale: 'CoQ10 acts as an electron carrier in mitochondria. B vitamins serve as cofactors for enzymes that feed into this process. Deficiency in either bottlenecks energy production.'
    },
    {
      combination: 'Omega-3 + Fat-Soluble Vitamins',
      explanation: 'EPA/DHA provide the ideal lipid environment for absorption of vitamins D, E, and K. Taking together optimizes bioavailability of the entire stack.',
      scientificRationale: 'Fat-soluble nutrients require micelle formation for absorption. The phospholipids in fish oil enhance this process, with studies showing 40-60% improved absorption.'
    },
  ],
  'cognitive-optimizer': [
    {
      combination: "Lion's Mane + Omega-3 DHA",
      explanation: "Lion's Mane stimulates NGF production for new neural connections, while DHA provides the structural fatty acids needed to build those neurons. Growth + building blocks.",
      scientificRationale: "NGF promotes neurogenesis, but new neurons require DHA for membrane formation. DHA comprises 40% of polyunsaturated fatty acids in the brain."
    },
    {
      combination: 'NeuroFocus Pro + Phosphatidylserine',
      explanation: 'Alpha-GPC provides acetylcholine for neurotransmission, while PS optimizes the cell membranes where those signals are received. Enhanced signal clarity.',
      scientificRationale: 'PS is critical for maintaining membrane fluidity and receptor function. Studies show PS + cholinergics have additive effects on memory formation.'
    },
    {
      combination: 'Bacopa + Rhodiola + L-Theanine',
      explanation: 'Bacopa enhances memory encoding, Rhodiola provides stress resilience, and L-theanine promotes calm focus. Cognitive enhancement without anxiety.',
      scientificRationale: 'These adaptogens work on different pathways: Bacopa on cholinergic, Rhodiola on HPA axis, L-theanine on GABAergic. No receptor competition, additive benefits.'
    },
  ],
  'sleep-recovery': [
    {
      combination: 'Magnesium Glycinate + L-Glycine',
      explanation: 'Both compounds work through glycine receptors to promote relaxation. The glycine chelate delivers magnesium while providing additional sleep-promoting glycine.',
      scientificRationale: 'Glycine acts as an inhibitory neurotransmitter and lowers core body temperature, a key sleep trigger. Magnesium enhances GABA activity.'
    },
    {
      combination: 'L-Theanine + Apigenin',
      explanation: 'L-theanine increases alpha brain waves for relaxation without sedation, while apigenin binds to GABA receptors for direct sleep induction.',
      scientificRationale: 'L-theanine crosses the blood-brain barrier within 30 minutes. Apigenin is a benzodiazepine receptor agonist without the dependency risk.'
    },
    {
      combination: 'Magnesium Complex + Recovery Matrix',
      explanation: 'Multiple magnesium forms ensure systemic repletion for muscle function, while recovery compounds target inflammation and tissue repair during sleep.',
      scientificRationale: 'Magnesium is lost through sweat and stress. The combination of glycinate, threonate, and taurate provides tissue-specific benefits.'
    },
  ],
  'anti-aging-advanced': [
    {
      combination: 'NMN + Resveratrol',
      explanation: 'NMN raises NAD+ levels, while resveratrol activates sirtuins that require NAD+ to function. Fuel + activation for longevity pathways.',
      scientificRationale: "David Sinclair's research shows sirtuins need both NAD+ as a cosubstrate and activators like resveratrol. Neither works optimally alone."
    },
    {
      combination: 'Spermidine + Autophagy Induction',
      explanation: 'Spermidine is one of the most potent natural autophagy inducers. Combined with fasting-mimetic compounds, it enhances cellular cleanup.',
      scientificRationale: 'Spermidine inhibits EP300, an autophagy suppressor. This promotes the recycling of damaged cellular components, a key longevity mechanism.'
    },
    {
      combination: 'CoQ10 + NMN + Resveratrol',
      explanation: 'This trinity targets mitochondria from multiple angles: CoQ10 for electron transport, NMN for NAD+-dependent enzymes, resveratrol for biogenesis.',
      scientificRationale: 'Mitochondrial decline drives aging. These compounds address ETC function, sirtuins, and PGC-1α activation for comprehensive mitochondrial support.'
    },
  ],
  'energy-metabolism': [
    {
      combination: 'B-Complex + CoQ10',
      explanation: 'B vitamins act as cofactors for converting food to acetyl-CoA, which enters the Krebs cycle. CoQ10 then shuttles electrons in oxidative phosphorylation.',
      scientificRationale: 'The energy production pathway is sequential. B1, B2, B3, B5 are required at different enzymatic steps. CoQ10 is the final common pathway.'
    },
    {
      combination: 'Metabolic Fire + Essential Multi+',
      explanation: 'Berberine and chromium support glucose uptake, while the multi provides micronutrients needed for insulin receptor function and metabolic enzymes.',
      scientificRationale: 'Berberine activates AMPK, the master metabolic switch. Its effects are enhanced when cofactor nutrients are not rate-limiting.'
    },
    {
      combination: 'Alpha-Lipoic Acid + B-Complex',
      explanation: 'ALA regenerates other antioxidants and supports blood sugar metabolism. B vitamins are often depleted when metabolizing glucose intensively.',
      scientificRationale: 'ALA is both water and fat-soluble, reaching all cellular compartments. It recycles vitamins C and E while supporting pyruvate dehydrogenase.'
    },
  ],
  'complete-protocol': [
    {
      combination: 'Morning Stack Synergy',
      explanation: 'Essential Multi+, Omega-3, D3K2, NeuroFocus Pro, and NMN create a comprehensive morning protocol covering foundational nutrition, brain health, and longevity.',
      scientificRationale: 'Morning dosing aligns with circadian biology. NAD+ levels naturally peak in the morning, making it ideal for NMN. Cognitive enhancers leverage cortisol awakening response.'
    },
    {
      combination: 'Evening Recovery Synergy',
      explanation: 'Resveratrol and Sleep Formula work together—resveratrol activates sirtuins during the fasted overnight period, while sleep compounds ensure deep restorative rest.',
      scientificRationale: 'Sirtuin activity is enhanced during fasting. Quality sleep promotes growth hormone release and autophagy. This combination maximizes overnight repair.'
    },
    {
      combination: 'Full Protocol Integration',
      explanation: 'Every component addresses a different pillar of longevity: nutrition, inflammation, cognition, sleep, NAD+, and sirtuins. No gaps, no redundancy.',
      scientificRationale: "Based on the 'hallmarks of aging' framework, this protocol addresses genomic instability, mitochondrial dysfunction, cellular senescence, and more."
    },
  ],
};

const difficultyColors = {
  'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const BundleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const bundle = protocolBundles.find(b => b.id === id);
  const bundleProducts = bundle ? getBundleProducts(bundle) : [];
  const synergies = bundle ? synergyExplanations[bundle.id] || [] : [];

  if (!bundle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Bundle not found</h1>
          <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
        </div>
      </div>
    );
  }

  const IconComponent = bundle.icon;

  const handleAddBundleToCart = () => {
    bundleProducts.forEach(product => {
      addToCart(
        { id: product.id, name: product.name, price: product.price * (1 - bundle.savingsPercent / 100) },
        1,
        false
      );
    });
    toast({
      title: "Bundle added to cart",
      description: `${bundle.name} has been added with ${bundle.savingsPercent}% discount applied.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bundle Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
                <img 
                  src={bundle.image} 
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{bundle.tagline}</p>
                      <p className="text-lg font-semibold text-foreground">{bundleProducts.length} Products</p>
                    </div>
                  </div>
                </div>
              </div>
              {bundle.badge && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {bundle.badge}
                </Badge>
              )}
            </div>

            {/* Bundle Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className={difficultyColors[bundle.difficulty]}>
                  {bundle.difficulty}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 font-cinzel">
                  {bundle.name}
                </h1>
                <p className="text-xl text-muted-foreground mt-2">{bundle.tagline}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{bundle.description}</p>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {bundle.benefits.map((benefit, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-secondary/50">
                    <Check className="w-3 h-3 mr-1" />
                    {benefit}
                  </Badge>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-card border border-border">
                  <Clock className="w-5 h-5 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{bundle.duration}</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-card border border-border">
                  <Target className="w-5 h-5 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="font-semibold text-foreground">{bundle.difficulty}</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-card border border-border">
                  <Sparkles className="w-5 h-5 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">You Save</p>
                  <p className="font-semibold text-primary">{bundle.savingsPercent}%</p>
                </div>
              </div>

              {/* Pricing */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground line-through">${bundle.originalPrice.toFixed(2)}</p>
                      <p className="text-3xl font-bold text-foreground">${bundle.bundlePrice.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Save ${bundle.savings.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    onClick={handleAddBundleToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add Bundle to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Tabs */}
        <section className="container mx-auto px-4 pb-20">
          <Tabs defaultValue="protocol" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-card border border-border">
              <TabsTrigger value="protocol">Protocol</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="synergy">Synergy</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
            </TabsList>

            {/* Protocol Tab */}
            <TabsContent value="protocol" className="space-y-8">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6 font-cinzel">Daily Protocol</h3>
                  <p className="text-muted-foreground mb-8">{bundle.protocol}</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🌅</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Morning (with breakfast)</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          {bundleProducts.slice(0, Math.ceil(bundleProducts.length / 2)).map(product => (
                            <li key={product.id} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-primary" />
                              {product.name} - {product.dosage.recommended}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {bundleProducts.length > 2 && (
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🌙</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Evening (before bed)</h4>
                          <ul className="space-y-1 text-muted-foreground">
                            {bundleProducts.slice(Math.ceil(bundleProducts.length / 2)).map(product => (
                              <li key={product.id} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                {product.name} - {product.dosage.recommended}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="my-8" />

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-primary" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Take fat-soluble supplements with a meal containing healthy fats</li>
                      <li>• Maintain consistency—effects build over 4-12 weeks</li>
                      <li>• Stay hydrated throughout the day</li>
                      <li>• Track your progress with sleep scores, HRV, or cognitive tests</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {bundleProducts.map(product => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{product.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm line-through text-muted-foreground">${product.price.toFixed(2)}</span>
                              <span className="font-semibold text-primary">
                                ${(product.price * (1 - bundle.savingsPercent / 100)).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex flex-wrap gap-1">
                          {product.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Synergy Tab */}
            <TabsContent value="synergy" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground font-cinzel mb-2">Supplement Synergies</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  These supplements work together in powerful ways. Here's the science behind why this combination is more effective than taking each supplement alone.
                </p>
              </div>
              
              <div className="space-y-6">
                {synergies.map((synergy, idx) => (
                  <Card key={idx} className="bg-card border-border overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/20 to-transparent p-4 border-b border-border">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        {synergy.combination}
                      </h4>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-2">How They Work Together</h5>
                        <p className="text-foreground">{synergy.explanation}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                          <Beaker className="w-4 h-4" />
                          Scientific Rationale
                        </h5>
                        <p className="text-sm text-muted-foreground">{synergy.scientificRationale}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Science Tab */}
            <TabsContent value="science" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground font-cinzel mb-2">Clinical Evidence</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Each supplement in this bundle is backed by peer-reviewed research. Here's a summary of key studies.
                </p>
              </div>

              {bundleProducts.map(product => (
                <Card key={product.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground mb-4">{product.name}</h4>
                    <div className="space-y-4">
                      {product.clinicalStudies.slice(0, 2).map((study, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-4">
                          <p className="font-medium text-foreground text-sm mb-1">{study.title}</p>
                          <p className="text-xs text-muted-foreground mb-2">{study.journal} ({study.year})</p>
                          <p className="text-sm text-muted-foreground">{study.finding}</p>
                        </div>
                      ))}
                    </div>
                    <Link 
                      to={`/product/${product.id}`} 
                      className="text-primary text-sm hover:underline mt-4 inline-block"
                    >
                      View all research for {product.name} →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-background to-card py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-cinzel">Ready to Start Your Protocol?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands who have optimized their health with our science-backed supplement stacks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleAddBundleToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add Bundle - ${bundle.bundlePrice.toFixed(2)}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/shop')}
              >
                View All Products
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BundleDetail;
