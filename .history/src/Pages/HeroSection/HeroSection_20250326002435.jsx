import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../../assets/herovideo.mp4';
import './HeroSection.scss';

const HeroSection = ({ titleKey, descriptionKey, backTo = '/' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backTo);
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{t(titleKey)}</h1>
          <p>{t(descriptionKey)}</p>
          <button className="back-btn" onClick={handleBack}>
            {t('header.backtohome')}
          </button>
        </div>
      </div>
      <video src={heroVideo} autoPlay loop muted></video>
    </div>
  );
};

export default HeroSection;