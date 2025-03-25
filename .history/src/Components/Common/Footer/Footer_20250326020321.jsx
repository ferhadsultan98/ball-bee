// src/components/Footer.jsx
import React from 'react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/ballbeelogo.png';

const Footer = () => {
  
  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>BalBee</h3>
          <p>{t('footer.desc')}</p>
          <img src={logo} alt="logo" />
        </div>
        <div className="footer-links">
          <h4>{t('footer.quicklinks')}</h4>
          <ul>
            <li><a href="/about">{t('header.about')}</a></li>
            <li><a href="/gallery">{t('header.gallery')}</a></li>
            <li><a href="/products">{t('header.products')}</a></li>
            <li><a href="/contact">{t('header.contact')}</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>{t('header.contact')}</h4>
          <p>{t('footer.phone')}:  +994 50 300 74 30</p>
          <p>{t('footer.email')}:  zaursultanov@hotmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Ball-Bee. {t('footer.bottom')}.</p>
      </div>
    </footer>
  );
};

export default Footer;