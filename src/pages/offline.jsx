import { Outlet } from "react-router";
import If from "../components/common/If";
import useIsUserOffline from "../hooks/useIsUserOffline";
import React from "react";
import FullPageLayout from "../layouts/FullPageLayout";
import { Button } from "@heroui/button";
import { OfflineSVG } from "../constants/SvgImports";
function OfflinePage() {
  const [isOffine] = useIsUserOffline();

  return (
    <If condition={isOffine} fallback={<Outlet />}>
      <FullPageLayout className={"gap-7"}>
        <OfflineSVG />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-center">
            It seems we're offline!
          </h1>
          <p className="text-sm lg:text-md text-gray-600 text-center">
            Please check your internet connection and try again.
          </p>
        </div>
        <div className="flex gap-5">
          <Button
            size="md"
            // startContent={< />}
            onPress={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </FullPageLayout>
    </If>
  );
}

export default OfflinePage;
