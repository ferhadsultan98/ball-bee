// src/Pages/BallBeeAdmin/BallBeeAdmin.jsx
import React, { useState, useEffect } from 'react';
import './BallBeeAdmin.scss';
import { ref, set, onValue, db } from '../../Firebase/Firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GalleryAdmin from './GalleryAdmin/GalleryAdmin';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger menu icon
import { FaTimes } from 'react-icons/fa'; // Close icon for sidebar

const BallBeeAdmin = () => {
  const [activeSection, setActiveSection] = useState('default');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
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

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on nav click in mobile view
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
    return <div className="loader"></div>;
  }

  return (
    <div className="admin-container">
      {/* Hamburger Menu for Mobile */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <GiHamburgerMenu />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-icon">👤</div>
          <h3>ADMIN</h3>
        </div>
        <div className="sidebar-nav">
          <button onClick={() => handleNavClick('gallery')}>Gallery</button>
          <button onClick={() => handleNavClick('products')}>Products</button>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default BallBeeAdmin;