import axios from 'axios';
import { toast } from 'react-hot-toast';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type UserRegisterProps = {
  name: string;
  email: string;
  password: string;
};
// REGISTER ----
export const registerUser = async (userData: UserRegisterProps) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData);
    return response.data;
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};
// LOGIN ------
type UserLoginProps = {
  email: string;
  password: string;
};
export const loginUser = async (userData: UserLoginProps) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
    return response.data;
  } catch (error: any) {
    // error message format
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

// LOGOUT ------
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

// GET LOGIN STATUS----
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};

// CHANGE PASSWORD
export const changePassword = async (formData: any) => {
  try {
    const response = await axios.patch(`${BACKEND_URL}/api/users/updatepassword`, formData);
    return response.data;
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
  }
};
