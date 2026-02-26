import { loadTranslations, translateDOM, getCurrentLang } from "./i18n.js";
import './style.css';

loadTranslations(getCurrentLang());
translateDOM();

// 2. Control del Botón de idioma
const langBtn = document.getElementById("lang-toggle");

if (langBtn) {
  langBtn.addEventListener("click", () => {
    const newLang = getCurrentLang() === "en" ? "es" : "en";
    loadTranslations(newLang);
    translateDOM();
  });
}
