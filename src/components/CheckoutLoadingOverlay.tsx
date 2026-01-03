import { Loader2, Lock } from "lucide-react";

interface CheckoutLoadingOverlayProps {
  isVisible: boolean;
}

const CheckoutLoadingOverlay = ({ isVisible }: CheckoutLoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-accent" />
            <Lock className="w-5 h-5 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <p className="text-xl font-display font-semibold text-foreground mb-2">
          Securing checkout…
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to secure Shopify checkout
        </p>
      </div>
    </div>
  );
};

export default CheckoutLoadingOverlay;
