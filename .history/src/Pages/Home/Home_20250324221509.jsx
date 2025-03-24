// src/Pages/Home/Home.jsx
import React from "react";
import "./Home.scss";
import honeyImage from "../../assets/bee.png";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-text">
          <p className="welcome-text">Welcome to BalBee World</p>
          <h1>Fresh Naturally Honey</h1>
          <p className="description">
            Discover the finest, purest honey, harvested from nature’s best.
            Sweet, healthy, and full of flavor – perfect for every occasion.
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
