import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import zh from "./locales/zh.json";
import hi from "./locales/hi.json";
import ar from "./locales/ar.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
  zh: { translation: zh },
  hi: { translation: hi },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const languages = [
  { code: "en", name: "English", flag: "EN" },
  { code: "es", name: "Español", flag: "ES" },
  { code: "zh", name: "中文", flag: "ZH" },
  { code: "hi", name: "हिन्दी", flag: "HI" },
  { code: "ar", name: "العربية", flag: "AR" },
];

export const isRTL = (lang: string) => lang === "ar";
