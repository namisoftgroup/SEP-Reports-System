import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('sidebar.settings')}</h1>
      <p className="text-muted-foreground">Settings page coming soon...</p>
    </div>
  );
};

export default Settings;
