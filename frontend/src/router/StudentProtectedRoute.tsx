import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../core/hooks/redux";

const StudentProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  if (
    user &&
    (user?.roles?.includes("teacher") || user?.roles?.includes("admin"))
  ) {
  } else if (!user?.roles?.includes("student")) {
    return <Navigate to="/dashboard/profile/" />;
  }
  return children;
};
export default StudentProtectedRoute;
