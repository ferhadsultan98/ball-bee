import React from "react";
import "./HoneyQuotes.scss";
import { useTranslation } from "react-i18next";

const quoteData = [
  {
    name: "Albert Eynşteyn",
    quote: "Arılar olmasa, balın şirinliyi də olmazdı; onların zəhməti təbiətin ən böyük hədiyyəsidir.",
    avatar: "/path/to/einstein.jpg",
  },
  {
    name: "Emili Dikinson",
    quote: "Bal, arıların çiçəklərlə rəqsinin şirin nəticəsidir; təbiətin poeziyasıdır.",
    avatar: "/path/to/dickinson.jpg",
  },
  {
    name: "Lev Tolstoy",
    quote: "Arının bal yaratmaq üçün göstərdiyi səbr, insanlara həyatda əzmkarlıq dərsi verir.",
    avatar: "/path/to/tolstoy.jpg",
  },
];

const HoneyQuotes = () => {
  const { t } = useTranslation();

  return (
    <div className="quotes-section">
      <h2>{t("home.beeHoneyQuotes")}</h2>
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