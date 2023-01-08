import Layout from '../../components/utility/Layout';
import usePageRedirect from '../../hooks/usePageRedirect';
import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent, SetStateAction } from 'react';
import { createProduct } from '../../redux/features/products/productSlice';
import { useAppDispatch } from '../../redux/hooks';
import ProductForm from '../../components/products/ProductForm';
import { toast } from 'react-hot-toast';

type InitialState = {
  country: string;
  city: string;
  price: string;
  date: string;
};

const initialState: InitialState = {
  country: '',
  city: '',
  price: '',
  date: '',
};
const AddProduct = () => {
  // redux global state
  const dispatch = useAppDispatch();
  // local state
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState<SetStateAction<string> | File>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const { country, city, price, date } = product; //destructure
  usePageRedirect('/login');
  const navigate = useNavigate();

  // Handling input changes on product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value }); //set name to its value (name should be equal to value in input)
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
    if (productImage.length === 0) {
      return toast.error('please add an image');
    }
    if (!description || description.length < 40) {
      return toast.error('please add a description greater than 30 characters');
    }
    const formData = new FormData() as FormData | any; //use this for the image
    formData.append('country', country);
    formData.append('city', city);
    formData.append('price', price);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('image', productImage);

    const response = await dispatch(createProduct(formData));
    console.log(response);
    navigate('/'); //navigate to products dashboard
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex mb-6">
          <Link to="/">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 rounded-md py-2">&larr; Back to products list</p>
          </Link>
        </div>
        <h3 className="text-xl font-medium">Add New Product</h3>
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

export default AddProduct;
