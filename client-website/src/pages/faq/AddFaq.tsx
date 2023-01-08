import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import FaqForm from '../../components/faq/FaqForm';
import Layout from '../../components/utility/Layout';
import { createFaq, selectIsLoading } from '../../redux/features/faq/faqSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const initialState = {
  question: '',
  answer: '',
};

const AddFaq = () => {
  const [faq, setFaq] = useState(initialState);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();
  const { question, answer } = faq;
  // input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFaq({ ...faq, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  // Handle Submit product
  const saveFaq = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question || !answer) {
      return toast.error('please input all required fields');
    }
    await dispatch(createFaq(faq));
    navigate('/faq');
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <Link to="/faq">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 py-2 rounded-md">&larr; Back to FAQ's list</p>
          </Link>
        </div>
        <FaqForm faq={faq} handleInputChange={handleInputChange} saveFaq={saveFaq} />
      </div>
    </Layout>
  );
};

export default AddFaq;
