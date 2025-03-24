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
        <header>
          <div className="logo">
            <h1>Ball-Bee</h1>
            <p>Pure Natural Honey</p>
          </div>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#order">Order</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        
        <section id="hero">
          <div className="hero-content">
            <h2>Sweet Nectar from Nature's Heart</h2>
            <p>Locally sourced, 100% pure honey from happy bees</p>
            <a href="#order" className="cta-button">Order Now</a>
          </div>
        </section>
        
        <section id="about">
          <h2>Our Story</h2>
          <div className="about-content">
            <div className="text">
              <p>Ball-Bee Honey was founded with a passion for beekeeping and a commitment to providing the purest, most delicious honey. Our bees roam freely through wildflower meadows, clover fields, and pristine forests to bring you nature's sweetest gift.</p>
              <p>Every jar of our honey is carefully harvested and packaged to preserve its natural goodness and unique flavors.</p>
            </div>
          </div>
        </section>
        
        <section id="products">
          <h2>Our Honey Selection</h2>
          <div className="product-grid">
            {honeyProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={`/api/placeholder/300/200`} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <p>Raw and unfiltered, our {product.name.toLowerCase()} captures the essence of the season.</p>
              </div>
            ))}
          </div>
        </section>
        
        <section id="order" className="order-contact">
          <div className="container">
            <div className="order-form">
              <h2>Order Our Honey</h2>
              <form onSubmit={handleSubmit}>
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
            
            <div id="contact" className="contact-info">
              <h2>Contact Us</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="icon email"></i>
                  <p>info@ballbeehoney.com</p>
                </div>
                <div className="contact-item">
                  <i className="icon phone"></i>
                  <p>(555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <i className="icon location"></i>
                  <p>123 Bee Lane, Honey Valley</p>
                </div>
                <div className="social-media">
                  <a href="#" className="social-icon facebook"></a>
                  <a href="#" className="social-icon instagram"></a>
                  <a href="#" className="social-icon twitter"></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <footer>
          <p>&copy; {new Date().getFullYear()} Ball-Bee Honey. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BallBeeHoney;