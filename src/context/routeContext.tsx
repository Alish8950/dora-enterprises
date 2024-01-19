"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, ReactNode, FC, useEffect } from "react";
import { GlobalLoader, useLoader } from "./loaderContext";

interface RouterContextProps {
  // globalLoading: boolean;
  setGlobalLoading: (globalLoading: boolean) => void;
  home: () => void;
}

const RouterContext = createContext<RouterContextProps>({
  // globalLoading: false,
  setGlobalLoading: () => {},
  home: () => {}
});

interface AppContextProps {
  children: ReactNode;
}

// export const useRouter = () => useContext(RouterContext);

const RouterProvider: FC<AppContextProps> = ({ children }) => {
  // const [globalLoading, setGlobalLoading] = useState(false);
  const { setGlobalLoading } = useLoader();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false)

  const home = async () => {
    setGlobalLoading(true);
    // await (router.push("/Home") as Promise<boolean>);
    setGlobalLoading(false);
  };

  return (
    <RouterContext.Provider value={{ setGlobalLoading, home }}>
      {children}
    </RouterContext.Provider>
  );
};

const useGlobalRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useGlobalRouter must be used within a AppProvider");
  }
  return context;
};

export { RouterProvider, useGlobalRouter };
