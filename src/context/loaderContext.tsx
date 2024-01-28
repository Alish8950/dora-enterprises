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
    goToProductsList: () => void;
    goToSingleProduct: (id: string) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
    globalLoading: false,
    setGlobalLoading: () => {},
    goToCart: () => {},
    goToHome: () => {},
    goToOrders: () => {},
    goToProductsList: () => {},
    goToSingleProduct: () => {},
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
    const goToSingleProduct = (id: string) => {
        setGlobalLoading(true);
        router.push(`/Product/${id}`)
    }
    const goToOrders = () => {
        setGlobalLoading(true);
        router.push("/Orders")
    }

    const goToProductsList = () => {
        setGlobalLoading(true);
        router.push("/ProductsList")
    }

    const goToLogin = () => {
        setGlobalLoading(true);
        router.push("/Login")
    }

    return (
        <LoaderContext.Provider value={{ globalLoading, setGlobalLoading, goToCart, goToHome, goToOrders, goToProductsList, goToSingleProduct }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const GlobalLoader = () => {
    const { globalLoading } = useLoader();
    return globalLoading ? <Loader /> : null;
  };