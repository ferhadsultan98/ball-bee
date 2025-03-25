// src/Pages/BallBeeAdmin/BallBeeAdmin.jsx
import React, { useState, useEffect } from 'react';
import { ref, set, onValue, db } from '../../Firebase/Firebase';
import axios from 'axios';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import './BallBeeAdmin.scss';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

// Gallery Section Component
const GallerySection = ({ galleryData, setGalleryData, handleSubmit }) => {
  const [newItem, setNewItem] = useState({
    src: '',
    title: '',
    description: '',
    likes: 0,
  });

  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );
      setNewItem((prev) => ({
        ...prev,
        src: response.data.secure_url,
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image to Cloudinary. Please try again.');
    }
  };

  const addGalleryItem = () => {
    if (!newItem.src || !newItem.title || !newItem.description) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    setGalleryData((prev) => [...prev, { ...newItem, likes: 0 }]);
    setNewItem({ src: '', title: '', description: '', likes: 0 });
  };

  const removeGalleryItem = (index) => {
    setGalleryData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="gallery-section">
      <h3>Manage Gallery</h3>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={newItem.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {newItem.src && (
          <div className="image-preview new-item-preview">
            <img src={newItem.src} alt="New item preview" />
          </div>
        )}
      </div>
      <button type="button" className="add-btn" onClick={addGalleryItem}>
        Add Item
      </button>
      <div className="image-preview">
        {galleryData.map((item, index) => (
          <div key={index} className="image-container">
            <img src={item.src} alt={item.title} />
            <div className="item-details">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
            <button
              type="button"
              onClick={() => removeGalleryItem(index)}
              className="remove-btn"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="save-btn" onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
};

// Products Section Component (Placeholder)
const ProductsSection = () => (
  <div className="products-section">
    <h3>Products Management</h3>
    <p>This section will allow you to manage products. (To be implemented)</p>
  </div>
);

const BallBeeAdmin = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const galleryRef = ref(db, 'gallery');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Fetched gallery data from Firebase:', data); // Debug log
      if (data) {
        setGalleryData(data);
      } else {
        setGalleryData([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching gallery data:', error);
      alert('Failed to fetch gallery data from Firebase.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    try {
      const galleryRef = ref(db, 'gallery');
      console.log('Saving gallery data to Firebase:', galleryData); // Debug log
      await set(galleryRef, galleryData);
      alert('Gallery updated successfully!');
    } catch (error) {
      console.error('Error saving gallery data:', error);
      alert(`Failed to update gallery: ${error.message}`);
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
    return <div className="loader">Loading...</div>;
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
            to="/admin/gallery"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setSidebarOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/admin/products"
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
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </div>
        <Routes>
          <Route
            path="/gallery"
            element={
              <GallerySection
                galleryData={galleryData}
                setGalleryData={setGalleryData}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route path="/products" element={<ProductsSection />} />
          <Route
            path="/"
            element={
              <GallerySection
                galleryData={galleryData}
                setGalleryData={setGalleryData}
                handleSubmit={handleSubmit}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default BallBeeAdmin;