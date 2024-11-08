import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomeComponents/HomePage.tsx";
import "./index.css";
import App from "./App.tsx";
import ShoppingPage from "./components/StoreFront/ShoppingPage.tsx";
import ProductPage from "./components/StoreFront/ProductPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import ProtectedAdminRoute from "./components/Routing/ProtectedAdminRoute.tsx";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/categorii/:category", element: <ShoppingPage /> },
      { path: "/produse/:type", element: <ShoppingPage /> },
      { path: "/produse/:type/:productID", element: <ProductPage /> },
      {
        path: "/centru-admin",
        element: (
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
