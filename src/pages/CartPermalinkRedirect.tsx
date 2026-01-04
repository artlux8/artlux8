import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles /cart/c/* routes (Shopify cart permalinks)
 * Immediately redirects to Shopify domain - renders nothing
 */
const CartPermalinkRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // Build full URL with path and query string
    const target = `https://artlux8.myshopify.com${location.pathname}${location.search}`;
    console.log('Redirecting to Shopify cart permalink:', target);
    window.location.replace(target);
  }, [location.pathname, location.search]);

  // Return null for fastest redirect - no UI needed
  return null;
};

export default CartPermalinkRedirect;
