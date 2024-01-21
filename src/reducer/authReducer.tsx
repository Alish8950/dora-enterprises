import {   UserState } from "@/context/authContext";
import { User } from "@firebase/auth";

type UserAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: null }

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
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload,
      };
    default:
      
      return state;
  }
};

export default authReducer;
