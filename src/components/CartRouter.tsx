import { Routes, Route } from 'react-router-dom';
import CartPage from '@/pages/CartPage';
import CartPermalinkRedirect from '@/pages/CartPermalinkRedirect';

/**
 * CartRouter - Handles all /cart/* routes with nested routing
 * This ensures /cart/c/* is ALWAYS matched and never falls through to 404
 * 
 * Routes:
 * - /cart/c/*  -> Redirects to Shopify cart permalink
 * - /cart/*    -> Shows CartPage
 * - /cart      -> Shows CartPage
 */
const CartRouter = () => {
  return (
    <Routes>
      {/* Shopify cart permalink - must be first to catch /cart/c/* */}
      <Route path="c/*" element={<CartPermalinkRedirect />} />
      {/* Cart page for all other /cart paths */}
      <Route path="*" element={<CartPage />} />
    </Routes>
  );
};

export default CartRouter;
