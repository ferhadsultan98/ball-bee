// src/Pages/Contact/Contact.jsx
import React from 'react';
import './Contact.scss';

// Images
import heroImage from '../../assets/honey-hero.jpg'; // Hero image (replace with your own)
import logo from '../../assets/ballbeelogo.png'; // Your logo (replace with your own)
// Social media icons (using FontAwesome icons)
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay">
          <h1>Əlaqə</h1>
          <p>Bizimlə əlaqə saxlayın və təbiətin şirinliyini paylaşın!</p>
        </div>
        <img src={heroImage} alt="Contact Hero" />
      </div>

      {/* Contact Info Section */}
      <div className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="brand-info">
              <img src={logo} alt="Ball-Bee Logo" className="brand-logo" />
              <h2 className="brand-name">Ball-Bee</h2>
            </div>
            <h3 className="section-title">Əlaqə Məlumatları</h3>
            <ul className="contact-details">
              <li>
                <strong>Telefon:</strong> +994 50 123 45 67
              </li>
              <li>
                <strong>E-poçt:</strong> info@ballbee.com
              </li>
              <li>
                <strong>Ünvan:</strong> Bakı, Azərbaycan
              </li>
            </ul>
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
  );
};

export default Contact;