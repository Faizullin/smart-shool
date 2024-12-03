import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import React from "react";
import About from "@/features/about/About";
import ProtectedRoute from "./ProtectedRoute";
import ArticleIndex from "@/features/article";
import Login from "../features/auth/Login";
import StudentProtectedRoute from "./StudentProtectedRoute";
import Register from "@/features/auth/Register";
import ForgotPassword from "@/features/auth/ForgotPassword";
import ForgotPasswordConfirm from "@/features/auth/ForgotPasswordConfirm";
import ArticleDetail from "@/features/article/ArticleDetail";
import Layout from "@/shared/layouts/Layout";
import {DashboardRouter} from "@/features/dashboard/router";
import AuthLayout from "@/shared/layouts/AuthLayout";
import ChatIndex from "../features/chat";

const QuizProcess = React.lazy(() => import("@/features/quiz/QuizProcess"));
const ConferenceRoom = React.lazy(
    () => import("@/features/conference/ConferenceRoom")
);
const ConferencePrepare = React.lazy(
    () => import("@/features/conference/ConferencePrepare")
);
const FaceIdLogin = React.lazy(() => import("@/features/face_id/FaceIdLogin"))
const FaceIdTrain = React.lazy(() => import("@/features/face_id/FaceIdTrain"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<About/>}/>

                <Route
                    path={"chat"}
                    element={(
                        <ProtectedRoute>
                            <ChatIndex/>
                        </ProtectedRoute>
                    )}
                ></Route>
                <Route path="article">
                    <Route
                        path=""
                        element={
                            <ProtectedRoute>
                                <ArticleIndex/>
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path=":id"
                        element={
                            <ProtectedRoute>
                                <ArticleDetail/>
                            </ProtectedRoute>
                        }
                    ></Route>
                </Route>
                <Route path="dashboard">{DashboardRouter}</Route>
            </Route>
            <Route path="/" element={<AuthLayout/>}>
                <Route path="auth">
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="forgot_password" element={<ForgotPassword/>}/>
                    <Route
                        path="password_reset/confirm"
                        element={<ForgotPasswordConfirm/>}
                    />
                </Route>
                <Route path="face_id">
                 <Route path="login" element={<FaceIdLogin/>}/>
                   <Route
                     path="train"
                       element={
                           <ProtectedRoute>
                               <StudentProtectedRoute>
                                   <FaceIdTrain/>
                               </StudentProtectedRoute>
                           </ProtectedRoute>
                       }
                  />
                </Route>
            </Route>
            <Route
                path="quiz/:id"
                element={
                    <ProtectedRoute>
                        <StudentProtectedRoute>
                            <QuizProcess/>
                        </StudentProtectedRoute>
                    </ProtectedRoute>
                }
            />
            <Route
                path="conference/:id"
                element={
                    <ProtectedRoute>
                        <ConferencePrepare/>
                    </ProtectedRoute>
                }
            ></Route>
            <Route
                path="conference/:id/room"
                element={
                    <ProtectedRoute>
                        <ConferenceRoom/>
                    </ProtectedRoute>
                }
            ></Route>
        </>
    )
);

export default router;
