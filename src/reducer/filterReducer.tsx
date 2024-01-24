import { FilterState } from "@/context/filterContext";

type FilterAction =
  | { type: "SET_LOADING" }
  | { type: "GET_SORT_VALUE" }
  | { type: "API_ERROR" }

const filterReducer = (state: FilterState, action: FilterAction) => {
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
    default:
      return state;
  }
};

export default filterReducer;
