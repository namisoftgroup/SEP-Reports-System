import { useTranslation } from 'react-i18next';

const Statistics = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('sidebar.statistics')}</h1>
      <p className="text-muted-foreground">Statistics and analytics page coming soon...</p>
    </div>
  );
};

export default Statistics;
