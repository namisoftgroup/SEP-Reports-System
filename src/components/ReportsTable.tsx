import { Eye, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomToastFail, CustomToastSuccess } from "./CustomToastSuccess";

interface Report {
  id: string;
  reportNumber: string;
  title: string;
  engineer: string;
  station: string;
  date: string;
  status: "approved" | "pending" | "inReview" | "draft" | "declined";
}

const mockReports: Report[] = [
  {
    id: "1",
    reportNumber: "RPT-2025-001",
    title: "تقرير فحص محطة المحولات الرئيسية",
    engineer: "أحمد محمود",
    station: "محطة الجنوب الرئيسية",
    date: "2025-10-15",
    status: "approved",
  },
  {
    id: "2",
    reportNumber: "RPT-2025-002",
    title: "تقييم المخاطر لمحطة الشمال",
    engineer: "أحمد محمود",
    station: "محطة الشمال",
    date: "2025-10-28",
    status: "inReview",
  },
  {
    id: "3",
    reportNumber: "RPT-2025-003",
    title: "فحص دوري - محطة الشرق",
    engineer: "سارة علي",
    station: "محطة الشرق",
    date: "2025-11-01",
    status: "draft",
  },
  {
    id: "4",
    reportNumber: "RPT-2025-004",
    title: "تقييم مخاطر المحولات - محطة الغرب",
    engineer: "سارة علي",
    station: "محطة الغرب",
    date: "2025-10-25",
    status: "inReview",
  },
];

export const ReportsTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const allReports = localStorage.getItem("allReports");
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  console.log("reports", reports);

  useEffect(() => {
    // Load reports from localStorage
    const allReportsJson = localStorage.getItem("allReports");
    if (allReportsJson) {
      try {
        const allReports = JSON.parse(allReportsJson);

        console.log("allReports table", allReports);

        const mappedReports: Report[] = allReports.map((report) => ({
          id: report.id,
          reportNumber: report.step1.projectCode,
          title: report.step1.projectName,
          engineer: report.step1.owner,
          station: report.step1.substationName || "-",
          date: report.step1.inspectionDate,
          status: report.step1.status || "status",
        }));
        // Combine with mock reports
        setReports([...mappedReports, ...mockReports]);
      } catch (error) {
        console.error("Error loading reports from localStorage:", error);
      }
    }
  }, []);

  const getStatusBadge = (status: Report["status"]) => {
    const variants = {
      approved: {
        variant: "default" as const,
        className: "bg-success text-success-foreground",
      },
      pending: {
        variant: "secondary" as const,
        className: "bg-warning/10 text-warning",
      },
      inReview: {
        variant: "secondary" as const,
        className: "bg-info/10 text-info",
      },
      draft: { variant: "secondary" as const, className: "" },
      declined: { variant: "destructive" as const, className: "" },
    };

    return (
      <Badge
      // variant={variants[status].variant}
      // className={variants[status].className}
      >
        {t(`${status}`)}
      </Badge>
    );
  };

  const handleCancelBtn = () => {
    setShowErrorToast(true);
  };
  const handleAcceptBtn = () => {
    setShowSuccessToast(true);
  };
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("reports.reportNumber")}</TableHead>
            <TableHead>{t("reports.reportTitle")}</TableHead>
            <TableHead>{t("reports.engineer")}</TableHead>
            <TableHead>{t("reports.station")}</TableHead>
            <TableHead>{t("reports.date")}</TableHead>
            <TableHead>{t("reports.status")}</TableHead>
            <TableHead className="text-center">
              {t("reports.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">
                {report.reportNumber}
              </TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.engineer}</TableCell>
              <TableCell>{report.station}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{getStatusBadge(report.status)}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    title={t("common.view")}
                    onClick={() => navigate(`/report/${report.id}`)}
                  >
                    {" "}
                    <Eye className="h-4 w-4" />
                  </Button>
                  {report.status === "inReview" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-success"
                        title={t("common.approve")}
                        onClick={handleAcceptBtn}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        title={t("common.decline")}
                        onClick={handleCancelBtn}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomToastFail
        isVisible={showErrorToast}
        onClose={() => setShowErrorToast(false)}
      />
      <CustomToastSuccess
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </div>
  );
};
