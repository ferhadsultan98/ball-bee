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
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";



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
                    <i><FaFacebookF />
                    </i>
                  </li>
                  </a>
                  <li className="icon whatsapp">
                    <span className="tooltip">Twitter</span>
                   <i><FaWhatsapp />
                   </i>
                  </li>
                  <li className="icon instagram">
                    <span className="tooltip">Instagram</span>
                    <i><FaInstagram />
                    </i>
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
