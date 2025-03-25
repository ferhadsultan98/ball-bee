// src/Pages/BallBeeAdmin/GalleryAdmin/GalleryAdmin.jsx
import React, { useState, useEffect } from 'react';
import { ref, set, onValue, db } from '../../../Firebase/Firebase';
import axios from 'axios';
import './GalleryAdmin.scss';

const GalleryAdmin = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '', src: '' });
  const [editIndex, setEditIndex] = useState(null); // Track which item is being edited
  const [editItem, setEditItem] = useState({ title: '', description: '', src: '' }); // Store the item being edited
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

  const handleImageUpload = async (e, isEdit = false) => {
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
      if (isEdit) {
        setEditItem((prev) => ({ ...prev, src: imageUrl }));
      } else {
        setNewItem((prev) => ({ ...prev, src: imageUrl }));
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.description || !newItem.src) {
      alert('Please fill all fields');
      return;
    }
    const updatedGallery = [...galleryData, { ...newItem, likes: 0 }];
    try {
      await set(ref(db, 'gallery'), updatedGallery);
      setGalleryData(updatedGallery);
      setNewItem({ title: '', description: '', src: '' });
    } catch (error) {
      console.error('Error adding gallery item:', error);
      alert('Failed to add gallery item');
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditItem({ ...galleryData[index] });
  };

  const handleSaveEdit = async () => {
    if (!editItem.title || !editItem.description || !editItem.src) {
      alert('Please fill all fields');
      return;
    }
    const updatedGallery = [...galleryData];
    updatedGallery[editIndex] = { ...editItem, likes: updatedGallery[editIndex].likes };
    try {
      await set(ref(db, 'gallery'), updatedGallery);
      setGalleryData(updatedGallery);
      setEditIndex(null);
      setEditItem({ title: '', description: '', src: '' });
    } catch (error) {
      console.error('Error updating gallery item:', error);
      alert('Failed to update gallery item');
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditItem({ title: '', description: '', src: '' });
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

      {/* Add Item Form */}
      <div className="add-item">
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
        />
        <input type="file" onChange={(e) => handleImageUpload(e, false)} />
        {newItem.src && (
          <div className="image-preview">
            <img src={newItem.src} alt="Preview" />
          </div>
        )}
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Edit Item Form (shown when editing) */}
      {editIndex !== null && (
        <div className="edit-item">
          <h3>Edit Item</h3>
          <input
            type="text"
            placeholder="Title"
            value={editItem.title}
            onChange={(e) => setEditItem((prev) => ({ ...prev, title: e.target.value }))}
          />
          <textarea
            placeholder="Description"
            value={editItem.description}
            onChange={(e) => setEditItem((prev) => ({ ...prev, description: e.target.value }))}
          />
          <input type="file" onChange={(e) => handleImageUpload(e, true)} />
          {editItem.src && (
            <div className="image-preview">
              <img src={editItem.src} alt="Preview" />
            </div>
          )}
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}

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