import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressLogos from "@/components/PressLogos";
import ArtluxEcosystem from "@/components/ArtluxEcosystem";
import PromotedHydrogenBottle from "@/components/PromotedHydrogenBottle";
import LongevityProtocolPreview from "@/components/LongevityProtocolPreview";
import TruthAboutLongevity from "@/components/TruthAboutLongevity";
import FreeProtocolCTA from "@/components/FreeProtocolCTA";
import ScienceAutophagy from "@/components/ScienceAutophagy";
// import FeaturedProducts from "@/components/FeaturedProducts";
// import ProtocolBundles from "@/components/ProtocolBundles";
import PodcastPreview from "@/components/PodcastPreview";
import Testimonials from "@/components/Testimonials";
// import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="ARTLUX8 | World's Premier Biohacking & Longevity Lifestyle Store"
        description="Discover premium biohacking technology and longevity lifestyle tools. Hydrogen water bottles, red light therapy, cold plunge systems, organic supplements, and advanced performance optimization. Technology-driven human optimization without pharmaceuticals."
        keywords="biohacking lifestyle, longevity optimization, hydrogen water bottle, red light therapy, LED mask, cold plunge, grounding mat, earthing, organic supplements, super aminos, genetic methylation test, performance optimization, elite wellness technology, premium biohacking brand, luxury longevity store, natural longevity methods, molecular hydrogen water"
        url="https://artlux8.com"
      />
      <Header />
      <Hero />
      <PromotedHydrogenBottle />
      <PressLogos />
      <ArtluxEcosystem />
      <TruthAboutLongevity />
      <LongevityProtocolPreview />
      <FreeProtocolCTA />
      <ScienceAutophagy />
      {/* <FeaturedProducts /> */}
      {/* <ProtocolBundles /> */}
      <PodcastPreview />
      <Testimonials />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
};

export default Index;