// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import az from './AZ/az.json';
import en from '.';
import ru from './locales/ru.json';

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
  .use(LanguageDetector) // Detect user's browser language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'az', // Default language if detection fails
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