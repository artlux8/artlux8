import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Droplets, Zap, Shield, ShoppingCart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import hydrogenBottle from "@/assets/artlux-hydrogen-bottle-branded.png";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { createStorefrontCheckout, redirectToCheckout } from "@/lib/shopify";
import CheckoutLoadingOverlay from "@/components/CheckoutLoadingOverlay";
import CheckoutTrustSignals from "@/components/CheckoutTrustSignals";

const PromotedHydrogenBottle = () => {
  const [isBuying, setIsBuying] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const benefits = [
    { icon: Droplets, text: "Molecular Hydrogen H₂" },
    { icon: Zap, text: "Enhanced Cellular Energy" },
    { icon: Shield, text: "Powerful Antioxidant" },
  ];

  // Real Shopify product data for ARTLUX∞ Hydrogen Water Bottle Go+
  const PRODUCT_HANDLE = "artlux8-hydrogen-water-bottle-go";
  const PRODUCT_ID = "gid://shopify/Product/15846331810141";
  const VARIANT_ID = "gid://shopify/ProductVariant/63017311797597"; // Black variant
  const PRODUCT_TITLE = "ARTLUX∞ Hydrogen Water Bottle Go+";
  const PRODUCT_PRICE = "88.88";

  const handleAddToCart = () => {
    const hydrogenBottleProduct = {
      node: {
        id: PRODUCT_ID,
        title: PRODUCT_TITLE,
        description: "Hydration. Simplified. Elevated. The ARTLUX∞ Hydrogen Water Bottle - transforms ordinary water into a modern hydration upgrade.",
        handle: PRODUCT_HANDLE,
        priceRange: {
          minVariantPrice: {
            amount: PRODUCT_PRICE,
            currencyCode: "USD",
          },
        },
        images: {
          edges: [
            {
              node: {
                url: "https://cdn.shopify.com/s/files/1/1016/3319/6381/files/artlux-hydrogen-bottle-branded.jpg?v=1767398539",
                altText: PRODUCT_TITLE,
              },
            },
          ],
        },
        variants: {
          edges: [
            {
              node: {
                id: VARIANT_ID,
                title: "Black / 450ml / USB",
                price: {
                  amount: PRODUCT_PRICE,
                  currencyCode: "USD",
                },
                availableForSale: true,
                selectedOptions: [
                  { name: "Color", value: "Black" },
                  { name: "Size", value: "450ml" },
                  { name: "Electrical outlet", value: "USB" },
                ],
              },
            },
          ],
        },
        options: [
          { name: "Color", values: ["Black", "Gold"] },
          { name: "Size", values: ["450ml"] },
          { name: "Electrical outlet", values: ["USB"] },
        ],
      },
    };

    addItem({
      product: hydrogenBottleProduct,
      variantId: VARIANT_ID,
      variantTitle: "Black / 450ml / USB",
      price: {
        amount: PRODUCT_PRICE,
        currencyCode: "USD",
      },
      quantity: 1,
      selectedOptions: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "450ml" },
        { name: "Electrical outlet", value: "USB" },
      ],
    });

    toast.success("Added to cart!", {
      description: PRODUCT_TITLE,
      position: 'top-center'
    });
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    
    try {
      const cartItem = {
        product: {
          node: {
            id: PRODUCT_ID,
            title: PRODUCT_TITLE,
            description: "Hydration. Simplified. Elevated.",
            handle: PRODUCT_HANDLE,
            priceRange: {
              minVariantPrice: {
                amount: PRODUCT_PRICE,
                currencyCode: "USD",
              },
            },
            images: { edges: [] },
            variants: { edges: [] },
            options: [],
          },
        },
        variantId: VARIANT_ID,
        variantTitle: "Black / 450ml / USB",
        price: {
          amount: PRODUCT_PRICE,
          currencyCode: "USD",
        },
        quantity: 1,
        selectedOptions: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "450ml" },
          { name: "Electrical outlet", value: "USB" },
        ],
      };

      let checkoutUrl = await createStorefrontCheckout([cartItem]);
      
      if (checkoutUrl) {
        // CRITICAL: Ensure myshopify.com domain is used
        if (checkoutUrl.includes('artlux8.com') && !checkoutUrl.includes('myshopify.com')) {
          checkoutUrl = checkoutUrl.replace(/https?:\/\/(www\.)?artlux8\.com/gi, 'https://artlux8-ypxf4.myshopify.com');
        }
        console.log('Buy Now redirecting to:', checkoutUrl);
        redirectToCheckout(checkoutUrl);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Buy now failed:', error);
      toast.error('Failed to create checkout. Adding to cart instead.', {
        position: 'top-center'
      });
      handleAddToCart();
      setIsBuying(false);
    }
    // Note: don't reset isBuying on success since we're redirecting
  };

  return (
    <>
      <CheckoutLoadingOverlay isVisible={isBuying} />
      <section className="pt-8 pb-20 md:pt-12 md:pb-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Product Image - Clickable */}
          <Link 
            to={`/products/${PRODUCT_HANDLE}`}
            className="relative order-2 lg:order-1 block cursor-pointer"
          >
            <div className="relative mx-auto max-w-md">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-teal/20 to-accent/30 blur-3xl scale-110 animate-pulse" />
              
              {/* Product image */}
              <img
                src={hydrogenBottle}
                alt={`${PRODUCT_TITLE} - Premium Molecular Hydrogen Generator`}
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
          </Link>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight">
              ARTLUX∞
            </h2>
            
            <Link to={`/products/${PRODUCT_HANDLE}`}>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 hover:opacity-80 transition-opacity cursor-pointer">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal to-accent">
                  Hydrogen Water Bottle Go+
                </span>
              </h3>
            </Link>
            
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
                  ${PRODUCT_PRICE}
                </span>
                <span className="text-muted-foreground line-through text-lg">
                  $129.99
                </span>
                <span className="bg-destructive/20 text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Save 31%
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
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/50 text-accent hover:bg-accent/10 px-8 py-6 text-lg w-full sm:w-auto"
                onClick={handleBuyNow}
                disabled={isBuying}
              >
                {isBuying ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Buy It Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            {/* Trust signals - checkout security */}
            <CheckoutTrustSignals className="mt-4" />

            {/* Trust badge */}
            <p className="text-muted-foreground text-sm mt-4 flex items-center justify-center lg:justify-start gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Free Shipping • 30-Day Money Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default PromotedHydrogenBottle;
