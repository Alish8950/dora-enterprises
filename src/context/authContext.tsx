"use client";

import reducer from "@/reducer/authReducer";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import React, {
  FC,
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";
// import { User } from "@firebase/auth";

const API = "http://localhost:5000/products";

export interface User {
  uid: string;
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
  userData: any;
  setUserData: (ele: any) => void;
  loginSubmit: () => void
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  user: null,
  userData: {},
  setUserData: () => {},
  loginSubmit: () => {},
};

const AuthAppContext = createContext<UserState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const AuthAppProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setUserData] = useState(null);
  const provider = new GoogleAuthProvider();

  const loginSubmit = () => {
    dispatch({ type: "SET_LOADING" });
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token, "token");
        // The signed-in user info.
        const user = result.user;
        console.log(user, "contxt");
        setUserData(user);
        dispatch({ type: "MY_API_DATA", payload: user });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, "==> errorMessage");
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        dispatch({ type: "API_ERROR" });
        // ...
      });
  };
  //   const getProducts = async (url: string) => {
  //     dispatch({ type: "SET_LOADING" });
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       dispatch({ type: "MY_API_DATA", payload: data });
  //     } catch (error) {
  //       dispatch({ type: "API_ERROR" });
  //     }
  //   };
  //   const getSingleProduct = async (params: string) => {
  //     try {
  //       const res = await fetch(`http://localhost:5000/products/${params}`);
  //       const data = await res.json();
  //       dispatch({type: "SINGLE_PRODUCT_DATA", payload: data})
  //     } catch (error) {
  //       console.log("Can't get data ", error);
  //     }
  //   };

  return (
    <AuthAppContext.Provider value={{ ...state, setUserData, userData, loginSubmit }}>{children}</AuthAppContext.Provider>
  );
};

const useGlobalUser = () => {
  const context = useContext(AuthAppContext);
  if (context === undefined) {
    throw new Error("useGlobalUser must be used within a AuthAppProvider");
  }
  return context;
};

export { AuthAppProvider, useGlobalUser };
