import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu import et
import heroVideo from '../../assets/herovideo.mp4';
import './HeroSection.scss';

const HeroSection = ({ titleKey, descriptionKey, navigateTo }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // useNavigate hook'unu tanımla

  // Butona tıklayınca yönlendirme fonksiyonu
  const handleNavigate = () => {
    if (navigateTo) {
      navigate(navigateTo); // Prop olarak gelen yola yönlendir
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1>{t(titleKey)}</h1>
        <p>{t(descriptionKey)}</p>
        <button className="learn-more-btn" onClick={handleNavigate}>
          {t('home.learnmore')} {/* Çeviri ile buton metni */}
        </button>
      </div>
      <video src={heroVideo} autoPlay loop muted></video>
    </div>
  );
};

export default HeroSection;