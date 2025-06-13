import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/context';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <motion.div
      className='navbar'
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        {/* Logo Section */}
<div className="logo-container">
  <Link to='/' className="text-logo">
    <motion.h1
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut", type: "spring", bounce: 0.6 }}
      whileHover={{ rotate: 3, scale: 1.05 }}
      className="logo-text"
    >
      <span className="logo-black">Blog</span>
      <span className="logo-gradient">Website</span>
    </motion.h1>
  </Link>
</div>


        {/* Navigation Links */}
        <div className='links'>
          {['art', 'science', 'technology', 'cinema', 'design', 'food'].map((cat) => (
            <motion.div className="nav-item" key={cat}>
              <Link className='link' to={`/?cat=${cat}`}>
                <h6>{cat}</h6>
              </Link>
              <span className="hover-underline"></span>
            </motion.div>
          ))}

          {currentUser && (
            <span className="username">{currentUser.username}</span>
          )}

          {currentUser ? (
            <div className="nav-item">
              <span className='link logout' onClick={logout}>
                <h6>logout</h6>
              </span>
              <span className="hover-underline"></span>
            </div>
          ) : (
            <div className="nav-item">
              <Link className='login' to='/login'><h6>login</h6></Link>
              <span className="hover-underline"></span>
            </div>
          )}

          {/* Write Button */}
          <div className="write">
            <Link className='link write-link' to='/'>
              <h6>Write</h6>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
