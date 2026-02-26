import en from './lang/en.json';
import es from './lang/es.json';

const languages = { en, es };
let currentLang = localStorage.getItem("lang") || "en";
let translations = languages[currentLang];

export function loadTranslations(lang) {
    if (languages[lang]) {
        translations = languages[lang];
        currentLang = lang;
        localStorage.setItem("lang", lang);
    }
}

export function translateDOM() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = translations[key] || key;
    });
}

export function getCurrentLang() {
    return currentLang;
}
