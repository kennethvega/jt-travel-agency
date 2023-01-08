import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TestimonialForm from '../../components/testimonials/TestimonialForm';
import Layout from '../../components/utility/Layout';
import { getAllTestimonial, getTestimonial, selectCustomer, selectIsLoading, updateTestimonial } from '../../redux/features/testimonials/testimonialSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Customer } from '../../ts/testimonialTypes';

const EditTestimonial = () => {
  const { id } = useParams();
  const customerEdit = useAppSelector(selectCustomer);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  // local state
  const [customerReview, setCustomerReview] = useState<Customer | null>(customerEdit);
  const [customerImage, setCustomerImage] = useState<File | string>('');
  const [imagePreview, setImagePreview] = useState<string | null>('');
  const navigate = useNavigate();
  // get single review
  useEffect(() => {
    const getReview = async () => {
      await dispatch(getTestimonial(id));
    };
    getReview();
  }, []);
  // set initial state
  useEffect(() => {
    const setDetails = async () => {
      setCustomerReview(customerEdit);
      setImagePreview(customerEdit && customerEdit.image ? `${customerEdit.image.imageURL}` : null);
    };
    setDetails();
  }, [customerEdit, id]);

  // Handling input changes on product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCustomerReview({ ...customerReview!, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  // Handling image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files != null) {
      setCustomerImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle save review
  const saveReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData() as FormData | any; //use this for the image
    formData.append('name', customerReview?.name);
    formData.append('message', customerReview?.message);
    if (customerImage !== undefined || customerImage !== null || customerImage !== '') {
      formData.append('image', customerImage);
    }
    await dispatch(updateTestimonial({ id, formData }));
    if (!isLoading) {
      navigate('/customer-review'); //navigate to products dashboard
      await dispatch(getAllTestimonial());
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex mb-6">
          <Link to="/customer-review">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 rounded-md py-2">&larr; Back to customer reviews</p>
          </Link>
        </div>
        <h3>Edit a customer review</h3>
        <TestimonialForm customer={customerReview} customerImage={customerImage} imagePreview={imagePreview} handleInputChange={handleInputChange} handleImageChange={handleImageChange} saveReview={saveReview} />
      </div>
    </Layout>
  );
};

export default EditTestimonial;
