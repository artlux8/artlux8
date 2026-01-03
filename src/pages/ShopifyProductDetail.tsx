import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Minus, Plus, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { toast } from 'sonner';
import { useLocalizationStore } from '@/stores/localizationStore';
import { getEnhancedContent, EnhancedProductContent } from '@/data/enhancedProductContent';
import EnhancedProductContentSection from '@/components/product/EnhancedProductContent';
import ProductReviews from '@/components/product/ProductReviews';
import { getProductReviews, ProductReview } from '@/data/productReviews';

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { formatPrice, convertPrice } = useLocalizationStore();
  
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [enhancedContent, setEnhancedContent] = useState<EnhancedProductContent | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setLoading(true);
      try {
        const productData = await fetchProductByHandle(handle);
        setProduct(productData);
        if (handle) {
          setEnhancedContent(getEnhancedContent(handle));
          setReviews(getProductReviews(handle));
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
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

  const selectedVariant = product.variants?.edges?.[selectedVariantIndex]?.node;
  const price = selectedVariant?.price || product.priceRange?.minVariantPrice;
  const priceAmount = price?.amount ? parseFloat(price.amount) : 0;
  const mainImage = product.images?.edges?.[0]?.node;
  const variantEdges = product.variants?.edges || [];
  const hasMultipleVariants = variantEdges.length > 1;

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

  const totalPrice = priceAmount > 0 ? convertPrice(priceAmount) * quantity : 0;

  // Update meta tags for enhanced content
  useEffect(() => {
    if (enhancedContent) {
      document.title = enhancedContent.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', enhancedContent.metaDescription);
      }
    } else if (product) {
      document.title = `${product.title} | ARTLUX∞`;
    }
  }, [enhancedContent, product]);

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
          <div className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden lg:sticky lg:top-32">
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
              {enhancedContent?.heroHeadline || product.title}
            </h1>

            <p className="text-muted-foreground mb-6 text-lg">
              {product.description}
            </p>

            {/* Variant Selector */}
            {hasMultipleVariants && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Option
                </label>
                <div className="flex flex-wrap gap-2">
                  {variantEdges.map((variant, index) => (
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
                  {formatPrice(totalPrice, false)}
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

        {/* Enhanced Content Section */}
        {enhancedContent && (
          <EnhancedProductContentSection content={enhancedContent} />
        )}

        {/* Customer Reviews */}
        <ProductReviews reviews={reviews} />
      </div>

      <Footer />
    </div>
  );
};

export default ShopifyProductDetail;
