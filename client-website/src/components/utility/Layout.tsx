import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/features/auth/authService';
import { SET_LOGIN } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Sidebar from '../sidebar/Sidebar';
import Button from './Button';
import Card from './Card';
import Container from './Container';
import useRedirectLoggedOutUser from '../../hooks/usePageRedirect';
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useRedirectLoggedOutUser('/login'); // redirect to login if user is not logged in
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/login');
    toast.success('Successfully logged out');
  };
  return (
    <Container>
      <div className="grid dashboard-grid gap-3 xmd:gap-1">
        <Sidebar />
        <div>
          <Card>
            <div className="sticky top-0 flex justify-between p-3 backdrop-blur-lg bg-opacity-90 b border-b shadow z-50 bg-[##fbfaf8;]">
              <h3 className="text-2xl font-bold xsm:text-xl">Admin Dashboard</h3>
              <div className="max-w-[6rem]">
                <Button onClick={logout}>Logout</Button>
              </div>
            </div>
            <main className="p-3">{children}</main>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Layout;
