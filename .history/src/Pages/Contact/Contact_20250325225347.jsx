// src/Pages/Contact/Contact.jsx
import React from "react";
import "./Contact.scss";
import heroImage from "../../assets/honey1.avif"; // Hero image (replace with your own)
import logo from "../../assets/ballbeelogo.png"; // Your logo (replace with your own)
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Contact = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="contact">
      <div className="contact-hero">
        <div className="hero-overlay">
          <h1>Əlaqə</h1>
          <p>{t("contact.herodesc")}</p>
        </div>
        <img src={heroImage} alt="Contact Hero" />
      </div>

      <div className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-logo">
              <img src={logo} alt="Ball-Bee Logo" className="brand-logo" />
              <h2 className="brand-name">BalBee</h2>
              <p className="brand-tagline">{t("contact.brandtagline")}</p>
            </div>
            <div className="contact-details-wrapper">
              <h3 className="section-title">{t("contact.infos")}</h3>
              <div className="contact-details">
                <div className="contact-row">
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <div>
                      <strong>{t("footer.phone")}:</strong>
                      <a href="tel:+994503007430">+994 50 300 74 30</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <div>
                      <strong>{t("footer.email")}:</strong>
                      <a href="mailto:zaursultanov@hotmail.com">
                        zaursultanov@hotmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <strong>{t("contact.address")}:</strong>
                      <p>{t("contact.location")}</p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                      >
                        {t("contact.viewmap")}
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaClock className="contact-icon" />
                    <div>
                      <strong>{t("contact.businesshours")}:</strong>
                      <p>{t("contact.businessday")}</p>
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-item">
                    <FaGlobe className="contact-icon" />
                    <div>
                      <strong>{t("contact.web")}:</strong>
                      <a
                        href="https://balbee.az"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.balbee.az
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="section-title">{t("contact.followus")}</h3>
              <div className="social-links">
                <ul className="wrapper">
                  <a href="https://www.facebook.com/balbee2020" target="_blank"><li className="icon facebook">
                    <span className="tooltip">Facebook</span>
                    <svg
                      viewBox="0 0 320 512"
                      height="1.2em"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </li>
                  </a>
                  <li className="icon whatsapp">
                    <span className="tooltip">Twitter</span>
                   
                  </li>
                  <li className="icon instagram">
                    <span className="tooltip">Instagram</span>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
