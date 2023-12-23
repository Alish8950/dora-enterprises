import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CounterContextProps {
    counter: number;
    increment: () => void;
    decrement: () => void;
  }

  const CounterContext = createContext<CounterContextProps | undefined>(undefined);

  export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [counter, setCounter] = useState(0);
  
    const increment = () => {
      setCounter(counter + 1);
    };
  
    const decrement = () => {
      setCounter(counter - 1);
    };
  
    return (
      <CounterContext.Provider value={{ counter, increment, decrement }}>
        {children}
      </CounterContext.Provider>
    );
  };
  
  export const useCounter = (): CounterContextProps => {
    const context = useContext(CounterContext);
    if (!context) {
      throw new Error('useCounter must be used within a CounterProvider');
    }
    return context;
  };