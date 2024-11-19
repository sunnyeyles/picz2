import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { Suspense } from "react";
import ImageGalleryPage from "@/pages/ImageGallery";
import ImageUploadPage from "@/pages/ImageUpload";

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
        path: "/myimages",

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
    ],
  },
];
export const router = createBrowserRouter(routes);
