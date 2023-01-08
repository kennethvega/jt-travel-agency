import React from 'react';
import logo from '../assets/JT-tours&travels.jpg';
import { Link } from 'react-router-dom';
import Button from './utility/Button';

const Navbar = () => {
  return (
    <div className="w-full shadow">
      <div className="mx-auto max-w-[82rem] h-16 flex justify-between items-center px-8">
        <img src={logo} alt="Logo" className="w-16" />
        <div className="flex gap-10 items-center">
          <Link to="/login">
            <p>Login</p>
          </Link>
          <Link to="/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
