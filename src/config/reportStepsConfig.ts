
export interface StepConfig {
  stepKey: string;
  stepNumber: number;
  defaultSections: string[];
  translationPrefix: string;
}

export const REPORT_STEPS_CONFIG: StepConfig[] = [
  {
    stepKey: "step2",
    stepNumber: 2,
    defaultSections: ["primaryGISEquipment", "disconnectSwitches"],
    translationPrefix: "newReport.primaryGIS",
  },
  {
    stepKey: "step3",
    stepNumber: 3,
    defaultSections: ["primaryAISEquipment", "transformers"],
    translationPrefix: "newReport.primaryGIS",
  },
  {
    stepKey: "step4",
    stepNumber: 4,
    defaultSections: ["protectionRelays", "controlPanels"],
    translationPrefix: "newReport.primaryGIS",
  },
  {
    stepKey: "step5",
    stepNumber: 5,
    defaultSections: ["outdoorEquipment", "lightningArresters"],
    translationPrefix: "newReport.primaryGIS",
  },
  {
    stepKey: "step6",
    stepNumber: 6,
    defaultSections: ["buildingStructure", "fireProtection"],
    translationPrefix: "newReport.primaryGIS",
  },
  {
    stepKey: "step7",
    stepNumber: 7,
    defaultSections: ["warrantyInfo", "maintenanceRecords"],
    translationPrefix: "newReport.primaryGIS",
  },
  // {
  //   stepKey: "step8",
  //   stepNumber: 8,
  //   defaultSections: ["findings", "conclusions"],
  //   translationPrefix: "newReport.findings",
  // },
];
