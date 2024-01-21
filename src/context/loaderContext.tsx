"use client"
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext, ReactNode, FC } from 'react';

interface LoaderContextProps {
    globalLoading: boolean;
    setGlobalLoading: (globalLoading: boolean) => void;
    goToCart: () => void;
    goToHome: () => void;
    goToOrders: () => void;
}

const LoaderContext = createContext<LoaderContextProps>({
    globalLoading: false,
    setGlobalLoading: () => {},
    goToCart: () => {},
    goToHome: () => {},
    goToOrders: () => {},
});

interface AppContextProps {
    children: ReactNode;
  }

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: FC<AppContextProps> = ({ children }) => {
    const [globalLoading, setGlobalLoading] = useState(false);
    const router = useRouter();

    const goToCart = () => {
        setGlobalLoading(true);
        router.push("/Cart")
    }
    const goToHome = () => {
        setGlobalLoading(true);
        router.push("/Home")
    }
    const goToSingleProduct = () => {

    }
    const goToOrders = () => {
        setGlobalLoading(true);
        router.push("/Orders")
    }

    const goToLogin = () => {
        setGlobalLoading(true);
        router.push("/Login")
    }

    return (
        <LoaderContext.Provider value={{ globalLoading, setGlobalLoading, goToCart, goToHome, goToOrders }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const GlobalLoader = () => {
    const { globalLoading } = useLoader();
    return globalLoading ? <Loader /> : null;
  };