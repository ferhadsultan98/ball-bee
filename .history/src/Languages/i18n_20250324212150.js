// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import az from './AZ/az.json';
import en from './EN/en.json';
import ru from './RU/ru.json';

// Define the resources for each language
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
    supportedLngs: ['az', 'en', 'ru'], // Supported languages
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser language
      caches: ['localStorage'], // Cache the selected language in localStorage
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;