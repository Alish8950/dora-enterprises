"use client"
interface Product {
    id: string;
    productName: string;
    productPrice: number;
  }
  
  export interface ProductState {
    isLoading: boolean;
    isError: boolean;
    products: Product[];
  }
  
 type ProductAction =
    | { type: "SET_LOADING" }
    | { type: "API_ERROR" }
    | { type: "MY_API_DATA"; payload: Product[] };
  
  const productReducer = (state: ProductState, action: ProductAction): ProductState => {
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
  
  export default productReducer;
  