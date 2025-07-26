import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

interface ProductState {
  products: Product[];
  error: string | null;
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  error: null,
  products: [],
  categories: [],
  status: 'idle',
}

axios.defaults.baseURL = 'http://localhost:5000/api';

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const res = await axios.get<Category[]>('/Categories');
  return res.data;
})

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId: string) => {
    const res = await axios.get<Product[]>(`/Categories/${categoryId}/products`);
    return res.data;
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
  }
});

export default productSlice.reducer;
