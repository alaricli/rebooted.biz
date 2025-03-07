"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "../types";

type CartContextType = {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(null);

  async function fetchCart() {
    console.log("fetching cart");
    try {
      const response = await fetch("http://localhost:8080/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  }

  useEffect(() => {
    try {
      fetchCart();
    } catch (error) {
      console.error("Error fetching cart", error);
    }

  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}