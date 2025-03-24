import React, { useState, useEffect } from 'react';
import './BallBeeHoney.scss';
import HoneyOne from '../assets/honey1.avif'
import HoneyTwo from '../assets/honey2.avif'
import HoneyThree from '../assets/honey3.avif'

const BallBeeHoney = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  

  const backgroundImages = [
    HoneyOne,
    HoneyTwo,
    HoneyThree
  ];
  
  // Auto-rotate slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="ball-bee">
      {/* Background Slideshow */}
      <div className="background-slideshow">
        {backgroundImages.map((img, index) => (
          <div 
            key={index} 
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      
      {/* Content Overlay */}
      <div className="content">
        <div className="logo-container">
          <div className="logo">
            <h1>Ball-Bee</h1>
            <p>Pure Natural Honey</p>
          </div>
        </div>
        
        <section id="hero">
          <div className="hero-content">
            <h2>Sweet Nectar from Nature's Heart</h2>
            <p>Locally sourced, 100% pure honey from happy bees</p>
            <a href="#order" className="cta-button">Sifariş verin</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BallBeeHoney;