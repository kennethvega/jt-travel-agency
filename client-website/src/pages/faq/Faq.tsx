import React from 'react';
import { VscDiffAdded } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import FaqList from '../../components/faq/FaqList';
import Layout from '../../components/utility/Layout';

const Faq = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <Link to="/add-faq">
            <p className="flex items-center gap-2 hover:text-blue-500 cursor-pointer mb-2 bg-gray-200 px-3 py-2 rounded-md">
              <VscDiffAdded />
              Add a frequently asked question
            </p>
          </Link>
        </div>
        <FaqList />
      </div>
    </Layout>
  );
};

export default Faq;
