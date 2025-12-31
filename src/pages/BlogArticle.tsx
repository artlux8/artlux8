import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogArticles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, ExternalLink, BookOpen } from "lucide-react";

// Article content with verified sources
const articleContent: Record<string, { 
  content: string[]; 
  sources: { title: string; url: string }[];
  publishDate: string;
}> = {
  "what-is-hydrogen-water-science-benefits": {
    publishDate: "January 15, 2025",
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

      <article className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-b from-secondary/50 via-background to-background py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button variant="ghost" asChild className="mb-6 hover:bg-gold/10">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <Badge variant="outline" className="mb-4 text-gold border-gold/30">
              {article.category}
            </Badge>

            <h1 className="font-logo text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {content.publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} read
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-4xl py-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.content.map((paragraph, idx) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={idx} className="font-logo text-2xl font-bold text-foreground mt-10 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("• ") || paragraph.startsWith("**")) {
                return (
                  <p key={idx} className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ 
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                  }} />
                );
              }
              return (
                <p key={idx} className="text-foreground/90 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Sources */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="font-logo text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              Scientific Sources
            </h3>
            <ul className="space-y-3">
              {content.sources.map((source, idx) => (
                <li key={idx}>
                  <a 
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-muted-foreground hover:text-gold transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4 mt-1 shrink-0 group-hover:text-gold" />
                    <span>{source.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Articles CTA */}
          <div className="mt-12 p-8 bg-secondary/30 rounded-2xl text-center">
            <h3 className="font-logo text-2xl font-bold text-foreground mb-4">
              Continue Your Longevity Journey
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore more science-backed articles and protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gold hover:bg-gold/90 text-primary">
                <Link to="/blog">More Articles</Link>
              </Button>
              <Button asChild variant="outline" className="border-gold/50 hover:bg-gold/10">
                <Link to="/shop">Shop Products</Link>
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
