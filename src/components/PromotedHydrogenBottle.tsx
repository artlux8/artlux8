import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Droplets, Zap, Shield, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import hydrogenBottle from "@/assets/artlux-hydrogen-bottle-branded.png";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const PromotedHydrogenBottle = () => {
  const addItem = useCartStore((state) => state.addItem);

  const benefits = [
    { icon: Droplets, text: "Molecular Hydrogen H₂" },
    { icon: Zap, text: "Enhanced Cellular Energy" },
    { icon: Shield, text: "Powerful Antioxidant" },
  ];

  const handleAddToCart = () => {
    const hydrogenBottleProduct = {
      node: {
        id: "gid://shopify/Product/15821715931485",
        title: "ARTLUX∞ Hydrogen Water Bottle",
        description: "Premium hydrogen-rich water generator for optimal cellular hydration and longevity support.",
        handle: "artlux-hydrogen-water-bottle",
        priceRange: {
          minVariantPrice: {
            amount: "89.88",
            currencyCode: "USD",
          },
        },
        images: {
          edges: [
            {
              node: {
                url: "https://cdn.shopify.com/s/files/1/1016/3319/6381/files/artlux-hydrogen-bottle-branded.png?v=1765791886",
                altText: "ARTLUX Hydrogen Water Bottle",
              },
            },
          ],
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/62890510451037",
                title: "Standard",
                price: {
                  amount: "89.88",
                  currencyCode: "USD",
                },
                availableForSale: true,
                selectedOptions: [{ name: "Title", value: "Standard" }],
              },
            },
          ],
        },
        options: [{ name: "Title", values: ["Standard"] }],
      },
    };

    addItem({
      product: hydrogenBottleProduct,
      variantId: "gid://shopify/ProductVariant/62890510451037",
      variantTitle: "Standard",
      price: {
        amount: "89.88",
        currencyCode: "USD",
      },
      quantity: 1,
      selectedOptions: [{ name: "Title", value: "Standard" }],
    });

    toast.success("Added to cart!", {
      description: "ARTLUX∞ Hydrogen Water Bottle",
    });
  };

  return (
    <section className="pt-8 pb-20 md:pt-12 md:pb-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-teal/20 to-accent/30 blur-3xl scale-110 animate-pulse" />
              
              {/* Product image */}
              <img
                src={hydrogenBottle}
                alt="ARTLUX∞ Hydrogen Water Bottle - Premium Molecular Hydrogen Generator"
                className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badge */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-accent text-primary px-4 py-2 rounded-full font-display font-bold text-sm shadow-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  BESTSELLER
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight">
              ARTLUX∞
            </h2>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-accent">
                Hydrogen Water Bottle
              </span>
            </h3>
            
            <p className="font-display text-base md:text-lg tracking-[0.2em] mb-6 font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
              By ARTLUX∞
            </p>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Transform ordinary water into molecular hydrogen-rich water in minutes. 
              Unlock the power of H₂ for enhanced energy, recovery, and cellular protection.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-secondary/50 border border-border/50 rounded-full px-4 py-2"
                >
                  <benefit.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-4xl md:text-5xl font-display font-bold text-accent">
                  $89.88
                </span>
                <span className="text-muted-foreground line-through text-lg">
                  $129.99
                </span>
                <span className="bg-destructive/20 text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Save 30%
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-primary font-bold px-8 py-6 text-lg group"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/product/artlux-hydrogen-water-bottle">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-accent/50 text-accent hover:bg-accent/10 px-8 py-6 text-lg"
                >
                  Win It Free
                </Button>
              </Link>
            </div>

            {/* Trust badge */}
            <p className="text-muted-foreground text-sm mt-6 flex items-center justify-center lg:justify-start gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Free Shipping • 30-Day Money Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotedHydrogenBottle;
