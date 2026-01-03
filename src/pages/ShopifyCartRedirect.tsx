import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Catches all /cart/* routes and redirects to Shopify checkout
 * This prevents 404 errors when Shopify returns checkout URLs with /cart/c/... paths
 */
const ShopifyCartRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const target = `https://artlux8.myshopify.com${location.pathname}${location.search}`;
    window.location.replace(target);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to checkout...</p>
      </div>
    </div>
  );
};

export default ShopifyCartRedirect;