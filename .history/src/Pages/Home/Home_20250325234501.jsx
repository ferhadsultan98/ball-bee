import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import healthbenefits from '../../assets/Homes/healthbenefit.jpg';
import honeyhistory from '../../assets/Homes/honehhistory.jpg';
import naturehoney from '../../assets/Homes/naturehoney.jpg';
import honeyfood from '../../assets/Homes/honeyfood.jpg';

// Define the slides array without translations (just the keys)
const slides = [
  {
    image: healthbenefits,
    titleKey: "home.healthbenefitshead",
    descriptionKey: "home.healthbenefitsdesc",
  },
  {
    image: honeyhistory,
    titleKey: "home.honeyhistoryhead",
    descriptionKey: "home.honeyhistorydesc",
  },
  {
    image: naturehoney,
    titleKey: "home.naturehoneyhead",
    descriptionKey: "home.naturehoneydesc",
  },
  {
    image: honeyfood,
    titleKey: "home.honeyfoodhead",
    descriptionKey: "home.honeyfooddesc",
  },
];

const Home = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slower transition for smoother effect
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 seconds per slide
    arrows: false, // Remove arrows
    fade: true, // Smooth fade transition
    pauseOnHover: false, // Continue rotating even on hover
    pauseOnDotsHover: false, // Continue rotating even when hovering over dots
  };

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
                  <h1>{t(slide.titleKey)}</h1> {/* Apply translation here */}
                  <p className="description">{t(slide.descriptionKey)}</p> {/* Apply translation here */}
                  <button className="learn-more-btn">{t('home.learnmore')}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;