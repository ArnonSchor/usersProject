import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Signup from "./pages/Signup.tsx";
import ErrorPage from "./pages/ErrorPages/ErrorPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import SignIn from "./pages/SignIn.tsx";
import { TheSite } from "./pages/TheSite.tsx";
import ProtectRoute from "./components/ProtectedRoute.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/the-site",
    element: (
      <ProtectRoute>
        <TheSite />
      </ProtectRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
