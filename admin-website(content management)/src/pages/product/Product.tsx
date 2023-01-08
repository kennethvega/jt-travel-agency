import Layout from '../../components/utility/Layout';
import { VscDiffAdded } from 'react-icons/vsc';
import usePageRedirect from '../../hooks/usePageRedirect';
import { Link } from 'react-router-dom';
import ProductList from '../../components/products/ProductList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllProducts, selectIsLoading, SET_PRODUCT } from '../../redux/features/products/productSlice';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
const Product = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const { products, isLoading, isError, message } = useAppSelector((state) => state.product);
  useEffect(() => {
    if (isLoggedIn === true && products.length === 0) {
      dispatch(getAllProducts());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <Link to="/add-product">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 py-2 rounded-md">
              <VscDiffAdded />
              Add a product
            </p>
          </Link>
        </div>
        <hr className="mb-6" />
        <ProductList />
      </div>
    </Layout>
  );
};

export default Product;
