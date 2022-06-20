import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    title: 'Accessibility',
                    dyslexia: {
                        title: 'Dyslexia friendly',
                        description: 'Provides a smoother and easier reading experience tolerable for people with dyslexia.',
                    },
                    darkMode: {
                        title: 'Dark Mode',
                        description: 'Reduces eyestrain caused by looking at the screen for a long time.',
                    },
                    language: {
                        title: 'Language',
                        description: 'Select the language of your preference.',
                    },
                    scale: {
                        title: 'Scale Font',
                        description: 'Increase or reduce the size of the texts displayed on the screen',
                    },
                    option: {
                        title: '',
                        description: '',
                    },
                },
            },
            es: {
                translation: {
                    title: 'Accesibilidad',
                    dyslexia: {
                        title: 'Dislexia amigable',
                        description: 'Brinda una experencia de lectura más fluida y facil, tolerable para personas con dislexia.',
                    },
                    darkMode: {
                        title: 'Modo obscuro',
                        description: 'Reduce la fatiga visual ocasionada por observar por mucho tiempo la pantalla.',
                    },
                    language: {
                        title: 'Idioma',
                        description: 'Seleccione el idioma de su preferencia.',
                    },
                    scale: {
                        title: 'Escalar fuente',
                        description: 'Aumenta o reduce el tamaño de los textos mostrados en pantalla',
                    },
                },
            },
        },
    });

export default i18n;
