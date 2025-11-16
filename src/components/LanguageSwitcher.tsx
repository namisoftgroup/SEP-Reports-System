import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="w-full justify-start gap-2"
    >
      <Languages className="h-4 w-4" />
      <span>{language === 'en' ? t('language.english') : t('language.arabic')}</span>
    </Button>
  );
};
