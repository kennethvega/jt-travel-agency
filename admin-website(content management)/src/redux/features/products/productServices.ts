import { Product } from '../../../ts/productTypes';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`;
// CREATE NEW PRODUCT
const createProduct = async (formData: Product | void) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// GET ALL PRODUCTS
const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// DELETE A PRODUCT
const deleteProduct = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// GET A PRODUCT
const getProduct = async (id: string | undefined) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// UPDATE A PRODUCT
const updateProduct = async (id: string | undefined, formData: Product | void) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productService;
