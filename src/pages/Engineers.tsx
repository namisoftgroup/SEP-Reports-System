import { FileText, Clock, AlertTriangle, Users } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { ReportsTable } from "@/components/ReportsTable";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EngineerReportTable } from "@/components/EngineerTable";

const Engineers = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">
          Add, edit and manage engineer accounts
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        <StatsCard
          title={`Total Engineers`}
          value={4}
          icon={FileText}
          variant="default"
        />
        <StatsCard
          title={`Active`}
          value={2}
          icon={Clock}
          variant="info"
        />
        <StatsCard
          title={`Inactive`}
          value={2}
          icon={AlertTriangle}
          variant="warning"
        />

      </div>

      {/* Reports Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
             Menu Engineers 
            </h2>
            <p className="text-sm text-muted-foreground">
              manage engineer data Lorem, ipsum dolor.
            </p>
          </div>

        </div>
        <EngineerReportTable />
      </div>
    </div>
  );
};

export default Engineers;
