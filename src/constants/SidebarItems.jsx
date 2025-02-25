import AdminSidebar from "./AdminSidebar";
import StudentSidebar from "./StudentSidebar";
import SuperAdminSidebar from "./SuperAdminSidebar";
import UserTypes from "./UserTypes";

const SidebarItems = ({ user }) => {
  console.log("user", user)


  if (!user) {
    return [];
  }

  if (user.type === UserTypes.SuperAdmin) {
    return SuperAdminSidebar;
  }
  if (user.type === UserTypes.Admin) {
    return AdminSidebar;
  }
  if (user.type === UserTypes.Student) {
    return StudentSidebar;
  }

  return [];
};
export default SidebarItems;
