import { PRODUCT_NAME } from "../constants/env";
import DefaultLayout from "../layouts/default";
import IndexPage from "../pages";
import { ContactPage } from "../pages/contact";
import { DocsPage } from "../pages/docs/DocsPage";
import { FeaturesPage } from "../pages/features";
import { LoginPage } from "../pages/login";
import { PricingPage } from "../pages/pricing";

const UnauthenticatedRoutes = [
  // Marketing Pages
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
        title: `${PRODUCT_NAME} | No. 1 Education Management System`,
      },
      {
        path: "/about",
        element: <div>About</div>,
        title: `About | ${PRODUCT_NAME}`,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
        title: `Pricing | ${PRODUCT_NAME}`,
      },
      {
        path: "/features",
        element: <FeaturesPage />,
        title: `Features | ${PRODUCT_NAME}`,
      },
      {
        path: "/contact",
        element: <ContactPage />,
        title: `Contact | ${PRODUCT_NAME}`,
      },
      {
        path: "/docs",
        element: <DocsPage />,
        title: `Docs | ${PRODUCT_NAME}`,
      },
      {
        path: "/docs/:slug",
        element: <DocsPage />,
        title: `Docs | ${PRODUCT_NAME}`,
      },
    ],
  },

  // Auth Pages
  {
    path: "/login",
    element: <LoginPage />,
    title: `Login | ${PRODUCT_NAME}`,
  },
  //   {
  //     path: "/register",
  //     element: <RegisterPage />,
  //   },
  //   {
  //     path: "/forgot-password",
  //     element: <ForgotPasswordPage />,
  //   },
  //   {
  //     path: "/reset-password",
  //     element: <ResetPasswordPage />,
  //   },
  //   {
  //     path: "/verify-email",
  //     element: <VerifyEmailPage />,
  //   },
];

export default UnauthenticatedRoutes;
