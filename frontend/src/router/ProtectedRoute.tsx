import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/core/hooks/redux";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const currentLocation = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: `/auth/login`,
          search: `redirect=${currentLocation.pathname}`,
        }}
      />
    );
  }
  return children;
};
export default ProtectedRoute;
