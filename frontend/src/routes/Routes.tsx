import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";

const Root = lazy(() => import("./Root"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ImageGalleryPage = lazy(() => import("@/pages/ImageGallery"));
const ImageUploadPage = lazy(() => import("@/pages/ImageUpload"));

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
        path: "/images",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageGalleryPage />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: "/upload",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageUploadPage />
          </Suspense>
        ),
        errorElement: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});
