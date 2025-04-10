// HoneyComponent.jsx
import React, { useState, useEffect } from "react";
import "./HoneyComponent.scss";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";

const HoneyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const honeyElements = document.querySelectorAll(".honey-drop");
      honeyElements.forEach((element) => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          element.classList.add("dripping");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`honey-component ${isVisible ? "visible" : ""}`}>
      <div className="honey-background">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="honey-drop" />
        ))}
        <div className="honeycomb">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="cell" />
          ))}
        </div>
      </div>

      <div className="content-container">
        <div className="bee-icon">
          <div className="bee-body"></div>
          <div className="bee-wing wing-left"></div>
          <div className="bee-wing wing-right"></div>
          <div className="bee-stinger"></div>
        </div>

        <h1 className="title">BallBee</h1>
        <h2 className="subtitle">{t("footer.desc")}</h2>
<Link
        <button className="honey-button">
          <span className="button-text">{t("details.viewProducts")}</span>
          <span className="button-icon">
            <i>
              <FaArrowRightLong />
            </i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default HoneyComponent;
