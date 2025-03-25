// src/Pages/Gallery/Gallery.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.scss';
import { useTranslation } from 'react-i18next';

// Sample images (replace with your own)
import featuredImage from '../../assets/honey1.avif'; // Featured image for hero
import honeyImage1 from '../../assets/honey1.avif';
import honeyImage2 from '../../assets/honey2.avif';
import honeyImage3 from '../../assets/honey3.avif';
import honeyImage4 from '../../assets/bee.png';
import honeyImage5 from '../../assets/honey-jar.png';

const cardData = [
  { src: honeyImage1, title: 'Təbii Çiçək Balı', description: 'Ən təmiz çiçəklərdən toplanmış bal.' },
  { src: honeyImage2, title: 'Kərə Balı', description: 'Kərə balının unikal dadı.' },
  { src: honeyImage3, title: 'Dağ Balı', description: 'Dağların təmiz havasından gələn bal.' },
  { src: honeyImage4, title: 'Limonlu Bal', description: 'Limon ətirli təbii bal.' },
  { src: honeyImage5, title: 'Qozlu Bal', description: 'Qoz ilə zənginləşdirilmiş bal.' },
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedCards, setLikedCards] = useState({}); // Track liked state for each card
  const { t } = useTranslation();

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleLike = (index) => {
    setLikedCards((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the liked state for the specific card
    }));
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

      {/* Cards Section */}
      <div className="gallery-section gallery-cards">
        <div className="gallery-container">
          <h2 className="section-title">{t('gallery.choosehoney')}</h2>
          <div className="cards-container">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                className="gallery-card"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="card-image">
                  <img src={card.src} alt={card.title} onClick={() => openModal({ src: card.src, alt: card.title })} />
                  <motion.button
                    className="heart-button"
                    onClick={() => toggleLike(index)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      {likedCards[index] ? (
                        <motion.span
                          key="filled"
                          className="heart-icon filled"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          ❤️
                        </motion.span>
                      ) : (
                        <motion.span
                          key="empty"
                          className="heart-icon"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          🤍
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </motion.div>
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