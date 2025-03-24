// src/Pages/Products/Products.jsx
import React from 'react';
import './Products.scss';

// Sample product images (replace with your own)
import honeyJar1 from '../../';
import honeyJar2 from '../../assets/honey-jar2.jpg';
import honeyJar3 from '../../assets/honey-jar3.jpg';
import honeyJar4 from '../../assets/honey-jar4.jpg';

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
  },
  {
    id: 4,
    image: honeyJar4,
    name: 'Limonlu Bal',
    description: 'Limon ətri ilə zənginləşdirilmiş təbii bal, immunitet üçün əla seçim.',
    hashtags: ['#LimonluBal', '#İmmunitet', '#Təbii'],
    price: '17 AZN',
  },
];

const Products = () => {
  return (
    <div className="products">
      <div className="products-container">
        <h1 className="products-title">Məhsullarımız</h1>
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
                  <button className="order-button">Sifariş Ver</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;