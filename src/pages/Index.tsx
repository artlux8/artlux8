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
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="ARTLUX∞ - The Luxury Longevity | Premium Supplements & Protocols"
        description="Science-backed longevity supplements and protocols. Premium NAD+, NMN, autophagy activators, and personalized health optimization. Your body is the ultimate luxury asset."
        keywords="longevity supplements, NAD+ booster, NMN, autophagy, anti-aging, biohacking, hydrogen water, longevity protocol, Gary Brecka, Bryan Johnson"
        url="https://artlux8.com"
      />
      <Header />
      <Hero />
      <PressLogos />
      <ArtluxEcosystem />
      <PromotedHydrogenBottle />
      <LongevityProtocolPreview />
      <TruthAboutLongevity />
      <FreeProtocolCTA />
      <ScienceAutophagy />
      {/* <FeaturedProducts /> */}
      {/* <ProtocolBundles /> */}
      <PodcastPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;