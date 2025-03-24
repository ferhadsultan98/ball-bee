// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/ballbeelogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Ball-Bee Logo" />
          </NavLink>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            </li>
            <li>
              <NavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;