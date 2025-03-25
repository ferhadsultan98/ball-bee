import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import honeyImage1 from '../../assets/honey1.avif';
import honeyImage2 from '../../assets/honey2.avif';
import honeyImage3 from '../../assets/honey3.avif';
import honeyImage4 from '../../assets/honey2.avif';

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
  const { t, i18n } = useTranslation();
  
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
                  <h1>{slide.title}</h1>
                  <p className="description">{slide.description}</p>
                  <button className="learn-more-btn">Learn More</button>
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