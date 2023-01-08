import React, { useState, SetStateAction, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import TestimonialForm from '../../components/testimonials/TestimonialForm';
import Layout from '../../components/utility/Layout';
import { createTestimonial } from '../../redux/features/testimonials/testimonialSlice';
import { useAppDispatch } from '../../redux/hooks';

const customerInitialState = {
  name: '',
  message: '',
};

const AddTestimonials = () => {
  const dispatch = useAppDispatch();
  const [customer, setCustomer] = useState(customerInitialState);
  const [customerImage, setCustomerImage] = useState<SetStateAction<string> | File>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { name, message } = customer;
  const navigate = useNavigate();
  // Handling input changes on product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value }); //set name to its value (name should be equal to value in input)
  };
  // Handling image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null) {
      setCustomerImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle Submit product
  const saveReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customerImage.length === 0) {
      return toast.error('please add an image');
    }
    const formData = new FormData() as FormData | any; //use this for the image
    formData.append('name', name);
    formData.append('message', message);
    formData.append('image', customerImage);
    console.log(...formData);
    await dispatch(createTestimonial(formData));
    navigate('/customer-review');
  };
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <Link to="/customer-review">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 py-2 rounded-md">&larr; Back to testimonial list</p>
          </Link>
        </div>
        <h3 className="text-xl font-medium">Add New Customer Review</h3>
        <hr />
        <TestimonialForm
          customer={customer} //product
          customerImage={customerImage} //product image
          imagePreview={imagePreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveReview={saveReview} //save product
        />
      </div>
    </Layout>
  );
};

export default AddTestimonials;
