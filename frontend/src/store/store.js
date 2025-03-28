import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import productsReducer from "../features/productsSlice";
import filterReducer from "../features/filterSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        products: productsReducer,
        filter: filterReducer,
    },
});