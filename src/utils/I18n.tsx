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
    supportedLngs: ['ar','bn','de','en','es','fr','hi','ja','pt','ru','ur','zh'],
    fallbackLng: 'en', // Idioma de respaldo si la detección falla
    debug: true, // Habilitar depuración en la consola
    interpolation: {
      escapeValue: false, // React ya se encarga de escapar los valores
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Ruta a los archivos de traducción
    },
    detection: {
      order: [
        'navigator'
      ],
      caches: ['localStorage'],
    },
  });

export default i18n;