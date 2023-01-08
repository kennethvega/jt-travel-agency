import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
// pages
import Navbar from './components/Navbar';
import Product from './pages/product/Product';
import Login from './pages/auth/Login';
// redux
import { selectAuth, selectIsLoggedIn, SET_AUTH } from './redux/features/auth/authSlice';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { SET_LOGIN, SET_NAME, SET_USER } from './redux/features/auth/authSlice';
import { getLoginStatus } from './redux/features/auth/authService';
// pages
import Register from './pages/auth/Register';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import Bookings from './pages/bookings/Bookings';
import Testimonials from './pages/testimonials/Testimonials';
import AddTestimonials from './pages/testimonials/AddTestimonials';
import EditTestimonial from './pages/testimonials/EditTestimonial';
import Faq from './pages/faq/Faq';
import AddFaq from './pages/faq/AddFaq';
import EditFaq from './pages/faq/EditFaq';
import ChangePassword from './pages/account-settings/ChangePassword';
axios.defaults.withCredentials = true; // axios default setting
function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const auth = useAppSelector(selectAuth);
  console.log(isLoggedIn);
  // Fetch necessary data
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
      dispatch(SET_AUTH(true));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <>
      {auth && (
        <BrowserRouter>
          {!isLoggedIn && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/customer-review" element={<Testimonials />} />
            <Route path="/add-customer-review" element={<AddTestimonials />} />
            <Route path="/edit-customer-review/:id" element={<EditTestimonial />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/add-faq" element={<AddFaq />} />
            <Route path="/edit-faq/:id" element={<EditFaq />} />
            <Route path="/account-settings" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
