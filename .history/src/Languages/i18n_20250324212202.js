import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


import az from './AZ/az.json';
import en from './EN/en.json';
import ru from './RU/ru.json';


const resources = {
  az: {
    translation: az,
  },
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: 'az', 
    supportedLngs: ['az', 'en', 'ru'], 
    detection: {
      order: ['localStorage', 'navigator'], 
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;