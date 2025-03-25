import React, { useState, useEffect } from "react";
import { ref, onValue, db } from "../../Firebase/Firebase"; // Import Firebase references
import { useTranslation } from "react-i18next";
import HeroSection from "../HeroSection/HeroSection";
import "./Products.scss";

const Products = () => {
  const [products, setProducts] = useState([]); // State to store products
  const { t } = useTranslation();

  useEffect(() => {
    // Fetch products from Firebase on component mount
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(data); // Update products state with data from Firebase
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div className="products">
      <HeroSection
        titleKey="header.products"
        descriptionKey="product.herodesc"
      />

      <div className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-hashtags">
                      {product.hashtags.map((hashtag, index) => (
                        <span key={index} className="hashtag">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                    <div className="product-footer">
                      <span className="product-price">{product.price}₼</span>
                      <button className="order-button">
                        {t("product.order")}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p> // Fallback text when no products are available
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
