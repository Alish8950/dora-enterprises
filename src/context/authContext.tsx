"use client";

import reducer from "@/reducer/authReducer";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "@firebase/auth";
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
import { User } from "@firebase/auth";
import { useLoader } from "./loaderContext";
import { useRouter } from "next/navigation";

export interface UserState {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
  userData: any;
  setUserData: (ele: any) => void;
  loginSubmit: () => void;
  handleSignOut: () => void
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  user: null,
  userData: {},
  setUserData: () => {},
  loginSubmit: () => {},
  handleSignOut: () => {},
};

const AuthAppContext = createContext<UserState | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}
const AuthAppProvider: FC<AppContextProps> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {setGlobalLoading} = useLoader()
  const [userData, setUserData] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();

  const loginSubmit = () => {
    dispatch({ type: "SET_LOADING" });
    setGlobalLoading(true)
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserData(user);
        dispatch({ type: "MY_API_DATA", payload: user });
        setGlobalLoading(false)
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

  const handleSignOut = () => {
    setGlobalLoading(true)
    signOut(auth)
      .then(() => {
        // handleCloseProfile();
        setUserData(null);
        router.push("/Login");
        setGlobalLoading(false)
      })
      .catch((error: any) => {
        console.log("cant signout ==> ", error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user)
      } else {
      }
    });
  }, []);

  return (
    <AuthAppContext.Provider value={{ ...state, setUserData, userData, loginSubmit, handleSignOut }}>{children}</AuthAppContext.Provider>
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
