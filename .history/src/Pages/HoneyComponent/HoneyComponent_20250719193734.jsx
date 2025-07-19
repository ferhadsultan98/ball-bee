import React, { useState, useEffect } from "react";
import "./HoneyComponent.scss";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
    <section className={`honeyComponent ${isVisible ? "visible" : ""}`}>
      <div className="honeyContainer">
        <div className="honeyBackground">
          <div className="honeycombPattern">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="hexagonCell" />
            ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`honey-drop drop${i + 1}`} />
          ))}
        </div>

        <div className="contentContainer">
          <div className="beeIcon">
            <div className="beeBody"></div>
            <div className="beeWing wingLeft"></div>
            <div className="beeWing wingRight"></div>
            <div className="beeStinger"></div>
          </div>

          <h1 className="title">BallBee</h1>
          <p className="subtitle">{t("footer.desc")}</p>
          <Link to="/products">
            <div className="honeyButton">
              <span className="buttonText">{t("details.viewProducts")}</span>
              <span className="buttonIcon">
                <FaArrowRightLong />
              </span>
            </div>
          </Link>
        </div>

        <div className="beeDecoration">
          <div className="bee bee1">🐝</div>
          <div className="bee bee2">🐝</div>
        </div>
      </div>
    </section>
  );
};

export default HoneyComponent;