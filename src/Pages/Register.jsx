import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/context';

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
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(inputs);
      navigate('/login');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className='auth'>
        <h2>Register Account</h2>
        <form>
          <input required type='text' name='username' placeholder='Username...' onChange={handleChange} />
          <input required type='password' name='password' placeholder='Password...' onChange={handleChange} />
          <input required type='email' name='email' placeholder='Email...' onChange={handleChange} />
          <button onClick={handleSubmit}>Register</button>
          {errorMessage && <p>{errorMessage}</p>}
          <span>Already have an account? <Link to='/login'>Login</Link></span>
        </form>
      </div>
    </>
  );
};

export default Register;
