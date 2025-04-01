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
import MeasurementsPage from "./components/AdditionalPages/MeasurementsPage.tsx";
import ContactPage from "./components/AdditionalPages/ContactPage.tsx";
import OrderPage from "./components/Dashboard/OrderPage.tsx";
import ForgottenPasswordPage from "./components/AdditionalPages/ForgottenPasswordPage.tsx";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/categorii/:category", element: <ShoppingPage /> },
      { path: "/produse", element: <ShoppingPage /> },
      { path: "/produse/:type", element: <ShoppingPage /> },
      { path: "/produse/:type/:productID", element: <ProductPage /> },
      { path: "/seturi/:setType", element: <ShoppingPage /> },
      { path: "/seturi/:setType/:productID", element: <ProductPage /> },
      {
        path: "/centru-admin",
        element: (
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "/comenzi",
        element: (
          <ProtectedAdminRoute>
            <OrderPage />
          </ProtectedAdminRoute>
        ),
      },
      { path: "/ghid-marimi", element: <MeasurementsPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/resetare-parola", element: <ForgottenPasswordPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
