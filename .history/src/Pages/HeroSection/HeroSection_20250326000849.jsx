import React from 'react';
import { useTranslation } from 'react-i18next';
import heroVideo from '../../assets/your-video-path.mp4'; // Video yolunu kendi projene göre ayarla
import './HeroSection.scss'; // SCSS dosyasını ayrı bir dosyaya taşıyacağız

const HeroSection = ({ titleKey, descriptionKey }) => {
  const { t } = useTranslation();

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1>{t(titleKey)}</h1>
        <p>{t(descriptionKey)}</p>
      </div>
      <video src={heroVideo} autoPlay loop muted></video> {/* muted ekledim, tarayıcı autoplay politikaları için */}
    </div>
  );
};

export default HeroSection;