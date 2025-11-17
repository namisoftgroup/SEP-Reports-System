import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

const StepEightComponent = ({ formData, handleInputChange }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 ">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label className="text-[#0d5c87] text-lg p-2" htmlFor={`descStepEight`}>{t("Description")}</Label>
          <Textarea
            id={`descStepEight`}
            value={formData.step8?.descriptionField}
            onChange={(e) =>
              handleInputChange("step8", "descriptionField", e.target.value)
            }
            placeholder={t("newReport.primaryGIS.descriptionPlaceholder")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepEightComponent;
