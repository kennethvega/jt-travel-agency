import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../../components/utility/Button';
import Layout from '../../components/utility/Layout';
import Loading from '../../components/utility/Loading';
import { changePassword } from '../../redux/features/auth/authService';

const initialState = {
  oldPassword: '',
  newPassword: '',
  newPassword2: '',
};
const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { oldPassword, newPassword, newPassword2 } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  const submitChangePassword = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      return toast.error('New passwords do not match');
    }
    const formData = {
      oldPassword,
      newPassword,
    };
    setIsLoading(true);
    const data = await changePassword(formData);
    setIsLoading(false);
    toast.success(data);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex">
          <h3 className="text-xl font-medium">Change password</h3>
        </div>
        <form onSubmit={submitChangePassword} className="max-w-[40rem]">
          <label>Password:</label>
          <input name="oldPassword" value={oldPassword} onChange={handleInputChange} type="password" placeholder="Old password" required />
          <label>New Password:</label>
          <input name="newPassword" value={newPassword} onChange={handleInputChange} type="password" placeholder="New password" required />
          <label>Confirm Password:</label>
          <input name="newPassword2" value={newPassword2} onChange={handleInputChange} type="password" placeholder="Confirm new password" required />
          {isLoading ? (
            <Button>
              <Loading />
            </Button>
          ) : (
            <Button type="submit">Change password</Button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
