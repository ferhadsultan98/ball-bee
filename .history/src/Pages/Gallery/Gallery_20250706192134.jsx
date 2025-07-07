import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.scss';
import { useTranslation } from 'react-i18next';
import { ref, onValue, update, db } from '../../Firebase/Firebase';
import HeroSection from '../HeroSection/HeroSection';
import Loading from '../../Components/Loading/BeeLoader';
import debounce from 'lodash/debounce';

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [likedCards, setLikedCards] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Debounced function to save likedCards to localStorage
  const saveLikedCards = useCallback(
    debounce((likedCards) => {
      localStorage.setItem('likedCards', JSON.stringify(likedCards));
    }, 500),
    []
  );

  // Load gallery data and user's liked state
  useEffect(() => {
    const galleryRef = ref(db, 'gallery');
    const unsubscribe = onValue(
      galleryRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Limit to first 20 items to reduce initial load
          const limitedData = Object.values(data).slice(0, 20);
          setGalleryData(limitedData);
        } else {
          setGalleryData([]);
        }
        setLoading(false);
      },
      { onlyOnce: true }, // Fetch only once to avoid real-time updates
      (error) => {
        console.error('Error fetching gallery data:', error);
        setLoading(false);
      }
    );

    // Load user's liked state from localStorage
    const storedLikedCards = JSON.parse(localStorage.getItem('likedCards')) || {};
    setLikedCards(storedLikedCards);

    return () => unsubscribe();
  }, []);

  // Save likedCards to localStorage with debounce
  useEffect(() => {
    saveLikedCards(likedCards);
  }, [likedCards, saveLikedCards]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    // Preload the modal image
    const img = new Image();
    img.src = image.src;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleLike = (index) => {
    setLikedCards((prev) => {
      const newLikedCards = { ...prev, [index]: !prev[index] };
      const newGalleryData = [...galleryData];
      newGalleryData[index].likes = newLikedCards[index]
        ? (newGalleryData[index].likes || 0) + 1
        : Math.max((newGalleryData[index].likes || 0) - 1, 0);

      // Update Firebase with the new like count
      const galleryRef = ref(db, `gallery/${index}`);
      update(galleryRef, { likes: newGalleryData[index].likes }).catch((error) => {
        console.error('Error updating likes in Firebase:', error);
      });

      setGalleryData(newGalleryData);
      return newLikedCards;
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="gallery">
      <HeroSection titleKey="header.gallery" descriptionKey="gallery.desc" />
      <div className="gallery-section gallery-cards">
        <div className="gallery-container">
          {galleryData.length === 0 ? (
            <p>No gallery items available.</p>
          ) : (
            <div className="cards-container">
              {galleryData.map((card, index) => (
                <motion.div
                  key={index}
                  className="gallery-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-image">
                    <img
                      src={card.src}
                      alt={card.title}
                      loading="lazy"
                      onClick={() => openModal({ src: card.src, alt: card.title })}
                    />
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
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.2 }}
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
                              transition={{ duration: 0.2 }}
                            >
                              🤍
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                      <span className="like-count">
                        {card.likes || 0} {t('gallery.likes')}
                      </span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            {selectedImage && (
              <>
                <img src={selectedImage.src} alt={selectedImage.alt} loading="eager" />
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