import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dna, Package, Zap, Brain, Shield, Moon, Droplets, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const boxIncludes = [
  { icon: Zap, text: "NAD+ formula adapted to your genes" },
  { icon: Shield, text: "Mitochondrial support" },
  { icon: Package, text: "Detox nutrients" },
  { icon: Brain, text: "Brain & mood support" },
  { icon: Droplets, text: "Daily hydration minerals" },
  { icon: Moon, text: "Bonus hydrogen/grounding recommendations" }
];

const steps = [
  {
    number: "1",
    title: "Take the Methylation Test",
    description: "Shipped to your door."
  },
  {
    number: "2",
    title: "ARTLUX analyzes your biological age & detox capacity",
    description: "MTHFR, COMT, NAD pathways, inflammation markers."
  },
  {
    number: "3",
    title: "We generate a personalized plan",
    description: "No more guessing."
  },
  {
    number: "4",
    title: "Your Longevity Box ships monthly",
    description: "Automatically updated as your biology changes."
  }
];

const subscriptionFeatures = [
  "your required NAD+ level",
  "your detox needs",
  "your mitochondrial support",
  "your inflammation score",
  "your brain chemistry type",
  "your optimal sleep regulators"
];

const PersonalizedSubscription = () => {
  useEffect(() => {
    document.title = "ARTLUX Personalized Longevity Subscription – DNA-Based Daily Health";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Receive a monthly longevity box with supplements tailored to your methylation profile, detox capacity, inflammation markers and biological age.');
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
              <Dna className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">DNA-Personalized</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Personalized Longevity Subscription — Designed From Your DNA
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              This is the future of health:
            </p>
            <p className="text-xl text-accent font-semibold">
              supplements tailored to your biology, not marketing.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
              Your Monthly ARTLUX Longevity Box Includes:
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {subscriptionFeatures.map((feature, idx) => (
                <span key={idx} className="px-4 py-2 bg-background text-foreground rounded-full border border-border text-sm">
                  {feature}
                </span>
              ))}
            </div>
            <p className="text-center text-accent font-semibold text-lg">
              Everything based on your genetic and methylation profile.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 bg-secondary/20 p-6 rounded-xl border border-border">
                  <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Box Contents */}
        <section className="py-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              What's Inside Your Monthly Box
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boxIncludes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-background p-5 rounded-xl border border-accent/20 hover:border-accent/40 transition-colors">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Start Your DNA-Based Journey
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start Your DNA-Based Subscription
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                Take the Genetic Test
              </Button>
            </div>
            <Button variant="link" className="text-accent mt-4">
              Compare Subscription Plans →
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PersonalizedSubscription;
