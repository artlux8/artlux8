import { useState, useEffect } from "react";
import { Loader2, Package, TrendingUp, DollarSign, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useLocalizationStore } from "@/stores/localizationStore";

const MARGIN_MULTIPLIER = 3;

const WholesaleCatalog = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { formatPrice } = useLocalizationStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(100);
        // Filter to only OKCapsule products
        const okCapsuleProducts = data.filter(
          (p) => p.node.vendor?.toLowerCase() === "ok-capsule"
        );
        setProducts(okCapsuleProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const getBaseCost = (product: ShopifyProduct) => {
    const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
    return price;
  };

  const getRetailPrice = (product: ShopifyProduct) => {
    const baseCost = getBaseCost(product);
    return baseCost * MARGIN_MULTIPLIER;
  };

  const getProfit = (product: ShopifyProduct) => {
    return getRetailPrice(product) - getBaseCost(product);
  };

  // Get unique categories from product titles (first word before space or common patterns)
  const categories = [...new Set(products.map((p) => {
    const title = p.node.title.toLowerCase();
    if (title.includes("pack")) return "Packs";
    if (title.includes("complex")) return "Complex";
    if (title.includes("vitamin") || title.includes("d complex")) return "Vitamins";
    return "Singles";
  }))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.node.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (categoryFilter === "all") return matchesSearch;
    
    const title = product.node.title.toLowerCase();
    if (categoryFilter === "Packs") return matchesSearch && title.includes("pack");
    if (categoryFilter === "Complex") return matchesSearch && title.includes("complex");
    if (categoryFilter === "Vitamins") return matchesSearch && (title.includes("vitamin") || title.includes("d complex"));
    if (categoryFilter === "Singles") {
      return matchesSearch && !title.includes("pack") && !title.includes("complex") && !title.includes("vitamin");
    }
    return matchesSearch;
  });

  const totalProducts = filteredProducts.length;
  const avgMargin = filteredProducts.length > 0 
    ? filteredProducts.reduce((acc, p) => acc + getProfit(p), 0) / filteredProducts.length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
              OKCapsule Wholesale Catalog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-logo font-bold mb-4 text-foreground">
              Premium Supplements
              <span className="text-gold"> Wholesale</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete OKCapsule catalog with 3x margin pricing. 
              All products include automated fulfillment and FDA-compliant labeling.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-card border border-border rounded-xl p-4">
                <Package className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalProducts}</div>
                <div className="text-xs text-muted-foreground">Products</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">3x</div>
                <div className="text-xs text-muted-foreground">Margin</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <DollarSign className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{formatPrice(avgMargin)}</div>
                <div className="text-xs text-muted-foreground">Avg Profit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Input
                  placeholder="Search supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="Singles">Singles</SelectItem>
                  <SelectItem value="Packs">Packs</SelectItem>
                  <SelectItem value="Complex">Complex</SelectItem>
                  <SelectItem value="Vitamins">Vitamins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
              <span className="ml-3 text-muted-foreground">Loading catalog...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const baseCost = getBaseCost(product);
                const retailPrice = getRetailPrice(product);
                const profit = getProfit(product);
                const profitPercent = ((profit / baseCost) * 100).toFixed(0);
                const imageUrl = product.node.images?.edges?.[0]?.node?.url;
                
                return (
                  <div
                    key={product.node.id}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
                  >
                    {/* Image */}
                    <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      <Badge className="absolute top-3 right-3 bg-green-500/90 text-white border-0">
                        +{profitPercent}% margin
                      </Badge>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 min-h-[3rem]">
                        {product.node.title}
                      </h3>
                      
                      {/* Pricing Grid */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Base Cost:</span>
                          <span className="text-foreground">{formatPrice(baseCost)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Retail (3x):</span>
                          <span className="text-gold font-semibold">{formatPrice(retailPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-t border-border pt-2">
                          <span className="text-green-500 font-medium">Profit:</span>
                          <span className="text-green-500 font-bold">{formatPrice(profit)}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-gold/30 text-gold hover:bg-gold/10"
                        onClick={() => window.open('https://portal.okcapsule.app', '_blank')}
                      >
                        Add to OKCapsule
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-secondary/20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-logo font-bold text-center mb-8 text-foreground">
              OKCapsule Integration Benefits
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Automated Fulfillment</h3>
                <p className="text-sm text-muted-foreground">
                  Orders are automatically processed and shipped from OKCapsule's facility
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">FDA Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  All products include FDA-compliant labeling and personalized pamphlets
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">3x Profit Margin</h3>
                <p className="text-sm text-muted-foreground">
                  Industry-standard 3x markup ensures healthy profit on every sale
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WholesaleCatalog;
