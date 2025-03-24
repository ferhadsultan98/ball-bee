// src/Pages/About/About.jsx
import React from 'react';
import './About.scss';
import heroImage from '../../assets/honey1.avif'; // New hero image (replace with your own)
import honeyJar from '../../assets/honey-jar.png';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="about">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>{t('header.about')}</h1>
          <p>{t('about.desc')}</p>
        </div>
        <img src={heroImage} alt="About Hero" />
      </div>

      {/* Content Section */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>{t('about.titlehead')}</h2>
              <p>
              {t('about.titledesc')}
              </p>
              <h3>{t('about.subtitlehead')}</h3>
              <ul className="benefits-list">
                <li><strong>{t('about.benefitonehead')}</strong> {t('about.benefitonedesc')}</li>
                <li><strong>{t('about.benefitonehead')}</strong> Antioksidantlarla zəngindir, xəstəliklərə qarşı qoruyur.</li>
                <li><strong>{t('about.benefitonehead')}</strong> Antibakterial xüsusiyyətləri ilə yaraların sağalmasını sürətləndirir.</li>
                <li><strong>{t('about.benefitonehead')}</strong> Mədə-bağırsaq sistemini dəstəkləyir.</li>
                <li><strong>{t('about.benefitonehead')}</strong> Təbii nəmləndirici olaraq dəri sağlamlığını dəstəkləyir.</li>
              </ul>
            </div>
            <div className="about-image">
              <img src={honeyJar} alt="Honey Jar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;