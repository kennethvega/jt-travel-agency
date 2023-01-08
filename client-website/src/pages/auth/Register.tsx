import Button from '../../components/utility/Button';
import Card from '../../components/utility/Card';
import Container from '../../components/utility/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
// redux
import { registerUser } from '../../redux/features/auth/authService';
import { useAppDispatch } from '../../redux/hooks';
import { SET_LOGIN, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import Loading from '../../components/utility/Loading';
const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  adminCode: '',
};

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, confirmPassword, adminCode } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  const register = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (adminCode !== import.meta.env.VITE_ADMIN_CODE) {
      return toast.error('Wrong admin code, please ask the admin for the code.');
    }
    if (!name || !email || !password) {
    }
    if (password.length <= 6) {
      return toast.error('Password must be greater than 6.');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords does not match.');
    }
    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      setIsLoading(false);
      navigate('/');
      toast.success('Account created');
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-[30rem] mx-auto">
        <div className="mt-10 mb-6">
          <Card>
            <form onSubmit={register} className="px-10 py-10">
              <h3 className="text-center text-2xl font-bold mb-10">Sign up</h3>
              <input name="adminCode" value={adminCode} onChange={handleInputChange} type="password" placeholder="Admin code" required />
              <input name="name" value={name} onChange={handleInputChange} type="text" placeholder="Name" required />
              <input name="email" value={email} onChange={handleInputChange} type="email" placeholder="Email" required />
              {/* password */}
              <div className="relative flex items-center">
                <input name="password" value={password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} placeholder="Password" required />
                {password.length > 0 && (
                  <button type="button" className="absolute right-3 top-2 font-semibold" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>
              {/* confirm password */}
              <div className="relative flex items-center">
                <input name="confirmPassword" value={confirmPassword} onChange={handleInputChange} type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" required />
                {confirmPassword.length > 0 && (
                  <button type="button" className="absolute right-3 top-2 font-semibold" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>
              {isLoading ? (
                <Button type="button">
                  <p className="p-1 font-semibold">
                    <Loading />
                  </p>
                </Button>
              ) : (
                <Button type="submit">
                  <p className="p-1 font-semibold">Sign up</p>
                </Button>
              )}
            </form>
          </Card>
        </div>
        <Card>
          <p className="px-10 py-5 text-center">
            Already have an account ?{' '}
            <span className="text-[#0095F6] hover:text-[#1C77FF]">
              <Link to="/login">Login </Link>
            </span>
          </p>
        </Card>
      </div>
    </Container>
  );
};

export default Register;
