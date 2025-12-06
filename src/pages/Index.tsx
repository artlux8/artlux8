import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChristmasBanner from "@/components/ChristmasBanner";
import PressLogos from "@/components/PressLogos";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProtocolBundles from "@/components/ProtocolBundles";
import Products from "@/components/Products";
import PodcastPreview from "@/components/PodcastPreview";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import HomeLongContent from "@/components/HomeLongContent";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ChristmasBanner />
      <Header />
      <Hero />
      <PressLogos />
      <HomeLongContent />
      <FeaturedProducts />
      <ProtocolBundles />
      <Products />
      <PodcastPreview />
      <Science />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;