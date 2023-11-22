// ProtectedRoute.tsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  element: React.ReactNode;
}

const ProtectedRoute = ({ element, isAuthenticated, ...rest }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return isAuthenticated ? (
    <Routes>
      {" "}
      <Route {...rest} element={element} />
    </Routes>
  ) : null;
};

export default ProtectedRoute;
