import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Droplets, Zap, Shield, Brain, Heart, ShoppingCart, Loader2, Check } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useLocalizationStore } from "@/stores/localizationStore";
import { toast } from "sonner";
import hydrogenBottleBranded from "@/assets/artlux-hydrogen-bottle-branded.png";

const HydrogenBottles = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const { formatPrice, convertPrice } = useLocalizationStore();

  const hydrogenFAQ = [
    { question: "What is hydrogen water?", answer: "Hydrogen water is regular water infused with molecular hydrogen (H₂) gas. It acts as a selective antioxidant, neutralizing harmful free radicals while supporting cellular energy production." },
    { question: "How does hydrogen water support performance?", answer: "Molecular hydrogen crosses cell membranes easily, supporting athletic recovery, reducing exercise-induced oxidative stress, and helping maintain energy levels during physical activity." },
    { question: "How often should I drink hydrogen water?", answer: "For optimal lifestyle benefits, many biohackers drink 1-3 glasses of freshly generated hydrogen water daily, particularly before or after workouts or as part of a morning routine." },
    { question: "How long does hydrogen stay in water?", answer: "Hydrogen gas naturally dissipates from water over time. For best results, drink the water within 15-30 minutes of generation. Our bottles are designed for on-demand hydrogen production." },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await fetchProducts(50, "hydrogen");
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to load hydrogen products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });

    toast.success("Added to cart!", {
      description: product.node.title,
      position: "top-center",
      action: {
        label: "View Cart",
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  const benefits = [
    { icon: Zap, title: "Antioxidant Power", description: "Molecular hydrogen neutralizes harmful free radicals selectively" },
    { icon: Brain, title: "Mental Clarity", description: "Crosses blood-brain barrier for cognitive support and neuroprotection" },
    { icon: Heart, title: "Athletic Recovery", description: "Reduces lactic acid buildup and speeds muscle recovery" },
    { icon: Shield, title: "Anti-Inflammatory", description: "Modulates inflammatory response naturally at the cellular level" },
    { icon: Droplets, title: "Cellular Hydration", description: "Smallest molecules for superior cell membrane penetration" },
  ];

  const features = [
    "SPE/PEM electrolysis technology",
    "Food-grade borosilicate glass",
    "USB-C rechargeable battery",
    "3-minute rapid infusion cycle",
    "1000+ PPB hydrogen concentration",
    "Portable luxury design"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Hydrogen Water Collection | Premium Hydrogen Water Bottles & Generators"
        description="Explore our Hydrogen Water collection — premium hydrogen water bottles and portable hydrogen water generators designed for modern longevity-focused lifestyles inspired by discussions from Gary Brecka and Bryan Johnson."
        keywords="hydrogen water bottle, hydrogen water, hydrogen rich water bottle, portable hydrogen water generator, longevity hydration, biohacking hydration, premium hydrogen water"
        url="https://artlux8.com/collections/hydrogen-water"
        faq={hydrogenFAQ}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-sky-950 via-primary to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(100,180,255,0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Droplets className="w-5 h-5 text-accent" />
                <span className="text-accent font-medium tracking-widest uppercase text-sm">Hydrogen Water Technology</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
                Hydrogen Water Bottles
                <br />
                <span className="text-accent">Antioxidants On-The-Go</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
                Generate antioxidant-rich hydrogen water anywhere with portable SPE/PEM electrolysis technology. 
                The most powerful antioxidant, small enough to fit in your bag.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                    Shop H2 Bottles
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <Link to="/free-protocol">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                    Free Protocol Challenge
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <img 
                src={hydrogenBottleBranded} 
                alt="ARTLUX Hydrogen Water Bottle" 
                className="w-80 h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Science of Hydrogen Water
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Molecular hydrogen (H₂) is the smallest antioxidant molecule, able to penetrate 
              cell membranes and even cross the blood-brain barrier for comprehensive cellular protection.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              ARTLUX∞ Hydrogen Bottle Collection
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Premium hydrogen water generators with luxury design and cutting-edge technology.
              Our flagship product, the <Link to="/products/artlux8-hydrogen-water-bottle-go" className="text-accent hover:underline">ARTLUX∞ Hydrogen Water Bottle Go+</Link>, is a premium portable hydrogen water bottle designed for daily hydration and longevity-focused routines.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">Loading products...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product, index) => {
                const variant = product.node.variants.edges[0]?.node;
                const price = variant?.price || product.node.priceRange.minVariantPrice;
                const image = product.node.images.edges[0]?.node;
                const convertedPrice = convertPrice(parseFloat(price.amount));

                return (
                  <Card 
                    key={product.node.id} 
                    className={`bg-card border-border hover:border-accent/50 transition-all overflow-hidden ${index === 0 ? 'ring-2 ring-accent' : ''}`}
                  >
                    {index === 0 && (
                      <div className="bg-accent text-accent-foreground text-xs font-semibold text-center py-2">
                        Featured Product
                      </div>
                    )}
                    <div className="aspect-square bg-secondary/30 overflow-hidden">
                      {image ? (
                        <img 
                          src={image.url} 
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Droplets className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 hover:text-accent transition-colors">
                          {product.node.title}
                        </h3>
                      </Link>
                      <p className="text-2xl font-bold text-accent mb-4">
                        {formatPrice(convertedPrice, false)}
                      </p>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                        {product.node.description}
                      </p>
                      <div className="flex gap-3">
                        <Button 
                          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link to={`/product/${product.node.handle}`}>
                          <Button variant="outline">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Fallback: Show featured product when no Shopify products found */
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-accent overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-square bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center p-8">
                    <img 
                      src={hydrogenBottleBranded} 
                      alt="ARTLUX Hydrogen Water Bottle"
                      className="w-full max-w-xs h-auto"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-4 w-fit">
                      Premium Collection
                    </span>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      ARTLUX∞ Hydrogen Water Bottle
                    </h3>
                    <p className="text-3xl font-bold text-accent mb-4">$89.88</p>
                    <p className="text-muted-foreground text-sm mb-6">
                      Premium hydrogen-rich water generator for optimal cellular hydration and longevity support. 
                      Luxury matte black design with gold ARTLUX∞ branding.
                    </p>
                    <ul className="space-y-2 mb-8">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/product/artlux-hydrogen-water-bottle">
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Product
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Win a Free Hydrogen Bottle
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Complete our 7-Day Longevity Protocol Challenge and receive a free ARTLUX∞ Hydrogen Water Bottle as your reward.
          </p>
          <Link to="/free-protocol">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start the Challenge
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HydrogenBottles;
