// src/Pages/Gallery/Gallery.jsx
import React, { useState } from 'react';
import Marquee from 'react-marquee-slider';
import './Gallery.scss';
import { useTranslation } from 'react-i18next';

// Sample images (replace with your own)
import featuredImage from '../../assets/honey1.avif'; // Featured image for hero

// Images for the first marquee slider
import marquee1Image1 from '../../assets/honey1.avif';
import marquee1Image2 from '../../assets/honey2.avif';
import marquee1Image3 from '../../assets/honey3.avif';

// Images for the second marquee slider
import marquee2Image1 from '../../assets/bee.png';
import marquee2Image2 from '../../assets/honey-jar.png';
import marquee2Image3 from '../../assets/honey1.avif';

// Images for the third marquee slider
import marquee3Image1 from '../../assets/honey2.avif';
import marquee3Image2 from '../../assets/honey3.avif';
import marquee3Image3 from '../../assets/bee.png';

// Images for the collage
import collageImage1 from '../../assets/honey1.avif';
import collageImage2 from '../../assets/honey2.avif';
import collageImage3 from '../../assets/honey3.avif';
import collageImage4 from '../../assets/bee.png';
import collageImage5 from '../../assets/honey-jar.png';

const marquee1Images = [
  { src: marquee1Image1, title: 'Təbii Çiçək Balı', description: 'Ən təmiz çiçəklərdən toplanmış bal.' },
  { src: marquee1Image2, title: 'Kərə Balı', description: 'Kərə balının unikal dadı.' },
  { src: marquee1Image3, title: 'Dağ Balı', description: 'Dağların təmiz havasından gələn bal.' },
];

const marquee2Images = [
  { src: marquee2Image1, title: 'Arıların Əməyi', description: 'Təbii arı pətəklərindən bir görüntü.' },
  { src: marquee2Image2, title: 'Bal Qablaşdırma', description: 'Ən təmiz şəkildə qablaşdırılmış bal.' },
  { src: marquee2Image3, title: 'Təbii Bal', description: 'Təbiətin ən saf hədiyyəsi.' },
];

const marquee3Images = [
  { src: marquee3Image1, title: 'Limonlu Bal', description: 'Limon ətirli təbii bal.' },
  { src: marquee3Image2, title: 'Qozlu Bal', description: 'Qoz ilə zənginləşdirilmiş bal.' },
  { src: marquee3Image3, title: 'Arı Pətəyi', description: 'Təbii arı pətəklərindən bir görüntü.' },
];

const collageImages = [
  { src: collageImage1, alt: 'Honey 1' },
  { src: collageImage2, alt: 'Honey 2' },
  { src: collageImage3, alt: 'Honey 3' },
  { src: collageImage4, alt: 'Bee' },
  { src: collageImage5, alt: 'Honey Jar' },
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

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
        </div>
        <img src={featuredImage} alt="Featured Honey" />
      </div>

      {/* Marquee Sliders Section */}
      <div className="gallery-section gallery-marquee">
        <div className="gallery-container">
          <h2 className="section-title">{t('gallery.choosehoney')}</h2>
          {/* First Marquee Slider */}
          <div className="marquee-wrapper">
            <Marquee velocity={20} direction="ltr">
              {marquee1Images.map((image, index) => (
                <div key={index} className="marquee-card">
                  <div className="marquee-image">
                    <img src={image.src} alt={image.title} />
                    <div className="marquee-overlay">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Second Marquee Slider */}
          <div className="marquee-wrapper">
            <Marquee velocity={15} direction="rtl">
              {marquee2Images.map((image, index) => (
                <div key={index} className="marquee-card">
                  <div className="marquee-image">
                    <img src={image.src} alt={image.title} />
                    <div className="marquee-overlay">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Third Marquee Slider */}
          <div className="marquee-wrapper">
            <Marquee velocity={25} direction="ltr">
              {marquee3Images.map((image, index) => (
                <div key={index} className="marquee-card">
                  <div className="marquee-image">
                    <img src={image.src} alt={image.title} />
                    <div className="marquee-overlay">
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Collage Section */}
      <div className="gallery-section gallery-collage">
        <div className="gallery-container">
          <h2 className="section-title">{t('gallery.honeyproduct')}</h2>
          <div className="collage-container">
            {collageImages.map((image, index) => (
              <div
                key={index}
                className={`collage-item collage-item-${index + 1}`}
                onClick={() => openModal(image)}
              >
                <img src={image.src} alt={image.alt} />
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
                <img src={selectedImage.src} alt={selectedImage.alt} />
                <p className="modal-caption">{selectedImage.alt}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;