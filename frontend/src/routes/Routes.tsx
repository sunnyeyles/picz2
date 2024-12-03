import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { Suspense } from "react";
import ImageGalleryPage from "@/pages/ImageGallery";
import ImageUploadPage from "@/pages/ImageUpload";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";

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
        errorElement: <NotFound />,
      },
      {
        path: "/upload",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageUploadPage />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/boxes",

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BackgroundBoxesDemo />
          </Suspense>
        ),
        errorElement: <NotFound />,
      },
    ],
  },
];
// export const router = createBrowserRouter(routes);
export const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});
