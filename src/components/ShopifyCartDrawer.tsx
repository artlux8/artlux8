import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, Lock, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useLocalizationStore } from "@/stores/localizationStore";
import { normalizeCheckoutUrl } from "@/lib/shopify";
import { toast } from "sonner";
import CheckoutLoadingOverlay from "./CheckoutLoadingOverlay";

export const ShopifyCartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        
        setIsOpen(false);
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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative border-border/50 hover:border-accent">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background border-border">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="font-display text-foreground">Shopping Cart</SheetTitle>
            <SheetDescription>
              {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col flex-1 pt-6 min-h-0">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-2">Add products to get started</p>
                </div>
              </div>
            ) : (
              <>
                {/* Scrollable items area */}
                <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.variantId} className="flex gap-4 p-3 bg-secondary/30 rounded-lg">
                        <div className="w-16 h-16 bg-secondary/50 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={
                              // Priority: variant image > product featured image > placeholder
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
                          <h4 className="font-medium text-foreground truncate">{item.product.node.title}</h4>
                          {item.variantTitle !== 'Default Title' && (
                            <p className="text-sm text-muted-foreground">
                              {item.selectedOptions.map(option => option.value).join(' • ')}
                            </p>
                          )}
                          <p className="font-semibold text-accent">
                            {formatPrice(parseFloat(item.price.amount))}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fixed checkout section */}
                <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border bg-background">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-accent">
                      {formatPrice(totalPrice)}
                    </span>
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
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Secure Shopify Checkout • Apple Pay • Google Pay • SSL Encrypted
                  </p>

                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground hover:text-foreground"
                    onClick={clearCart}
                    disabled={isRedirecting}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      <CheckoutLoadingOverlay isVisible={isRedirecting} />
    </>
  );
};

export default ShopifyCartDrawer;
