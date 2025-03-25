// src/Pages/Gallery/Gallery.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.scss';
import { useTranslation } from 'react-i18next';
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
  const [likeCounts, setLikeCounts] = useState({}); // Track like counts for each card
  const { t } = useTranslation();

  // Load like counts and liked state from localStorage on mount
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likeCounts')) || {};
    const storedLikedCards = JSON.parse(localStorage.getItem('likedCards')) || {};

    // Initialize like counts and liked state for each card if not already in localStorage
    const initialLikeCounts = {};
    const initialLikedCards = {};
    cardData.forEach((_, index) => {
      initialLikeCounts[index] = storedLikes[index] || 0;
      initialLikedCards[index] = storedLikedCards[index] || false;
    });

    setLikeCounts(initialLikeCounts);
    setLikedCards(initialLikedCards);
  }, []);

  // Save like counts and liked state to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
    localStorage.setItem('likedCards', JSON.stringify(likedCards));
  }, [likeCounts, likedCards]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleLike = (index) => {
    setLikedCards((prev) => {
      const newLikedCards = { ...prev, [index]: !prev[index] };
      setLikeCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        newCounts[index] = newLikedCards[index]
          ? (prevCounts[index] || 0) + 1 // Increment if liked
          : Math.max((prevCounts[index] || 0) - 1, 0); // Decrement if unliked, but not below 0
        return newCounts;
      });
      return newLikedCards;
    });
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
      <HeroSection titleKey="header.about" descriptionKey="about.herodesc" />
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
                  <div className="like-container">
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
                    <motion.span
                      className="like-count"
                      key={likeCounts[index]}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {likeCounts[index] || 0} {t('gallery.likes')}
                    </motion.span>
                  </div>
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