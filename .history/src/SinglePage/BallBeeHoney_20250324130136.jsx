import React, { useState, useEffect } from 'react';
import './styles.scss';

const BallBeeHoney = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeyType: 'wildflower',
    quantity: 1
  });
  
  // Sample honey product data
  const honeyProducts = [
    { id: 'wildflower', name: 'Wildflower Honey', price: 12.99 },
    { id: 'clover', name: 'Clover Honey', price: 10.99 },
    { id: 'buckwheat', name: 'Buckwheat Honey', price: 14.99 },
    { id: 'orange-blossom', name: 'Orange Blossom Honey', price: 15.99 }
  ];
  
  // Background slideshow images (replace with your honey photos)
  const backgroundImages = [
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080'
  ];
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    alert('Thank you for your order! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      honeyType: 'wildflower',
      quantity: 1
    });
  };
  
  // Auto-rotate slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="ball-bee">
      {/* Background Slideshow */}
      <div className="background-slideshow">
        {backgroundImages.map((img, index) => (
          <div 
            key={index} 
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      
      {/* Content Overlay */}
      <div className="content">
        <div className="logo-container">
          <div className="logo">
            <h1>Ball-Bee</h1>
            <p>Pure Natural Honey</p>
          </div>
        </div>
        
        <div className="order-container">
          <div className="order-content">
            <h2>Sweet Nectar from Nature's Heart</h2>
            <p>Locally sourced, 100% pure honey from happy bees</p>
            
            <form onSubmit={handleSubmit} className="order-form">
              <h3>Order Now</h3>
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="honeyType">Honey Type</label>
                <select 
                  id="honeyType" 
                  name="honeyType" 
                  value={formData.honeyType} 
                  onChange={handleInputChange}
                >
                  {honeyProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (${product.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input 
                  type="number" 
                  id="quantity" 
                  name="quantity" 
                  min="1" 
                  value={formData.quantity} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Special Instructions</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  rows="3"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BallBeeHoney;