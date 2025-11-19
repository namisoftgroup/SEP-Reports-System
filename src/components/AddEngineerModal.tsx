import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface AddEngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (engineer: {
    name: string;
    email: string;
    password: string;
    reportsCount: number;
    status: "active" | "inactive";
  }) => void;
}

const AddEngineerModal = ({ isOpen, onClose, onAdd }: AddEngineerModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    reportsCount: "",
    status: "active" as "active" | "inactive",
  });

  const handleSubmit = () => {
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    // if (!formData.name || !formData.email || !formData.password) {
    //   alert("Please fill all required fields");
    //   return;
    // }

    onAdd({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      reportsCount: parseInt(formData.reportsCount) || 0,
      status: formData.status,
    });

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      reportsCount: "",
      status: "active",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Add Engineer")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter engineer name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportsCount">Report Number</Label>
            <Input
              id="reportsCount"
              type="number"
              value={formData.reportsCount}
              onChange={(e) =>
                setFormData({ ...formData, reportsCount: e.target.value })
              }
              placeholder="Enter report number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleSubmit}>{t("Add Engineer")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEngineerModal;
