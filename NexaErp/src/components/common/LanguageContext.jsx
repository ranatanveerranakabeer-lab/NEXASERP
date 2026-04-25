import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const l = (key) => {
    if (!key) return '';
    // Agar string hy to {{}} nikaal dega, warna direct key translate karega
    const cleanKey = typeof key === 'string' ? key.replace(/\{\{|\}\}/g, '').trim() : key;
    return t(cleanKey);
  };

  return (
    <LanguageContext.Provider value={{ l, t, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useAppLanguage = () => useContext(LanguageContext);