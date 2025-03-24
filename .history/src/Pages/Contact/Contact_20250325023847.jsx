// src/Pages/Contact/Contact.jsx
import React from 'react';
import './Contact.scss';
import heroImage from '../../assets/honey1.avif'; // Hero image (replace with your own)
import logo from '../../assets/ballbeelogo.png'; // Your logo (replace with your own)
import { FaFacebookF, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="contact">
  
      <div className="contact-hero">
        <div className="hero-overlay">
          <h1>Əlaqə</h1>
          <p>{t('contact.herodesc')}</p>
        </div>
        <img src={heroImage} alt="Contact Hero" />
      </div>

 
      <div className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-logo">
              <img src={logo} alt="Ball-Bee Logo" className="brand-logo" />
              <h2 className="brand-name">BalBee</h2>
              <p className="brand-tagline">{t('contact.brandtagline')}</p>
            </div>
            <div className="contact-details-wrapper">
              <h3 className="section-title">{t('contact.infos')}</h3>
              <div className="contact-details">
                <div className="contact-row">
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <div>
                      <strong>{t('footer.phone')}:</strong>
                      <p>+994 50 123 45 67</p>
                      <p>+994 55 987 65 43</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <div>
                      <strong>{t('footer.email')}:</strong>
                      <p>info@ballbee.com</p>
                      <p>sales@ballbee.com</p>
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <strong>{t('contact.address')}:</strong>
                      <p>{t('contact.herodesc')}</p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                      >
                        Xəritədə bax
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaClock className="contact-icon" />
                    <div>
                      <strong>İş Saatları:</strong>
                      <p>Bazar ertəsi - Şənbə: 09:00 - 18:00</p>
                      <p>Bazar: Bağlı</p>
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-item">
                    <FaGlobe className="contact-icon" />
                    <div>
                      <strong>Veb Sayt:</strong>
                      <a href="https://balbee.az" target="_blank" rel="noopener noreferrer">
                        www.balbee.az
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="section-title">Bizi İzləyin</h3>
              <div className="social-links">
                <a
                  href="https://facebook.com/ballbee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com/ballbee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://tiktok.com/@ballbee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link tiktok"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;