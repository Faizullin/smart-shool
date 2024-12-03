import ProtectedRoute from "@/router/ProtectedRoute";
import React from "react";
import { Route } from "react-router-dom";
import DashboardIndex from "./index";

const ProfileEdit = React.lazy(
  () => import("./features/profile/DashboardProfileEdit")
);
const StudentProtectedRoute = React.lazy(
  () => import("@/router/StudentProtectedRoute")
);
const DashboardResultIndex = React.lazy(() => import("./features/result"));
const DashboardExamIndex = React.lazy(() => import("./features/exam"));
const DashboardLayout = React.lazy(
  () => import("@/shared/layouts/DashboardLayout")
);
const CertificateIndex = React.lazy(() => import("./features/certificate"));
const DashboardProjectList = React.lazy(
  () => import("./features/project-list/DashboardProjectList")
);
const DashboardProjectEdit = React.lazy(
  () => import("./features/project-edit/DashboardProjectEdit")
);
const DashboardProjectInstructions = React.lazy(
  () => import("./features/project-instructions/DashboardProjectInstructions")
);
const DashboardProjectBroadcast = React.lazy(
  () => import("./features/project-broadcast/DashboardProjectBroadcast")
);
const ConferenceList = React.lazy(() => import("./features/conference"));

export const DashboardRouter = (
  <Route path="">
    <Route
      path=""
      element={
        <ProtectedRoute>
          <>
            <DashboardLayout />
          </>
        </ProtectedRoute>
      }
    >
      <Route path="" element={<DashboardIndex />} />
      <Route
        path="profile"
        element={<ProfileEdit />}
        handle={{
          crumb: [
            {
              label: "Profile",
              active: true,
            },
          ],
        }}
      />
      <Route
        path="results"
        element={
          <StudentProtectedRoute>
            <DashboardResultIndex />
          </StudentProtectedRoute>
        }
        handle={{
          crumb: [
            {
              label: "Results",
              active: true,
            },
          ],
        }}
      />
      <Route
        path="exams"
        element={
          <StudentProtectedRoute>
            <DashboardExamIndex />
          </StudentProtectedRoute>
        }
        handle={{
          crumb: [
            {
              label: "Exams",
              active: true,
            },
          ],
        }}
      />
      <Route
        path="conferences"
        element={<ConferenceList />}
        handle={{
          crumb: [
            {
              label: "Conferences",
              active: true,
            },
          ],
        }}
      />
      <Route
        path="certificates"
        element={
          <StudentProtectedRoute>
            <CertificateIndex />
          </StudentProtectedRoute>
        }
        handle={{
          crumb: [
            {
              label: "Certificates",
              active: true,
            },
          ],
        }}
      />
    </Route>
    <Route
      path="projects"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
      handle={{
        crumb: [
          {
            label: "Projects",
            active: true,
          },
        ],
      }}
    >
      <Route
        path=""
        element={
          <StudentProtectedRoute>
            <DashboardProjectList />
          </StudentProtectedRoute>
        }
      />
      <Route
        path=":id/edit"
        element={
          <StudentProtectedRoute>
            <DashboardProjectEdit />
          </StudentProtectedRoute>
        }
      />
      <Route
        path=":id/broadcast"
        element={
          <StudentProtectedRoute>
            <DashboardProjectBroadcast />
          </StudentProtectedRoute>
        }
        // handle={{
        //   crumb: [
        //     {
        //       label: "Certificates",
        //       active: true,
        //     },
        //   ],
        // }}
      />
      <Route
        path=":id/instructions"
        element={
          <StudentProtectedRoute>
            <DashboardProjectInstructions />
          </StudentProtectedRoute>
        }
      />
    </Route>
  </Route>
);
