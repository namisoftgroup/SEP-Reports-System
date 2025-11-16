import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const AddNewSectionModal = ({
  isModalOpen,
  setIsModalOpen,
  newSectionName,
  setNewSectionName,
  handleAddSection,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Enter New Section Name")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Label htmlFor="sectionName">{t("Section Name")}</Label>
          <Input
            id="sectionName"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            placeholder={t("Write section name here...")}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleAddSection}>{t("Save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSectionModal;
