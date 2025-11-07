import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uzTranslation from '../locales/uz/translation.json';
import ruTranslation from '../locales/ru/translation.json';

// Debug uchun
console.log('i18n initialization started');

const resources = {
  uz: {
    translation: uzTranslation
  },
  ru: {
    translation: ruTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: true, // Hozircha true qilib qo'yamiz
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Debug uchun
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
});

export default i18n;