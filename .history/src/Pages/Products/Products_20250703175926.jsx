import React, { useState, useEffect } from "react";
import { ref, onValue, db } from "../../Firebase/Firebase";
import { useTranslation } from "react-i18next";
import HeroSection from "../HeroSection/HeroSection";
import ProductDetails from "./ProductDetails/ProductDetails";
import "./Products.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const createWhatsAppLink = (productName) => {
    const phoneNumber = "+994503007430";
    const message = `Salam, ${productName} sifariş etmək istəyirəm.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

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
                      <div className="product-buttons">
                        <button
                          onClick={() => openDetails(product)}
                          className="details-button"
                        >
                          {t("product.details")}
                        </button>
                        <a
                          href={createWhatsAppLink(product.name)}
                          className="order-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("product.order")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">{t("common.noproduct")}</p>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={closeDetails} />
      )}
    </div>
  );
};

export default Products;