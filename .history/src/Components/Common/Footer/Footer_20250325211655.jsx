// src/components/Footer.jsx
import React from 'react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>{t('header.about')}</h3>
          <p>Pure Natural Honey</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Phone: +994 555 254 193</p>
          <p>Email: info@ballbee.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Ball-Bee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;