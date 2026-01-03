import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Use the same domain constant as shopify.ts
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'artlux8.myshopify.com';

/**
 * Handles /cart/c/* routes (Shopify cart permalinks)
 * Immediately redirects to Shopify domain - renders nothing
 * 
 * CRITICAL: This must NEVER show a 404. It must always redirect.
 */
const CartPermalinkRedirect = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    // Get the wildcard part from params (the "/*" portion)
    const wildcardPath = params['*'] || '';
    
    // Build full Shopify cart permalink URL
    // The full path should be /cart/c/{wildcardPath}
    const shopifyPath = `/cart/c/${wildcardPath}`;
    const target = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}${shopifyPath}${location.search}`;
    
    console.log('[CartPermalinkRedirect] Params:', params);
    console.log('[CartPermalinkRedirect] Location:', location.pathname);
    console.log('[CartPermalinkRedirect] Redirecting to Shopify:', target);
    
    window.location.replace(target);
  }, [location.pathname, location.search, params]);

  // Return loading indicator during redirect for better UX
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to checkout...</p>
      </div>
    </div>
  );
};

export default CartPermalinkRedirect;
