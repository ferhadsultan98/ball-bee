// BallBeeAdmin.jsx
import React, { useState, useEffect } from "react";
import "./BallBeeAdmin.scss";
import { ref, set, onValue, db } from "../Firebase/Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BallBeeAdmin = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    subtitle: "",
    heroTitle: "",
    heroDescription: "",
    phoneNumber: "",
    ctaText: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cloudinaryPreset = "farhadsultan";
  const cloudinaryCloudName = "dbiltdpxh";

  useEffect(() => {
    const contentRef = ref(db, "content");
    const unsubscribe = onValue(
      contentRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFormData(data);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching content:", error);
        setLoading(false);
      }
    );

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
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryPreset);

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
      console.error("Image upload failed:", error);
      alert("Failed to upload images to Cloudinary");
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
      const contentRef = ref(db, "content");
      await set(contentRef, formData);
      alert("Content updated successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to update content");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Ball-Bee Admin Panel</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
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
          <textarea
            type="text"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleInputChange}
          ></textarea>
          <input />
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

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default BallBeeAdmin;
