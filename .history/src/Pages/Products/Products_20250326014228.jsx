import React, { useState, useEffect } from 'react';
import './Products.scss';
import { useTranslation } from 'react-i18next';
import { ref, onValue, db } from '../../Firebase/Firebase';
import HeroSection from '../HeroSection/HeroSection';
import Loading from '../../Components/Loading/Loading';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Fetch products from Firebase
  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Assuming Firebase stores products as an array
        setProducts(data);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="products">
      <HeroSection
        titleKey="header.products"
        descriptionKey="product.herodesc"
      />

      <div className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-hashtags">
                      {product.hashtags.map((hashtag, idx) => (
                        <span key={idx} className="hashtag">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      <button className="order-button">
                        {t("product.order")}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;