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

// slides dizisini statik olarak tanımlıyoruz, ama t fonksiyonunu dışarıda kullanmıyoruz
const slideData = [
  {
    image: healthbenefits,
    title: "home.healthbenefitshead",
    description: "home.healthbenefitsdesc",
  },
  {
    image: honeyhistory,
    title: "home.honeyhistoryhead",
    description: "home.honeyhistorydesc",
  },
  {
    image: naturehoney,
    title: "home.naturehoneyhead",
    description: "home.naturehoneydesc",
  },
  {
    image: honeyfood,
    title: "home.honeyfoodhead",
    description: "home.honeyfooddesc",
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


  const slides = slideData.map(slide => ({
    image: slide.image,
    title: t(slide.title),
    description: t(slide.description),
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