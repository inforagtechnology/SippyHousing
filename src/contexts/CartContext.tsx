import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService, CartItem } from '@/services/cartService';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'addedAt'>) => boolean;
  removeFromCart: (itemId: string) => boolean;
  clearCart: () => boolean;
  isInCart: (itemId: string) => boolean;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = () => {
    setCartItems(cartService.getCartItems());
  };

  const addToCart = (item: Omit<CartItem, 'addedAt'>) => {
    const success = cartService.addToCart(item);
    if (success) {
      refreshCart();
    }
    return success;
  };

  const removeFromCart = (itemId: string) => {
    const success = cartService.removeFromCart(itemId);
    if (success) {
      refreshCart();
    }
    return success;
  };

  const clearCart = () => {
    const success = cartService.clearCart();
    if (success) {
      refreshCart();
    }
    return success;
  };

  const isInCart = (itemId: string) => {
    return cartService.isInCart(itemId);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const value: CartContextType = {
    cartItems,
    cartCount: cartItems.length,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
