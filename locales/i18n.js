import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Utils from '../services/Utils';
import en from './en.yml';
import fr from './fr.yml';
import de from './de.yml';

const resources = {
    en: { translations: Utils.dotify(en) },
    fr: { translations: Utils.dotify(fr) },
    de: { translations: Utils.dotify(de) }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: resources,
        fallbackLng: 'fr',
        debug: false,

        supportedLngs: ['fr', 'en', 'de'],

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;
