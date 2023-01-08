import React from 'react';
import BookingItem from '../../components/booking/BookingItem';
import BookingList from '../../components/booking/BookingList';
import ProductList from '../../components/products/ProductList';

import Layout from '../../components/utility/Layout';

const Bookings = () => {
  return (
    <Layout>
      <div className="min-h-[50rem]">
        <BookingList />
      </div>
    </Layout>
  );
};

export default Bookings;
