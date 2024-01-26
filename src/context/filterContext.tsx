"use client";

import reducer from "@/reducer/filterReducer";
import React, {
  FC,
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { Product, useGlobalProducts } from "./productList";

export interface FilterState {
  isLoading: boolean;
  isError: boolean;
  filterProducts: Product[];
  allProducts: Product[];
  sortingValue: string;
  searchValue: string;
  categoryValue: string;
  brandValue: string;
  setSortingValue: (ele: any) => void;
  setSearchValue: (ele: any) => void;
  setCategoryValue: (ele: any) => void;
  setBrandValue: (ele: any) => void;
  sorting: () => void;
}

const initialState: FilterState = {
  isLoading: false,
  isError: false,
  filterProducts: [],
  allProducts: [],
  sortingValue: "",
  searchValue: "",
  categoryValue: "",
  brandValue: "",
  setSortingValue: () => {},
  setSearchValue: () => {},
  setCategoryValue: () => {},
  setBrandValue: () => {},
  sorting: () => {},
};

const AppContext = createContext<FilterState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const FilterContextProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortingValue, setSortingValue] = useState<string>("lowest");
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("All");
  const [brandValue, setBrandValue] = useState<string>("");
  const { products } = useGlobalProducts();

  // to load all the products for grid and list view
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "SORTING_PRODUCTS", payload: sortingValue });
  }, [sortingValue, products, searchValue]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS_SEARCH", payload: searchValue });
  }, [searchValue]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS_CATEGORY", payload: categoryValue });
  }, [categoryValue]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS_BRAND", payload: brandValue });
  }, [brandValue]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        sortingValue,
        setSortingValue,
        searchValue,
        setSearchValue,
        setCategoryValue,
        categoryValue,
        brandValue,
        setBrandValue
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalFilter = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalFilter must be used within a FilterContextProvider"
    );
  }
  return context;
};

export { FilterContextProvider, useGlobalFilter };
