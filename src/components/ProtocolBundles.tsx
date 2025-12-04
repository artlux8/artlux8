import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ChevronRight, Clock, Sparkles, Check } from 'lucide-react';
import { protocolBundles, getBundleProducts, type ProtocolBundle } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const difficultyColors = {
  Beginner: 'bg-emerald-500/10 text-emerald-500',
  Intermediate: 'bg-amber-500/10 text-amber-500',
  Advanced: 'bg-rose-500/10 text-rose-500',
};

const ProtocolBundles = () => {
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddBundle = (bundle: ProtocolBundle) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    
    const bundleProducts = getBundleProducts(bundle);
    bundleProducts.forEach(product => {
      const discountedPrice = product.price * (1 - bundle.savingsPercent / 100);
      addToCart({ id: product.id, name: product.name, price: discountedPrice }, 1, false);
    });
    
    toast.success(`${bundle.name} added to cart!`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium tracking-wide mb-6">
            <Sparkles className="w-4 h-4" />
            Protocol-Based Stacks
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Curated Supplement
            <span className="block text-accent">Bundles</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Science-backed supplement stacks designed for specific health goals. 
            Save up to 30% compared to buying individually.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {protocolBundles.map((bundle) => {
            const Icon = bundle.icon;
            const products = getBundleProducts(bundle);
            const isExpanded = expandedBundle === bundle.id;
            
            return (
              <div
                key={bundle.id}
                className="group relative bg-card rounded-3xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
              >
                {/* Bundle Badge */}
                {bundle.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-accent text-accent-foreground px-3 py-1">
                      {bundle.badge}
                    </Badge>
                  </div>
                )}

                {/* Header Section */}
                <div className="relative p-6 pb-4 border-b border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-accent font-medium mb-1">{bundle.tagline}</p>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {bundle.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[bundle.difficulty]}`}>
                          {bundle.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {bundle.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Preview */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bundle.description}
                  </p>

                  {/* Products List */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Includes {products.length} Products:
                    </p>
                    <div className={`space-y-2 ${isExpanded ? '' : 'max-h-24 overflow-hidden relative'}`}>
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group/item"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover/item:text-accent transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-accent transition-colors" />
                        </Link>
                      ))}
                      {!isExpanded && products.length > 2 && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
                      )}
                    </div>
                    {products.length > 2 && (
                      <button
                        onClick={() => setExpandedBundle(isExpanded ? null : bundle.id)}
                        className="text-xs text-accent hover:underline"
                      >
                        {isExpanded ? 'Show less' : `Show all ${products.length} products`}
                      </button>
                    )}
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {bundle.benefits.slice(0, 4).map((benefit) => (
                      <span
                        key={benefit}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                      >
                        <Check className="w-3 h-3 text-accent" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer - Pricing & CTA */}
                <div className="p-6 pt-4 border-t border-border/50 bg-secondary/20">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-foreground">
                          ${bundle.bundlePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${bundle.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-accent font-medium">
                        Save ${bundle.savings.toFixed(2)} ({bundle.savingsPercent}% off)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/bundle/${bundle.id}`}>
                        <Button variant="outline" size="sm" className="border-accent/50 text-accent hover:bg-accent/10">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleAddBundle(bundle)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add Bundle
                      </Button>
                    </div>
                  </div>

                  {/* Protocol Note */}
                  <div className="mt-4 p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Protocol: </span>
                      {bundle.protocol}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which stack is right for you?
          </p>
          <Link to="/protocols">
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Explore Our Protocols
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProtocolBundles;
