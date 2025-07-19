import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.scss';
import { useTranslation } from 'react-i18next';
import { ref, onValue, update, db } from '../../Firebase/Firebase';
import HeroSection from '../HeroSection/HeroSection';
import BeeLoader from '../../Components/Loading/BeeLoader';

const ITEMS_PER_PAGE = 6; // Number of items per page

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [likedCards, setLikedCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    const galleryRef = ref(db, 'gallery');
    const unsubscribe = onValue(
      galleryRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setGalleryData(Object.values(data));
        } else {
          setGalleryData([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching gallery data:', error);
        setLoading(false);
      }
    );

    const storedLikedCards = JSON.parse(localStorage.getItem('likedCards')) || {};
    setLikedCards(storedLikedCards);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('likedCards', JSON.stringify(likedCards));
  }, [likedCards]);

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
      const newGalleryData = [...galleryData];
      newGalleryData[index].likes = newLikedCards[index]
        ? (newGalleryData[index].likes || 0) + 1
        : Math.max((newGalleryData[index].likes || 0) - 1, 0);

      const galleryRef = ref(db, `gallery/${index}`);
      update(galleryRef, { likes: newGalleryData[index].likes }).catch((error) => {
        console.error('Error updating likes in Firebase:', error);
      });

      setGalleryData(newGalleryData);
      return newLikedCards;
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(galleryData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = galleryData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="gallery">
      <HeroSection titleKey="header.gallery" descriptionKey="gallery.desc" />
      <div className="gallery-section gallery-cards">
        <div className="gallery-container">
          {loading ? (
            <BeeLoader />
          ) : galleryData.length === 0 ? (
            <p>No gallery items available.</p>
          ) : (
            <>
              <div className="cards-container">
                {currentItems.map((card, index) => (
                  <motion.div
                    key={startIndex + index}
                    className="gallery-card"
                    whileHover={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="card-image">
                      <img
                        src={card.src}
                        alt={card.title}
                        onClick={() => openModal({ src: card.src, alt: card.title })}
                      />
                      <div className="like-container">
                        <motion.button
                          className="heart-button"
                          onClick={() => toggleLike(startIndex + index)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <AnimatePresence mode="wait">
                            {likedCards[startIndex + index] ? (
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
                          key={card.likes}
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.likes || 0} {t('gallery.likes')}
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
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
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