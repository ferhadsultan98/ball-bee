// src/Pages/BallBeeAdmin/BallBeeAdmin.jsx
import React, { useState, useEffect } from 'react';
import { ref, set, onValue, db } from '../../Firebase/Firebase';
import axios from 'axios';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import './BallBeeAdmin.scss';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Icons for user and logout
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger menu icon

// Gallery Section Component
const GallerySection = ({ formData, handleInputChange, handleImageUpload, removeImage, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Upload Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="image-preview">
        {formData.images.map((img, index) => (
          <div key={index} className="image-container">
            <img src={img} alt={`preview-${index}`} />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="remove-btn"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
    <button type="submit" className="save-btn">Save Changes</button>
  </form>
);

// Products Section Component (Placeholder for now)
const ProductsSection = () => (
  <div className="products-section">
    <h3>Products Management</h3>
    <p>This section will allow you to manage products. (To be implemented)</p>
  </div>
);

const BallBeeAdmin = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    subtitle: '',
    heroTitle: '',
    heroDescription: '',
    phoneNumber: '',
    ctaText: '',
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle
  const navigate = useNavigate();

  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const contentRef = ref(db, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFormData(data);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching content:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryPreset);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          formData
        )
        .then((response) => response.data.secure_url);
    });

    try {
      const newImageUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageUrls],
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload images to Cloudinary');
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contentRef = ref(db, 'content');
      await set(contentRef, formData);
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to update content');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <FaUserCircle className="user-icon" />
          <h3>ADMIN</h3>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="gallery"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setSidebarOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setSidebarOpen(false)}
          >
            Products
          </NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Hamburger Menu for Mobile */}
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </div>

        {/* Dynamic Content Based on Route */}
        <Routes>
          <Route
            path="gallery"
            element={
              <GallerySection
                formData={formData}
                handleInputChange={handleInputChange}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route path="products" element={<ProductsSection />} />
          <Route path="/" element={<GallerySection
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            handleSubmit={handleSubmit}
          />} />
        </Routes>
      </div>
    </div>
  );
};

export default BallBeeAdmin;