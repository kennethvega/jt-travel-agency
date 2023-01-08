import { VscDiffAdded } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import TestimonialList from '../../components/testimonials/TestimonialList';
import Layout from '../../components/utility/Layout';

const Testimonials = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <Link to="/add-customer-review">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 py-2 rounded-md">
              <VscDiffAdded /> Add a customer review
            </p>
          </Link>
        </div>
        <TestimonialList />
      </div>
    </Layout>
  );
};

export default Testimonials;
