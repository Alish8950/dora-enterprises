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
import { useLoader } from "./loaderContext";

import { Cart, useGlobalCart } from "./cartContext";
import { useRouter } from "next/navigation";



export interface FilterState {
  isLoading: boolean;
  isError: boolean;
  sortingValue: string;
  setSortingValue: (ele: any) => void;
  sorting: () => void;
}

const initialState: FilterState = {
  isLoading: false,
  isError: false,
  sortingValue: "lowest",
  setSortingValue: () => {},
  sorting: () => {}
};

const AppContext = createContext<FilterState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const FilterContextProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortingValue, setSortingValue] = useState('lowest')


  return (
    <AppContext.Provider value={{ ...state, sortingValue, setSortingValue }}>
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
