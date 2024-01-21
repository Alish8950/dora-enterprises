"use client";

import reducer from "@/reducer/ordersReducer";
import React, {
  FC,
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";
import { useLoader } from "./loaderContext";

import { Cart, useGlobalCart } from "./cartContext";
import { useRouter } from "next/navigation";

export interface Order {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  status: string;
}

export interface OrderState {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  updateOrders: (orders: Cart[]) => void;
}

const initialState: OrderState = {
  isLoading: false,
  isError: false,
  orders: [],
  updateOrders: () => {},
};

const AppContext = createContext<OrderState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const OrderContextProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setGlobalLoading, goToOrders } = useLoader();
  const {deleteAllItems, getCart} = useGlobalCart();
  const router = useRouter();

  const getOrders = async () => {
    dispatch({ type: "SET_LOADING" });
    setGlobalLoading(true);
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
      setGlobalLoading(false);
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const updateOrders = async (orders: Cart[]) => {
    setGlobalLoading(true);
    // Add the static property to each order object

    for (const order of orders) {
      try {
        await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...order, status: "not yet dispatched" }),
        });
      } catch (error) {
        console.log("Can't add item to cart ==> ", error);
      }
    }
    deleteAllItems();
    getOrders();
    goToOrders()
    setGlobalLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <AppContext.Provider value={{ ...state, updateOrders }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalOrders = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalOrders must be used within a OrderContextProvider"
    );
  }
  return context;
};

export { OrderContextProvider, useGlobalOrders };
