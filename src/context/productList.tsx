"use client";

import reducer from "@/reducer/productsReducer";
import React, {
  FC,
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { useLoader } from "./loaderContext";

const API = "http://localhost:5000/products";

export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  averageRating: number;
  productImage: string;
  quantity: string;
  volume: number;
  alcoholConcentration: number;
  beverageDescription: string;
  beverageCategory: string;
  beverageBrand: string;
}

export interface ProductState {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  popularProducts: Product[];
  randomProducts: Product[];
  singleProduct: Product | null;
  enableOuterScroll: boolean;
  getSingleProduct: (params: string) => void;
  setEnableOuterScroll: (e: any) => void;
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  products: [],
  popularProducts: [],
  randomProducts: [],
  singleProduct: null,
  enableOuterScroll: false,
  getSingleProduct: () => {},
  setEnableOuterScroll: () => {}
};

const AppContext = createContext<ProductState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const AppProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [enableOuterScroll, setEnableOuterScroll] = useState(false);
  const {setGlobalLoading} = useLoader()
  const getProducts = async () => {
    dispatch({ type: "SET_LOADING" });
    setGlobalLoading(true)
    try {
      const res = await fetch("http://localhost:5000/products/");
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
      setGlobalLoading(false)
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  const getSingleProduct = async (params: string) => {
    setGlobalLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/products/${params}`);
      const data = await res.json();
      dispatch({type: "SINGLE_PRODUCT_DATA", payload: data})
      setGlobalLoading(false)
    } catch (error) {
      console.log("Can't get data ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <AppContext.Provider value={{ ...state, getSingleProduct, enableOuterScroll, setEnableOuterScroll }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalProducts = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalProducts must be used within a AppProvider");
  }
  return context;
};

export { AppProvider, useGlobalProducts };
