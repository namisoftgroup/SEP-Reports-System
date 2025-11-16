import { Eye, Check, X, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ==============================
// Engineer Interface
// ==============================
interface Engineer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  reportsCount: number;
  lastActive: string;
}

// ==============================
// Mock Data (مثل الصورة)
// ==============================
const mockEngineers: Engineer[] = [
  {
    id: "1",
    name: "ahmed ehab",
    email: "ahmed@gmail.com",
    status: "active",
    reportsCount: 12,
    lastActive: "2025-11-04",
  },
  {
    id: "2",
    name: "sara",
    email: "sara@gmail.com",
    status: "active",
    reportsCount: 8,
    lastActive: "2025-11-03",
  },
  {
    id: "3",
    name: "mohamed",
    email: "mohamed@gmail.com",
    status: "inactive",
    reportsCount: 15,
    lastActive: "2025-10-20",
  },
];

export const EngineerReportTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [engineers, setEngineers] = useState<Engineer[]>(mockEngineers);

  // يمكن التعديل لاحقًا لجلب البيانات من API أو LocalStorage
  useEffect(() => {
    // example: لو هتجيب من localstorage
    const saved = localStorage.getItem("allEngineers");
    if (saved) {
      try {
        setEngineers(JSON.parse(saved));
      } catch (error) {
        console.log("Error loading engineers:", error);
      }
    }
  }, []);

  // ==============================
  // Status Badge
  // ==============================
  const getStatusBadge = (status: Engineer["status"]) => {
    return (
      <Badge
        className={
          status === "active"
            ? "bg-green-100 text-green-600"
            : "bg-gray-200 text-gray-600"
        }
      >
        {status === "active" ? "نشط" : "غير نشط"}
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>عدد التقارير</TableHead>
            <TableHead>آخر نشاط</TableHead>
            <TableHead className="text-center">إجراءات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {engineers.map((engineer) => (
            <TableRow key={engineer.id}>
              <TableCell>{engineer.name}</TableCell>
              <TableCell>{engineer.email}</TableCell>
              <TableCell>{getStatusBadge(engineer.status)}</TableCell>
              <TableCell>{engineer.reportsCount}</TableCell>
              <TableCell>{engineer.lastActive}</TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {/* عرض تقارير المهندس */}
                  <Button
                    variant="ghost"
                    size="icon"
                    title="عرض التقارير"
                    onClick={() => navigate(`/engineer/${engineer.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* تعديل */}
                  <Button
                    variant="ghost"
                    size="icon"
                    title="تعديل"
                  >
                    <Edit />
                  </Button>

                  {/* تفعيل/تعطيل */}
                  {engineer.status === "active" ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      title="تعطيل"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600"
                      title="تفعيل"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
