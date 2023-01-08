import { FaqType } from './../../../ts/faqTypes';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { Faq } from '../../../ts/faqTypes';
import faqService from './faqServices';
import { RootState } from '../../store';

type InitialState = {
  faq: Faq | null;
  faqs: FaqType[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | unknown;
};
const initialState: InitialState = {
  faq: null,
  faqs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// GET ALL FAQ's
export const getAllFaqs = createAsyncThunk('faq/getAllFaqs', async (_, thunkAPI) => {
  try {
    return await faqService.getAllFaqs();
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// GET A SINGLE FAQ
export const getFaq = createAsyncThunk('faq/getFaq', async (id: string | undefined, thunkAPI) => {
  try {
    return await faqService.getFaq(id);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// ADD A FAQ
export const createFaq = createAsyncThunk('faq/create', async (formData: Faq, thunkAPI) => {
  try {
    return await faqService.createFaq(formData);
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// DELETE A FAQ
export const deleteFaq = createAsyncThunk('faq/delete', async (id: string, thunkAPI) => {
  try {
    return await faqService.deleteFaq(id);
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});
type UpdateFaqProps = {
  id: string | undefined;
  faq: Faq;
};

// UPDATE A FAQ
export const updateFaq = createAsyncThunk('faq/updateFaq', async ({ id, faq }: UpdateFaqProps, thunkAPI) => {
  try {
    return await faqService.updateFaq(id, faq);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder //GET ALL BOOKINGS
      .addCase(getAllFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faqs = action.payload;
      })
      .addCase(getAllFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      }) //GET A SINGLE FAQ
      .addCase(getFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faq = action.payload;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      }) //CREATE A FAQ
      .addCase(createFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faqs.unshift(action.payload);
        toast.success('FAQ added successfully');
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      })
      .addCase(updateFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('FAQ updated successfully');
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload as string);
      });
  },
});

export const {} = faqSlice.actions;

export const selectIsLoading = (state: RootState) => state.faq.isLoading;
export const selectFaq = (state: RootState) => state.faq.faq;

export default faqSlice.reducer;
