import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Minus, Plus, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setLoading(true);
      const productData = await fetchProductByHandle(handle);
      setProduct(productData);
      setLoading(false);
    };
    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <span className="ml-3 text-muted-foreground">Loading product...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/shop')} className="bg-accent text-accent-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;
  const mainImage = product.images.edges[0]?.node;

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode
    }).format(parseFloat(amount));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    const shopifyProduct: ShopifyProduct = {
      node: product
    };

    addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success(`${product.title} added to cart`, {
      position: 'top-center'
    });
  };

  const totalPrice = parseFloat(price.amount) * quantity;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-32">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/shop" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-20 h-20 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            <p className="text-muted-foreground mb-6 text-lg">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.edges.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Option
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((variant, index) => (
                    <button
                      key={variant.node.id}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedVariantIndex === index
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border hover:border-accent/50'
                      }`}
                      disabled={!variant.node.availableForSale}
                    >
                      {variant.node.title}
                      {!variant.node.availableForSale && (
                        <span className="ml-2 text-xs text-muted-foreground">(Sold Out)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price Display */}
            <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(totalPrice.toString(), price.currencyCode)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg"
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </Button>

            {!selectedVariant?.availableForSale && (
              <p className="text-center text-muted-foreground mt-4">
                This product is currently unavailable.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopifyProductDetail;
