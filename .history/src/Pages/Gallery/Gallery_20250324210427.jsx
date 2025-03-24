// src/Pages/Gallery/Gallery.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css'; // Lightbox styles
import 'slick-carousel/slick/slick.css'; // Slick carousel styles
import 'slick-carousel/slick/slick-theme.css';
import './Gallery.scss';

// Sample images (replace with your own)
import featuredImage from '../../assets/honey1.avif'; // Featured image for hero
import honeyImage1 from '../../assets/honey1.avif';
import honeyImage2 from '../../assets/honey2.avif';
import honeyImage3 from '../../assets/honey3.avif';
import honeyImage4 from '../../assets/bee.png';
import honeyImage5 from '../../assets/honey-jar.png';
import gridImage1 from '../../assets/honey1.avif';
import gridImage2 from '../../assets/honey1.avif';
import gridImage3 from '../../assets/honey1.avif';
import gridImage4 from '../../assets/honey1.avif';

const sliderImages = [
  { src: honeyImage1, title: 'Təbii Çiçək Balı', description: 'Ən təmiz çiçəklərdən toplanmış bal.' },
  { src: honeyImage2, title: 'Kərə Balı', description: 'Kərə balının unikal dadı.' },
  { src: honeyImage3, title: 'Dağ Balı', description: 'Dağların təmiz havasından gələn bal.' },
  { src: honeyImage4, title: 'Limonlu Bal', description: 'Limon ətirli təbii bal.' },
  { src: honeyImage5, title: 'Qozlu Bal', description: 'Qoz ilə zənginləşdirilmiş bal.' },
];

const gridImages = [
  { src: gridImage1, title: 'Arı Çərçivələri' },
  { src: gridImage2, title: 'Bal Toplama Prosesi' },
  { src: gridImage3, title: 'Təbii Arı Pətəkləri' },
  { src: gridImage4, title: 'Balın Qablaşdırılması' },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="gallery">
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="hero-overlay">
          <h1>Bal Qalereyamız</h1>
          <p>Təbiətin ən şirin hədiyyəsini kəşf edin!</p>
        </div>
        <img src={featuredImage} alt="Featured Honey" />
      </div>

      {/* Slider Section */}
      <div className="gallery-section gallery-slider">
        <div className="gallery-container">
          <h2 className="section-title">Seçilmiş Bal Çeşidlərimiz</h2>
          <Slider {...settings}>
            {sliderImages.map((image, index) => (
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

      {/* Grid Section */}
      <div className="gallery-section gallery-grid">
        <div className="gallery-container">
          <h2 className="section-title">Bal İstehsalı Prosesimiz</h2>
          <div className="grid-container">
            {gridImages.map((image, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => openLightbox(index)}
              >
                <img src={image.src} alt={image.title} />
                <div className="grid-overlay">
                  <p>{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          images={gridImages.map((image) => ({
            src: image.src,
            title: image.title,
          }))}
          setImageIndex={setSelectedImageIndex}
          imageIndex={selectedImageIndex}
          setIsOpen={setIsLightboxOpen}
        />
      )}
    </div>
  );
};

export default Gallery;