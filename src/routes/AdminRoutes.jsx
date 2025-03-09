// import Dashboard from "../pages/app (admin)/dashboard/Dashboard";

import { TeachersPage } from "../pages/app (admin)/teacher/TeacherPage";

const AdminRoutes = [
    {
      path: "",
      // element: <Dashboard />,
    },
    {
      path: "teachers",
      element: <TeachersPage />,
    },
  ];
  
  export default AdminRoutes;
  