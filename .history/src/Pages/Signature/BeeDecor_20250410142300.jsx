// BeeComponent.jsx
import React, { useState, useEffect } from 'react';
import './BeeComponent.scss';

const BeeComponent = ({ title = "Bal Dünyası", subtitle = "Doğal ve Organik Bal Ürünleri" }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bee-component">
      <div className="honeycomb-background"></div>
      
      <div className="bee-content" 
           style={{ transform: `translateY(${scrollPosition * 0.05}px)` }}
           onMouseEnter={() => setIsHovering(true)}
           onMouseLeave={() => setIsHovering(false)}>
        <div className="bee-header">
          <div className="bee-icon">
            <div className="bee-body">
              <div className="bee-stripe"></div>
              <div className="bee-stripe"></div>
              <div className="bee-stripe"></div>
            </div>
            <div className="bee-wing bee-wing-left"></div>
            <div className="bee-wing bee-wing-right"></div>
          </div>
          <h2>{title}</h2>
        </div>
        
        <p className="subtitle">{subtitle}</p>
        
        <div className="honey-drop-container">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="honey-drop"
              style={{ 
                left: `${15 + i * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="honeycomb-container">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className={`honeycomb-cell ${isHovering ? 'glow' : ''}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="flying-bee bee-1"></div>
      <div className="flying-bee bee-2"></div>
      <div className="flying-bee bee-3"></div>
    </div>
  );
};

export default BeeComponent;