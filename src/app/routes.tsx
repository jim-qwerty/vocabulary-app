import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "../pages/Home";
import Practice from "../pages/Practica";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/practice", element: <Practice /> },
    ],
  },
]);
