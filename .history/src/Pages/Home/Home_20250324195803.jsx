// src/Pages/Home/Home.jsx
import React from 'react';
import './Home.scss';
import honeyImage from '../../'; 

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-text">
          <p className="welcome-text">Welcome to Madoe</p>
          <h1>
            Fresh <br />
            Naturally <br />
            Honey
          </h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button className="learn-more-btn">Learn More</button>
        </div>
        <div className="home-image">
          <img src={honeyImage} alt="Honey Jar and Honeycomb" />
        </div>
      </div>
    </div>
  );
};

export default Home;