import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Separator } from "./ui/separator";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Mock user data - replace with actual auth context
  const user = {
    name: "أحمد ايهاب",
    nameEn: "ahmed ehab",
    role: "Engineer",
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t("sidebar.dashboard"),
      path: "/dashboard",
    },
    { icon: FileText, label: t("sidebar.myReports"), path: "/my-reports" },
    { icon: PlusCircle, label: t("sidebar.newReport"), path: "/new-report" },
    { icon: Users, label: t("sidebar.engineers"), path: "/engineers" },
    { icon: BarChart3, label: t("sidebar.statistics"), path: "/statistics" },
    { icon: Settings, label: t("sidebar.settings"), path: "/settings" },
  ];

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">
                {t("sidebar.reportsSystem")}
              </h1>
              <p className="text-xs text-muted-foreground">System</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.nameEn.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              {t("sidebar.engineer")}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`
            }
            onClick={onClose}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <LanguageSwitcher />
        <Separator />
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">{t("common.logout")}</span>
        </Button>
      </div>
    </div>
  );
};
