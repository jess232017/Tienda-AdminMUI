import en from './compiled-lang/en.json';
import es from './compiled-lang/es.json';

const location = {
    en,
    es,
    fr: import('@/services/locales/compiled-lang/fr.json'),
    ro: import('@/services/locales/compiled-lang/ro.json'),
    zh: import('@/services/locales/compiled-lang/zh.json'),
};

export default location;
