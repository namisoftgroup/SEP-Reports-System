import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Alert, AlertDescription } from "../../ui/alert";
import { Lightbulb } from "lucide-react";

const StepOneComponent = ({handleInputChange , formData }) => {
    const {t} = useTranslation()
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="mb-2">{t("newReport.projectInfo.title")}</CardTitle>
            <CardDescription>
              {t("newReport.projectInfo.subtitle")}
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground border py-1 px-4 rounded-xl">
            {t("newReport.projectInfo.reportNumber")}:{" "}
            <span className="font-semibold">RPT-2025-111</span>
          </div>{" "}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1  gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">
              {t("newReport.projectInfo.projectName")}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              className="bg-background"
              id="projectName"
              value={formData.step1?.projectName || ""}
              onChange={(e) =>
                handleInputChange("step1", "projectName", e.target.value)
              }
              placeholder={t("newReport.projectInfo.projectNamePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="substationName">
              {t("newReport.projectInfo.substationName")}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              className="bg-background"
              id="substationName"
              value={formData.step1?.substationName || ""}
              onChange={(e) =>
                handleInputChange("step1", "substationName", e.target.value)
              }
              placeholder={t("newReport.projectInfo.substationNamePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectCode">
              {t("newReport.projectInfo.projectCode")}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              className="bg-background"
              id="projectCode"
              value={formData.step1?.projectCode || ""}
              onChange={(e) =>
                handleInputChange("step1", "projectCode", e.target.value)
              }
              placeholder={t("newReport.projectInfo.projectCodePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">{t("newReport.projectInfo.owner")}</Label>
            <Input
              className="bg-background"
              id="owner"
              value={formData.step1?.owner || ""}
              onChange={(e) =>
                handleInputChange("step1", "owner", e.target.value)
              }
              placeholder={t("newReport.projectInfo.ownerPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="operationArea">
              {t("newReport.projectInfo.operationArea")}
            </Label>
            <Input
              className="bg-background"
              id="operationArea"
              value={formData.step1?.operationArea || ""}
              onChange={(e) =>
                handleInputChange("step1", "operationArea", e.target.value)
              }
              placeholder={t("newReport.projectInfo.operationAreaPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspectionDate">
              {t("newReport.projectInfo.inspectionDate")}
            </Label>
            <Input
              className="bg-background"
              id="inspectionDate"
              type="date"
              value={formData.step1?.inspectionDate || "2025-11-12"}
              onChange={(e) =>
                handleInputChange("step1", "inspectionDate", e.target.value)
              }
            />
          </div>
        </div>

        <Alert variant="info">
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            {t("newReport.projectInfo.infoMessage")}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default StepOneComponent;
