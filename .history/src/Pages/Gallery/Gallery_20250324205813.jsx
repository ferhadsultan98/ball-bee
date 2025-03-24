// src/Pages/Gallery/Gallery.jsx
import React from 'react';
import Slider from 'react-slick';
import './Gallery.scss';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

// Sample images (replace with your own)
import honeyImage1 from '../../';
import honeyImage2 from '../../assets/honey2.avif';
import honeyImage3 from '../../assets/honey3.avif';
import honeyImage4 from '../../assets/bee.png';
import honeyImage5 from '../../assets/honey-jar.png';

const galleryImages = [
  { src: honeyImage1, title: 'Təbii Çiçək Balı', description: 'Ən təmiz çiçəklərdən toplanmış bal.' },
  { src: honeyImage2, title: 'Kərə Balı', description: 'Kərə balının unikal dadı.' },
  { src: honeyImage3, title: 'Dağ Balı', description: 'Dağların təmiz havasından gələn bal.' },
  { src: honeyImage4, title: 'Limonlu Bal', description: 'Limon ətirli təbii bal.' },
  { src: honeyImage5, title: 'Qozlu Bal', description: 'Qoz ilə zənginləşdirilmiş bal.' },
];

const Gallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at a time on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="gallery">
      <div className="gallery-container">
        <h1 className="gallery-title">Qalereya</h1>
        <Slider {...settings}>
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-card">
              <div className="card-image">
                <img src={image.src} alt={image.title} />
              </div>
              <div className="card-content">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;