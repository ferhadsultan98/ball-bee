// BallBeeHoney.jsx
import React, { useState, useEffect } from 'react';
import './BallBeeHoney.scss';
import { db } from '../';
import { ref, onValue } from 'firebase/database';

const BallBeeHoney = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [contentData, setContentData] = useState({
    brandName: '',
    subtitle: '',
    heroTitle: '',
    heroDescription: '',
    phoneNumber: '',
    ctaText: '',
    images: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from Firebase (GET equivalent)
  useEffect(() => {
    const contentRef = ref(db, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContentData(data);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching content:', error);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Auto-rotate slideshow
  useEffect(() => {
    if (!loading && contentData.images.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % contentData.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, contentData.images.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ball-bee">
      <div className="background-slideshow">
        {contentData.images.map((img, index) => (
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