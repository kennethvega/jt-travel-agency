import Button from '../../components/utility/Button';
import Card from '../../components/utility/Card';
import Container from '../../components/utility/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { toast } from 'react-hot-toast';
import { loginUser } from '../../redux/features/auth/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loading from '../../components/utility/Loading';

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //set name to its value (name should be equal to value in input)
  };

  const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      if (data !== undefined) {
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.name));
        toast.success('Successfully logged in');
        navigate('/');
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-[30rem] mx-auto">
        <div className="mt-10 mb-6 ">
          <Card>
            <form onSubmit={login} className="px-10 py-10">
              <h3 className="text-center text-2xl font-bold mb-10">Admin Login</h3>
              <input name="email" value={email} onChange={handleInputChange} type="email" placeholder="Email" required />
              <div className="relative flex items-center">
                <input name="password" value={password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} placeholder="Password" required />
                {password.length > 0 && (
                  <button type="button" className="absolute right-3 top-2 font-semibold" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
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
                  <p className="p-1 font-semibold">Login</p>
                </Button>
              )}
            </form>
          </Card>
        </div>

        <Card>
          <p className="px-10 py-5 text-center">
            Don't have an account ?{' '}
            <span className="text-[#0095F6] hover:text-[#1C77FF]">
              <Link to="/register">Sign up </Link>
            </span>
          </p>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
