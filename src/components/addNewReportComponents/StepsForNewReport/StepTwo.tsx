import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "../FileUploader";
import { RadioButtonGroup } from "@/components/addNewReportComponents/RadioButtonGroup";
import ConditionGrid from "../ConditionGrid";
import { useTranslation } from "react-i18next";

const DynamicSteps = ({
  stepNumber,
  sectionsStepTwo,
  formData,
  handleStep2InputChange,
  setFilesData,
  setConditionGridData,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  return (
    <Card className="py-8">
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-2 ">
          {sectionsStepTwo.map((type) => (
            <AccordionItem
              key={type}
              value={type}
              className="border rounded-lg bg-background px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-bold text-[#0d5c87]">
                    {/* {t(`newReport.primaryGIS.${type}`)} */}
                    {t(`${type}`)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 p-3">
                <div className="space-y-2">
                  <Label htmlFor={`equipmentTag-${type}`}>
                    {t("newReport.primaryGIS.equipmentTag")}
                  </Label>
                  <Input
                    id={`equipmentTag-${type}`}
                    value={formData.step2[type]?.equipmentTag || ""}
                    onChange={(e) =>
                      handleStep2InputChange(
                        type,
                        "equipmentTag",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "newReport.primaryGIS.equipmentTagPlaceholder"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`component-${type}`}>
                    {t("newReport.primaryGIS.component")}
                  </Label>
                  <Input
                    id={`component-${type}`}
                    value={formData.step2[type]?.component || ""}
                    onChange={(e) =>
                      handleStep2InputChange(type, "component", e.target.value)
                    }
                    placeholder={t("newReport.primaryGIS.componentPlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`manufacturer-${type}`}>
                    {t("newReport.primaryGIS.manufacturer")}
                  </Label>
                  <Input
                    id={`manufacturer-${type}`}
                    value={formData.step2[type]?.manufacturer || ""}
                    onChange={(e) =>
                      handleStep2InputChange(
                        type,
                        "manufacturer",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "newReport.primaryGIS.manufacturerPlaceholder"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${type}`}>
                    {t("newReport.primaryGIS.description")}
                  </Label>
                  <Textarea
                    id={`description-${type}`}
                    value={formData.step2[type]?.description || ""}
                    onChange={(e) =>
                      handleStep2InputChange(
                        type,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "newReport.primaryGIS.descriptionPlaceholder"
                    )}
                  />
                </div>

                {/* Findings and Conclusion */}
                <div className="space-y-2">
                  <Label htmlFor={`findingsConclusion-${type}`}>
                    {t("newReport.primaryGIS.findingsConclusion")}
                  </Label>
                  <Textarea
                    id={`findingsConclusion-${type}`}
                    value={formData.step2[type]?.findingsConclusion || ""}
                    onChange={(e) =>
                      handleStep2InputChange(
                        type,
                        "findingsConclusion",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "newReport.primaryGIS.findingsConclusionPlaceholder"
                    )}
                  />
                </div>
{/* 👌 */}
                {/* Operational Condition & Test Results */}
                <h3 className="font-semibold text-lg text-[#0d5c87]">
                  {t("newReport.primaryGIS.operationalCondition")}
                  <br />
                </h3>
                <div className="grid grid-cols-1  gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`condition-${type}`}>
                      {t("newReport.primaryGIS.condition")}
                    </Label>
                    <Input
                      id={`condition-${type}`}
                      value={formData.step2[type]?.condition || ""}
                      onChange={(e) =>
                        handleStep2InputChange(
                          type,
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
                    <Label htmlFor={`numOperations-${type}`}>
                      {t("newReport.primaryGIS.numberOfOperations")}
                    </Label>
                    <Input
                      id={`numOperations-${type}`}
                      type="number"
                      value={formData.step2[type]?.numOperations || ""}
                      onChange={(e) =>
                        handleStep2InputChange(
                          type,
                          "numOperations",
                          e.target.value
                        )
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ratedValues-${type}`}>
                      {t("newReport.primaryGIS.ratedValues")}
                    </Label>
                    <Input
                      id={`ratedValues-${type}`}
                      value={formData.step2[type]?.ratedValues || ""}
                      onChange={(e) =>
                        handleStep2InputChange(
                          type,
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
                    <Label htmlFor={`thermography-${type}`}>
                      {t("newReport.primaryGIS.thermography")}
                    </Label>
                    <Input
                      id={`thermography-${type}`}
                      value={formData.step2[type]?.thermography || ""}
                      onChange={(e) =>
                        handleStep2InputChange(
                          type,
                          "thermography",
                          e.target.value
                        )
                      }
                      placeholder={t("newReport.primaryGIS.writeHere")}
                    />
                  </div>
                </div>
{/* 👌 */}
                {/* Visual Condition */}
                <div className="space-y-4 ">
                  {/* <h3 className="font-semibold text-lg text-[#0d5c87]">
                        {t("newReport.primaryGIS.visualCondition")}
                      </h3> */}
                  <div className="space-y-5">
                    <FileUploader
                      addFileName={"Visual Condition"}
                      onFilesChange={(files) => {
                        setFilesData((prev) => ({
                          ...prev,
                          [`${type}_visualCondition`]: files,
                        }));
                      }}
                    />
                  </div>
                </div>
                
{/* 👌 */}
                {/* Maintenance History */}
                <div className="space-y-4 ">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.maintenanceHistory")}
                  </h3>
                  <div className="grid grid-cols-1  gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`maintenanceDate-${type}`}>
                        {t("newReport.primaryGIS.localMaintenanceDate")}
                      </Label>
                      <Input
                        id={`maintenanceDate-${type}`}
                        type="date"
                        value={formData.step2[type]?.maintenanceDate || ""}
                        onChange={(e) =>
                          handleStep2InputChange(
                            type,
                            "maintenanceDate",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`maintenanceType-${type}`}>
                        {t("newReport.primaryGIS.type")}
                      </Label>
                      <Input
                        id={`maintenanceType-${type}`}
                        value={formData.step2[type]?.maintenanceType || ""}
                        onChange={(e) =>
                          handleStep2InputChange(
                            type,
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
                            { label: "No", value: "no" },
                            { label: "Yes", value: "yes" },
                          ]}
                          value={formData.step2[type]?.spareParts || "no"}
                          onChange={(value) =>
                            handleStep2InputChange(type, "spareParts", value)
                          }
                          name={`spareParts-${type}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Results Section */}
                <div className="space-y-4 ">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.testResults")}
                  </h3>
                  <div className="space-y-3">
                    {[
                      "SF6 Lakeage",
                      "Temperature",
                      "Oil tests",
                      "Humidity",
                    ].map((item) => (
                      <div key={`test-${item}`}>
                        <FileUploader
                          addFileName={item}
                          onFilesChange={(files) => {
                            setFilesData((prev) => ({
                              ...prev,
                              [`${type}_${item.replace(/\s+/g, "_")}`]: files,
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* <div className="grid grid-cols-1  gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="temperature">
                            {t("newReport.primaryGIS.temperature")}
                          </Label>
                          <Input
                            id="temperature"
                            type="number"
                            placeholder="0°C"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="humidity">
                            {t("newReport.primaryGIS.humidity")}
                          </Label>
                          <Input id="humidity" type="number" placeholder="0%" />
                        </div>
                      </div> */}
                </div>
{/* 👌 */}
                {/* Assessment Condition */}
                <div className="space-y-4 ">
                  <h3 className="font-semibold text-lg text-[#0d5c87]">
                    {t("newReport.primaryGIS.assessmentCondition")}
                  </h3>
                  <div className="grid grid-cols-1  gap-4">
                    {/* assign condition wait.. */}
                    <ConditionGrid
                      onGridChange={(grid) => {
                        setConditionGridData((prev) => ({
                          ...prev,
                          [type]: grid,
                        }));
                      }}
                    />
                    <div className="space-y-2">
                      <Label htmlFor={`assignCondition-${type}`}>
                        {t("Condition")}
                      </Label>
                      <Textarea
                        id={`assignCondition-${type}`}
                        value={formData.step2[type]?.assignCondition || ""}
                        onChange={(e) =>
                          handleStep2InputChange(
                            type,
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
                      <Label htmlFor={`riskFactor-${type}`}>
                        {t("newReport.primaryGIS.riskFactor")}
                      </Label>
                      <Textarea
                        id={`riskFactor-${type}`}
                        value={formData.step2[type]?.riskFactor || ""}
                        onChange={(e) =>
                          handleStep2InputChange(
                            type,
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
                      addFileName={"Upload Document"}
                      onFilesChange={(files) => {
                        setFilesData((prev) => ({
                          ...prev,
                          [`${type}_uploadDocument`]: files,
                        }));
                      }}
                    />
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <Label htmlFor={`recommendations-${type}`}>
                    {t("newReport.primaryGIS.recommendations")}
                  </Label>
                  <Textarea
                    id={`recommendations-${type}`}
                    value={formData.step2[type]?.recommendations || ""}
                    onChange={(e) =>
                      handleStep2InputChange(
                        type,
                        "recommendations",
                        e.target.value
                      )
                    }
                    placeholder={t(
                      "newReport.primaryGIS.recommendationsPlaceholder"
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          <Plus />
          add new section
        </Button>
      </CardContent>
    </Card>
  );
};

export default DynamicSteps;
