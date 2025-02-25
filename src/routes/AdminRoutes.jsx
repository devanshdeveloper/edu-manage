// import Dashboard from "../pages/app (admin)/dashboard/Dashboard";

import { TeachersPage } from "../pages/app (admin)/teachers/TeachersPage";

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
  