import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/testimonial/`;

// CREATE NEW TESTIMONIAL
const createTestimonial = async (formData: FormData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// GET ALL TESTIMONIAL
const getAllTestimonial = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// GET TESTIMONIAL
const getTestimonial = async (id: string | undefined) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// UPDATE TESTIMONIAL
const updateTestimonial = async (id: string | undefined, formData: FormData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// DELETE
const deleteTestimonial = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
const testimonialService = {
  createTestimonial,
  getAllTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

export default testimonialService;
