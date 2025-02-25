import { Outlet } from "react-router";
import { Helmet } from "react-helmet-async";
import { PRODUCT_NAME } from "../constants/env";
import OfflinePage from "../pages/offline";

function MainLayout() {
  return (
    <div>
      <Helmet>
        <title>{PRODUCT_NAME}</title>
      </Helmet>
      <OfflinePage>
        <Outlet />
      </OfflinePage>
    </div>
  );
}

export default MainLayout;
