import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../redux/features/products/filterSlice';
import { getAllProducts } from '../../redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ProductType } from '../../ts/productTypes';
import Search from '../Search';
import Loading from '../utility/Loading';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useAppSelector((state) => state.product);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // get all products
    if (isLoggedIn && products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-semibold text-xl xsm:text-base">Products</h3>
        <Search value={search} onChange={(e: any) => setSearch(e.target.value)} />
      </div>

      {!isLoading ? (
        <div className="block gap-3 mt-3">
          {filteredProducts.map((product: ProductType) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ProductList;
