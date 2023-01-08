import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getAllTestimonial, selectIsLoading } from '../../redux/features/testimonials/testimonialSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Loading from '../utility/Loading';
import TestimonialItem from './TestimonialItem';

const TestimonialList = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectIsLoading);
  const { testimonials } = useAppSelector((state) => state.testimonial);

  // get all testimonials
  useEffect(() => {
    if (isLoggedIn && testimonials.length === 0) {
      dispatch(getAllTestimonial());
    }
  }, [isLoggedIn]);

  return (
    <>
      <h3 className="font-semibold text-xl">Customer review</h3>
      <div className="block gap-3 mt-3">
        {isLoading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {testimonials.map((testimonial) => (
              <TestimonialItem testimonial={testimonial} key={testimonial._id} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TestimonialList;
