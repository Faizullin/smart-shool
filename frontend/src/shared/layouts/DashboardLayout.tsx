import React from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import {
  fetchStudentData,
  fetchUserData,
} from "@/core/redux/store/reducers/userSlice";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/dashboard/Breadcrumbs";
import TitleHelment from "../components/title/TitleHelmet";

const DashboardLayout = () => {
  const { userData, studentData, loading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (!userData && !loading.detail) {
      dispatch(fetchUserData());
    } else {
      if (!studentData && userData && userData.roles.includes("student")) {
        dispatch(fetchStudentData());
      }
    }
  }, [userData]);

  return (
    <section style={{ backgroundColor: "#eee" }} className="h-100 flex-grow-1 ">
      <TitleHelment title={"Dashboard"} />
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <Breadcrumbs />
          </div>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
