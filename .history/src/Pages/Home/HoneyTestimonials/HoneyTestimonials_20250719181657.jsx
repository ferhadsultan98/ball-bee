import React from "react";
import "./HoneyTestimonials.scss";
import { useTranslation } from "react-i18next";
import ManIcon from "../../";
import WomanIcon from "../../assets/woman.png";

const testimonialData = [
  {
    name: "Səbinə AXUNDOVA",
    feedback:
      "Bu bal çox gözəldir! Mənim sağlamlığım və rifahım çox yaxşılaşdı. Ən yüksək tövsiyə edirəm!",
    avatar: WomanIcon,
  },
  {
    name: "Fərhad SULTANOV",
    feedback:
      "Balın keyfiyyəti inanılmazdır, xidmət isə fantastikdir. İndi daimi müştərinizəm.",
    avatar: ManIcon,
  },
  {
    name: "Hacıəmi ZEYNALOV",
    feedback:
      "Bu balın tarixi və təmizliyi məni çox cəlb edir. O, çox dadlıdır və sağlam həyat tərzimi dəstəkləyir.",
    avatar: ManIcon,
  },
];

const HoneyTestimonials = () => {
  const { t } = useTranslation();

  return (
    <div className="testimonials">
      <h2>{t("home.customerReviews")}</h2>
      <div className="testimonial-cards">
        {testimonialData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="avatar"
            />
            <div className="testimonial-content">
              <p className="feedback">"{testimonial.feedback}"</p>
              <h4 className="customer-name">{testimonial.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoneyTestimonials;