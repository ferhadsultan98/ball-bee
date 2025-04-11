// src/components/Footer.jsx
import React from "react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/ballbeelogo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="logo" />
          <p>{t("footer.desc")}</p>
        </div>
        <div className="footer-links">
          <h4>{t("footer.quicklinks")}</h4>
          <ul>
            <li>
              <a href="/about">{t("header.about")}</a>
            </li>
            <li>
              <a href="/gallery">{t("header.gallery")}</a>
            </li>
            <li>
              <a href="/products">{t("header.products")}</a>
            </li>
            <li>
              <a href="/contact">{t("header.contact")}</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>{t("header.contact")}</h4>
          <p>{t("footer.phone")}: +994 50 300 74 30</p>
          
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 BalBee. {t("footer.bottom")}.</p>
        <p>&copy; {t("footer.bottom")}.</p>
      </div>
    </footer>
  );
};

export default Footer;
