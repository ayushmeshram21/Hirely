import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    setIsShrink(location.pathname.startsWith('/jobs'));
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className={`my-nav ${isShrink ? 'shrink-nav' : ''}`}>
      <Link to="/" className="logo-text">
        <span className="glow-brand">Hirely</span>
      </Link>

      <div className="menu-icon" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`nav-ul-cont ${menuOpen ? 'show' : ''}`}>
        <li><Link to="/" className='my-nav-items'>Home</Link></li>
        <li><Link to="/jobs" className='my-nav-items'>Jobs</Link></li>
      </ul>

      <button className='logout-btn'>Logout</button>
    </nav>
  );
};

export default Header;
