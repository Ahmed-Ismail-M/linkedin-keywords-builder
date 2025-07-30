import { useLanguage } from '@/contexts/LanguageContext';

export const useTranslation = () => {
  const { t, language, isRTL } = useLanguage();
  
  return {
    t,
    language,
    isRTL,
  };
};