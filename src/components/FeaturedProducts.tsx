import { useState } from "react";
import { Star, ShoppingCart, Plus, Minus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCart } from "@/contexts/CartContext";
import { useLocalizationStore } from "@/stores/localizationStore";

const products = [
  {
    id: 1,
    name: "Longevity Stack",
    description: "NMN 500mg + Trans-Resveratrol + CoQ10 for cellular rejuvenation",
    price: 129.99,
    originalPrice: 149.99,
    rating: 5.0,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    badge: "Best Seller",
    benefits: ["NAD+ Support", "Sirtuin Activation"],
  },
  {
    id: 3,
    name: "Omega-3 Ultra",
    description: "High-potency EPA/DHA/DPA for brain, heart & inflammation",
    price: 54.99,
    originalPrice: 64.99,
    rating: 4.9,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop",
    badge: "Top Rated",
    benefits: ["Brain Health", "Heart Health"],
  },
];

const FeaturedProducts = () => {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [subscriptions, setSubscriptions] = useState<Record<number, boolean>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );
  const { addToCart } = useCart();
  const { formatPrice } = useLocalizationStore();

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const toggleSubscription = (id: number) => {
    setSubscriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getPrice = (product: typeof products[0]) => {
    const basePrice = product.price;
    return subscriptions[product.id] ? basePrice * 0.85 : basePrice;
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(
      { id: product.id, name: product.name, price: product.price },
      quantities[product.id],
      subscriptions[product.id]
    );
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <p className="text-gold font-medium text-sm tracking-widest uppercase">
              Premium Supplements
            </p>
          </div>
          <h2 className="font-logo text-3xl md:text-5xl font-bold text-foreground mb-4">
            Science-Backed Formulations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pharmaceutical-grade ingredients in clinically effective doses. 
            Every formula is third-party tested for purity and potency.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-gold text-primary text-xs font-semibold px-3 py-1 rounded-full">
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
                            ? "fill-gold text-gold"
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
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Benefit Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.benefits.map((benefit) => (
                    <span key={benefit} className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Subscribe & Save Toggle */}
                <div className="flex items-center justify-between mb-3 p-2 bg-secondary/50 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground">Subscribe & Save</span>
                    <span className="text-xs text-gold font-semibold">15% off + Free Shipping</span>
                  </div>
                  <Switch
                    checked={subscriptions[product.id]}
                    onCheckedChange={() => toggleSubscription(product.id)}
                  />
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(getPrice(product))}
                  </span>
                  {(product.originalPrice || subscriptions[product.id]) && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(subscriptions[product.id] ? product.price : product.originalPrice || 0)}
                    </span>
                  )}
                  {subscriptions[product.id] && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">
                      -15%
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
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {subscriptions[product.id] ? "Subscribe" : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-gold/30 text-foreground hover:bg-gold/10 rounded-full px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;