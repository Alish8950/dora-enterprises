"use client"
import Loader from '@/components/Loader';
import { createContext, useState, useContext, ReactNode, FC } from 'react';

interface LoaderContextProps {
    globalLoading: boolean;
    setGlobalLoading: (globalLoading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
    globalLoading: false,
    setGlobalLoading: () => {}
});

interface AppContextProps {
    children: ReactNode;
  }

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: FC<AppContextProps> = ({ children }) => {
    const [globalLoading, setGlobalLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ globalLoading, setGlobalLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const GlobalLoader = () => {
    const { globalLoading } = useLoader();
    return globalLoading ? <Loader /> : null;
  };