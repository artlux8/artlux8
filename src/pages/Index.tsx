import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChristmasBanner from "@/components/ChristmasBanner";
import PressLogos from "@/components/PressLogos";
import ArtluxEcosystem from "@/components/ArtluxEcosystem";
import LongevityProtocolPreview from "@/components/LongevityProtocolPreview";
import TruthAboutLongevity from "@/components/TruthAboutLongevity";
import FreeProtocolCTA from "@/components/FreeProtocolCTA";
import ScienceAutophagy from "@/components/ScienceAutophagy";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProtocolBundles from "@/components/ProtocolBundles";
import PodcastPreview from "@/components/PodcastPreview";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LongevityChat from "@/components/LongevityChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ChristmasBanner />
      <Header />
      <Hero />
      <PressLogos />
      <ArtluxEcosystem />
      <LongevityProtocolPreview />
      <TruthAboutLongevity />
      <FreeProtocolCTA />
      <ScienceAutophagy />
      <FeaturedProducts />
      <ProtocolBundles />
      <PodcastPreview />
      <Testimonials />
      <CTA />
      <Footer />
      <LongevityChat />
    </div>
  );
};

export default Index;