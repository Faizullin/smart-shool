import { useAppSelector } from "@/core/hooks/redux";
import React from "react";
import { Alert } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default function DashboardInfoSidebar() {
  const { userData, studentData } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="col-lg-4">
      <div className="card mb-4">
        <div className="card-body text-center">
          <h5 className="my-3">{userData?.username}</h5>
          {userData?.roles.map((item: string, index: number) => (
            <p key={index} className="text-muted mb-1">
              {item}
            </p>
          ))}
          <p className="text-muted mb-4">{studentData?.current_group?.title}</p>
        </div>
      </div>
      <div className="card mb-4 mb-lg-0">
        <div className="card-body p-0">
          <ul className="list-group list-group-flush rounded-3">
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="fas fa-globe fa-lg text-warning" />
              <Link
                to={"/dashboard"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage id="main" defaultMessage="Main" />
              </Link>
            </li>
            <li
              className={`${
                user?.roles?.includes("student") ? "" : "d-none"
              } list-group-item d-flex justify-content-between align-items-center p-3`}
            >
              <i className="fas fa-globe fa-lg text-warning" />
              <Link
                to={"/dashboard/projects"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage
                  id="my_projects"
                  defaultMessage="My projects"
                />
              </Link>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
              <i className="fab fa-github fa-lg" style={{ color: "#333333" }} />
              <Link
                to={"/dashboard/profile"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage id="profile" defaultMessage="Profile" />
              </Link>
            </li>
            <li
              className={`list-group-item d-flex justify-content-between align-items-center p-3`}
            >
              <i
                className="fab fa-twitter fa-lg"
                style={{ color: "#55acee" }}
              />
              <Link
                to={"/dashboard/conferences"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage id="dashboard.Th4u/F" defaultMessage="Conferences" />
              </Link>
            </li>
            <li
              className={`${
                user?.roles?.includes("student") ? "" : "d-none"
              } list-group-item d-flex justify-content-between align-items-center p-3`}
            >
              <i
                className="fab fa-twitter fa-lg"
                style={{ color: "#55acee" }}
              />
              <Link
                to={"/dashboard/exams"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage id="exams" defaultMessage="Exams" />
              </Link>
            </li>
            <li
              className={`${
                user?.roles?.includes("student") ? "" : "d-none"
              } list-group-item d-flex justify-content-between align-items-center p-3`}
            >
              <i
                className="fab fa-instagram fa-lg"
                style={{ color: "#ac2bac" }}
              />
              <Link
                to={"/dashboard/results"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage id="results" defaultMessage="Results" />
              </Link>
            </li>
            <li
              className={`${
                user?.roles?.includes("student") ? "" : "d-none"
              } list-group-item d-flex justify-content-between align-items-center p-3`}
            >
              <i
                className="fab fa-facebook-f fa-lg"
                style={{ color: "#3b5998" }}
              />
              {/* <Link
                to={"/dashboard/certificates"}
                className="mb-0 text-black text-decoration-none"
              >
                <FormattedMessage
                  id="certificates"
                  defaultMessage="Certificates"
                />
              </Link> */}
            </li>
            {userData?.roles.filter(
              (role_item) => role_item === "admin" || role_item === "teacher"
            ).length > 0 && (
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i
                  className="fab fa-facebook-f fa-lg"
                  style={{ color: "#3b5998" }}
                />
                <Alert variant="info">
                  <a href="/s/">Admin / Teacher dashboard</a>
                </Alert>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
