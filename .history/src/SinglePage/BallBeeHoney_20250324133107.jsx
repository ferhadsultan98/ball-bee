// BallBeeHoney.jsx
import React, { useState, useEffect } from 'react';
import './BallBeeHoney.scss';

const BallBeeHoney = ({ contentData }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const backgroundImages = contentData.images || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="ball-bee">
      <div className="background-slideshow">
        {backgroundImages.map((img, index) => (
          <div 
            key={index} 
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      
      <div className="content">
        <div className="logo-container">
          <div className="logo">
            <h1>{contentData.brandName}</h1>
            <p>{contentData.subtitle}</p>
          </div>
        </div>
        
        <section id="hero">
          <div className="hero-content">
            <h2>{contentData.heroTitle}</h2>
            <p>{contentData.heroDescription}</p>
            <a href={`tel:${contentData.phoneNumber}`} className="cta-button">
              {contentData.ctaText}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BallBeeHoney;