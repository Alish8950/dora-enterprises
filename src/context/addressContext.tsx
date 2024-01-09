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
import reducer from "@/reducer/addressReducer";
import { useRouter } from "next/navigation";

interface AppContextProps {
  children: ReactNode;
}
export interface ShippingAddress {
  id: string;
  address: string;
  city: string;
  contactNumber: number;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  pincode: number;
  state: string;
}

export interface AddressState {
  isLoading: boolean;
  isError: boolean;
  addressList: ShippingAddress[];
  updateAddressList: (shippingAddress: ShippingAddress) => void;
}

// Define the initial state outside of the component
const initialState: AddressState = {
  isLoading: false,
  isError: false,
  addressList: [],
  updateAddressList: () => {},
};

const AddressContext = createContext<AddressState | undefined>(undefined);

const AddressProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAddress = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch("http://localhost:5000/address");
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const updateAddressList = async (shippingAddress: ShippingAddress) => {
    try {
      await fetch(`http://localhost:5000/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shippingAddress),
      });
    } catch (error) {
      console.log("Can't update address => ", error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <AddressContext.Provider value={{ ...state, updateAddressList }}>
      {children}
    </AddressContext.Provider>
  );
};

// custom hook
const useGlobalAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useGlobalAddress must be used within a AppProvider");
  }
  return context;
};

export { AddressProvider, AddressContext, useGlobalAddress };
