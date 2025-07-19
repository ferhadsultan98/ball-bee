import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.scss";
import { useTranslation } from "react-i18next";
import healthbenefits from "../../assets/Homes/healthbenefit.jpg";
import honeyhistory from "../../assets/Homes/honehhistory.jpg";
import naturehoney from "../../assets/Homes/naturehoney.jpg";
import honeyfood from "../../assets/Homes/honeyfood.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import HoneyComponent from "../HoneyComponent/HoneyComponent";


const slideData = [
  {
    image: healthbenefits,
    title: "home.healthbenefitshead",
    description: "home.healthbenefitsdesc",
    topic: "healthbenefits",
  },
  {
    image: honeyhistory,
    title: "home.honeyhistoryhead",
    description: "home.honeyhistorydesc",
    topic: "honeyhistory",
  },
  {
    image: naturehoney,
    title: "home.naturehoneyhead",
    description: "home.naturehoneydesc",
    topic: "naturehoney",
  },
  {
    image: honeyfood,
    title: "home.honeyfoodhead",
    description: "home.honeyfooddesc",
    topic: "honeyfood",
  },
];

const Home = () => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
    pauseOnDotsHover: false,
  };

  const slides = slideData.map((slide) => ({
    image: slide.image,
    title: t(slide.title),
    description: t(slide.description),
    topic: slide.topic,
  }));

  return (
    <div className="home">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div
              className="slide-background"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h1>{slide.title}</h1>
                  <p className="description">{slide.description}</p>
                  <Link to={`/details/${slide.topic}`} style={{ textDecoration: "none" }}>
                    <div className="learn-more-btn">
                      {t("home.learnmore")}{" "}
                      <i>
                        <IoIosArrowForward />
                      </i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Testimonials />
      <HoneyComponent />
    </div>
  );
};

export default Home;