import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/Dashboard";
import PropertiesPage from "@/pages/Properties";
import Root from "./Root";
import { RouteObject } from "react-router-dom";
import Documents from "@/pages/Documents";
import NotFound from "@/pages/NotFound";
import ContactPage from "@/pages/Contact";
import { Suspense } from "react";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        path: "/dashboard",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/properties",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PropertiesPage />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/reports",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/documents",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Documents />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/contact",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ContactPage />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/settings",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
