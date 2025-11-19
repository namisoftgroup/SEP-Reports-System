import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Save, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AddNewSectionModal from "@/components/addNewReportComponents/AddNewSectionModal";
import StepOneComponent from "@/components/addNewReportComponents/StepsForNewReport/StepOneComponent";
import { CustomToastSuccess } from "@/components/CustomToastSuccess";
import DynamicStepsComponent from "@/components/addNewReportComponents/StepsForNewReport/DynamicSectionsStep";
import { REPORT_STEPS_CONFIG } from "@/config/reportStepsConfig";
import StepEightComponent from "@/components/addNewReportComponents/StepsForNewReport/StepEightComponent";

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

const NewReport = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Dynamic sections state for each step
  const [stepSections, setStepSections] = useState({
    step2: [
      t("newReport.steps.step2.gisSwitchGears"),
      t("newReport.steps.step2.circuitBreakers"),
      t("newReport.steps.step2.combinedDisconnectGround"),
      t("newReport.steps.step2.groundSwitches"),
      t("newReport.steps.step2.currentTransformers"),
      t("newReport.steps.step2.voltageTransformers"),
      t("newReport.steps.step2.gisTerminations"),
    ],
    step3: [
      t("newReport.steps.step3.currentTransformers"),
      t("newReport.steps.step3.surgeArresters"),
      t("newReport.steps.step3.capacitorBanks"),
      t("newReport.steps.step3.cableCircuits"),
    ],
    step4: [t("newReport.steps.step4.controlSystems"), t("newReport.steps.step4.protectionRelays")],
    step5: [
      t("newReport.steps.step5.busbarSystems"),
      t("newReport.steps.step5.gantries"),
      t("newReport.steps.step5.supportStructures"),
      t("newReport.steps.step5.foundations"),
    ],
    step6: [t("newReport.steps.step6.gisBuildings")],
    step7: [t("newReport.steps.step7.gisSwitchGears")],
  });

  // Centralized form data state for all steps
  const [formData, setFormData] = useState({
    id: Date.now() + Math.floor(Math.random() * 1000),
    state:"complete",
    step1: {
      projectName: "",
      substationName: "",
      projectCode: "",
      owner: "",
      operationArea: "",
      inspectionDate: "2025-11-12",
    },
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {
      descriptionField: "",
    },
  });

  // Store FileUploader and ConditionGrid data for each section
  const [filesData, setFilesData] = useState({});
  const [conditionGridData, setConditionGridData] = useState<{
    [key: string]: number[][];
  }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [activeStepForModal, setActiveStepForModal] = useState("");

  // Initialize step data structure for each section
  useEffect(() => {
    const initialStepData = {};

    Object.entries(stepSections).forEach(([stepKey, sections]) => {
      sections.forEach((section) => {
        if (!formData[stepKey][section]) {
          if (!initialStepData[stepKey]) {
            initialStepData[stepKey] = {};
          }
          initialStepData[stepKey][section] = {
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
    });

    if (Object.keys(initialStepData).length > 0) {
      setFormData((prev) => {
        const newFormData = { ...prev };
        Object.entries(initialStepData).forEach(([stepKey, stepData]) => {
          newFormData[stepKey] = { ...prev[stepKey], ...(stepData as object) };
        });
        return newFormData;
      });
    }
  }, [stepSections]);

  const handleAddSection = () => {
    if (newSectionName.trim() === "" || !activeStepForModal) return;

    const sectionKey = newSectionName;

    setStepSections((prev) => ({
      ...prev,
      [activeStepForModal]: [...prev[activeStepForModal], sectionKey],
    }));

    setIsModalOpen(false);
    setNewSectionName("");
    setActiveStepForModal("");
  };

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

  // Handler to update step section data
  const handleStepInputChange = (
    stepKey: string,
    sectionKey: string,
    field: string,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [sectionKey]: {
          ...(prev[stepKey][sectionKey] || {}),
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

  // Convert step data to array format for storage
  const convertStepDataToArray = (stepKey: string) => {
    return Object.entries(formData[stepKey]).map(([key, value]) => {
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
  };

  const handleSubmit = () => {
    const completeReportData = {
      ...formData,
      step2: convertStepDataToArray("step2"),
      step3: convertStepDataToArray("step3"),
      step4: convertStepDataToArray("step4"),
      step5: convertStepDataToArray("step5"),
      step6: convertStepDataToArray("step6"),
      step7: convertStepDataToArray("step7"),
      // step8: convertStepDataToArray("step8"),
    };

    const existingReports = JSON.parse(
      localStorage.getItem("allReports") || "[]"
    );

    existingReports.push(completeReportData);

    localStorage.setItem("allReports", JSON.stringify(existingReports));
    localStorage.setItem("latestReport", JSON.stringify(completeReportData));
    setShowSuccessToast(true);

    setTimeout(() => {
      navigate("/my-reports");
    }, 1000);
  };

  // Get current step config
  const getCurrentStepConfig = () => {
    return REPORT_STEPS_CONFIG.find(
      (config) => config.stepNumber === currentStep
    );
  };

  const currentStepConfig = getCurrentStepConfig();

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
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
        <StepOneComponent
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {currentStep >= 2 && currentStep <= 7 && currentStepConfig && (
        <DynamicStepsComponent
          stepKey={currentStepConfig.stepKey}
          sections={stepSections[currentStepConfig.stepKey]}
          formData={formData}
          handleInputChange={(sectionKey, field, value) =>
            handleStepInputChange(
              currentStepConfig.stepKey,
              sectionKey,
              field,
              value
            )
          }
          setFilesData={setFilesData}
          setConditionGridData={setConditionGridData}
          openAddModal={() => {
            setActiveStepForModal(currentStepConfig.stepKey);
            setIsModalOpen(true);
          }}
          translationPrefix={currentStepConfig.translationPrefix}
        />
      )}

      {currentStep === 8 && (
        <StepEightComponent
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {/* Modal to add new section */}
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

      {/* toast */}
      <CustomToastSuccess
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </div>
  );
};

export default NewReport;
