import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import FileUploader from "../FileUploader";
import ConditionGrid from "../ConditionGrid";
import { RadioButtonGroup } from "@/components/addNewReportComponents/RadioButtonGroup";

interface DynamicStepsComponentProps {
  stepKey: string;
  sections: string[];
  formData;
  handleInputChange: (sectionKey: string, field: string, value) => void;
  setFilesData: (fn: (prev: any) => any) => void;
  setConditionGridData: (fn: (prev: any) => any) => void;
  openAddModal: () => void;
  translationPrefix: string;
}

export default function DynamicStepsComponent({
  stepKey,
  sections,
  formData,
  handleInputChange,
  setFilesData,
  setConditionGridData,
  openAddModal,
  translationPrefix,
}: DynamicStepsComponentProps) {
  const { t } = useTranslation();

  return (
    <Card className="py-8">
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {sections.map((sectionKey) => (
            <AccordionItem
              key={sectionKey}
              value={sectionKey}
              className="border rounded-lg bg-background px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-bold text-[#0d5c87]">
                    {t(sectionKey)}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-4 p-3">
                {/* Equipment Tag */}
                <div className="space-y-2">
                  <Label>{t(`${translationPrefix}.equipmentTag`)}</Label>
                  <Input
                    value={formData[stepKey]?.[sectionKey]?.equipmentTag || ""}
                    onChange={(e) =>
                      handleInputChange(
                        sectionKey,
                        "equipmentTag",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      `${translationPrefix}.equipmentTagPlaceholder`
                    )}
                  />
                </div>

                {/* Component */}
                <div className="space-y-2">
                  <Label>{t(`${translationPrefix}.component`)}</Label>
                  <Input
                    value={formData[stepKey]?.[sectionKey]?.component || ""}
                    onChange={(e) =>
                      handleInputChange(sectionKey, "component", e.target.value)
                    }
                    placeholder={t(`${translationPrefix}.componentPlaceholder`)}
                  />
                </div>

                {/* Manufacturer */}
                <div className="space-y-2">
                  <Label>{t(`${translationPrefix}.manufacturer`)}</Label>
                  <Input
                    value={formData[stepKey]?.[sectionKey]?.manufacturer || ""}
                    onChange={(e) =>
                      handleInputChange(
                        sectionKey,
                        "manufacturer",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      `${translationPrefix}.manufacturerPlaceholder`
                    )}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>{t(`${translationPrefix}.description`)}</Label>
                  <Textarea
                    value={formData[stepKey]?.[sectionKey]?.description || ""}
                    onChange={(e) =>
                      handleInputChange(
                        sectionKey,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      `${translationPrefix}.descriptionPlaceholder`
                    )}
                  />
                </div>

                {/* Findings Conclusion */}
                <div className="space-y-2">
                  <Label>{t(`${translationPrefix}.findingsConclusion`)}</Label>
                  <Textarea
                    value={
                      formData[stepKey]?.[sectionKey]?.findingsConclusion || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        sectionKey,
                        "findingsConclusion",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Operational Condition & Test Results */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.operationalCondition")}
                    <br />
                  </h3>
                  <div className="grid grid-cols-1  gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`condition-${sectionKey}`}>
                        {t("newReport.primaryGIS.condition")}
                      </Label>
                      <Input
                        id={`condition-${sectionKey}`}
                        value={formData[stepKey]?.[sectionKey]?.condition || ""}
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "condition",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "newReport.primaryGIS.conditionPlaceholder"
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`numOperations-${sectionKey}`}>
                        {t("newReport.primaryGIS.numberOfOperations")}
                      </Label>
                      <Input
                        id={`numOperations-${sectionKey}`}
                        type="number"
                        value={
                          formData[stepKey]?.[sectionKey]?.numOperations || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "numOperations",
                            e.target.value
                          )
                        }
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`ratedValues-${sectionKey}`}>
                        {t("newReport.primaryGIS.ratedValues")}
                      </Label>
                      <Input
                        id={`ratedValues-${sectionKey}`}
                        value={
                          formData[stepKey]?.[sectionKey]?.ratedValues || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "ratedValues",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "newReport.primaryGIS.ratedValuesPlaceholder"
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`thermography-${sectionKey}`}>
                        {t("newReport.primaryGIS.thermography")}
                      </Label>
                      <Input
                        id={`thermography-${sectionKey}`}
                        value={
                          formData[stepKey]?.[sectionKey]?.thermography || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "thermography",
                            e.target.value
                          )
                        }
                        placeholder={t("newReport.primaryGIS.writeHere")}
                      />
                    </div>
                  </div>
                </div>
                {/* Visual Condition */}
                <FileUploader
                  addFileName={t("newReport.primaryGIS.visualCondition")}
                  onFilesChange={(files) =>
                    setFilesData((prev) => ({
                      ...prev,
                      [`${sectionKey}_visualCondition`]: files,
                    }))
                  }
                />

                {/* Maintenance History */}
                <div className="space-y-4 ">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.maintenanceHistory")}
                  </h3>
                  <div className="grid grid-cols-1  gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`maintenanceDate-${sectionKey}`}>
                        {t("newReport.primaryGIS.localMaintenanceDate")}
                      </Label>
                      <Input
                        id={`maintenanceDate-${sectionKey}`}
                        type="date"
                        value={
                          formData[stepKey]?.[sectionKey]?.maintenanceDate || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "maintenanceDate",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`maintenanceType-${sectionKey}`}>
                        {t("newReport.primaryGIS.type")}
                      </Label>
                      <Input
                        id={`maintenanceType-${sectionKey}`}
                        value={
                          formData[stepKey]?.[sectionKey]?.maintenanceType || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "maintenanceType",
                            e.target.value
                          )
                        }
                        placeholder={t("newReport.primaryGIS.typePlaceholder")}
                      />
                    </div>

                    <div className="space-y-2 flex justify-between items-center">
                      <Label>
                        {t("newReport.primaryGIS.sparePartsAvailability")}
                      </Label>
                      <div className="flex gap-4 mt-2">
                        <RadioButtonGroup
                          options={[
                            { label: t("common.yes"), value: "no" },
                            { label: t("common.no"), value: "yes" },
                          ]}
                          value={
                            formData[stepKey]?.[sectionKey]?.spareParts || "no"
                          }
                          onChange={(value) =>
                            handleInputChange(sectionKey, "spareParts", value)
                          }
                          name={`spareParts-${sectionKey}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Results */}
                <h3 className="font-semibold text-lg text-[#0d5c87]">
                  {t(`${translationPrefix}.testResults`)}
                </h3>

                {["SF6Lakeage", "temperature", "oilLevel", "humidity"].map(
                  (item) => (
                    <FileUploader
                      key={item}
                      addFileName={t(`newReport.primaryGIS.${item}`)}
                      onFilesChange={(files) =>
                        setFilesData((prev) => ({
                          ...prev,
                          [`${sectionKey}_${item.replace(/\s+/g, "_")}`]: files,
                        }))
                      }
                    />
                  )
                )}

                {/* Assessment Condition */}
                <div className="space-y-4 ">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.assessmentCondition")}
                  </h3>
                  <div className="grid grid-cols-1  gap-4">
                    {/* assign condition wait.. */}
                    <ConditionGrid
                      onGridChange={(grid) =>
                        setConditionGridData((prev) => ({
                          ...prev,
                          [sectionKey]: grid,
                        }))
                      }
                    />
                    <div className="space-y-2">
                      <Label htmlFor={`assignCondition-${sectionKey}`}>
                        {t("newReport.primaryGIS.condition")}
                      </Label>
                      <Textarea
                        id={`assignCondition-${sectionKey}`}
                        value={
                          formData[stepKey]?.[sectionKey]?.assignCondition || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "assignCondition",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "newReport.primaryGIS.conditionPlaceholder"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Assessment Results */}
                <div className="space-y-4 ">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.assessmentResults")}
                  </h3>
                  <div className="grid grid-cols-1  gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`riskFactor-${sectionKey}`}>
                        {t("newReport.primaryGIS.riskFactor")}
                      </Label>
                      <Textarea
                        value={
                          formData[stepKey]?.[sectionKey]?.riskFactor || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            sectionKey,
                            "riskFactor",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "newReport.primaryGIS.riskFactorPlaceholder"
                        )}
                      />
                    </div>
                    {/* upload document wait.. */}
                    <FileUploader
                      addFileName={t("newReport.primaryGIS.uploadFile")}
                      onFilesChange={(files) => {
                        setFilesData((prev) => ({
                          ...prev,
                          [`${sectionKey}_uploadDocument`]: files,
                        }));
                      }}
                    />
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <Label>{t(`${translationPrefix}.recommendations`)}</Label>
                  <Textarea
                    value={
                      formData[stepKey]?.[sectionKey]?.recommendations || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        sectionKey,
                        "recommendations",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      `${translationPrefix}.recommendationsPlaceholder`
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button variant="secondary" onClick={openAddModal}>
          <Plus /> {t("newReport.primaryGIS.addNewSection")}
        </Button>
      </CardContent>
    </Card>
  );
}
