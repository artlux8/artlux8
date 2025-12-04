import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressLogos from "@/components/PressLogos";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProtocolBundles from "@/components/ProtocolBundles";
import Products from "@/components/Products";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PressLogos />
      <FeaturedProducts />
      <ProtocolBundles />
      <Products />
      <Science />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;