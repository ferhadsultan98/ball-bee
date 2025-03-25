import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu import et
import heroVideo from '../../assets/herovideo.mp4';
import './HeroSection.scss';

const HeroSection = ({ titleKey, descriptionKey }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // useNavigate hook'unu tanımla

  // Ana sayfaya geri dönme fonksiyonu
  const handleBackToHome = () => {
    navigate('/'); // Ana sayfaya yönlendir (örneğin, "/" yolu)
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1>{t(titleKey)}</h1>
        <p>{t(descriptionKey)}</p>
        <button className="back-btn" onClick={handleBackToHome}>
          {t('header.backtohome')} {/* Çeviri ile geri dön metni */}
        </button>
      </div>
      <video src={heroVideo} autoPlay loop muted></video>
    </div>
  );
};

export default HeroSection;