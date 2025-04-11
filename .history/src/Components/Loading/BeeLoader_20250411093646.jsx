import React, { useState, useEffect } from 'react';
import './BeeLoader.scss';

const BeeLoader = ({ progress = 0 }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  // Inject Lordicon script if not already loaded
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon-1.2.0.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bee-loader-container">
      <div className="bee-character">
        <div className="wing left-wing"></div>
        <div className="lordicon-container">
          <lord-icon
            src="https://cdn.lordicon.com/rkxoesrb.json"
            trigger="loop"
            colors="primary:#e09900,secondary:#ffb700"
            style={{width: "100%", height: "100%"}}>
          </lord-icon>
        </div>
        <div className="wing right-wing"></div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-honey" 
          style={{ width: `${currentProgress}%` }}
        >
          <div className="honey-bubbles">
            <div className="bubble b1"></div>
            <div className="bubble b2"></div>
            <div className="bubble b3"></div>
          </div>
        </div>
        <div className="progress-label">{currentProgress}%</div>
      </div>
    </div>
  );
};

export default BeeLoader;