import { FileText, Clock, AlertTriangle, Users, Plus } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { useTranslation } from "react-i18next";
import { EngineerReportTable } from "@/components/EngineerTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AddEngineerModal from "@/components/AddEngineerModal";

const Engineers = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [engineers, setEngineers] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("allEngineers");
    if (saved) {
      try {
        setEngineers(JSON.parse(saved));
      } catch (error) {
        console.log("Error loading engineers:", error);
      }
    }
  }, []);

  const handleAddEngineer = (newEngineer: any) => {
    const engineer = {
      id: Date.now().toString(),
      ...newEngineer,
      lastActive: new Date().toISOString().split("T")[0],
    };
    const updatedEngineers = [...engineers, engineer];
    setEngineers(updatedEngineers);
    localStorage.setItem("allEngineers", JSON.stringify(updatedEngineers));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {t("engineers.userManagement")}
        </h1>
        <p className="text-muted-foreground">
          {t("engineers.userManagementDesc")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        <StatsCard
          title={t("engineers.totalEngineers")}
          value={4}
          icon={FileText}
          variant="default"
        />
        <StatsCard
          title={t("engineers.activeEngineers")}
          value={2}
          icon={Clock}
          variant="info"
        />
        <StatsCard
          title={t("engineers.inactiveEngineers")}
          value={2}
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Reports Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Menu Engineers</h2>
            <p className="text-sm text-muted-foreground">
              manage engineer data Lorem, ipsum dolor.
            </p>
          </div>

          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            {t("Add Engineer")}
          </Button>
        </div>
        <EngineerReportTable
          engineers={engineers}
          setEngineers={setEngineers}
        />
      </div>

      <AddEngineerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEngineer}
      />
    </div>
  );
};

export default Engineers;
