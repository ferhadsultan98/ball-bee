// src/Pages/Home/Home.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.scss';

// Sample images (replace with your own)
import honeyImage1 from '../../assets/honey1.avif';
import honeyImage2 from '../../assets/honey2.avif';
import honeyImage3 from '../../assets/honey3.avif';
import honeyImage4 from '../../assets/honey4.avif';

const slides = [
  {
    image: honeyImage1,
    title: 'Təbii Çiçək Balı',
    description: 'Ən təmiz çiçəklərdən toplanmış, tamamilə təbii və əlavəsiz bal. Sağlamlıq və ləzzət bir arada!',
  },
  {
    image: honeyImage2,
    title: 'Dağ Balı',
    description: 'Dağların təmiz havasında arılar tərəfindən istehsal edilmiş unikal bal. Enerji mənbəyi!',
  },
  {
    image: honeyImage3,
    title: 'Qozlu Bal',
    description: 'Təbii balın qozla zənginləşdirilmiş ləzzətli birləşməsi. Həm sağlam, həm dadlı!',
  },
  {
    image: honeyImage4,
    title: 'Limonlu Bal',
    description: 'Limon ətri ilə zənginləşdirilmiş təbii bal, immunitet üçün əla seçim.',
  },
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true, // Smooth fade transition
    pauseOnHover: true,
  };

  return (
    <div className="home">
      <div className="home-container">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-content">
                <div className="slide-text">
                  <h1>{slide.title}</h1>
                  <p className="description">{slide.description}</p>
                  <button className="learn-more-btn">Learn More</button>
                </div>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;