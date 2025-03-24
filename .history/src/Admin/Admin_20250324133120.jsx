// BallBeeAdmin.jsx
import React, { useState } from 'react';
import './BallBeeAdmin.scss';

const BallBeeAdmin = ({ onSaveContent }) => {
  const [formData, setFormData] = useState({
    brandName: 'Ball-Bee',
    subtitle: 'Pure Natural Honey',
    heroTitle: 'Təbiətin Ürəyindən Şirin Nektar',
    heroDescription: 'Yerli qaynaqlı, xoşbəxt arılardan 100% saf bal',
    phoneNumber: '+994555254193',
    ctaText: 'Sifariş verin',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveContent(formData);
  };

  return (
    <div className="admin-panel">
      <h2>Ball-Bee Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Hero Title</label>
          <input
            type="text"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Hero Description</label>
          <textarea
            name="heroDescription"
            value={formData.heroDescription}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>CTA Text</label>
          <input
            type="text"
            name="ctaText"
            value={formData.ctaText}
            onChange={handleInputChange}
          />
        </div>

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
    </div>
  );
};

export default BallBeeAdmin;