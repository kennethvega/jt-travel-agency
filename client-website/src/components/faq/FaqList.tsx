import React, { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getAllFaqs } from '../../redux/features/faq/faqSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FaqType } from '../../ts/faqTypes';
import Loading from '../utility/Loading';
import FaqItem from './FaqItem';

const FaqList = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const { faqs, isLoading, isError, message } = useAppSelector((state) => state.faq);
  useEffect(() => {
    if (isLoggedIn === true && faqs.length === 0) {
      //fetch bookings
      dispatch(getAllFaqs());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  console.log(faqs);
  return (
    <div>
      {!isLoading ? (
        <>
          {faqs.map((faq: FaqType) => (
            <FaqItem faq={faq} key={faq._id} />
          ))}
        </>
      ) : (
        <div className="flex justify-center mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default FaqList;
