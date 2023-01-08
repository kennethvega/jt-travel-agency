import { Product, ProductType } from '../../../ts/productTypes';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import productService from './productServices';
import { RootState } from '../../store';

type State = {
  product: Product | null;
  products: ProductType[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | unknown;
};
const initialState: State = {
  product: null,
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// CREATE NEW PRODUCT
export const createProduct = createAsyncThunk('products/create', async (formData: Product, thunkAPI) => {
  try {
    return await productService.createProduct(formData);
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, thunkAPI) => {
  try {
    return await productService.getAllProducts();
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// DELETE A PRODUCT
export const deleteProduct = createAsyncThunk('products/delete', async (id: string, thunkAPI) => {
  try {
    return await productService.deleteProduct(id);
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// GET A SINGLE PRODUCT
export const getProduct = createAsyncThunk('products/getProduct', async (id: string | undefined, thunkAPI) => {
  try {
    return await productService.getProduct(id);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

type UpdateProps = {
  id: string | undefined;
  formData: Product;
};
// UPDATE PRODUCT
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, formData }: UpdateProps, thunkAPI) => {
  try {
    return await productService.updateProduct(id, formData);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// ProductSlice------------
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    SET_PRODUCT(state, action) {
      state.product === action.payload;
    },
  },
  // loading,success,error state asyncThunk
  extraReducers: (builder) => {
    builder //CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.unshift(action.payload);
        toast.success('Product added successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      }) //GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      }) //DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Product deleted');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      }) //GET A SINGLE PRODUCT
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      }) //UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      });
  },
});
// ACTIONS-
export const { SET_PRODUCT } = productSlice.actions;
//STATE
export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectProduct = (state: RootState) => state.product.product;
export default productSlice.reducer;
