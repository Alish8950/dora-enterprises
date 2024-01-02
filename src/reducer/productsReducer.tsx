import { Product, ProductState } from "@/context/productList";

type ProductAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: Product[] };

const productsReducer = (state: ProductState, action: ProductAction) => {
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
        products: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
