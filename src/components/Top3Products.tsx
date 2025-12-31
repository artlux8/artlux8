import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchProducts, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Top3Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts(3);
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    };

    addItem(cartItem);
    toast.success(`${product.node.title} added to cart`);
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                <Skeleton className="aspect-square rounded-xl mb-6" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            Premium Selection
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Science-backed formulas for optimal health and longevity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div
              key={product.node.id}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Product Image */}
              <div 
                className="aspect-square rounded-xl overflow-hidden mb-6 bg-secondary/20 cursor-pointer"
                onClick={() => navigate(`/product/${product.node.handle}`)}
              >
                {product.node.images.edges[0] && (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Product Info */}
              <h3 
                className="font-display text-xl font-bold text-foreground mb-2 cursor-pointer hover:text-accent transition-colors"
                onClick={() => navigate(`/product/${product.node.handle}`)}
              >
                {product.node.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {product.node.description?.replace(/<[^>]*>/g, '').slice(0, 100)}...
              </p>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-foreground">
                  £{parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                </span>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Top3Products;
