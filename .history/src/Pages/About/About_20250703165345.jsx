// src/Pages/About/About.jsx
import React from "react";
import "./About.scss";
import heroVideo from "../../assets/herovideo.mp4";
import honeyVideo from "../../assets/ballbeevideo.mp4";
import { useTranslation } from "react-i18next";
import HeroSection from "../HeroSection/HeroSection";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about">
      <HeroSection titleKey="header.about" descriptionKey="about.herodesc" />

      <div className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>BalBee: {t("about.titlehead")}</h2>
              <p>{t("about.titledesc")}</p>
              <h3>{t("about.subtitlehead")}</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <strong>{t("about.benefitonehead")}</strong>
                  <p>{t("about.benefitonedesc")}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t("about.benefittwohead")}</strong>
                  <p>{t("about.benefittwodesc")}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t("about.benefitthreehead")}</strong>
                  <p>{t("about.benefitthreedesc")}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t("about.benefitfourhead")}</strong>
                  <p>{t("about.benefitfourdesc")}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t("about.benefitfivehead")}</strong>
                  <p>{t("about.benefitfivedesc")}</p>
                </div>
              </div>
            </div>
            <div className="about-video">
              <video src={honeyVideo} autoPlay></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
