import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './HomeDetails.scss';

// Import the same images
import healthbenefits from 'https://images.pexels.com/photos/460961/pexels-photo-460961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
import honeyhistory from 'https://images.pexels.com/photos/460961/pexels-photo-460961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
import naturehoney from 'https://images.pexels.com/photos/460961/pexels-photo-460961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
import honeyfood from 'https://images.pexels.com/photos/460961/pexels-photo-460961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

const HomeDetails = () => {
  const { t } = useTranslation();
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(topicId || 'healthbenefits');


  const topicsData = {
    healthbenefits: {
      title: t('home.healthbenefitshead'),
      image: healthbenefits,
      mainContent: t('details.healthbenefits.mainContent'),
      bulletPoints: [
        t('details.healthbenefits.point1'),
        t('details.healthbenefits.point2'),
        t('details.healthbenefits.point3'),
        t('details.healthbenefits.point4')
      ],
      conclusion: t('details.healthbenefits.conclusion')
    },
    honeyhistory: {
      title: t('home.honeyhistoryhead'),
      image: honeyhistory,
      mainContent: t('details.honeyhistory.mainContent'),
      bulletPoints: [
        t('details.honeyhistory.point1'),
        t('details.honeyhistory.point2'),
        t('details.honeyhistory.point3'),
        t('details.honeyhistory.point4')
      ],
      conclusion: t('details.honeyhistory.conclusion')
    },
    naturehoney: {
      title: t('home.naturehoneyhead'),
      image: naturehoney,
      mainContent: t('details.naturehoney.mainContent'),
      bulletPoints: [
        t('details.naturehoney.point1'),
        t('details.naturehoney.point2'),
        t('details.naturehoney.point3'),
        t('details.naturehoney.point4')
      ],
      conclusion: t('details.naturehoney.conclusion')
    },
    honeyfood: {
      title: t('home.honeyfoodhead'),
      image: honeyfood,
      mainContent: t('details.honeyfood.mainContent'),
      bulletPoints: [
        t('details.honeyfood.point1'),
        t('details.honeyfood.point2'),
        t('details.honeyfood.point3'),
        t('details.honeyfood.point4')
      ],
      conclusion: t('details.honeyfood.conclusion')
    }
  };

  useEffect(() => {
    if (topicId && topicsData[topicId]) {
      setCurrentTopic(topicId);
    }
  }, [topicId]);


  const currentTopicData = topicsData[currentTopic];


  const handleTopicChange = (topic) => {
    setCurrentTopic(topic);
    navigate(`/details/${topic}`);
  };

  return (
    <div className="home-details">
      <div className="header-banner" style={{ backgroundImage: `url(${currentTopicData.image})` }}>
        <div className="overlay">
          <h1>{currentTopicData.title}</h1>
        </div>
      </div>

      <div className="details-container">
        <div className="topics-sidebar">
          <h3>{t('details.exploreTopics')}</h3>
          <ul>
            <li 
              className={currentTopic === 'healthbenefits' ? 'active' : ''} 
              onClick={() => handleTopicChange('healthbenefits')}
            >
              {t('home.healthbenefitshead')}
            </li>
            <li 
              className={currentTopic === 'honeyhistory' ? 'active' : ''} 
              onClick={() => handleTopicChange('honeyhistory')}
            >
              {t('home.honeyhistoryhead')}
            </li>
            <li 
              className={currentTopic === 'naturehoney' ? 'active' : ''} 
              onClick={() => handleTopicChange('naturehoney')}
            >
              {t('home.naturehoneyhead')}
            </li>
            <li 
              className={currentTopic === 'honeyfood' ? 'active' : ''} 
              onClick={() => handleTopicChange('honeyfood')}
            >
              {t('home.honeyfoodhead')}
            </li>
          </ul>
        </div>

        <div className="details-content">
          <div className="main-text">
            <p>{currentTopicData.mainContent}</p>
          </div>

          <div className="key-points">
            <h3>{t('details.keyPoints')}</h3>
            <ul>
              {currentTopicData.bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="conclusion">
            <p>{currentTopicData.conclusion}</p>
          </div>

          <div className="actions">
            <Link to="/" className="back-button">{t('details.backToHome')}</Link>
            <Link to="/products" className="products-button">{t('details.viewProducts')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;