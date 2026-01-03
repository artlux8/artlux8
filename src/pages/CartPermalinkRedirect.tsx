import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles /cart/c/* routes (Shopify cart permalinks)
 * Redirects to Shopify domain to complete checkout
 */
const CartPermalinkRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // Build full URL with path and query string
    const target = `https://artlux8.myshopify.com${location.pathname}${location.search}`;
    console.log('Redirecting to Shopify cart permalink:', target);
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

export default CartPermalinkRedirect;
