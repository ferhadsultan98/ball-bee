// src/Pages/Contact/Contact.jsx
import React from "react";
import "./Contact.scss";
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
  FaWhatsapp,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import HeroSection from "../HeroSection/HeroSection";

const Contact = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="contact">
      <HeroSection
        titleKey="header.contact"
        descriptionKey="contact.herodesc"
      />

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
                  
                </div>
                <div className="contact-row">
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <div>
                      <strong>{t("contact.address")}:</strong>
                      <Link to=''></Link>
                   
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
                  <a href="https://www.facebook.com/balbee2020" target="_blank">
                    <li className="icon facebook">
                      <span className="tooltip">Facebook</span>
                      <i>
                        <FaFacebookF />
                      </i>
                    </li>
                  </a>
                  <a href="https://wa.me/+994503007430?text=Salam, BalBee'dən yazıram sizə." target="_blank">
                    <li className="icon whatsapp">
                      <span className="tooltip">Whatsapp</span>
                      <i>
                        <FaWhatsapp />
                      </i>
                    </li>
                  </a>
                  <a href="http://instagram.com/balbee_ariciliq" target="_blank">
                  
                    <li className="icon instagram">
                      <span className="tooltip">Instagram</span>
                      <i>
                        <FaInstagram />
                      </i>
                    </li>
                  </a>
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
