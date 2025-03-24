// src/Pages/Gallery/Gallery.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Lightbox styles
import 'slick-carousel/slick/slick.css'; // Slick carousel styles
import 'slick-carousel/slick/slick-theme.css';
import './Gallery.scss';

// Sample images (replace with your own)
import featuredImage from '../../assets/featured-honey.jpg'; // Featured image for hero
import honeyImage1 from '../../assets/honey1.jpg';
import honeyImage2 from '../../assets/honey2.jpg';
import honeyImage3 from '../../assets/honey3.jpg';
import honeyImage4 from '../../assets/honey4.jpg';
import honeyImage5 from '../../assets/honey5.jpg';
import gridImage1 from '../../assets/grid1.jpg';
import gridImage2 from '../../assets/grid2.jpg';
import gridImage3 from '../../assets/grid3.jpg';
import gridImage4 from '../../assets/grid4.jpg';

const sliderImages = [
  { src: honeyImage1, title: 'Təbii Çiçək Balı', description: 'Ən təmiz çiçəklərdən toplanmış bal.' },
  { src: honeyImage2, title: 'Kərə Balı', description: 'Kərə balının unikal dadı.' },
  { src: honeyImage3, title: 'Dağ Balı', description: 'Dağların təmiz havasından gələn bal.' },
  { src: honeyImage4, title: 'Limonlu Bal', description: 'Limon ətirli təbii bal.' },
  { src: honeyImage5, title: 'Qozlu Bal', description: 'Qoz ilə zənginləşdirilmiş bal.' },
];

const gridImages = [
  { src: gridImage1, caption: 'Arı Çərçivələri' },
  { src: gridImage2, caption: 'Bal Toplama Prosesi' },
  { src: gridImage3, caption: 'Təbii Arı Pətəkləri' },
  { src: gridImage4, caption: 'Balın Qablaşdırılması' },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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
    setPhotoIndex(index);
    setIsLightboxOpen(true);
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
                <img src={image.src} alt={image.caption} />
                <div className="grid-overlay">
                  <p>{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={gridImages[photoIndex].src}
          nextSrc={gridImages[(photoIndex + 1) % gridImages.length].src}
          prevSrc={gridImages[(photoIndex + gridImages.length - 1) % gridImages.length].src}
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + gridImages.length - 1) % gridImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % gridImages.length)
          }
        />
      )}
    </div>
  );
};

export default Gallery;