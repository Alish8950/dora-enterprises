import { FilterState, useGlobalFilter } from "@/context/filterContext";
import { Product } from "@/context/productList";

type FilterAction =
  | { type: "SET_LOADING" }
  | { type: "LOAD_FILTER_PRODUCTS", payload: Product[]}
  | { type: "SORTING_PRODUCTS", payload: string}
  | { type: "FILTER_PRODUCTS", payload: string}
  | { type: "API_ERROR" }

  const filterReducer = (state: FilterState, action: FilterAction) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };

        case "LOAD_FILTER_PRODUCTS":
          return {
            ...state,
            isLoading: false,
            allProducts: action.payload,
            filterProducts: action.payload
          };
        
        case "SORTING_PRODUCTS":
          let tempSortProduct = [...state.allProducts];
          // console.log(tempSortProduct,"tempSortProducttempSortProducttempSortProduct")
          const sortingValue = action.payload;
          let newSortData;
  
        const sortingProducts = (a: any, b: any) => {
          if (sortingValue === "lowest") {
            return a.productPrice - b.productPrice;
          }
  
          if (sortingValue === "highest") {
            return b.productPrice - a.productPrice;
          }
  
          if (sortingValue === "ascending") {
            return a.productName.localeCompare(b.productName);
          }
  
          if (sortingValue === "descending") {
            return b.productName.localeCompare(a.productName);
          }
        };
  
        newSortData = tempSortProduct.sort(sortingProducts);
        // console.log(newSortData, "newSortDatanewSortDatanewSortDatanewSortData")
      return {
        ...state,
        isLoading: false,
        filterProducts: newSortData
      };

      case "FILTER_PRODUCTS":
        const searchValue = action.payload; 
        let tempFilterProduct = [...state.allProducts];
        if (searchValue) {
          tempFilterProduct = tempFilterProduct.filter((curElem) => {
            return curElem.productName.toLowerCase().includes(searchValue);
          });
        }
        // console.log(state.allProducts, "state.allProductsstate.allProductsstate.allProducts")
        return {
          ...state,
          isLoading: false,
          filterProducts:  tempFilterProduct
        };
    default:
      return state;
  }
};

export default filterReducer;
