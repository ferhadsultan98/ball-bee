// src/Components/Admin/BallBeeAdmin.jsx
import React, { useState, useEffect } from 'react';
import './BallBeeAdmin.scss';
import { ref, set, onValue, db } from '../../Firebase/Firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GalleryAdmin from './GalleryAdmin/GalleryAdmin';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';
import BlogAdmin from './BlogAdmin/BlogAdmin';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import logo from '../../assets/ballbeelogo.png';
import IPDashAdmin from './IPDashAdmin/IPDashAdmin';

const BallBeeAdmin = () => {
  const [activeSection, setActiveSection] = useState('default');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'gallery':
        return <GalleryAdmin />;
      case 'products':
        return <ProductsAdmin />;
      case 'blog':
        return <BlogAdmin />;
      case 'ip':
        return <IPDashAdmin/>; // Add IP Dashboard case
      default:
        return (
          <div className="default-content">
            BallBee Admin
            <img src={logo} alt="Logo" />
          </div>
        );
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="admin-container">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <GiHamburgerMenu />}
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-icon">👤</div>
          <h3>ADMIN</h3>
        </div>
        <div className="sidebar-nav">
          <button onClick={() => handleNavClick('gallery')}>Qalareya</button>
          <button onClick={() => handleNavClick('products')}>Məhsullar</button>
          <button onClick={() => handleNavClick('blog')}>Blog</button>
          <button onClick={() => handleNavClick('ip')}>IP Dashboard</button> {/* Add IP Dashboard button */}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default BallBeeAdmin;