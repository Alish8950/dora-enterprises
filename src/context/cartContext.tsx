"use client";

import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
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
  totalCartQuantity: number;
  quantitys: any;
  setQuantity: (quant: number[]) => void;
  getCart: () => void;
  calculateTotalQuantity: () => void;
  addItemToCart: (
    params: string,
    productName: string,
    productPrice: number,
    quantity: number,
    productImage: string
  ) => void;
  updateItemQuantity: (
    id: string,
    quantity: number,
    existingItem: Cart,
    cartQuantity: boolean
  ) => void;
}

const initialState: CartState = {
  isLoading: false,
  isError: false,
  cart: [],
  totalCartQuantity: 0,
  quantitys: 0,
  setQuantity: () => {},
  getCart: () => {},
  calculateTotalQuantity: () => {},
  addItemToCart: () => {},
  updateItemQuantity: () => {},
};

interface CartContextType extends CartState {}

const CartContext = createContext<CartContextType | undefined>(undefined);
const API_URL = "http://localhost:5000/cart";

const CartProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0)
  const [quantitys, setQuantity] = useState<number[]>([]);
  const router = useRouter();

  // get cart items
  const getCart = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch("http://localhost:5000/cart");
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

  const updateItemQuantity = async (
    id: string,
    quantity: number,
    existingItem: Cart,
    cartQuantity: boolean
  ) => {
    try {
      if (existingItem && existingItem.quantity !== undefined) {
        await fetch(`http://localhost:5000/cart/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...existingItem,
            quantity: cartQuantity
              ? quantity
              : existingItem.quantity + quantity,
          }),
        });
        console.log("Update done");
        router.push("/Cart");
      }
    } catch (error) {
      console.log("Can't update cart => ", error);
    }
  };

  const calculateTotalQuantity = () => {
    setTotalCartQuantity(state.cart.reduce((total, item) => total + item.quantity, 0))
  };



  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ ...state, addItemToCart, updateItemQuantity, calculateTotalQuantity, totalCartQuantity, getCart, setQuantity, quantitys }}
    >
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
