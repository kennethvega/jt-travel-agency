import React, { FormEvent, SetStateAction, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/utility/Layout';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import usePageRedirect from '../../hooks/usePageRedirect';
import { toast } from 'react-hot-toast';
import ProductForm from '../../components/products/ProductForm';
import { getAllProducts, getProduct, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/products/productSlice';
import { Product } from '../../ts/productTypes';

const EditProduct = () => {
  const { id } = useParams();
  // redux global state
  const dispatch = useAppDispatch();
  const productEdit = useAppSelector(selectProduct);
  const isLoading = useAppSelector(selectIsLoading);

  // local state
  const [product, setProduct] = useState<Product | null | undefined>(productEdit);
  const [productImage, setProductImage] = useState<File | string>('');
  const [imagePreview, setImagePreview] = useState<string | null>('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      await dispatch(getProduct(id));
    };
    getDetails();
  }, []);

  useEffect(() => {
    const setDetails = async () => {
      setDescription(productEdit && productEdit.description ? productEdit.description : ' ');
      setProduct(productEdit as Product);
      setImagePreview(productEdit && productEdit.image ? `${productEdit.image.imageURL}` : null);
    };
    setDetails();
  }, [productEdit, id]);

  // Handling input changes on product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...product!, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  // Handling image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle Submit product
  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || description.length < 40) {
      return toast.error('please add a description greater than 30 characters');
    }
    const formData = new FormData() as FormData | any; //use this for the image
    formData.append('country', product?.country);
    formData.append('city', product?.city);
    formData.append('price', product?.price);
    formData.append('date', product?.date);
    formData.append('description', description);
    if (productImage !== undefined || productImage !== null || productImage !== '') {
      formData.append('image', productImage);
    }
    await dispatch(updateProduct({ id, formData }));
    if (!isLoading) {
      navigate('/'); //navigate to products dashboard
      await dispatch(getAllProducts());
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex mb-6">
          <Link to="/">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 rounded-md py-2">&larr; Back to products list</p>
          </Link>
        </div>
        <h3 className="text-xl font-medium">Edit this product</h3>
        <hr />

        <ProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
      </div>
    </Layout>
  );
};

export default EditProduct;
