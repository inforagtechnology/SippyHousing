import { getContactNumberByType } from "@/lib/contactRouting";

export interface CartItem {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
  source: 'search' | 'property';
  addedAt: string;
}

const CART_STORAGE_KEY = 'sippy_estate_cart';

export const cartService = {
  // Get all cart items from localStorage
  getCartItems: (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  // Add item to cart
  addToCart: (item: Omit<CartItem, 'addedAt'>): boolean => {
    try {
      const existingItems = cartService.getCartItems();
      
      // Check if item already exists
      const exists = existingItems.some(cartItem => cartItem.id === item.id);
      if (exists) {
        return false; // Item already in cart
      }

      const newItem: CartItem = {
        ...item,
        addedAt: new Date().toISOString()
      };

      const updatedItems = [...existingItems, newItem];
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
      return true;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return false;
    }
  },

  // Remove item from cart
  removeFromCart: (itemId: string): boolean => {
    try {
      const existingItems = cartService.getCartItems();
      const updatedItems = existingItems.filter(item => item.id !== itemId);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
      return true;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return false;
    }
  },

  // Clear all cart items
  clearCart: (): boolean => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  },

  // Check if item is in cart
  isInCart: (itemId: string): boolean => {
    try {
      const existingItems = cartService.getCartItems();
      return existingItems.some(item => item.id === itemId);
    } catch (error) {
      console.error('Error checking cart status:', error);
      return false;
    }
  },

  // Get cart count
  getCartCount: (): number => {
    return cartService.getCartItems().length;
  },

  // Generate WhatsApp message for cart items
  generateWhatsAppMessage: (phoneNumber?: string): string => {
    const cartItems = cartService.getCartItems();
    if (cartItems.length === 0) {
      return '';
    }
    const resolvedPhoneNumber =
      phoneNumber ||
      getContactNumberByType(cartItems[0]?.type);

    const itemsList = cartItems.map((item, index) => 
      `${index + 1}. ${item.title} - ${item.location} (${item.price})`
    ).join('\n');

    const message = `Hi! I'm interested in these properties:\n\n${itemsList}\n\nCould you please provide more details about these properties?`;

    return `https://wa.me/${resolvedPhoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  }
};
