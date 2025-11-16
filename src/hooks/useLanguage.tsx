import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return {
    language: i18n.language,
    isRTL,
    toggleLanguage,
  };
};
