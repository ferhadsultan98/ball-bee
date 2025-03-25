// BallBeeAdmin.jsx
import React, { useState, useEffect } from 'react';
import './BallBeeAdmin.scss';
import { ref, set, onValue, db } from '../../Firebase/Firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GalleryAdmin from './GalleryAdmin'; // New component for Gallery section
import ProductsAdmin from './ProductsAdmin'; // New component for Products section

const BallBeeAdmin = () => {
  const [activeSection, setActiveSection] = useState('default');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const contentRef = ref(db, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val() || {};
      setFormData(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching content:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'gallery':
        return <GalleryAdmin />;
      case 'products':
        return <ProductsAdmin />;
      default:
        return <div className="default-content">BallBee Admin Dashboard</div>;
    }
  };

  if (loading) {
    return <div className='loader'></div>;
  }

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-icon">👤</div>
          <h3>ADMIN</h3>
        </div>
        <div className="sidebar-nav">
          <button onClick={() => setActiveSection('gallery')}>Gallery</button>
          <button onClick={() => setActiveSection('products')}>Products</button>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default BallBeeAdmin;