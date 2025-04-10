import React from "react";
import "./Products.scss";
import honeyJar1 from "../../assets/honey1.avif";
import honeyJar2 from "../../assets/honey1.avif";
import honeyJar3 from "../../assets/honey1.avif";
import { useTranslation } from "react-i18next";
import HeroSection from "../HeroSection/HeroSection";

const products = [
  {
    id: 1,
    image: honeyJar1,
    name: "Təbii Çiçək Balı",
    description:
      "Ən təmiz çiçəklərdən toplanmış, tamamilə təbii və əlavəsiz bal.",
    hashtags: ["#Təbii", "#ÇiçəkBalı", "#Sağlamlıq"],
    price: "15 ₼",
  },
  {
    id: 2,
    image: honeyJar2,
    name: "Dağ Balı",
    description:
      "Dağların təmiz havasında arılar tərəfindən istehsal edilmiş unikal bal.",
    hashtags: ["#DağBalı", "#Təbii", "#Enerji"],
    price: "20 ₼",
  },
  {
    id: 3,
    image: honeyJar3,
    name: "Qozlu Bal",
    description: "Təbii balın qozla zənginləşdirilmiş ləzzətli birləşməsi.",
    hashtags: ["#QozluBal", "#Ləzzətli", "#Sağlamlıq"],
    price: "18 ₼",
  },
];

const Products = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="products">
      <HeroSection
        titleKey="header.products"
        descriptionKey="product.herodesc"
      />

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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
