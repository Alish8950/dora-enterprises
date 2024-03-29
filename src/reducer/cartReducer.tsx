"use client";

import { Cart, CartState } from "@/context/cartContext";


type CartAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: Cart[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
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
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
