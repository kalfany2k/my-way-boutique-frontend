import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: number;
  product_id: string;
  product_name: string;
  quantity: number;
  personalised_name: string | null;
  personalised_date: string | null;
  personalised_message: string | null;
  personalised_size: string | null;
  personalised_member: string | null;
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
