import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtocolBundles from '@/components/ProtocolBundles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Leaf, Brain, Moon, Zap, Heart, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  benefits: string[];
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
}

const categories = [
  { id: 'all', name: 'All Products', icon: Shield },
  { id: 'foundational', name: 'Foundational Health', icon: Heart },
  { id: 'cognitive', name: 'Cognitive Enhancement', icon: Brain },
  { id: 'sleep', name: 'Sleep & Recovery', icon: Moon },
  { id: 'energy', name: 'Energy & Metabolism', icon: Zap },
  { id: 'longevity', name: 'Longevity & Anti-Aging', icon: Leaf },
];

const products: Product[] = [
  // Foundational Health
  {
    id: 1,
    name: 'Essential Multi+',
    description: 'Complete daily multivitamin with methylated B vitamins and chelated minerals for optimal absorption.',
    price: 59.00,
    category: 'foundational',
    benefits: ['Immune Support', 'Energy', 'Vitality'],
    rating: 4.9,
    reviews: 2340,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Omega-3 Ultra',
    description: 'Triglyceride-form fish oil with 3000mg EPA/DHA per serving. Molecularly distilled for purity.',
    price: 49.00,
    category: 'foundational',
    benefits: ['Heart Health', 'Brain Function', 'Inflammation'],
    rating: 4.8,
    reviews: 1856,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Vitamin D3 + K2',
    description: '5000 IU D3 with MK-7 K2 for calcium optimization and immune function.',
    price: 34.00,
    category: 'foundational',
    benefits: ['Bone Health', 'Immune Support', 'Mood'],
    rating: 4.9,
    reviews: 3120,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
  },
  
  // Cognitive Enhancement
  {
    id: 4,
    name: 'NeuroFocus Pro',
    description: 'Advanced nootropic stack with Lion\'s Mane, Bacopa, and Alpha-GPC for mental clarity.',
    price: 79.00,
    category: 'cognitive',
    benefits: ['Focus', 'Memory', 'Mental Clarity'],
    rating: 4.7,
    reviews: 1245,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Lion\'s Mane Extract',
    description: 'Organic dual-extract Lion\'s Mane mushroom for nerve growth factor support.',
    price: 44.00,
    category: 'cognitive',
    benefits: ['Neurogenesis', 'Memory', 'Mood'],
    rating: 4.8,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Phosphatidylserine',
    description: 'Sunflower-derived PS for cognitive function and cortisol management.',
    price: 39.00,
    category: 'cognitive',
    benefits: ['Memory', 'Stress Response', 'Focus'],
    rating: 4.6,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  },
  
  // Sleep & Recovery
  {
    id: 7,
    name: 'Deep Sleep Formula',
    description: 'Magnesium glycinate, L-theanine, and Apigenin for restorative sleep.',
    price: 54.00,
    category: 'sleep',
    benefits: ['Sleep Quality', 'Recovery', 'Relaxation'],
    rating: 4.9,
    reviews: 2890,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Magnesium Complex',
    description: 'Tri-magnesium blend (glycinate, threonate, taurate) for complete coverage.',
    price: 38.00,
    category: 'sleep',
    benefits: ['Muscle Relaxation', 'Sleep', 'Stress'],
    rating: 4.8,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
  },
  {
    id: 9,
    name: 'Recovery Matrix',
    description: 'Post-workout recovery with tart cherry, bromelain, and curcumin.',
    price: 49.00,
    category: 'sleep',
    benefits: ['Muscle Recovery', 'Inflammation', 'Performance'],
    rating: 4.7,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
  },
  
  // Energy & Metabolism
  {
    id: 10,
    name: 'Metabolic Fire',
    description: 'Thermogenic support with green tea extract, berberine, and chromium.',
    price: 64.00,
    category: 'energy',
    benefits: ['Metabolism', 'Energy', 'Blood Sugar'],
    rating: 4.6,
    reviews: 1123,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
  },
  {
    id: 11,
    name: 'CoQ10 Ubiquinol',
    description: 'Active form CoQ10 for cellular energy production and heart health.',
    price: 54.00,
    category: 'energy',
    benefits: ['Cellular Energy', 'Heart Health', 'Anti-Aging'],
    rating: 4.8,
    reviews: 1456,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=400&fit=crop',
  },
  {
    id: 12,
    name: 'B-Complex Active',
    description: 'Methylated B vitamins for energy metabolism and nervous system support.',
    price: 29.00,
    category: 'energy',
    benefits: ['Energy', 'Mood', 'Nervous System'],
    rating: 4.7,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  },
  
  // Longevity & Anti-Aging
  {
    id: 13,
    name: 'NMN Premium',
    description: 'Pharmaceutical-grade NMN for NAD+ optimization and cellular rejuvenation.',
    price: 119.00,
    category: 'longevity',
    benefits: ['NAD+ Boost', 'Anti-Aging', 'Energy'],
    rating: 4.9,
    reviews: 1876,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  },
  {
    id: 14,
    name: 'Resveratrol Elite',
    description: 'Trans-resveratrol with pterostilbene for sirtuin activation.',
    price: 69.00,
    category: 'longevity',
    benefits: ['Sirtuins', 'Cardiovascular', 'Longevity'],
    rating: 4.7,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
  },
  {
    id: 15,
    name: 'Collagen Peptides+',
    description: 'Type I, II, III collagen with hyaluronic acid and vitamin C.',
    price: 49.00,
    category: 'longevity',
    benefits: ['Skin Health', 'Joints', 'Hair & Nails'],
    rating: 4.8,
    reviews: 3456,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
  },
  {
    id: 16,
    name: 'Spermidine Complex',
    description: 'Wheat germ-derived spermidine for autophagy and cellular renewal.',
    price: 89.00,
    category: 'longevity',
    benefits: ['Autophagy', 'Cellular Health', 'Longevity'],
    rating: 4.6,
    reviews: 543,
    badge: 'Advanced',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subscriptionStates, setSubscriptionStates] = useState<Record<number, boolean>>({});
  const { addToCart } = useCart();
  const { user } = useAuth();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const toggleSubscription = (productId: number) => {
    setSubscriptionStates(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const getPrice = (product: Product) => {
    const isSubscribed = subscriptionStates[product.id];
    return isSubscribed ? product.price * 0.85 : product.price;
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    const isSubscribed = subscriptionStates[product.id];
    addToCart({ id: product.id, name: product.name, price: product.price }, 1, isSubscribed);
  };

  return (
    <div className="min-h-screen bg-background">
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
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isSubscribed = subscriptionStates[product.id];
              const displayPrice = getPrice(product);
              
              return (
                <div
                  key={product.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`} className="block relative aspect-square bg-secondary/30 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Subscription Toggle */}
                    <div 
                      onClick={() => toggleSubscription(product.id)}
                      className={`flex items-center justify-between p-3 rounded-lg mb-4 cursor-pointer transition-all ${
                        isSubscribed 
                          ? 'bg-accent/10 border border-accent/30' 
                          : 'bg-secondary/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSubscribed ? 'border-accent bg-accent' : 'border-muted-foreground'
                        }`}>
                          {isSubscribed && <div className="w-2 h-2 rounded-full bg-accent-foreground" />}
                        </div>
                        <span className="text-sm font-medium">Subscribe & Save 15%</span>
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">${displayPrice.toFixed(2)}</span>
                        {isSubscribed && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Protocol Bundles */}
      <ProtocolBundles />

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
