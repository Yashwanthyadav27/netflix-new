import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/browse" className="logo-link">
          <h1 className="logo">NETFLIX</h1>
        </Link>
        <ul className="nav-links">
          <li><Link to="/browse" className="active">Home</Link></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <span className="nav-icon">🔍</span>
        <span className="nav-icon">🔔</span>
        <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.profileName || 'User'}&background=e50914&color=fff`}
            alt="Profile" 
            className="profile-img"
          />
          <span className="dropdown-arrow">▼</span>
          
          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={handleProfileClick}>
                <span className="dropdown-icon">👤</span>
                <span>Profile</span>
              </div>
              <div className="dropdown-item" onClick={handleProfileClick}>
                <span className="dropdown-icon">✏️</span>
                <span>Manage Profiles</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                <span>Sign out of Netflix</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
