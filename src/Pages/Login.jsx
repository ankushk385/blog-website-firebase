import { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/context';
import BackgroundWrapper from '../Components/BackgroundWrapper'; // import this
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLoginInputs = (event) => {
    setLoginInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(loginInputs);
      navigate('/');
    } catch (err) {
      setErrorMessage(err?.response?.data);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="auth">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h2 className="login-title">Login</h2>

          <div className="input-group">
            <input
              required
              type="text"
              name="email"
              onChange={handleLoginInputs}
              placeholder="Email..."
              className="login-input"
            />
          </div>

          <div className="input-group">
            <input
              required
              type="password"
              name="password"
              onChange={handleLoginInputs}
              placeholder="Password..."
              className="login-input"
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="register-link">
            Don't have an account?
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </div>
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default Login;
