import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2, Lock, Loader2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLocalizationStore } from "@/stores/localizationStore";
import { normalizeCheckoutUrl } from "@/lib/shopify";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutLoadingOverlay from "@/components/CheckoutLoadingOverlay";
import SEO from "@/components/SEO";

const CartPage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem,
    clearCart,
    createCheckout,
    getTotalItems,
    getTotalPrice
  } = useCartStore();
  const { formatPrice } = useLocalizationStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    // Validate all items have valid variantId before proceeding
    for (const item of items) {
      if (!item.variantId || !item.variantId.includes('gid://shopify/ProductVariant/')) {
        toast.error(`Invalid cart item: "${item.product?.node?.title || 'Unknown product'}" has no valid variant ID`);
        return;
      }
    }

    try {
      setIsRedirecting(true);
      const rawCheckoutUrl = await createCheckout();
      console.log("RAW CHECKOUT URL:", rawCheckoutUrl);
      
      if (rawCheckoutUrl) {
        // Normalize URL to always use Shopify domain
        const checkoutUrl = normalizeCheckoutUrl(rawCheckoutUrl);
        console.log("FINAL CHECKOUT URL:", checkoutUrl);
        
        if (!checkoutUrl.startsWith('https://artlux8.myshopify.com')) {
          console.error('Invalid checkout URL:', checkoutUrl);
          toast.error('Checkout configuration error. Please try again.');
          setIsRedirecting(false);
          return;
        }
        
        // Open Shopify checkout in new tab to avoid SPA routing issues
        window.open(checkoutUrl, '_blank');
        setIsRedirecting(false);
        toast.success('Checkout opened in new tab');
      } else {
        setIsRedirecting(false);
        toast.error('Failed to create checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setIsRedirecting(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Checkout failed: ${errorMessage}`);
    }
  };

  return (
    <>
      <SEO 
        title="Cart | ARTLUX∞"
        description="Review your cart and proceed to secure Shopify checkout."
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back to Shop */}
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground mb-8">
              {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
            </p>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
                <p className="text-lg text-muted-foreground mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-8">Add products to get started</p>
                <Link to="/shop">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Browse Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="md:col-span-2 space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-4 bg-secondary/30 rounded-lg border border-border/50">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary/50 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.product?.node?.images?.edges?.[0]?.node?.url ||
                            '/placeholder.svg'
                          }
                          alt={item.product?.node?.title || 'Product'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-lg">{item.product.node.title}</h3>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-sm text-muted-foreground">
                            {item.selectedOptions.map(option => option.value).join(' • ')}
                          </p>
                        )}
                        <p className="font-semibold text-accent mt-1">
                          {formatPrice(parseFloat(item.price.amount))}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Upsell Block - Conversion Focused */}
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <p className="text-sm font-medium text-foreground mb-3">Complete Your Protocol</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/shop" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-accent/50 hover:bg-accent/20">
                          + Add Hydrogen Tabs (30 tabs)
                        </Button>
                      </Link>
                      <Link to="/shop" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-accent/50 hover:bg-accent/20">
                          + Add Extra Bottle (Save 10%)
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="md:col-span-1">
                  <div className="bg-secondary/30 rounded-lg border border-border/50 p-6 sticky top-24">
                    <h2 className="font-display text-xl text-foreground mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between text-foreground font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-accent">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      onClick={handleCheckout}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
                      size="lg"
                      disabled={items.length === 0 || isLoading || isRedirecting}
                    >
                      {isLoading || isRedirecting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {isRedirecting ? 'Securing checkout...' : 'Creating Checkout...'}
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Secure Checkout
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Secure Shopify Checkout • Apple Pay • Google Pay • SSL Encrypted
                    </p>

                    <Button 
                      variant="ghost" 
                      className="w-full text-muted-foreground hover:text-foreground mt-4"
                      onClick={clearCart}
                      disabled={isRedirecting}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
      
      <CheckoutLoadingOverlay isVisible={isRedirecting} />
    </>
  );
};

export default CartPage;
