import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from '@/translations/fr.json';
import en from '@/translations/en.json';

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        supportedLngs: ['en', 'fr'],
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: 'src/translations/{{lng}}.json',
            resources: { fr, en },
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
    });

export default i18n;
