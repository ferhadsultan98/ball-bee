// src/Pages/About/About.jsx
import React from 'react';
import './About.scss';
import heroImage from '../../assets/honey1.avif';
import honeyJar from '../../assets/honey-jar.png';
import honeyVideo from '../../assets/ballbeevideo.mp4'
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>{t('header.about')}</h1>
          <p>{t('about.herodesc')}</p>
        </div>
        <img src={heroImage} alt="About Hero" />
      </div>

      {/* Content Section */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>BalBee: {t('about.titlehead')}</h2>
              <p>{t('about.titledesc')}</p>
              <h3>{t('about.subtitlehead')}</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <strong>{t('about.benefitonehead')}</strong>
                  <p>{t('about.benefitonedesc')}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t('about.benefittwohead')}</strong>
                  <p>{t('about.benefittwodesc')}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t('about.benefitthreehead')}</strong>
                  <p>{t('about.benefitthreedesc')}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t('about.benefitfourhead')}</strong>
                  <p>{t('about.benefitfourdesc')}</p>
                </div>
                <div className="benefit-item">
                  <strong>{t('about.benefitfivehead')}</strong>
                  <p>{t('about.benefitfivedesc')}</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src={honeyJar} alt="Honey Jar" />
              <video src={}  autoPlay loop></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;