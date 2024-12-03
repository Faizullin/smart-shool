import { useAppSelector } from "@/core/hooks/redux";
import DashboardInfoSidebar from "@/shared/components/sidebar/DashboardInfoSidebar";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function DashboardProfileEdit() {
  const { userData, studentData, loading } = useAppSelector(
    (state) => state.user
  );
  return (
    <div className="row">
      <DashboardInfoSidebar />
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">
                  <FormattedMessage id="username" />
                </p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userData?.username}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">
                  <FormattedMessage id="email" />
                </p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userData?.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0"><FormattedMessage
                    id="subject_group"
                    defaultMessage="Subject group"
                  /></p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {studentData?.current_group
                    ? studentData?.current_group?.title
                    : "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
