import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtocolBundles from '@/components/ProtocolBundles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Leaf, Brain, Moon, Zap, Heart, Shield, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { fetchProducts, ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';
import { toast } from 'sonner';
import { useLocalizationStore } from '@/stores/localizationStore';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  { id: 'all', name: 'All Products', icon: Shield },
  { id: 'foundational', name: 'Foundational Health', icon: Heart },
  { id: 'cognitive', name: 'Cognitive Enhancement', icon: Brain },
  { id: 'sleep', name: 'Sleep & Recovery', icon: Moon },
  { id: 'energy', name: 'Energy & Metabolism', icon: Zap },
  { id: 'longevity', name: 'Longevity & Anti-Aging', icon: Leaf },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [buyingProductId, setBuyingProductId] = useState<string | null>(null);
  const { addItem, clearCart } = useCartStore();
  const { formatPrice } = useLocalizationStore();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const shopifyProducts = await fetchProducts(50);
      setProducts(shopifyProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      toast.error('Product variant not available');
      return;
    }

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    });
    
    toast.success(`${product.node.title} added to cart`, {
      position: 'top-center'
    });
  };

  const handleBuyNow = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) {
      toast.error('Product variant not available');
      return;
    }

    setBuyingProductId(product.node.id);
    
    try {
      const cartItem = {
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || []
      };
      
      const checkoutUrl = await createStorefrontCheckout([cartItem]);
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Failed to create checkout');
    } finally {
      setBuyingProductId(null);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Premium Biohacking Supplements & Longevity Products | ARTLUX8"
        description="Shop the world's most premium biohacking supplements. Third-party tested NAD+ boosters, NMN, organic supplements, and performance optimization tools. Free shipping on orders over £60."
        keywords="premium biohacking supplements, longevity supplements, NAD+ supplements, NMN capsules, organic supplements lifestyle, performance optimization tools, anti-aging supplements, clean supplements, third-party tested supplements"
        url="https://artlux8.com/shop"
        type="website"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium tracking-wide mb-6">
              Science-Backed Supplements
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Longevity
              <span className="block text-accent">Supplements</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated, third-party tested formulas designed to optimize your healthspan and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex items-center justify-between pt-2">
                        <Skeleton className="h-7 w-20" />
                        <Skeleton className="h-9 w-16 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Products are coming soon. Tell us what products you'd like to see in the chat!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground font-medium">{products.length}</span> products
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => {
                  const price = product.node.priceRange.minVariantPrice;
                  const image = product.node.images.edges[0]?.node;
                  
                  return (
                    <div
                      key={product.node.id}
                      className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <Link to={`/product/${product.node.handle}`} className="block relative aspect-square bg-secondary/30 overflow-hidden">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="p-5">
                        <Link to={`/product/${product.node.handle}`}>
                          <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {product.node.title}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.node.description}
                        </p>

                        {/* Price */}
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-foreground">
                            {formatPrice(parseFloat(price.amount))}
                          </span>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAddToCart(product)}
                            className="flex-1"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleBuyNow(product)}
                            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                            disabled={buyingProductId === product.node.id}
                          >
                            {buyingProductId === product.node.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              'Buy It Now'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Protocol Bundles - Hidden for later */}
      {/* <ProtocolBundles /> */}

      {/* Benefits Banner */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Third-Party Tested</h4>
              <p className="text-sm text-muted-foreground">Every batch verified for purity and potency</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Clean Ingredients</h4>
              <p className="text-sm text-muted-foreground">No fillers, artificial colors, or preservatives</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Science-Backed</h4>
              <p className="text-sm text-muted-foreground">Formulas based on clinical research</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">30-Day Guarantee</h4>
              <p className="text-sm text-muted-foreground">Full refund if you're not satisfied</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
