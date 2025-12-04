import { useState } from "react";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "Omega-3 Ultra",
    description: "High-potency fish oil for brain & heart health",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Vitamin D3 + K2",
    description: "Optimal bone density & immune support",
    price: 34.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=600&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Magnesium Complex",
    description: "7 forms of magnesium for complete absorption",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviews: 3156,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop",
    badge: "20% Off",
  },
  {
    id: 4,
    name: "Longevity Stack",
    description: "NMN, Resveratrol & CoQ10 for cellular health",
    price: 129.99,
    originalPrice: 149.99,
    rating: 5.0,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=600&auto=format&fit=crop",
    badge: "Premium",
  },
];

const FeaturedProducts = () => {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const addToCart = (productName: string) => {
    toast.success(`Added to cart`, {
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-accent font-medium text-sm tracking-widest uppercase mb-2">
              Featured Products
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Bestsellers & Staff Picks
            </h2>
          </div>
          <Button variant="outline" className="w-fit border-border text-foreground hover:bg-secondary rounded-full px-6">
            View All Products
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantities[product.id]}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <Button
                    onClick={() => addToCart(product.name)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;