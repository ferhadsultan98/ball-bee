// src/components/Header.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import logo from "../../../assets/ballbeelogo.png";
import { TbWorld } from "react-icons/tb"; // Globe icon

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close language dropdown when menu toggles on mobile
    if (isLanguageDropdownOpen) {
      setIsLanguageDropdownOpen(false);
    }
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
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
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                {t("header.about")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>
                {t("header.gallery")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={() => setIsMenuOpen(false)}>
                {t("header.products")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" onClick={() => setIsMenuOpen(false)}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                {t("header.contact")}
              </NavLink>
            </li>

            <li className="language-switcher">
              <button
                className="language-toggle"
                onClick={toggleLanguageDropdown}
              >
                <TbWorld className="globe-icon" />
              </button>
              <div
                className={`language-dropdown ${
                  isLanguageDropdownOpen ? "open" : ""
                }`}
              >
                <button
                  className={i18n.language === "az" ? "active" : ""}
                  onClick={() => changeLanguage("az")}
                >
                  AZ
                </button>
                <button
                  className={i18n.language === "en" ? "active" : ""}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                <button
                  className={i18n.language === "ru" ? "active" : ""}
                  onClick={() => changeLanguage("ru")}
                >
                  RU
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
