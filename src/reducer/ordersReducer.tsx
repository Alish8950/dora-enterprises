import { Order, OrderState } from "@/context/ordersContext";

type OrderAction =
  | { type: "SET_LOADING" }
  | { type: "API_ERROR" }
  | { type: "MY_API_DATA"; payload: Order[] }
  | { type: "SINGLE_PRODUCT_DATA"; payload: Order };

const ordersReducer = (state: OrderState, action: OrderAction) => {
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
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
