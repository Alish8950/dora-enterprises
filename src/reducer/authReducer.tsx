import {   UserState } from "@/context/authContext";
import { User } from "@firebase/auth";

type UserAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: null }
  | { type: "SINGLE_PRODUCT_DATA"; payload: User };

const authReducer = (state: UserState, action: UserAction) => {
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
      // console.log(action.payload, "action.payloadaction.payloadaction.payload")
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload,
      };
    case "SINGLE_PRODUCT_DATA":
      return {
        ...state,
        singleProduct: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
