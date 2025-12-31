import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, AlertTriangle, Podcast, Wrench, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterModal from '@/components/NewsletterModal';

const scienceTopics = [
  "Autophagy & Mitophagy",
  "NAD decline & cellular aging",
  "Epigenetics & methylation",
  "Mitochondrial dysfunction",
  "Neuroinflammation",
  "Gut-brain axis",
  "Metabolic optimization"
];

const antiPharmaTopics = [
  "Why chronic illness is profitable",
  "Why prevention is ignored",
  "Why natural longevity is suppressed"
];

const podcastExperts = [
  "genetic experts",
  "breathwork instructors",
  "longevity scientists",
  "detox specialists",
  "cold exposure experts"
];

const advancedTools = [
  "peptides",
  "oxygen therapy",
  "hydrogen cycles",
  "high-dose amino protocols",
  "methylation-based nutrition"
];

const ExpertBiohacker = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  useEffect(() => {
    document.title = "ARTLUX Expert Biohacker – Advanced Science for Longevity Enthusiasts";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Deep-dives into autophagy, mitochondrial science, peptides, NAD+, genetic optimization, detox pathways and anti-pharma truth.');
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8">
              <GraduationCap className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">Advanced Knowledge Hub</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Expert Biohacker — Advanced Longevity Knowledge
            </h1>
            <p className="text-xl text-muted-foreground">
              For those who want more than basics.
            </p>
            <p className="text-xl text-accent font-semibold mt-2">
              This is your elite-level biohacking library.
            </p>
          </div>
        </section>

        {/* Deep Science Library */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-accent" />
              <h2 className="font-display text-3xl font-bold text-foreground">
                Deep Longevity Science Library
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scienceTopics.map((topic, idx) => (
                <div key={idx} className="bg-background p-5 rounded-xl border border-border hover:border-accent/30 transition-colors cursor-pointer group">
                  <span className="text-foreground group-hover:text-accent transition-colors">✔ {topic}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anti-Pharma Truth */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl p-8 border border-destructive/20">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Anti-Pharma Truth Section
                </h2>
              </div>
              <ul className="space-y-3">
                {antiPharmaTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground text-lg">
                    <span className="w-2 h-2 bg-destructive rounded-full" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Advanced Podcasts */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Podcast className="w-8 h-8 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Exclusive Advanced Podcasts
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">Interviews with:</p>
            <div className="flex flex-wrap gap-3">
              {podcastExperts.map((expert, idx) => (
                <span key={idx} className="px-4 py-2 bg-background text-foreground rounded-full border border-border">
                  {expert}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Tools */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-8 h-8 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Advanced Tools
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {advancedTools.map((tool, idx) => (
                <div key={idx} className="bg-accent/10 text-accent text-center py-4 px-6 rounded-xl border border-accent/20 font-medium">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Go Deeper
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/blog">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore Articles
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-accent/30 hover:bg-accent/10"
                onClick={() => setIsNewsletterOpen(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Join Expert Newsletter
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </>
  );
};

export default ExpertBiohacker;
