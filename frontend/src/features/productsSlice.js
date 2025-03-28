import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/products";

// Асинхронное получение товаров
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Асинхронное редактирование товара
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct) => {
    const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
    return response.data;
  }
);

// Асинхронное добавление товара
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    const response = await axios.post(API_URL, newProduct);
    return response.data;
  }
);

// Асинхронное удаление товара
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Возвращаем id удалённого товара
  }
);


const loadFromLocalStorage = () => { try {
    const data = localStorage.getItem("products"); return data ? JSON.parse(data) : [];
    } catch (error) {
    console.error("Ошибка загрузки из LocalStorage:", error); return [];
    }
    };

    
// Создаём Slice для управления товарами
const productsSlice = createSlice({
    name: "products",
    initialState: {
      items: loadFromLocalStorage(), // Загружаем товары из LocalStorage
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload;
          localStorage.setItem("products", JSON.stringify(action.payload)); // Кэшируем данные
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.items.push(action.payload);
          localStorage.setItem("products", JSON.stringify(state.items)); // Обновляем LocalStorage
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
          localStorage.setItem("products", JSON.stringify(state.items)); // Обновляем LocalStorage
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
            localStorage.setItem("products", JSON.stringify(state.items)); // Обновляем LocalStorage
          }
        });
    },
});


// Экспортируем редюсер для подключения в store.js
export default productsSlice.reducer;