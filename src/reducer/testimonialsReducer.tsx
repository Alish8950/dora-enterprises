"use client";

import { TestimonialState, Testimonials } from "@/context/testimonialsContext";

type TestimonialAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: Testimonials[] };

const testimonialsReducer = (
  state: TestimonialState,
  action: TestimonialAction
): TestimonialState => {
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
      const shuffleArray = (array: any) => {
        // Function to shuffle the array randomly
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      // Shuffle the testimonials array
      const shuffledTestimonials = shuffleArray([...action.payload]);

      // Display only the first 3 items
      const selectedTestimonials = shuffledTestimonials.slice(0, 3);
      return {
        ...state,
        isLoading: false,
        isError: false,
        testimonials: action.payload,
        randomTestimonials: selectedTestimonials,
      };

    default:
      return state;
  }
};

export default testimonialsReducer;
