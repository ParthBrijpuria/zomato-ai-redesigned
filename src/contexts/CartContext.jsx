import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('zomato_ai_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('zomato_ai_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (rawItem, source = 'concierge') => {
    let newItem;
    if (rawItem.type === 'group_cart' || rawItem.type === 'group') {
      newItem = {
        id: Date.now().toString(),
        type: 'group',
        title: 'AI Group Cart',
        restaurant: rawItem.restaurant,
        price: rawItem.totalCost,
        quantity: 1,
        source,
        metadata: rawItem
      };
    } else {
      newItem = {
        id: Date.now().toString(),
        type: 'meal',
        title: rawItem.mealName,
        restaurant: rawItem.restaurant,
        price: rawItem.price,
        quantity: 1,
        source,
        metadata: rawItem
      };
    }
    setCart((prev) => [...prev, newItem]);
    return newItem.id;
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  
  const totalQuantity = cart.reduce((acc, item) => {
    if (item.type === 'group') {
      return acc + (item.metadata.items?.reduce((sum, subItem) => sum + (subItem.quantity || 1), 0) || 1);
    }
    return acc + (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isDrawerOpen, setIsDrawerOpen, toggleDrawer, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
