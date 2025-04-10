// HoneyDivider.jsx
import React from 'react';
import './HoneyDivider.scss';

const HoneyDivider = () => {
  return (
    <div className="honey-divider">
      <div className="honey-divider__wave"></div>
      <div className="honey-divider__content">
        <span className="honey-divider__bee">🐝</span>
        <span className="honey-divider__text">Balbee</span>
      </div>
      <div className="honey-divider__wave honey-divider__wave--bottom"></div>
    </div>
  );
};

export default HoneyDivider;