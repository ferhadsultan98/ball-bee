import React, { useState, useEffect } from 'react';
import './BallBeeHoney.scss';
import HoneyOne from '../assets/honey1.avif'
import HoneyTwo from '../assets/honey1.avif'
import HoneyR from '../assets/honey1.avif'

const BallBeeHoney = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  

  const backgroundImages = [
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080'
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
            <a href="#order" className="cta-button">Order Now</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BallBeeHoney;