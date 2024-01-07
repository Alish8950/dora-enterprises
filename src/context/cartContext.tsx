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
  updatedCart: any;
  deleteAllItems: () => void;
  setQuantity: (quant: number[]) => void;
  setUpdatedCart: (ele: any) => void;
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
  updatedCart: [],
  deleteAllItems: () => {},
  setQuantity: () => {},
  setUpdatedCart:() => {},
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
  const [updatedCart, setUpdatedCart] = useState<Cart[]>([]);
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
        router.push("/Cart");
      }
    } catch (error) {
      console.log("Can't update cart => ", error);
    }
  };

  const calculateTotalQuantity = () => {
    setTotalCartQuantity(state.cart.reduce((total, item) => total + item.quantity, 0))
  };

// delete all items to cart
  async function deleteAllItems(): Promise<void> {
  try {
    // Step 1: Fetch the list of items
    const response = await fetch("http://localhost:5000/cart");
    const items: Cart[] = await response.json();

    // Step 2: Iterate through the items and delete them
    for (const item of items) {
      const deleteResponse = await fetch(
        `http://localhost:5000/cart/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete item with ID ${item.id}`);
      }

      console.log(`Item with ID ${item.id} deleted.`);
    }
    setUpdatedCart([]);
  } catch (error) {
    console.error("Error:", error);
  }
}

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ ...state, addItemToCart, updateItemQuantity, calculateTotalQuantity, totalCartQuantity, getCart, setQuantity, quantitys, deleteAllItems, setUpdatedCart, updatedCart }}
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
