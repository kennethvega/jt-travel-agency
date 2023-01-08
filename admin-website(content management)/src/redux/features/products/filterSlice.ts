import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter((product: any) => product.country.toLowerCase().includes(search.toLowerCase()) || product.city.toLowerCase().includes(search.toLowerCase()));
      state.filteredProducts = tempProducts;
    },
  },
});

// ACTIONS
export const { FILTER_PRODUCTS } = filterSlice.actions;
// STATE
export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;
export default filterSlice.reducer;
