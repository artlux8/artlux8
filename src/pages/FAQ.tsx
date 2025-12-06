import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ – ARTLUX Longevity Questions Answered";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Frequently asked questions about ARTLUX supplements, protocols, shipping, returns, and longevity science. Get answers to common questions.");
    }
  }, []);

  const faqs = [
    {
      category: "Products & Supplements",
      questions: [
        {
          q: "What makes ARTLUX supplements different?",
          a: "ARTLUX supplements are formulated with clinical-grade, bioavailable ingredients at therapeutic doses. We focus on longevity science, including NAD+ support, mitochondrial optimization, and autophagy activation. No fillers, no synthetic additives.",
        },
        {
          q: "Are ARTLUX supplements third-party tested?",
          a: "Yes, all ARTLUX supplements undergo rigorous third-party testing for purity, potency, and contaminants. Certificates of Analysis are available upon request.",
        },
        {
          q: "Can I take multiple ARTLUX supplements together?",
          a: "Absolutely. Our supplements are designed to work synergistically. The ARTLUX Longevity Protocol combines NAD+ Booster, Mito Power, Lipo Detox, and Mind Focus for comprehensive support.",
        },
        {
          q: "How long until I see results?",
          a: "Most users report increased energy within 1-2 weeks. Optimal results for longevity markers typically require 3-6 months of consistent use combined with proper lifestyle practices.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "Where do you ship?",
          a: "We ship worldwide. Free shipping on orders over £60 (UK), €70 (EU), or $75 (US/International). Delivery times vary by location.",
        },
        {
          q: "How long does shipping take?",
          a: "UK orders typically arrive in 2-4 business days. EU orders take 5-7 business days. US and international orders take 7-14 business days.",
        },
        {
          q: "Do you offer express shipping?",
          a: "Yes, express shipping options are available at checkout for faster delivery.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day money-back guarantee on all products. If you're not satisfied, contact us for a full refund.",
        },
        {
          q: "How do I return a product?",
          a: "Contact our support team at contact@artlux8.com with your order number. We'll provide return instructions and process your refund within 5-7 business days.",
        },
      ],
    },
    {
      category: "Protocols & Longevity",
      questions: [
        {
          q: "What is the ARTLUX Longevity Protocol?",
          a: "The ARTLUX Longevity Protocol is a comprehensive anti-aging system combining supplements, cold exposure, hydrogen water, grounding, and circadian optimization. It's designed to activate autophagy, boost NAD+, and support mitochondrial health.",
        },
        {
          q: "Is the Free Protocol really free?",
          a: "Yes! The ARTLUX Free Protocol includes breathwork, cold exposure, grounding, and sleep optimization practices that cost nothing. It's our way of democratizing longevity science.",
        },
        {
          q: "Do I need a genetic test to use ARTLUX products?",
          a: "No, but our methylation genetic test allows us to personalize your supplement protocol based on your unique genetic profile for optimal results.",
        },
      ],
    },
    {
      category: "Account & Subscriptions",
      questions: [
        {
          q: "How do subscriptions work?",
          a: "Subscribe and save 15% on all products. Your supplements ship automatically every 30 days. Cancel or modify anytime from your dashboard.",
        },
        {
          q: "Can I skip or pause my subscription?",
          a: "Yes, you can skip, pause, or cancel your subscription anytime through your account dashboard or by contacting support.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Everything you need to know about ARTLUX products, protocols, and longevity science.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${sectionIndex}-${faqIndex}`} className="border border-border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our team is here to help.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
            Contact Support
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
