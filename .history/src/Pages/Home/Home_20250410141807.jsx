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
import { Link } from "react-router-dom";
import ManIcon from '../../assets/man.png'
import WomanIcon from '../../assets/woman.png'
import Signature from '../Signature/HoneyDivider';

const slideData = [
  {
    image: healthbenefits,
    title: "home.healthbenefitshead",
    description: "home.healthbenefitsdesc",
    topic: "healthbenefits"
  },
  {
    image: honeyhistory,
    title: "home.honeyhistoryhead",
    description: "home.honeyhistorydesc",
    topic: "honeyhistory"
  },
  {
    image: naturehoney,
    title: "home.naturehoneyhead",
    description: "home.naturehoneydesc",
    topic: "naturehoney"
  },
  {
    image: honeyfood,
    title: "home.honeyfoodhead",
    description: "home.honeyfooddesc",
    topic: "honeyfood"
  },
];

const testimonialData = [
  {
    name: "Səbinə AXUNDOVA",
    feedback: "Bu bal çox gözəldir! Mənim sağlamlığım və rifahım çox yaxşılaşdı. Ən yüksək tövsiyə edirəm!",
    avatar: WomanIcon, 
  },
  {
    name: "Fərhad SULTANOV",
    feedback: "Balın keyfiyyəti inanılmazdır, xidmət isə fantastikdir. İndi daimi müştərinizəm.",
    avatar: ManIcon,
  },
  {
    name: "Hacıəmi ZEYNALOV",
    feedback: "Bu balın tarixi və təmizliyi məni çox cəlb edir. O, çox dadlıdır və sağlam həyat tərzimi dəstəkləyir.",
    avatar: ManIcon, 
  },
];

const Home = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
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

  const slides = slideData.map(slide => ({
    image: slide.image,
    title: t(slide.title),
    description: t(slide.description),
    topic: slide.topic
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
                  <Link to={`/details/${slide.topic}`}>
                    <button className="learn-more-btn">{t('home.learnmore')}</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="testimonials">
        <h2>{t('home.customerReviews')}</h2>
        <div className="testimonial-cards">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
              <div className="testimonial-content">
                <p className="feedback">"{testimonial.feedback}"</p>
                <h4 className="customer-name">{testimonial.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Signature/>
    </div>
  );
};

export default Home;