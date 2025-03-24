// src/Pages/Gallery/Gallery.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Gallery.scss';
import { useTranslation } from 'react-i18next';

// Sample images (replace with your own)
import featuredImage from '../../assets/honey1.avif';
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
  { src: honeyImage1, title: 'Təbii Çiçək Balı', description: 'Ən təmiz çiçəklərdən toplanmış bal, sağlamlıq və ləzzət bir arada.' },
  { src: honeyImage2, title: 'Kərə Balı', description: 'Kərə balının unikal dadı, təbiətin ən saf hədiyyəsi.' },
  { src: honeyImage3, title: 'Dağ Balı', description: 'Dağların təmiz havasından gələn bal, enerji mənbəyi.' },
  { src: honeyImage4, title: 'Limonlu Bal', description: 'Limon ətirli təbii bal, immunitet üçün əla seçim.' },
  { src: honeyImage5, title: 'Qozlu Bal', description: 'Qoz ilə zənginləşdirilmiş bal, həm sağlam, həm dadlı.' },
];

const gridImages = [
  { src: gridImage1, caption: 'Arı Çərçivələri', description: 'Təbii arı çərçivələrimizdən bir görüntü.' },
  { src: gridImage2, caption: 'Bal Toplama Prosesi', description: 'Arılarımızdan bal toplama anları.' },
  { src: gridImage3, caption: 'Təbii Arı Pətəkləri', description: 'Ən təbii pətəklərdən bal istehsalı.' },
  { src: gridImage4, caption: 'Balın Qablaşdırılması', description: 'Balın diqqətlə qablaşdırılma prosesi.' },
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
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

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="gallery">
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="hero-overlay">
          <h1>{t('gallery.head')}</h1>
          <p>{t('gallery.desc')}</p>
          <button className="hero-btn">{t('gallery.explore')}</button>
        </div>
        <img src={featuredImage} alt="Featured Honey" />
      </div>

      {/* Slider Section */}
      <div className="gallery-section gallery-slider">
        <div className="gallery-container">
          <h2 className="section-title">{t('gallery.choosehoney')}</h2>
          <Slider {...settings}>
            {sliderImages.map((image, index) => (
              <div key={index} className="gallery-card">
                <div className="card-image">
                  <img src={image.src} alt={image.title} />
                  <div className="card-overlay">
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <button className="card-btn">{t('gallery.learnMore')}</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Grid Section */}
      <div className="gallery-section gallery-grid">
        <div className="gallery-container">
          <h2 className="section-title">{t('gallery.honeyproduct')}</h2>
          <div className="grid-container">
            {gridImages.map((image, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => openModal(image)}
              >
                <img src={image.src} alt={image.caption} />
                <div className="grid-overlay">
                  <h3>{image.caption}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            {selectedImage && (
              <>
                <img src={selectedImage.src} alt={selectedImage.caption} />
                <div className="modal-info">
                  <h3>{selectedImage.caption}</h3>
                  <p>{selectedImage.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;