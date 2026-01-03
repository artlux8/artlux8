import { Lock, Shield } from "lucide-react";

interface CheckoutTrustSignalsProps {
  className?: string;
}

const CheckoutTrustSignals = ({ className = "" }: CheckoutTrustSignalsProps) => {
  return (
    <div className={`flex items-center justify-center gap-2 text-xs text-muted-foreground ${className}`}>
      <Lock className="w-3 h-3" />
      <span>Secure Shopify Checkout</span>
      <span className="text-border">•</span>
      <span>Apple Pay</span>
      <span className="text-border">•</span>
      <span>Google Pay</span>
      <span className="text-border">•</span>
      <Shield className="w-3 h-3" />
      <span>SSL Encrypted</span>
    </div>
  );
};

export default CheckoutTrustSignals;
