import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue, db } from "../../Firebase/Firebase";
import { useTranslation } from "react-i18next";
import HeroSection from "../HeroSection/HeroSection";
import "./ProductDetails.scss";
import Loading from '../../Components/Loading/BeeLoader';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productRef = ref(db, `products/${productId}`);
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProduct({ id: productId, ...data });
      } else {
        navigate("/products");
      }
    });

    return () => unsubscribe();
  }, [productId, navigate]);

  const createWhatsAppLink = (productName) => {
    const phoneNumber = "+994503007430";
    const message = `Salam, ${productName} sifariş etmək istəyirəm.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  if (!product) {
    return <div><Loading /></div>;
  }

  return (
    <div className="product-details">
      <HeroSection
        titleKey="productDetails.header"
        descriptionKey="product.detailsDesc"
      />
      <div className="product-details-section">
        <div className="product-details-container">
          <button className="back-button" onClick={() => navigate("/products")}>
            {t("product.back")}
          </button>
          <div className="product-details-content">
            <div className="product-details-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details-info">
              <h2>{product.name}</h2>
              <p className="product-details-description">{product.description}</p>
              <p className="product-details-details">{product.details}</p> {/* New field */}
              <div className="product-details-hashtags">
                {product.hashtags.map((hashtag, index) => (
                  <span key={index} className="hashtag">
                    {hashtag}
                  </span>
                ))}
              </div>
              <div className="product-details-footer">
                <span className="product-details-price">{product.price}₼</span>
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
      </div>
    </div>
  );
};

export default ProductDetails;