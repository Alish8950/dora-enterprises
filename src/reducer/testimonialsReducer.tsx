"use client"

import { TestimonialState, Testimonials } from "@/context/testimonialsContext";


type TestimonialAction = 
| { type: "SET_LOADING" }
| { type: "API_ERROR" }
| { type: "MY_API_DATA"; payload: Testimonials[] };

const testimonialsReducer = (state: TestimonialState, action: TestimonialAction): TestimonialState => {
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
            testimonials: action.payload,
          };
    
        default:
          return state;
      }
}

export default testimonialsReducer;