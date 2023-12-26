"use client";

import React, { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import reducer, { CartState, Cart } from "@/reducer/cartReducer";

interface AppContextProps {
  children: ReactNode;
}

interface CartContextType extends CartState {
  setCart: (cart: Cart[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const API_URL = "http://localhost:5000/cart";

const initialState: CartState = {
  isLoading: false,
  isError: false,
  cart: [],
};


const CartProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCart = async (url: string) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const setCart = (cart: Cart[]) => {
    dispatch({ type: "SET_CART", payload: cart });
  };

  useEffect(() => {
    getCart(API_URL);
  },[])

  return(
    <CartContext.Provider value={{ ...state, setCart }}>
        {children}
    </CartContext.Provider>
  )
};

// custom hook
const useGlobalCart = (): CartState => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useGlobalCart must be used within a AppProvider");
      }
      return context
}

export {CartProvider, CartContext, useGlobalCart}