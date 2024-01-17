"use client";

import { ShippingAddress, AddressState } from "@/context/addressContext";


type AddressAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: ShippingAddress[] };

const addressReducer = (state: AddressState, action: AddressAction) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "MY_API_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
        addressList: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
