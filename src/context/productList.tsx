// create a context
// provider
// consumer => useContext Hook
"use client"
import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer, {  ProductState } from "@/reducer/productsReducer";

interface AppContextProps {
  children: React.ReactNode;
}

const AppContext = createContext<ProductState | undefined>(undefined);
const API = "http://localhost:5000/products";

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  products: [],
};

const AppProvider: React.FC<AppContextProps> = ({ children }) => {
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
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useGlobalProducts = (): ProductState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useProductContext must be used within a AppProvider");
  }
  return context;
};

export { AppProvider, AppContext, useGlobalProducts };
