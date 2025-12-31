import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogArticles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, ExternalLink, BookOpen, Share2, ChevronRight, Sparkles } from "lucide-react";

// Import hero images
import hydrogenWaterHero from "@/assets/blog/hydrogen-water-hero.jpg";
import morningProtocolHero from "@/assets/blog/morning-protocol-hero.jpg";
import longevitySupplementsHero from "@/assets/blog/longevity-supplements-hero.jpg";

// Article images mapping
const articleImages: Record<string, string> = {
  "what-is-hydrogen-water-science-benefits": hydrogenWaterHero,
  "gary-brecka-30-30-30-protocol-explained": morningProtocolHero,
  "best-longevity-supplements-2025-science-based": longevitySupplementsHero,
};

// Default category images
const categoryImages: Record<string, string> = {
  "Hydrogen Therapy": hydrogenWaterHero,
  "Protocols": morningProtocolHero,
  "Supplements": longevitySupplementsHero,
  "NAD+ Science": longevitySupplementsHero,
  "Mitochondria": longevitySupplementsHero,
  "Cold Exposure": morningProtocolHero,
  "Light Therapy": morningProtocolHero,
  "Grounding": morningProtocolHero,
  "Autophagy": longevitySupplementsHero,
  "Anti-Pharma": longevitySupplementsHero,
  "Detox": hydrogenWaterHero,
  "Stress": morningProtocolHero,
  "Anti-Aging": longevitySupplementsHero,
  "Water": hydrogenWaterHero,
  "Air": hydrogenWaterHero,
  "Peptides": longevitySupplementsHero,
  "Epigenetics": longevitySupplementsHero,
  "Routines": morningProtocolHero,
};

