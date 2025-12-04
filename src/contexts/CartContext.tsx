import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  is_subscription: boolean;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (product: { id: number; name: string; price: number }, quantity: number, isSubscription: boolean) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) {
      console.error('Error fetching cart:', error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const addToCart = async (product: { id: number; name: string; price: number }, quantity: number, isSubscription: boolean) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    const existingItem = items.find(
      item => item.product_id === product.id && item.is_subscription === isSubscription
    );

    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          product_price: isSubscription ? product.price * 0.85 : product.price,
          quantity,
          is_subscription: isSubscription
        })
        .select()
        .single();

      if (error) {
        toast.error('Failed to add item to cart');
        console.error(error);
      } else {
        setItems(prev => [...prev, data]);
        toast.success(isSubscription ? 'Subscription added' : 'Added to cart');
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      toast.error('Failed to update quantity');
    } else {
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      toast.error('Failed to remove item');
    } else {
      setItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    }
  };

  const clearCart = async () => {
    if (!user) return;
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to clear cart');
    } else {
      setItems([]);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, loading, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
