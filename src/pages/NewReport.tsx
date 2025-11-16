import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Save,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Plus,
  Trash2,
} from "lucide-react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import FileUploader from "@/components/addNewReportComponents/FileUploader";
import ConditionGrid from "@/components/addNewReportComponents/ConditionGrid";
import { Textarea } from "@/components/ui/textarea";
import AddNewSectionModal from "@/components/addNewReportComponents/AddNewSectionModal";
import StepsWillAdd from "@/components/addNewReportComponents/StepsWillAdd";

interface EquipmentInstance {
  id: string;
  equipmentTag: string;
  component: string;
  manufacturer: string;
  description: string;
  condition: string;
  numOperations: string;
  ratedValues: string;
  nameplate: string;
  temperature: string;
  humidity: string;
  riskFactor: string;
  recommendations: string;
  findingsConclusion: string;
}

// interface CircuitBreakerData {
//   [key: string]: EquipmentInstance[];
// }

const NewReport = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  // Centralized form data state for all steps
  const [formData, setFormData] = useState({
id: Date.now() + Math.floor(Math.random() * 1000),
    step1: {
      projectName: "",
      substationName: "",
      projectCode: "",
      owner: "",
      operationArea: "",
      inspectionDate: "2025-11-12",
    },
    step2: {}, // Will store as object with section keys
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {},
  });

  // Store FileUploader and ConditionGrid data for each section
  const [filesData, setFilesData] = useState({});
  const [conditionGridData, setConditionGridData] = useState<{
    [key: string]: number[][];
  }>({});

  const [sectionsStepTwo, setSectionsStepTwo] = useState([
    // "Primary GIS Equipment",
    // "Disconnect Switches",
    "primaryGISEquipment",
    "disconnectSwitches",
  ]);

  // Initialize step2 data structure for each section
  useEffect(() => {
    const initialStep2Data = {};
    sectionsStepTwo.forEach((section) => {
      if (!formData.step2[section]) {
        initialStep2Data[section] = {
          equipmentTag: "",
          component: "",
          manufacturer: "",
          description: "",
          condition: "",
          numOperations: "",
          ratedValues: "",
          thermography: "",
          maintenanceDate: "",
          maintenanceType: "",
          spareParts: "",
          assignCondition: "",
          riskFactor: "",
          recommendations: "",
          findingsConclusion: "",
        };
      }
    });
    if (Object.keys(initialStep2Data).length > 0) {
      setFormData((prev) => ({
        ...prev,
        step2: { ...prev.step2, ...initialStep2Data },
      }));
    }
  }, [sectionsStepTwo]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const handleAddSection = () => {
    if (newSectionName.trim() === "") return;

    // const sectionKey = newSectionName.trim().toLowerCase().replace(/\s+/g, "_");
    const sectionKey = newSectionName;

    setSectionsStepTwo((prev) => [...prev, sectionKey]);

    setIsModalOpen(false);
    setNewSectionName("");
  };

  // const [circuitBreakers, setCircuitBreakers] = useState<CircuitBreakerData>({
  //   primaryGISEquipment: [],
  //   disconnectSwitches: [],
  //   combinedDisconnect: [],
  //   groundSwitches: [],
  //   currentTransformers: [],
  //   voltageTransformers: [],
  //   vcbTerminations: [],
  // });

  // Handler to update form data dynamically
  const handleInputChange = (step: string, field: string, value) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  // Handler to update step2 section data
  const handleStep2InputChange = (sectionKey: string, field: string, value) => {
    setFormData((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        [sectionKey]: {
          ...(prev.step2[sectionKey] || {}),
          [field]: value,
        },
      },
    }));
  };

  const steps = [
    { number: 1, label: t("newReport.steps.projectInfo") },
    { number: 2, label: t("newReport.steps.primaryGIS") },
    { number: 3, label: t("newReport.steps.primaryAIS") },
    { number: 4, label: t("newReport.steps.secondaryEquipment") },
    { number: 5, label: t("newReport.steps.outdoorSwitchyard") },
    { number: 6, label: t("newReport.steps.infrastructure") },
    { number: 7, label: t("newReport.steps.warranty") },
    { number: 8, label: t("newReport.steps.findings") },
  ];

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {

    const step2Array = Object.entries(formData.step2).map(([key, value]) => {

 
    const filteredFiles = Object.entries(filesData)
      .filter(([fileKey]) => fileKey.startsWith(`${key}_`)) 
      .reduce((acc, [fileKey, fileValue]) => {
        acc[fileKey] = fileValue;
        return acc;
      }, {});

    return {
      sectionKey: key,
      sectionData: value,
      files: filteredFiles, 
      conditionGrid: conditionGridData[key] || null,
    };
  });

  // الخطوة 2: بناء الداتا النهائية للتقرير
  const completeReportData = {
    ...formData,
    step2: step2Array,            
    // filesData,                   
    // conditionGridData,            
    // metadata: {
    //   timestamp: new Date().toISOString(),
    //   reportNumber: "RPT-2025-111",
    //   currentStep,
    //   totalSteps,
    // },
  };

  const existingReports = JSON.parse(
    localStorage.getItem("allReports") || "[]"
  );

  existingReports.push(completeReportData);

  localStorage.setItem("allReports", JSON.stringify(existingReports));
  localStorage.setItem("latestReport", JSON.stringify(completeReportData));

  // الخطوة 4: Log
  console.log("=== COMPLETE REPORT DATA ===");
  console.log(completeReportData);

  console.log("=== ALL REPORTS ===");
  console.log(existingReports);

  toast({
    title: t("common.success"),
    description: "Report data saved successfully to localStorage!",
  });

  navigate("/my-reports");
};

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("newReport.title")}</h1>
          <p className="text-muted-foreground">{t("newReport.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            {t("common.saveAsDraft")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/my-reports")}>
            {t("common.back")}
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {t("newReport.step")} {currentStep} {t("newReport.of")}{" "}
                {totalSteps}
              </span>
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Navigator */}
          <div className="grid grid-cols-8 gap-2 mt-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`w-12 h-12 rounded-full mb-2 mx-auto flex items-center justify-center font-semibold transition-colors ${
                    currentStep === step.number
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step.number
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {step.number}
                </button>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("newReport.projectInfo.title")}</CardTitle>
            <CardDescription>
              {t("newReport.projectInfo.subtitle")}
            </CardDescription>
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
                  placeholder={t(
                    "newReport.projectInfo.projectNamePlaceholder"
                  )}
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
                  placeholder={t(
                    "newReport.projectInfo.substationNamePlaceholder"
                  )}
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
                  placeholder={t(
                    "newReport.projectInfo.projectCodePlaceholder"
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner">
                  {t("newReport.projectInfo.owner")}
                </Label>
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
                  placeholder={t(
                    "newReport.projectInfo.operationAreaPlaceholder"
                  )}
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

            <div className="text-sm text-muted-foreground">
              {t("newReport.projectInfo.reportNumber")}:{" "}
              <span className="font-semibold">RPT-2025-111</span>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="py-8">
          {/* <CardHeader>
            <CardTitle>{t("newReport.primaryGIS.title")}</CardTitle>
            <CardDescription>
              {t("newReport.primaryGIS.subtitle")}
            </CardDescription>
          </CardHeader> */}
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
                      {/* <span className="text-sm text-muted-foreground">
                        ({circuitBreakers[type].length}{" "}
                        {t("common.items", { defaultValue: "items" })})
                      </span> */}
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
                          handleStep2InputChange(
                            type,
                            "component",
                            e.target.value
                          )
                        }
                        placeholder={t(
                          "newReport.primaryGIS.componentPlaceholder"
                        )}
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
                            placeholder={t(
                              "newReport.primaryGIS.typePlaceholder"
                            )}
                          />
                        </div>
                        <div className="space-y-2 flex justify-between items-center">
                          <Label>
                            {t("newReport.primaryGIS.sparePartsAvailability")}
                          </Label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`spareParts-${type}`}
                                value="yes"
                                checked={
                                  formData.step2[type]?.spareParts === "yes"
                                }
                                onChange={(e) =>
                                  handleStep2InputChange(
                                    type,
                                    "spareParts",
                                    e.target.value
                                  )
                                }
                              />
                              <span>{t("common.yes")}</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`spareParts-${type}`}
                                value="no"
                                checked={
                                  formData.step2[type]?.spareParts === "no"
                                }
                                onChange={(e) =>
                                  handleStep2InputChange(
                                    type,
                                    "spareParts",
                                    e.target.value
                                  )
                                }
                              />
                              <span>{t("common.no")}</span>
                            </label>
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
                                  [`${type}_${item.replace(/\s+/g, "_")}`]:
                                    files,
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
      )}

      {currentStep > 2 && (
        <StepsWillAdd currentStep={currentStep} steps={steps} />
      )}

      {/* modal to add new section */}
      <AddNewSectionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newSectionName={newSectionName}
        setNewSectionName={setNewSectionName}
        handleAddSection={handleAddSection}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between bg-white p-4 shadow-lg rounded-lg">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("common.back")}
        </Button>
        <Button
          onClick={currentStep === totalSteps ? handleSubmit : handleNext}
          className="gap-2"
        >
          {currentStep === totalSteps ? t("common.submit") : t("common.next")}
          {currentStep < totalSteps && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default NewReport;
