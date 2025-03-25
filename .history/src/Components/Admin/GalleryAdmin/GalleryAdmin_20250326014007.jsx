import React, { useState, useEffect } from 'react';
import { ref, set, onValue, db } from '../../../';
import axios from 'axios';

const GalleryAdmin = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '', src: '' });
  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const galleryRef = ref(db, 'gallery');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val() || [];
      setGalleryData(data);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        formData
      );
      setNewItem(prev => ({ ...prev, src: response.data.secure_url }));
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
    await set(ref(db, 'gallery'), updatedGallery);
    setGalleryData(updatedGallery);
    setNewItem({ title: '', description: '', src: '' });
  };

  const handleRemoveItem = async (index) => {
    const updatedGallery = galleryData.filter((_, i) => i !== index);
    await set(ref(db, 'gallery'), updatedGallery);
    setGalleryData(updatedGallery);
  };

  return (
    <div className="gallery-admin">
      <h2>Gallery Management</h2>
      <div className="add-item">
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
        />
        <input type="file" onChange={handleImageUpload} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div className="gallery-list">
        {galleryData.map((item, index) => (
          <div key={index} className="gallery-item">
            <img src={item.src} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;