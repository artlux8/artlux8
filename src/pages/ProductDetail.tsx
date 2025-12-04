import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, Star, ArrowLeft, Check, AlertTriangle, 
  FlaskConical, Clock, Pill, BookOpen, ChevronRight
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { getProductById, getRelatedProducts, categories, Product } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubscription, setIsSubscription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = getProductById(Number(id));
  const relatedProducts = product ? getRelatedProducts(product.id) : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const displayPrice = isSubscription ? product.price * 0.85 : product.price;
  const category = categories.find(c => c.id === product.category);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    addToCart({ id: product.id, name: product.name, price: product.price }, quantity, isSubscription);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-28 pb-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/30 sticky top-28">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground text-sm px-4 py-1">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            {category && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
                <category.icon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            )}

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted'}`} 
                  />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.longDescription}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {product.benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* Serving Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-xl">
              <div>
                <p className="text-sm text-muted-foreground">Serving Size</p>
                <p className="font-semibold">{product.servingSize}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Servings Per Container</p>
                <p className="font-semibold">{product.servingsPerContainer}</p>
              </div>
            </div>

            {/* Subscription Toggle */}
            <div
              onClick={() => setIsSubscription(!isSubscription)}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                isSubscription 
                  ? 'bg-accent/10 border-2 border-accent' 
                  : 'bg-secondary/50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSubscription ? 'border-accent bg-accent' : 'border-muted-foreground'
                }`}>
                  {isSubscription && <Check className="w-3 h-3 text-accent-foreground" />}
                </div>
                <div>
                  <span className="font-semibold">Subscribe & Save 15%</span>
                  <p className="text-sm text-muted-foreground">Free shipping, cancel anytime</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                Save ${(product.price * 0.15).toFixed(2)}
              </Badge>
            </div>

            {/* Price & Quantity */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-4xl font-bold text-foreground">${displayPrice.toFixed(2)}</span>
                {isSubscription && (
                  <span className="text-lg text-muted-foreground line-through ml-3">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <Button 
              size="lg" 
              onClick={handleAddToCart}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart - ${(displayPrice * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Tabs */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 bg-secondary/50 p-1 rounded-xl mb-8">
              <TabsTrigger value="ingredients" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Ingredients</span>
              </TabsTrigger>
              <TabsTrigger value="studies" className="flex items-center gap-2 data-[state=active]:bg-background">
                <FlaskConical className="w-4 h-4" />
                <span className="hidden sm:inline">Research</span>
              </TabsTrigger>
              <TabsTrigger value="dosage" className="flex items-center gap-2 data-[state=active]:bg-background">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Dosage</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2 data-[state=active]:bg-background">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Info</span>
              </TabsTrigger>
            </TabsList>

            {/* Ingredients Tab */}
            <TabsContent value="ingredients" className="mt-0">
              <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Supplement Facts</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  Serving Size: {product.servingSize} | Servings Per Container: {product.servingsPerContainer}
                </div>
                <div className="divide-y divide-border">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="font-semibold">{ingredient.name}</div>
                      <div className="text-accent font-medium">{ingredient.amount}</div>
                      <div className="text-muted-foreground text-sm">{ingredient.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Clinical Studies Tab */}
            <TabsContent value="studies" className="mt-0">
              <div className="max-w-4xl mx-auto space-y-6">
                <h3 className="font-display text-2xl font-bold text-center mb-8">
                  Clinical Research & Evidence
                </h3>
                {product.clinicalStudies.map((study, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border p-6 hover:border-accent/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <FlaskConical className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{study.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {study.journal} • {study.year}
                        </p>
                        <p className="text-foreground leading-relaxed">
                          <span className="text-accent font-medium">Key Finding:</span> {study.finding}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Dosage Tab */}
            <TabsContent value="dosage" className="mt-0">
              <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Dosage Recommendations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-secondary/30 rounded-xl text-center">
                    <Pill className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <p className="text-sm text-muted-foreground">Recommended Dose</p>
                    <p className="font-semibold text-lg">{product.dosage.recommended}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <p className="text-sm text-muted-foreground">Best Time</p>
                    <p className="font-semibold text-lg">{product.dosage.timing}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
                      {product.dosage.withFood ? (
                        <Check className="w-5 h-5 text-accent" />
                      ) : (
                        <span className="text-xs text-accent font-bold">∅</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">With Food</p>
                    <p className="font-semibold text-lg">{product.dosage.withFood ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Usage Notes:</h4>
                  <ul className="space-y-2">
                    {product.dosage.notes.map((note, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Additional Info Tab */}
            <TabsContent value="info" className="mt-0">
              <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border p-8">
                <h3 className="font-display text-2xl font-bold mb-6">Important Information</h3>
                
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-gold" />
                    Warnings & Precautions
                  </h4>
                  <ul className="space-y-2">
                    {product.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-secondary/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. 
                    This product is not intended to diagnose, treat, cure, or prevent any disease. 
                    Consult your healthcare provider before starting any supplement regimen.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-secondary/30 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-sm font-medium">{relatedProduct.rating}</span>
                    </div>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold mt-2">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