// Article content with verified sources
const articleContent: Record<string, { 
  content: string[]; 
  sources: { title: string; url: string }[];
  publishDate: string;
  author: string;
  keyTakeaways: string[];
}> = {
  "what-is-hydrogen-water-science-benefits": {
    publishDate: "January 15, 2025",
    author: "ARTLUX∞ Research Team",
    keyTakeaways: [
      "Molecular hydrogen is the smallest antioxidant that can cross the blood-brain barrier",
      "Over 1,000 peer-reviewed studies support hydrogen therapy",
      "Japan's Ministry of Health approved H₂ inhalation therapy in 2016",
      "Optimal intake: 1-2 liters daily at 1+ ppm concentration"
    ],
    content: [
      "Molecular hydrogen (H₂) is the smallest and most bioavailable antioxidant molecule known to science. Unlike larger antioxidants, H₂ can penetrate cell membranes and even cross the blood-brain barrier, reaching mitochondria where oxidative stress originates.",
      
      "## The Science of Molecular Hydrogen",
      "Research published in Nature Medicine demonstrated that hydrogen acts as a selective antioxidant, neutralizing only the most harmful reactive oxygen species (hydroxyl radicals and peroxynitrite) while preserving beneficial signaling molecules like hydrogen peroxide and nitric oxide.",
      
      "## Clinical Evidence",
      "Over 1,000 peer-reviewed studies have examined hydrogen's therapeutic potential. A 2020 meta-analysis in the Journal of Clinical Biochemistry and Nutrition found that hydrogen-rich water significantly reduced markers of oxidative stress and inflammation in human subjects.",
      
      "## How Hydrogen Water Works",
      "When you drink hydrogen-rich water, the dissolved H₂ molecules are absorbed through the gastrointestinal tract and distributed throughout the body within minutes. Studies using hydrogen-sensing electrodes have detected elevated H₂ levels in arterial blood within 10 minutes of consumption.",
      
      "## Benefits Backed by Research",
      "• **Reduced Oxidative Stress**: Multiple studies show decreased levels of 8-OHdG, a biomarker of DNA oxidative damage",
      "• **Anti-Inflammatory Effects**: Hydrogen suppresses pro-inflammatory cytokines including TNF-α and IL-6",
      "• **Metabolic Support**: Research in Obesity journal found hydrogen water reduced body fat and insulin resistance",
      "• **Athletic Performance**: Studies show faster lactate clearance and reduced muscle fatigue",
      
      "## Medical Applications in Japan",
      "Japan's Ministry of Health approved hydrogen inhalation therapy for post-cardiac arrest syndrome in 2016. Major hospitals including Keio University Hospital use hydrogen therapy in their ICUs. Clinical trials are ongoing for applications in Parkinson's disease, chronic fatigue, and metabolic syndrome.",
      
      "## Optimal Usage Protocol",
      "Research suggests drinking 1-2 liters of hydrogen-rich water daily, ideally on an empty stomach or before exercise. The hydrogen concentration should be at least 0.5 ppm (parts per million), though therapeutic studies often use 1-1.6 ppm.",
    ],
    sources: [
      { title: "Ohsawa I, et al. Nature Medicine (2007) - Hydrogen acts as therapeutic antioxidant", url: "https://www.nature.com/articles/nm1577" },
      { title: "Nicolson GL, et al. IJMS (2016) - Clinical Effects of Hydrogen Administration", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4847977/" },
      { title: "LeBaron TW, et al. Molecular Hydrogen Institute Research", url: "https://www.molecularhydrogeninstitute.org/studies" },
      { title: "Tamura T, et al. Japanese Ministry of Health Approval (2016)", url: "https://pubmed.ncbi.nlm.nih.gov/28737838/" }
    ]
  },
  "gary-brecka-30-30-30-protocol-explained": {
    publishDate: "January 12, 2025",
    author: "ARTLUX∞ Research Team",
    keyTakeaways: [
      "30g protein within 30 minutes of waking + 30 min low-intensity cardio",
      "Zone 2 cardio (55-70% max HR) maximizes fat oxidation",
      "Morning cortisol peak creates optimal metabolic window",
      "Ideal for fat loss, blood sugar regulation, and energy optimization"
    ],
    content: [
      "The 30-30-30 protocol, popularized by human biologist Gary Brecka, is a morning routine designed to optimize metabolism, stabilize blood sugar, and enhance fat burning. The protocol has gained viral attention for its simplicity and effectiveness.",
      
      "## What Is the 30-30-30 Protocol?",
      "The protocol consists of three components:",
      "1. **30 grams of protein** consumed within 30 minutes of waking",
      "2. **30 minutes of low-intensity steady-state cardio** (zone 2, 120-140 BPM heart rate)",
      
      "## The Science Behind It",
      "Research published in the Journal of Nutrition found that high-protein breakfasts significantly reduce ghrelin (hunger hormone) levels throughout the day compared to high-carbohydrate meals. The protein-first approach helps stabilize blood glucose and prevents the insulin spikes that promote fat storage.",
      
      "## Why Low-Intensity Cardio?",
      "Zone 2 cardio (55-70% of max heart rate) preferentially burns fat as fuel. A study in the Journal of Applied Physiology demonstrated that fasted or protein-fed low-intensity exercise maximizes fat oxidation rates. This differs from high-intensity exercise, which primarily uses glycogen.",
      
      "## The Metabolic Window",
      "Cortisol naturally peaks in the morning (the cortisol awakening response). By providing protein and gentle movement during this window, you leverage your body's natural metabolic state. Research in Chronobiology International confirms morning exercise aligns with circadian optimization for metabolic health.",
      
      "## Who Benefits Most",
      "• Individuals seeking fat loss without muscle loss",
      "• Those with blood sugar regulation issues",
      "• People who experience energy crashes mid-morning",
      "• Anyone looking to establish a consistent morning routine",
      
      "## Practical Implementation",
      "**Protein sources**: Eggs (25g per 4 eggs), protein shake (25-30g), Greek yogurt with collagen (20-25g combined)",
      "**Cardio options**: Brisk walking, light cycling, swimming, or incline treadmill walking",
      "**Timing**: Start your 30-minute cardio within the first hour of waking for optimal hormonal alignment"
    ],
    sources: [
      { title: "Leidy HJ, et al. Journal of Nutrition (2015) - Protein breakfast and appetite", url: "https://academic.oup.com/jn/article/145/4/747/4589870" },
      { title: "Achten J, Jeukendrup AE. Journal of Applied Physiology - Fat oxidation rates", url: "https://journals.physiology.org/doi/full/10.1152/japplphysiol.00748.2003" },
      { title: "Scheer FA, et al. Chronobiology International - Circadian metabolism", url: "https://pubmed.ncbi.nlm.nih.gov/20560711/" }
    ]
  },
  "best-longevity-supplements-2025-science-based": {
    publishDate: "January 10, 2025",
    author: "ARTLUX∞ Research Team",
    keyTakeaways: [
      "NAD+ levels decline ~50% between ages 40-60; NMN/NR can restore them",
      "Spermidine induces autophagy and is linked to reduced mortality",
      "Fisetin is a powerful senolytic that clears zombie cells",
      "Omega-3s reduced cardiovascular events by 28% in VITAL study"
    ],
    content: [
      "The field of longevity science has advanced significantly, with several compounds now showing promise in human clinical trials. Here's a comprehensive guide to the most evidence-backed supplements for extending healthspan.",
      
      "## NAD+ Precursors (NMN & NR)",
      "NAD+ levels decline by approximately 50% between ages 40 and 60. This coenzyme is essential for mitochondrial function, DNA repair, and sirtuin activation. Clinical trials published in Science have demonstrated that NMN supplementation restores NAD+ levels and improves insulin sensitivity, muscle function, and cardiovascular health in older adults.",
      
      "**Dosage**: 250-500mg NMN or 300mg NR daily",
      
      "## Spermidine",
      "This polyamine naturally found in aged cheese and wheat germ induces autophagy—the cellular recycling process that clears damaged proteins. The Bruneck Study, published in the American Journal of Clinical Nutrition, found that higher dietary spermidine intake was associated with reduced mortality and increased lifespan.",
      
      "**Dosage**: 1-6mg daily",
      
      "## Urolithin A",
      "Derived from gut bacterial metabolism of pomegranate ellagitannins, urolithin A promotes mitophagy (recycling of damaged mitochondria). A clinical trial in Nature Metabolism showed urolithin A improved muscle endurance and mitochondrial biomarkers in elderly subjects.",
      
      "**Dosage**: 500-1000mg daily",
      
      "## Fisetin (Senolytic)",
      "This flavonoid found in strawberries selectively eliminates senescent (zombie) cells that accumulate with age and drive inflammation. The Mayo Clinic's clinical trials have demonstrated fisetin's ability to reduce senescent cell burden and inflammatory markers.",
      
      "**Dosage**: 100-500mg daily or 20mg/kg for 2-3 days monthly (senolytic dosing)",
      
      "## Omega-3 Fatty Acids (EPA/DHA)",
      "The VITAL study with 25,000+ participants found that omega-3 supplementation reduced cardiovascular events by 28%. Omega-3s reduce inflammation, support brain health, and improve cell membrane fluidity.",
      
      "**Dosage**: 2-4g combined EPA/DHA daily",
      
      "## Vitamin D3 + K2",
      "Meta-analyses show vitamin D deficiency is associated with increased all-cause mortality. K2 ensures calcium is directed to bones rather than arteries. The combination supports immune function, bone density, and cardiovascular health.",
      
      "**Dosage**: 2000-5000 IU D3 + 100-200mcg K2 (MK-7) daily"
    ],
    sources: [
      { title: "Yoshino J, et al. Science (2021) - NMN increases NAD+ in humans", url: "https://www.science.org/doi/10.1126/science.abe9985" },
      { title: "Eisenberg T, et al. American Journal of Clinical Nutrition - Spermidine and mortality", url: "https://academic.oup.com/ajcn/article/108/2/371/5095513" },
      { title: "Andreux PA, et al. Nature Metabolism - Urolithin A clinical trial", url: "https://www.nature.com/articles/s42255-019-0073-4" },
      { title: "Kirkland JL, Tchkonia T. Mayo Clinic Senolytics Research", url: "https://www.mayo.edu/research/labs/aging-cell-senescence/overview" },
      { title: "Manson JE, et al. NEJM - VITAL Study", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1811403" }
    ]
  }
};

// Generate default content for articles without specific content
const generateDefaultContent = (article: typeof blogArticles[0]) => ({
  publishDate: "January 2025",
  author: "ARTLUX∞ Research Team",
  keyTakeaways: article.outline.slice(0, 4),
  content: [
    article.excerpt,
    "## Key Topics Covered",
    ...article.outline.map(item => `• ${item}`),
    "## Coming Soon",
    "This comprehensive article is currently being expanded with the latest research and clinical evidence. Check back soon for the full in-depth analysis.",
    "In the meantime, explore our other science-backed articles or contact us with specific questions."
  ],
  sources: [
    { title: "PubMed Central - Peer-reviewed research", url: "https://www.ncbi.nlm.nih.gov/pmc/" },
    { title: "Nature.com - Scientific publications", url: "https://www.nature.com/" }
  ]
});

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const content = articleContent[slug || ""] || generateDefaultContent(article);
  const heroImage = articleImages[slug || ""] || categoryImages[article.category] || longevitySupplementsHero;

  // Get related articles
  const relatedArticles = blogArticles
    .filter(a => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${article.title} | ARTLUX∞ Blog`}
        description={article.excerpt}
        keywords={article.keywords.join(", ")}
        url={`https://artlux8.com/blog/${article.slug}`}
        type="article"
      />
      <Header />

      <article className="pt-20">
        {/* Hero Image Section */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <img 
            src={heroImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Back button */}
          <div className="absolute top-8 left-4 md:left-8 z-10">
            <Button variant="secondary" size="sm" asChild className="bg-background/80 backdrop-blur-sm hover:bg-background">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article meta overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              <Badge className="mb-4 bg-gold text-primary hover:bg-gold/90">
                {article.category}
              </Badge>
              <h1 className="font-logo text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/80">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {content.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime} read
                </span>
                <span className="hidden md:flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold" />
                  {content.author}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr,320px] gap-12 max-w-6xl mx-auto">
            {/* Article Content */}
            <div className="min-w-0">
              {/* Key Takeaways Box */}
              <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-2xl p-6 mb-10">
                <h3 className="font-logo text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {content.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-gold mt-1 shrink-0" />
                      <span className="text-foreground/90 text-sm">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {content.content.map((paragraph, idx) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={idx} className="font-logo text-2xl font-bold text-foreground mt-12 mb-4 pb-2 border-b border-border">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ")) {
                    return (
                      <p key={idx} className="text-foreground/90 leading-relaxed pl-4 border-l-2 border-gold/30" dangerouslySetInnerHTML={{ 
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                      }} />
                    );
                  }
                  if (paragraph.startsWith("• ")) {
                    return (
                      <div key={idx} className="flex items-start gap-3 my-2">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 shrink-0" />
                        <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ 
                          __html: paragraph.replace("• ", "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                        }} />
                      </div>
                    );
                  }
                  if (paragraph.startsWith("**Dosage")) {
                    return (
                      <div key={idx} className="bg-secondary/50 rounded-lg px-4 py-3 my-4 border-l-4 border-gold">
                        <p className="text-foreground/90 text-sm font-medium" dangerouslySetInnerHTML={{ 
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold">$1</strong>')
                        }} />
                      </div>
                    );
                  }
                  if (paragraph.startsWith("**")) {
                    return (
                      <p key={idx} className="text-foreground/90 leading-relaxed my-4" dangerouslySetInnerHTML={{ 
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                      }} />
                    );
                  }
                  return (
                    <p key={idx} className="text-foreground/90 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Sources Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="font-logo text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Scientific Sources & References
                </h3>
                <div className="bg-secondary/30 rounded-xl p-6">
                  <ul className="space-y-4">
                    {content.sources.map((source, idx) => (
                      <li key={idx} className="group">
                        <a 
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 text-muted-foreground hover:text-gold transition-colors"
                        >
                          <span className="bg-gold/20 text-gold text-xs font-bold px-2 py-1 rounded shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm leading-relaxed group-hover:underline">
                            {source.title}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-50 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <Button variant="outline" size="sm" className="border-border hover:border-gold/50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold/50 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{content.author}</p>
                    <p className="text-sm text-muted-foreground">Longevity Experts</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Science-backed insights on longevity, autophagy, and natural health optimization.
                </p>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-6 text-primary-foreground">
                <h4 className="font-logo text-lg font-bold mb-2">
                  Start Your Journey
                </h4>
                <p className="text-sm opacity-90 mb-4">
                  Get your free personalized longevity protocol based on science.
                </p>
                <Button asChild className="w-full bg-gold hover:bg-gold/90 text-primary">
                  <Link to="/free-protocol">
                    Get Free Protocol
                  </Link>
                </Button>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h4 className="font-logo text-lg font-bold text-foreground mb-4">
                    Related Articles
                  </h4>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Link 
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <h5 className="text-sm font-medium text-foreground group-hover:text-gold transition-colors line-clamp-2">
                          {related.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          {related.readTime} read
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Shop CTA */}
              <div className="bg-secondary/50 border border-border rounded-2xl p-6">
                <h4 className="font-logo text-lg font-bold text-foreground mb-2">
                  Shop Longevity
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore our science-backed supplement collection.
                </p>
                <Button asChild variant="outline" className="w-full border-gold/50 hover:bg-gold/10">
                  <Link to="/shop">
                    View Products
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h3 className="font-logo text-3xl font-bold text-foreground mb-4">
              Continue Your Longevity Journey
            </h3>
            <p className="text-muted-foreground mb-8">
              Explore more science-backed articles and discover protocols that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
                <Link to="/blog">
                  <BookOpen className="w-4 h-4 mr-2" />
                  More Articles
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/50 hover:bg-gold/10">
                <Link to="/shop">
                  Shop Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogArticle;
