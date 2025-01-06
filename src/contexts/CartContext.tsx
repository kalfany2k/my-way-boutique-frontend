import React, { createContext, useContext, useState } from "react";

interface Personalization {
  name?: string;
  date?: string;
  message?: string;
  size?: string;
  family_member?: string;
}

export interface CartItem {
  id: number;
  product_id: string;
  product_name: string;
  product_type: string;
  product_price: number;
  product_primary_image: string;
  quantity: number;
  personalization?: Personalization;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addCartItem: (item: CartItem) => void;
  deleteCartItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addCartItem = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const deleteCartItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addCartItem, deleteCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
