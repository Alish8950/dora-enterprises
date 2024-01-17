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

export interface Order {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
}

export interface OrderState {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  // singleProduct: Order | null;
}

const initialState: OrderState = {
  isLoading: false,
  isError: false,
  orders: [],
  // singleProduct: null,
};

const AppContext = createContext<OrderState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const OrderContextProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {setGlobalLoading} = useLoader()


  const getOrders = async () => {
    dispatch({ type: "SET_LOADING" });
    setGlobalLoading(true)
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
      setGlobalLoading(false)
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  // const getSingleProduct = async (params: string) => {
  //   setGlobalLoading(true)
  //   try {
  //     const res = await fetch(`http://localhost:5000/products/${params}`);
  //     const data = await res.json();
  //     dispatch({type: "SINGLE_PRODUCT_DATA", payload: data})
  //     setGlobalLoading(false)
  //   } catch (error) {
  //     console.log("Can't get data ", error);
  //   }
  // };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalOrders = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalOrders must be used within a OrderContextProvider");
  }
  return context;
};

export { OrderContextProvider, useGlobalOrders };