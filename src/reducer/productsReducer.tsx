import { Product, ProductState } from "@/context/productList";

type ProductAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: Product[] }
  | { type: "SINGLE_PRODUCT_DATA"; payload: Product };

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
      const sortedData = action.payload.sort(
        (a, b) => b.averageRating - a.averageRating
      );

      const topItems = sortedData.slice(0, 4);
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
        popularProducts: topItems,
      };
    case "SINGLE_PRODUCT_DATA":
      return {
        ...state,
        singleProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
