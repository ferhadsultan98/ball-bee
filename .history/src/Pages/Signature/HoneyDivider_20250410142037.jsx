// BeeDecor.jsx
import React from 'react';
import './BeeDecor.scss';

const BeeDecor = () => {
  return (
    <div className="bee-decor">
      <div className="bee-decor__hive">
        <span className="bee-decor__bee bee-decor__bee--left">🐝</span>
        <span className="bee-decor__bee bee-decor__bee--right">🐝</span>
        <div className="bee-decor__honey-drip"></div>
      </div>
      <div className="bee-decor__text">
        <h3>Balbee</h3>
        <p>Arıların Sihrinden</p>
      </div>
    </div>
  );
};

export default BeeDecor;