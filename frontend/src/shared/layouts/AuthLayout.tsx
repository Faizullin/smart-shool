import React from "react";
import { Outlet } from "react-router-dom";
import "./AuthLayout.scss";

export default function AuthLayout() {
  return (
    <div className="auth-layout vh-100 bg-green-darker">
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <Outlet />
      </div>
    </div>
  );
}
