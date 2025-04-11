import React, { useState, useEffect } from 'react';
import './BeeLoader.scss';

const BeeLoader = ({ progress = 0 }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  return (
    <div className="bee-loader-container">
      <div className="bee-character">
        <div className="wing left-wing"></div>
        <div className="bee-body">
          <div className="bee-face">
            <div className="bee-eye left"></div>
            <div className="bee-eye right"></div>
            <div className="bee-smile"></div>
          </div>
          <div className="bee-stripes">
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
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