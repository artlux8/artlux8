import SEO from "@/components/SEO";
import HeaderMinimal from "@/components/HeaderMinimal";
import Top3Products from "@/components/Top3Products";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="ARTLUX∞ - The Luxury Longevity | Premium Supplements"
        description="Science-backed longevity supplements. Premium NAD+, NMN, and autophagy activators. Your body is the ultimate luxury asset."
        keywords="longevity supplements, NAD+ booster, NMN, autophagy, anti-aging, biohacking"
        url="https://artlux8.com"
      />
      <HeaderMinimal />
      <Top3Products />
      <Footer />
    </div>
  );
};

export default Index;