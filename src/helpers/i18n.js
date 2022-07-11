import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// import { appName } from "../Service/http";

// // файлы языков
import translationRU from "../locales/ru/trans.json";
import translationEN from "../locales/en/trans.json";

const resources = {
  // cm - namepsace, https://www.i18next.com/principles/namespaces
  ru: {
    cm: translationRU,
  },
  en: {
    cm: translationEN,
  },
};

i18n
  // Подключение бэкенда i18next
  .use(Backend)
  // Автоматическое определение языка
  .use(LanguageDetector)
  // модуль инициализации
  .use(initReactI18next)
  .init({
    resources,
    // backend: {
    //   // for all available options read the backend's repository readme file
    //   loadPath:
    //     process.env.NODE_ENV !== "production"
    //       ? `/Locales/{{lng}}/{{ns}}.json`
    //       : `${appName}/public/Locales/{{lng}}/{{ns}}.json`,
    // },
    // Стандартный язык
    fallbackLng: "ru",
    debug: false,
    ns: ["cm"],
    defaultNS: "cm",
    // Распознавание и кэширование языковых кук
    detection: {
      order: ["querystring", "cookie", "localStorage"],
      cache: ["cookie", "localStorage"],
      lookupQuerystring: "lang",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
