"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Language, LanguageContextType } from "../types/languge";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation dictionary
const translations = {
  en: {
     howToUseThis: "How to Use This!",
  mustHaveSkills: "Must-Have Skills",
  mustHaveSkillsDesc: "These skills are in ALL your job results!",
  niceToHaveExtras: "Nice-to-Have Extras", 
  niceToHaveExtrasDesc: "Some of these extras might show up!",
  notInterested: "Not Interested",
  notInterestedDesc: "These won't appear in your job results!",

    // Language switcher
    language: "Language",
    english: "English",
    arabic: "العربية",

    // Common
    welcome: "Welcome",
    loading: "Loading...",
    error: "An error occurred",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
  },
  ar: {
    howToUseThis: "كيفية استخدام هذا!",
    mustHaveSkills: "المهارات الأساسية",
    mustHaveSkillsDesc: "هذه المهارات موجودة في جميع نتائج وظائفك!",
    niceToHaveExtras: "إضافات مرغوبة",
    niceToHaveExtrasDesc: "قد تظهر بعض هذه الإضافات!",
    notInterested: "غير مهتم",
    notInterestedDesc: "هذه لن تظهر في نتائج وظائفك!",

    // Language switcher
    language: "اللغة",
    english: "English",
    arabic: "العربية",

    // Common
    welcome: "مرحباً",
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    save: "حفظ",
    cancel: "إلغاء",
    submit: "إرسال",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update document direction and save to localStorage when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  const isRTL = language === "ar";

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
