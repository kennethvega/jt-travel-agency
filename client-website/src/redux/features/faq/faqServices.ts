import axios from 'axios';
import { Faq } from '../../../ts/faqTypes';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/faq/`;

// CREATE NEW FAQ
const createFaq = async (formData: Faq) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// GET ALL FAQ's
const getAllFaqs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// GET FAQ
const getFaq = async (id: string | undefined) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// UPDATE TESTIMONIAL
const updateFaq = async (id: string | undefined, formData: Faq) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// DELETE
const deleteFaq = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const faqService = {
  getAllFaqs,
  getFaq,
  createFaq,
  updateFaq,
  deleteFaq,
};

export default faqService;
