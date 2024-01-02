"use client"

import reducer from "@/reducer/productsReducer";
import React, {
  FC,
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";

const API = "http://localhost:5000/products";

export interface Product {
  id: string;
  productName: string;
  productPrice: number;
  averageRating: number;
  productImage: string;
  quantity: string;
  alcoholPercentage: number;
  alcoholDescription: string;
}

export interface ProductState {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  products: [],
};

const AppContext = createContext<ProductState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const AppProvider: FC<AppContextProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getProducts = async (url: string) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  },[])
  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalProducts = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalProducts must be used within a AppProvider"
    );
  }
  return context;
};

export { AppProvider, useGlobalProducts };
