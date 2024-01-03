"use client";

import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer from "@/reducer/cartReducer";
import { useRouter } from "next/navigation";

interface AppContextProps {
  children: ReactNode;
}
export interface Cart {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
}

export interface CartState {
  isLoading: boolean;
  isError: boolean;
  cart: Cart[];
  addItemToCart: (
    params: string,
    productName: string,
    productPrice: number,
    quantity: number, 
    productImage: string
  ) => void;
  updateItemQuantity: (id: string, existingItem: Cart, quantity: number) => void
}

const initialState: CartState = {
  isLoading: false,
  isError: false,
  cart: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
};

interface CartContextType extends CartState {}

const CartContext = createContext<CartContextType | undefined>(undefined);
const API_URL = "http://localhost:5000/cart";

const CartProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  
  // get cart items
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
  
  // add items to cart
  const addItemToCart = async (
    params: string,
    productNameaa: string,
    productPriceaa: number,
    quantity: number,
    productImages: string
  ) => {
    try {
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params,
          productName: productNameaa,
          productPrice: productPriceaa,
          quantity: quantity,
          productImage: productImages,
        }),
      });
      router.push("/Cart");
    } catch (error) {
      console.log(error, "can't add item to cart");
    }
  };

  const updateItemQuantity = async (id: string, existingItem: Cart, quantity: number) => {
    try {
      if (existingItem && existingItem.quantity !== undefined) {
        await fetch(`http://localhost:5000/cart/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          }),
        });
      }
      router.push("/Cart");
    } catch (error) {}
  };

  useEffect(() => {
    getCart(API_URL);
  }, []);

  return (
    <CartContext.Provider value={{ ...state, addItemToCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useGlobalCart = (): CartState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useGlobalCart must be used within a AppProvider");
  }
  return context;
};

export { CartProvider, CartContext, useGlobalCart };
