// import Dashboard from "../pages/app (admin)/dashboard/Dashboard";

import UserTypes from "../constants/UserTypes";
import AppLayout from "../layouts/AppLayout";
import AdminRoutes from "./AdminRoutes";
import StudentRoutes from "./StudentRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";

const AuthenticatedRoutes = [
  {
    path: "/app",
    element: <AppLayout />,
    children: ({ user }) => {
      if (!user) {
        return [];
      }

      if (user.type === UserTypes.SuperAdmin) {
        return SuperAdminRoutes;
      }
      if (user.type === UserTypes.Admin) {
        return AdminRoutes;
      }
      if (user.type === UserTypes.Student) {
        return StudentRoutes;
      }
      return [];
    },
  },
];

export default AuthenticatedRoutes;
