import React, { createContext, useContext, useEffect, useState } from "react";
import { useListDishes } from "@workspace/api-client-react";

export interface CartItem {
  dishId: string;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  add: (dishId: string, quantity?: number) => void;
  remove: (dishId: string) => void;
  updateQty: (dishId: string, quantity: number) => void;
  clear: () => void;
  totals: CartTotals;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "tasteful.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse cart from local storage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // We need dish prices to compute totals. We can just fetch all dishes.
  // In a massive app, we'd fetch only what's in the cart.
  // Here, we just rely on the cached list of dishes.
  const { data: dishes } = useListDishes();

  const add = (dishId: string, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.dishId === dishId);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dishId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dishId, quantity }];
    });
  };

  const remove = (dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dishId !== dishId));
  };

  const updateQty = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      remove(dishId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.dishId === dishId ? { ...item, quantity } : item))
    );
  };

  const clear = () => setItems([]);

  // Compute totals
  const subtotal = items.reduce((acc, item) => {
    const dish = dishes?.find((d) => d.id === item.dishId);
    if (!dish) return acc;
    return acc + dish.price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.0875;
  const total = subtotal + deliveryFee + tax;

  const totals = {
    subtotal,
    deliveryFee,
    tax,
    total,
  };

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, totals }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
