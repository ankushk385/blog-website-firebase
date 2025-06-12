import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/context'
import logo from '../assets/logo.png'

const Navbar = () => {

const {currentUser,logout} = useContext(AuthContext);


  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo-container'>
       <Link to='/' >  <img src={logo} alt="LOGO" className="logo"/> </Link>  
        </div>
        <div className='links'>
<Link className='link' to='/?cat=art'>
<h6>Art</h6>
</Link>
<Link className='link' to='/?cat=science'>
<h6>science</h6>
</Link>
<Link className='link' to='/?cat=technology'>
<h6>technology</h6>
</Link>
<Link className='link' to='/?cat=cinema'>
<h6>cinema</h6>
</Link>
<Link className='link' to='/?cat=design'>
<h6>design</h6>
</Link>
<Link className='link' to='/?cat=food'>
<h6>food</h6>
</Link>
<span>{currentUser && currentUser.username}</span>
{currentUser  ? (<>
  <span className='link' onClick={logout}>

<h6>logout</h6>

</span>
</>
) : (
  <>
<span >
<Link   className='login' to='/login' >
<h6>login</h6>
</Link>
</span>
</>
) }

<span className='write'>
  <Link className='link' to='/write' >
<h6>Write</h6>
</Link>
</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
