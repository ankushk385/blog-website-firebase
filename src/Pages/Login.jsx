import {useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/context'

const Login = () => {


  const navigate = useNavigate()

const [loginInputs, setLoginInputs] = useState({

  email:"",
  password : ""
});

const {login,currentUser} = useContext(AuthContext);

const [errorMessage, setErrorMessage] = useState(null);
const handleLoginInputs = (event)=>{

  setLoginInputs((prev)=>({...prev, [event.target.name] : event.target.value}))
}

const handleLoginSubmit = async (event)=>{

  event.preventDefault();
 
  try {
    
   await login(loginInputs)
    navigate("/")
  } catch (err) {

    setErrorMessage(err?.response?.data)
  }



}


console.log(currentUser)
  return (<>
    <div className='auth'>
      <h2>Login</h2>
      <form>
       <input required type='text' name='email' onChange={handleLoginInputs} placeholder='Email...' />
        <input required type='password' name='password' onChange={handleLoginInputs} placeholder='Password...' /> 
        <button onClick={handleLoginSubmit} >Login</button>
       {errorMessage!=null && <p>{errorMessage}</p> } 
        <span>Don't have an account ?  <Link to='/register' >Register</Link></span>
      </form>
    </div>
    </>
  )
}

export default Login
