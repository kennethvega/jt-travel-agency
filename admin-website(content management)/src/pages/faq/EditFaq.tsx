import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FaqForm from '../../components/faq/FaqForm';
import Layout from '../../components/utility/Layout';
import { getAllFaqs, getFaq, selectFaq, selectIsLoading, updateFaq } from '../../redux/features/faq/faqSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Faq } from '../../ts/faqTypes';

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // redux global state
  const dispatch = useAppDispatch();
  const faqEdit = useAppSelector(selectFaq);
  const isLoading = useAppSelector(selectIsLoading);
  // local state
  const [faq, setFaq] = useState<Faq | null | undefined>(faqEdit);

  useEffect(() => {
    const getDetails = async () => {
      await dispatch(getFaq(id));
    };
    getDetails();
  }, []);
  useEffect(() => {
    const setDetails = async () => {
      setFaq(faqEdit);
    };
    setDetails();
  }, [faqEdit, id]);

  // input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFaq({ ...faq!, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  // Handle Submit product
  const saveFaq = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!faq?.question || !faq?.answer) {
      return toast.error('please input all required fields');
    }

    await dispatch(updateFaq({ id, faq }));
    if (!isLoading) {
      navigate('/faq'); //navigate to faq list
      await dispatch(getAllFaqs());
    }
  };
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <Link to="/faq">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 py-2 rounded-md">&larr; Back to FAQ's list</p>
          </Link>
        </div>
        <FaqForm faq={faq} saveFaq={saveFaq} handleInputChange={handleInputChange} />
      </div>
    </Layout>
  );
};

export default EditFaq;
