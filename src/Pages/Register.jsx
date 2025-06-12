import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/context';
import BackgroundWrapper from '../Components/BackgroundWrapper';
import './Login.css'; // using same styling for consistency

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(inputs);
      navigate('/login');
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  return (
    <BackgroundWrapper>
      <div className="auth">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Register</h2>

          <div className="input-group">
            <input
              required
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Username..."
              className="login-input"
            />
          </div>

          <div className="input-group">
            <input
              required
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email..."
              className="login-input"
            />
          </div>

          <div className="input-group">
            <input
              required
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password..."
              className="login-input"
            />
          </div>

          <button className="login-btn" type="submit">
            Register
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="register-link">
            Already have an account?
            <Link to="/login" className="register-btn">
              Login
            </Link>
          </div>
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default Register;
