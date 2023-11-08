import { createBrowserRouter, Link } from "react-router-dom";
// import Register from "../pages/auth/Register";
// import Login from "../pages/auth/Login";
// import ProtectedRoute from "./ProtectedRoute";
// import ArticleIndex from "../pages/article";
import About from "../pages/About";
// import ForgotPassword from '../pages/auth/ForgotPassword';
// import ForgotPasswordConfirm from "../pages/auth/ForgotPasswordConfirm";
// import ProfileIndex from "../pages/dashboard";
// import ProfileEdit from "../pages/dashboard/profile/ProfileEdit";
// import StudentProtectedRoute from "./StudentProtectedRoute";
// import ExamIndex from "../pages/dashboard/exam";
// import ResultIndex from "../pages/dashboard/result";
// import QuizProcess from "../pages/quiz/QuizProcess";
// import HasCompletedFaceIdRoute from "./HasCompletedFaceIdRoute";
// import ArticleDetail from "../pages/article/ArticleDetail";
// import CertificateIndex from "../pages/dashboard/certificate";
import { FormattedMessage } from "react-intl";
import React from "react";


// const FaceIdLogin = React.lazy(() => import("../pages/face_id/FaceIdLogin"));
// const FaceIdTrain = React.lazy(() => import("../pages/face_id/FaceIdTrain"));
// const FaceIdVerify = React.lazy(() => import("../pages/face_id/FaceIdVerify"));

const router = createBrowserRouter([
  {
    path: "/",
    handle: {
      crumb: () => <Link to="/">
        <FormattedMessage id="app.url.home" />
      </Link>,
    },
    children: [
      {
        path: "/",
        element: <About />,
        handle: {},
      },
      // {
      //   path: "/article",
      //   handle: {},
      //   children: [
      //     {
      //       path: "",
      //       element: (
      //         <ProtectedRoute>
      //           <ArticleIndex />
      //         </ProtectedRoute>
      //       ),
      //       handle: {
      //         crumb: () => <span> <FormattedMessage id="app.url.articles" /> </span>,
      //       }
      //     },
      //     {
      //       path: ":id",
      //       element: (
      //         <ProtectedRoute>
      //           <ArticleDetail />
      //         </ProtectedRoute>
      //       ),
      //       handle: {
      //         crumb: () => <span> <FormattedMessage id="app.url.articles" /> </span>,
      //       }
      //     },
      //   ]
      // },
      // {
      //   path: "/auth",
      //   children: [
      //     {
      //       path: "register",
      //       element: <Register />,
      //     },
      //     {
      //       path: "login",
      //       element: <Login />,
      //     },
      //     {
      //       path: "forgot_password",
      //       element: <ForgotPassword />,
      //     },
      //     {
      //       path: "password_reset/confirm",
      //       element: <ForgotPasswordConfirm />,
      //     },
      //   ]
      // },
      // {
      //   path: "/face_id",
      //   children: [
      //     {
      //       path: "login",
      //       lazy: () => import("../pages/face_id/FaceIdLogin") as any,
      //       element: <FaceIdLogin />,
      //     },
      //     {
      //       path: "train",
      //       lazy: () => import("../pages/face_id/FaceIdTrain") as any,
      //       element: <FaceIdTrain />,

      //     },
      //     {
      //       path: "verify",
      //       lazy: () => import("../pages/face_id/FaceIdVerify") as any,
      //       element: <FaceIdVerify />,

      //     },
      //   ]
      // },
      // {
      //   path: "/dashboard",
      //   children: [
      //     {
      //       path: "profile",
      //       children: [
      //         {
      //           path: "",
      //           element: (
      //             <ProtectedRoute>
      //               <ProfileIndex />
      //             </ProtectedRoute>
      //           ),
      //         },
      //         {
      //           path: "edit",
      //           element: (
      //             <ProtectedRoute>
      //               <ProfileEdit />
      //             </ProtectedRoute>
      //           ),
      //         },
      //       ]
      //     },
      //     {
      //       path: "results",
      //       element: (
      //         <StudentProtectedRoute>
      //           <ResultIndex />
      //         </StudentProtectedRoute>
      //       ),
      //     },
      //     {
      //       path: "exams",
      //       element: (
      //         <StudentProtectedRoute>
      //           <ExamIndex />
      //         </StudentProtectedRoute>
      //       ),
      //     },
      //     {
      //       path: "certificates",
      //       element: (
      //         <StudentProtectedRoute>
      //           <CertificateIndex />
      //         </StudentProtectedRoute>
      //       ),
      //     }
      //   ],
      // },
      // {
      //   path: "quiz/:id/",
      //   element: (
      //     <ProtectedRoute>
      //       <HasCompletedFaceIdRoute forRoute="/quiz/">
      //         <QuizProcess />
      //       </HasCompletedFaceIdRoute>
      //     </ProtectedRoute>
      //   ),
      // },
    ]
  },
],);
export default router;