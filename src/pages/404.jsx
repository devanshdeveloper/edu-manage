import React from "react";
import { Link, useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";
import { ArrowLeft } from "lucide-react";
import FullPageLayout from "../layouts/FullPageLayout";
import { Button } from "@heroui/button";

function NotFoundPage() {
  const navigate = useNavigate();
  // const { permissions } = useAuthContext();

  const redirect = {};

  return (
    <FullPageLayout className={"gap-7"}>
      {/* <ErrorSVG /> */}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-sm lg:text-md text-gray-600 text-center">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <div className="flex gap-5">
        <Button
          className="px-5 py-2.5 font-semibold"
          variant="flat"
          // startContent={<ArrowLeft stroke={colors.blue[600]} size={20} />}
          onPress={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          className="px-5 py-2.5 font-semibold"
          // startContent={<HomeIcon stroke={colors.white} />}
          color="primary"
          as={Link}
          to={redirect?.to || "/login"}
        >
          Go to {redirect?.title || "Login"}
        </Button>
      </div>
    </FullPageLayout>
  );
}

export default NotFoundPage;
