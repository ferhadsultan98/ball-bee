// src/Pages/BallBeeAdmin/GalleryAdmin/GalleryAdmin.jsx
import React, { useState, useEffect } from 'react';
import { ref, set, onValue, db } from '../../../Firebase/Firebase';
import axios from 'axios';
import './GalleryAdmin.scss';

const GalleryAdmin = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [formItem, setFormItem] = useState({ title: '', description: '', src: '' }); // Unified state for form
  const [editIndex, setEditIndex] = useState(null); // Track which item is being edited (null for add mode)
  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const galleryRef = ref(db, 'gallery');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val() || [];
      setGalleryData(data);
    }, (error) => {
      console.error('Error fetching gallery data:', error);
      alert('Failed to fetch gallery data');
    });
    return () => unsubscribe();
  }, []);

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
      const imageUrl = response.data.secure_url;
      setFormItem((prev) => ({ ...prev, src: imageUrl }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    }
  };

  const handleAddOrSaveItem = async () => {
    if (!formItem.title || !formItem.description || !formItem.src) {
      alert('Please fill all fields');
      return;
    }

    let updatedGallery;
    if (editIndex !== null) {
      // Edit mode: Update the existing item
      updatedGallery = [...galleryData];
      updatedGallery[editIndex] = { ...formItem, likes: updatedGallery[editIndex].likes };
    } else {
      // Add mode: Add a new item
      updatedGallery = [...galleryData, { ...formItem, likes: 0 }];
    }

    try {
      await set(ref(db, 'gallery'), updatedGallery);
      setGalleryData(updatedGallery);
      setFormItem({ title: '', description: '', src: '' }); // Reset form
      setEditIndex(null); // Exit edit mode
    } catch (error) {
      console.error(`Error ${editIndex !== null ? 'updating' : 'adding'} gallery item:`, error);
      alert(`Failed to ${editIndex !== null ? 'update' : 'add'} gallery item`);
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setFormItem({ ...galleryData[index] }); // Pre-fill form with the selected item's data
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormItem({ title: '', description: '', src: '' }); // Reset form
  };

  const handleRemoveItem = async (index) => {
    const updatedGallery = galleryData.filter((_, i) => i !== index);
    try {
      await set(ref(db, 'gallery'), updatedGallery);
      setGalleryData(updatedGallery);
    } catch (error) {
      console.error('Error removing gallery item:', error);
      alert('Failed to remove gallery item');
    }
  };

  return (
    <div className="gallery-admin">
      <h2>Gallery Management</h2>

      {/* Unified Form for Add/Edit */}
      <div className="form-section">
        <h3>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</h3>
        <input
          type="text"
          placeholder="Title"
          value={formItem.title}
          onChange={(e) => setFormItem((prev) => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Description"
          value={formItem.description}
          onChange={(e) => setFormItem((prev) => ({ ...prev, description: e.target.value }))}
        />
        <input type="file" onChange={handleImageUpload} />
        {formItem.src && (
          <div className="image-preview">
            <img src={formItem.src} alt="Preview" />
          </div>
        )}
        <div className="form-buttons">
          <button className="action-btn" onClick={handleAddOrSaveItem}>
            {editIndex !== null ? 'Save' : 'Add Item'}
          </button>
          {editIndex !== null && (
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Gallery List as Cards */}
      <div className="gallery-list">
        {galleryData.length === 0 ? (
          <p>No gallery items available.</p>
        ) : (
          galleryData.map((item, index) => (
            <div key={index} className="gallery-card">
              <img src={item.src} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-buttons">
                  <button className="edit-btn" onClick={() => handleEditItem(index)}>
                    Edit
                  </button>
                  <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;