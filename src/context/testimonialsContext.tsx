"use client";

import React, { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import reducer, { TestimonialState } from "@/reducer/testimonialsReducer";

interface AppContextProps {
  children: ReactNode;
}

const TestimonialsContext = createContext<TestimonialState | undefined>(undefined);
const API_URL = "http://localhost:5000/testimonials";

const initialState: TestimonialState = {
  isLoading: false,
  isError: false,
  testimonials: [],
};

const TestimonialsProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTestimonials = async (url: string) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "MY_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getTestimonials(API_URL);
  },[])

  return(
    <TestimonialsContext.Provider value={{...state}}>
        {children}
    </TestimonialsContext.Provider>
  )
};

// custom hook
const useGlobalTestimonials = (): TestimonialState => {
    const context = useContext(TestimonialsContext);
    if (!context) {
        throw new Error("useGlobalTestimonials must be used within a AppProvider");
      }
      return context
}

export {TestimonialsProvider, TestimonialsContext, useGlobalTestimonials}