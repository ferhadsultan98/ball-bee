
import React from 'react';
import './Products.scss';
import heroImage from '../../assets/honey1.avif';
import honeyJar1 from '../../assets/honey1.avif';
import honeyJar2 from '../../assets/honey1.avif';
import honeyJar3 from '../../assets/honey1.avif';

const products = [
  {
    id: 1,
    image: honeyJar1,
    name: 'Təbii Çiçək Balı',
    description: 'Ən təmiz çiçəklərdən toplanmış, tamamilə təbii və əlavəsiz bal.',
    hashtags: ['#Təbii', '#ÇiçəkBalı', '#Sağlamlıq'],
    price: '15 AZN',
  },
  {
    id: 2,
    image: honeyJar2,
    name: 'Dağ Balı',
    description: 'Dağların təmiz havasında arılar tərəfindən istehsal edilmiş unikal bal.',
    hashtags: ['#DağBalı', '#Təbii', '#Enerji'],
    price: '20 AZN',
  },
  {
    id: 3,
    image: honeyJar3,
    name: 'Qozlu Bal',
    description: 'Təbii balın qozla zənginləşdirilmiş ləzzətli birləşməsi.',
    hashtags: ['#QozluBal', '#Ləzzətli', '#Sağlamlıq'],
    price: '18 AZN',
  }
];

const Products = () => {
  return (
    <div className="products">
      {/* Hero Section */}
      <div className="products-hero">
        <div className="hero-overlay">
          <h1>Our Products</h1>
          <p>Discover the sweetest gifts of nature!</p>
        </div>
        <img src={heroImage} alt="Products Hero" />
      </div>

      {/* Products Section */}
      <div className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-content">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-hashtags">
                    {product.hashtags.map((hashtag, index) => (
                      <span key={index} className="hashtag">{hashtag}</span>
                    ))}
                  </div>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button className="order-button">Place an order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;