import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Settings,

  TestTube2,
} from "lucide-react";

const AdminSidebar = [
  {
    label: "Dashboard",
    path: "/app/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },

  {
    label: "Teachers",
    path: "/app/teachers",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Students",
    path: "/app/students",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    label: "Classrooms",
    path: "/app/classrooms",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "Attendance",
    path: "/app/attendance",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: "Fees",
    path: "/app/fees",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    label: "Learning Materials",
    path: "/app/materials",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Tests",
    path: "/app/tests",
    icon: <TestTube2 className="w-5 h-5" />,
  },
  {
    label: "Settings",
    path: "/app/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default AdminSidebar;
