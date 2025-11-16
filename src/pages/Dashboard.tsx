import { FileText, Clock, AlertTriangle, Users } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { ReportsTable } from '@/components/ReportsTable';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('common.welcome')}, خالد الإداري</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('dashboard.totalReports')}
          value={4}
          icon={FileText}
          variant="default"
        />
        <StatsCard
          title={t('dashboard.pendingReview')}
          value={2}
          icon={Clock}
          variant="info"
        />
        <StatsCard
          title={t('dashboard.highRisk')}
          value={2}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title={t('dashboard.activeEngineers')}
          value={2}
          icon={Users}
          variant="success"
        />
      </div>

      {/* Reports Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{t('dashboard.recentReports')}</h2>
            <p className="text-sm text-muted-foreground">{t('dashboard.reportsAwaitingReview')}</p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.allReports')}</SelectItem>
              <SelectItem value="pending">{t('reports.statuses.pending')}</SelectItem>
              <SelectItem value="approved">{t('reports.statuses.approved')}</SelectItem>
              <SelectItem value="declined">{t('reports.statuses.declined')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ReportsTable />
      </div>
    </div>
  );
};

export default Dashboard;
