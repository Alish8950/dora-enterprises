import { FilterState, useGlobalFilter } from "@/context/filterContext";
import { Product } from "@/context/productList";

type FilterAction =
  | { type: "SET_LOADING" }
  | { type: "LOAD_FILTER_PRODUCTS"; payload: Product[] }
  | { type: "SORTING_PRODUCTS"; payload: string }
  | { type: "FILTER_PRODUCTS_SEARCH"; payload: string }
  | { type: "FILTER_PRODUCTS_CATEGORY"; payload: string }
  | { type: "FILTER_PRODUCTS_BRAND"; payload: string }
  | { type: "API_ERROR" };

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
        filterProducts: action.payload,
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
        filterProducts: newSortData,
      };

    case "FILTER_PRODUCTS_SEARCH":
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
        filterProducts: tempFilterProduct,
      };

    case "FILTER_PRODUCTS_CATEGORY":
      const categoryValue = action.payload;
      let tempFilterProductCategory = [...state.allProducts];
      const filterByCategory = (products: any, category: any) => {
        return products.filter(
          (product: any) => product.beverageCategory === category
        );
      };
      if (categoryValue !== "All") {
        tempFilterProductCategory = filterByCategory(
          tempFilterProductCategory,
          categoryValue
        );
      }
      else {
        tempFilterProductCategory = [...state.allProducts];
      }
      // console.log(state.allProducts, "state.allProductsstate.allProductsstate.allProducts")
      return {
        ...state,
        isLoading: false,
        filterProducts: tempFilterProductCategory,
      }

      case "FILTER_PRODUCTS_BRAND":
        const brandValue = action.payload;
        console.log(brandValue, "brandValuebrandValuebrandValue")
        let tempFilterProductBrand = [...state.allProducts];
        const filterByBrand = (products: any, brand: any) => {
          return products.filter(
            (product: any) => product.beverageBrand === brand
          );
        };
        if (brandValue !== "All") {
          tempFilterProductBrand = filterByBrand(
            tempFilterProductBrand,
            brandValue
          );
        }
        else {
          tempFilterProductBrand = [...state.allProducts];
        }
        // console.log(state.allProducts, "state.allProductsstate.allProductsstate.allProducts")
        return {
          ...state,
          isLoading: false,
          filterProducts: tempFilterProductBrand,
        };
    default:
      return state;
  }
};

export default filterReducer;
