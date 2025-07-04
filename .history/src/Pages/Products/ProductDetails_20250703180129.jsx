import React from "react";
import { useTranslation } from "react-i18next";
import "./ProductDetails.scss";

const ProductDetails = ({ product, onClose }) => {
  const { t } = useTranslation();

  const createWhatsAppLink = (productName) => {
    const phoneNumber = "+994503007430";
    const message = `Salam, ${productName} sifariş etmək istəyirəm.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="product-details-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            <div className="modal-hashtags">
              {product.hashtags.map((hashtag, index) => (
                <span key={index} className="hashtag">
                  {hashtag}
                </span>
              ))}
            </div>
            <div className="modal-footer">
              <span className="modal-price">{product.price}₼</span>
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
  );
};

export default ProductDetails;