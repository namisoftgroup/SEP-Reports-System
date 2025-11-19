import { ReportsTable } from '@/components/ReportsTable';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MyReports = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('reports.allReports')}</h1>
          <p className="text-muted-foreground">{t('dashboard.reportsAwaitingReview')}</p>
        </div>
        <Button onClick={() => navigate('/new-report')} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          {t('reports.createNewReport')}
        </Button>
      </div>

      <ReportsTable />
    </div>
  );
};

export default MyReports;
