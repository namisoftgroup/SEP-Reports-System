import { FileText, Clock, AlertTriangle, Users } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { useTranslation } from "react-i18next";
import { ChartPieLabelList } from "@/components/statisticsCharts/ChartPieLabelList";
import {
  chartConfig1,
  chartConfig2,
  chartData1,
  chartData2,
} from "@/components/statisticsCharts/ConfigDataForCharts";
import { ChartLineDots } from "@/components/statisticsCharts/ChartLine";
import { ChartColumn } from "@/components/statisticsCharts/ChartColumn";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">
          {t("common.welcome")}, خالد الإداري
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t("statistics.totalReports")}
          value={6}
          icon={FileText}
          variant="default"
        />
        <StatsCard
          title={t("statistics.growthRate")}
          value={`15%`}
          icon={Clock}
          variant="info"
        />
        <StatsCard
          title={t("statistics.criticalIssues")}
          value={`5`}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title={t("statistics.approvalRate")}
          value={`85%`}
          icon={Users}
          variant="success"
        />
      </div>

      {/* Pie Chart  */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border p-8 rounded-xl ">
            <div>
              <h3 className="text-lg font-bold">
                {t("statistics.reportStatus")}
              </h3>
              <p className="text-gray-500">
                {t("statistics.reportStatusDesc")}
              </p>
            </div>
            <div>
              <ChartPieLabelList
                chartConfig={chartConfig1}
                chartData={chartData1}
              />
            </div>
          </div>
          <div className="bg-white border p-8 rounded-xl ">
            <div>
              <h3 className="text-lg font-bold">
                {t("statistics.distributeRisks")}
              </h3>
              <p className="text-gray-500">
                {t("statistics.distributeRisksDesc")}
              </p>
            </div>
            <div>
              <ChartPieLabelList
                chartConfig={chartConfig2}
                chartData={chartData2}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      {/* Line Chart */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 ">
          <div className="bg-white border p-8 rounded-xl ">
            <div>
              <h3 className="text-lg font-bold">
                {t("statistics.monthlyReports")}
              </h3>
              <p className="text-gray-500">
                {t("statistics.monthlyReportsDesc")}{" "}
              </p>
            </div>
            <div>
              <ChartLineDots />
            </div>
          </div>
        </div>
      </div>
      {/* Column Chart */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 ">
          <div className="bg-white border p-8 rounded-xl ">
            <div>
              <h3 className="text-lg font-bold">
                {t("statistics.stationProblems")}
              </h3>
              <p className="text-gray-500">
                {t("statistics.stationProblemsDesc")}{" "}
              </p>
            </div>
            <div>
              <ChartColumn />
            </div>
          </div>
        </div>
      </div>

      {/* work summary */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 ">
          <div className="bg-white border p-8 rounded-xl ">
            <div>
              <h3 className="text-lg font-bold">
                {t("statistics.workSummary")}
              </h3>
              <p className="text-gray-500">{t("statistics.description")} </p>
            </div>
            <div className="grid grid-cols-1 gap-4 py-10">
              <div className="bg-blue-50/40 p-5 rounded-xl flex justify-between items-center">
                <span>2.5 {t("statistics.days")}</span>
                <span>{t("statistics.averageReviewTime")}</span>
              </div>
              <div className="bg-blue-50/40 p-5 rounded-xl flex justify-between items-center">
                <span> 75%</span>
                <span>{t("statistics.firstTimeApprovalRate")}</span>
              </div>
              <div className="bg-blue-50/40 p-5 rounded-xl flex justify-between items-center">
                <span> 3.2</span>
                <span>{t("statistics.averageComponents")}</span>
              </div>
              <div className="bg-blue-50/40 p-5 rounded-xl flex justify-between items-center">
                <span> 4</span>
                <span>{t("statistics.totalComponentsChecked")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
