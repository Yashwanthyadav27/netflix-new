import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <h1 className="logo">NETFLIX</h1>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <span className="nav-icon">🔍</span>
        <span className="nav-icon">🔔</span>
        <div className="profile">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop" 
            alt="Profile" 
            className="profile-img"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
