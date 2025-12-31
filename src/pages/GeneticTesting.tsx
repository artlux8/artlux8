import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Dna, Brain, Heart, Zap, Shield, Clock, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle, createStorefrontCheckout } from '@/lib/shopify';
import { toast } from 'sonner';

const measures = [
  "Biological age (vs chronological age)",
  "Rate of cellular aging",
  "Detox gene function (MTHFR mutations etc.)",
  "Inflammation patterns",
  "Estrogen/testosterone metabolism",
  "Neurotransmitter pathways",
  "Mitochondrial health",
  "Vitamin B methylation efficiency",
  "Brain & mood predispositions"
];

const decisions = [
  "which supplements work",
  "which diet works",
  "how well you detox",
  "how fast you age",
  "how you respond to stress",
  "which hormones dominate",
  "how you sleep",
  "how your brain performs"
];

const protocolItems = [
  { icon: Zap, text: "Individual NAD+ plan" },
  { icon: Shield, text: "Personalized methylation support" },
  { icon: Heart, text: "Detox & liver recommendations" },
  { icon: Brain, text: "Inflammation reduction plan" },
  { icon: Clock, text: "Sleep & hormones protocol" },
  { icon: FileText, text: "Optimal supplement list (ARTLUX products auto-selected)" },
  { icon: Dna, text: "Long-term longevity strategy" }
];

const geneticFAQ = [
  { question: "What is methylation genetic testing?", answer: "Methylation testing analyzes genes involved in methylation pathways, which are essential for detoxification, energy production, and cellular repair. It provides insights into how your body processes nutrients, handles stress, and manages inflammation." },
  { question: "Is this a medical diagnostic test?", answer: "No. This is a lifestyle and educational genetic test that provides insights into your genetic predispositions. It is not intended to diagnose, treat, or prevent any disease. The results are meant to inform personalized lifestyle optimization strategies." },
  { question: "What information will I receive from the test?", answer: "You'll receive a comprehensive report covering methylation efficiency, detox gene variants (like MTHFR), inflammation markers, and personalized recommendations for supplements and lifestyle practices based on your genetic profile." },
  { question: "How is the test administered?", answer: "The test uses a simple at-home saliva collection kit. You collect your sample, send it to the lab in the prepaid envelope, and receive your results and personalized protocol digitally within 2-4 weeks." },
];

const GeneticTesting = () => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);

  const handleOrderTest = async () => {
    try {
      const product = await fetchProductByHandle('methylation-genetic-test');
      if (!product) {
        toast.error('Product not found');
        return;
      }
      
      const variant = product.variants.edges[0]?.node;
      if (!variant) {
        toast.error('No variant available');
        return;
      }

      const cartItem = {
        product: { node: product },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || []
      };

      addItem(cartItem);
      
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create checkout');
    }
  };

  return (
    <>
      <SEO 
        title="Genetic Methylation Testing | Personalized Longevity Insights"
        description="Discover your biological age and personalized optimization insights with methylation genetic testing. Educational genetic analysis for detox capacity, inflammation patterns, and lifestyle optimization. Not a medical diagnostic."
        keywords="genetic methylation test, MTHFR testing, biological age test, methylation genetic testing, personalized optimization, genetic lifestyle insights, detox gene testing, inflammation genetic markers, longevity genetic test"
        url="https://artlux8.com/genetic-testing"
        faq={geneticFAQ}
      />
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
              <Dna className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">DNA-Based Longevity</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Methylation Genetic Testing — Your Personalized Longevity Blueprint
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Chronological age is meaningless.<br />
              <span className="text-foreground font-semibold">Biological age determines how long, how strong and how clearly you will live.</span>
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Methylation testing is the most accurate way to measure inflammation levels, detox capability (MTHFR, COMT, CYP450), mitochondrial efficiency, stress response, neurotransmitter balance, oxidation and glycation rate, and metabolic resilience.
            </p>
            <p className="text-accent font-medium mt-6">
              ARTLUX partners with the top 3 global genetic labs to offer an affordable, fast, science-grade test for longevity optimization.
            </p>
          </div>
        </section>

        {/* What It Measures */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              What Methylation Testing Actually Measures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {measures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-background/50 p-4 rounded-xl border border-border">
                  <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-accent font-semibold mt-8 text-lg">
              This is not ancestry — this is biological programming.
            </p>
          </div>
        </section>

        {/* Why It Changes Everything */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
              Why This Test Changes Everything
            </h2>
            <p className="text-center text-muted-foreground mb-8">Your genetics decide:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {decisions.map((item, idx) => (
                <div key={idx} className="bg-accent/10 text-accent text-center py-3 px-4 rounded-lg border border-accent/20 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-xl text-muted-foreground">Without this knowledge — <span className="text-foreground">you're guessing.</span></p>
              <p className="text-xl text-accent font-semibold mt-2">With this test — you follow a blueprint written inside your cells.</p>
            </div>
          </div>
        </section>

        {/* Personalized Protocol */}
        <section className="py-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Personalized ARTLUX Protocol After Testing
            </h2>
            <p className="text-center text-muted-foreground mb-12">Every user receives:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {protocolItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-background p-5 rounded-xl border border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Start Your Longevity Journey
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleOrderTest}>
                Order Methylation Test
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10" onClick={() => toast.info('Sample report coming soon')}>
                View Sample Report
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10" onClick={() => navigate('/personalized-subscription')}>
                Unlock Personalized Subscription
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GeneticTesting;
