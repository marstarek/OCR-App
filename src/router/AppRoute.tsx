import Arabic from "@/components/Arabic/Arabic";
import Home from "@/components/Home/Home";
import MainLayOut from "@/layout/MainLayOut";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import English  from '@/components/English/English';
import CVExtractor from "@/components/CVExtractor/CVExtractor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        index: true, // Default route -> Home
        element: <Home />,
      },
      {
        path: "arabic", // /arabic
        element: <Arabic />,
      },
      {
        path: "english", // /english
        element: <English />,
      },
      {
        path: "cv-extractor", // /cv-extractor
        element: <CVExtractor />,
      },
    ],
  },
]);

export default function AppRoute() {
  return <RouterProvider router={router} />;
}