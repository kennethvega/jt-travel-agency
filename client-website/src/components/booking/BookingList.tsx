import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getAllBookings } from '../../redux/features/bookings/bookingSlice';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Loading from '../utility/Loading';
import BookingItem from './BookingItem';

const BookingList = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const { bookings, isLoading, isError, message } = useAppSelector((state) => state.booking);
  useEffect(() => {
    if (isLoggedIn === true && bookings.length === 0) {
      //fetch bookings
      dispatch(getAllBookings());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      {bookings.length === 0 && <p className="text-center">No bookings yet</p>}
      {!isLoading ? (
        <>
          {bookings.map((booking) => (
            <BookingItem booking={booking} key={booking._id} />
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

export default BookingList;
