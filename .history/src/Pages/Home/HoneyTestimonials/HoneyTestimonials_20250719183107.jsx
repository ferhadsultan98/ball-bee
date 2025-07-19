import React from "react";
import "./HoneyTestimonials.scss";
import { useTranslation } from "react-i18next";

const quoteData = [
  {
    name: "Albert Eynşteyn",
    quote: "Əgər arılar yer üzündən yoxa çıxsalar, insan oğlu cəmi dörd il yaşaya bilər.",
    avatar: "/path/to/einstein.jpg",
  },
  {
    name: "Emili Dikinson",
    quote: "Gözəl çiçəklər məni utandırır, kaş ki, mən də arı olaydım.",
    avatar: "/path/to/dickinson.jpg",
  },
  {
    name: "Lev Tolstoy",
    quote: "İnsanlara sevgi olmadan yaxınlaşmaq, arılara ehtiyat olmadan yaxınlaşmaqdan fərqlənmir.",
    avatar: "/path/to/tolstoy.jpg",
  },
];

const HoneyQuotes = () => {
  const { t } = useTranslation();

  return (
    <div className="quotes-section">
      <h2>{t("home.beeQuotes")}</h2>
      <div className="quote-cards">
        {quoteData.map((quote, index) => (
          <div key={index} className="quote-card">
            <img src={quote.avatar} alt={quote.name} className="avatar" />
            <div className="quote-content">
              <p className="quote-text">"{quote.quote}"</p>
              <h4 className="author-name">{quote.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoneyQuotes;