// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Idioma de respaldo si la detección falla
    debug: false, // Habilitar depuración en la consola
    interpolation: {
      escapeValue: false, // React ya se encarga de escapar los valores
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Ruta a los archivos de traducción
    },
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;