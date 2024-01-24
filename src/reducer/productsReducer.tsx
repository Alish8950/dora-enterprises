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
      const getRandomProducts = (data: any, count: number) => {
        // Shuffle the array using the Fisher-Yates algorithm
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        // Return the first 'count' elements
        return data.slice(0, count);
      };

      const randomProducts = getRandomProducts(action.payload, 8);
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
        popularProducts: topItems,
        randomProducts: randomProducts
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
