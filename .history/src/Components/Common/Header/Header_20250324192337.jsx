// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss'; // We'll create this next
import logo from '../assets/logo.png'; // Adjust the path to your logo image

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Ball-Bee Logo" />
          </NavLink>
        </div>
        <nav className="navbar">
          <ul>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;