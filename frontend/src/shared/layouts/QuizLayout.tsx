import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { fetchUserData } from "@/core/redux/store/reducers/authSlice";
import Header from "../components/header/Header";
import AOS from 'aos';
import "aos/dist/aos.css";

type IQuizLayoutProps = {
  children: ReactNode;
};

export default function QuizLayout({ children }: IQuizLayoutProps) {
  const dispath = useAppDispatch();
  const {  isAuthenticated } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
    if (!isAuthenticated) {
      dispath(fetchUserData());
    }
  }, [dispath, isAuthenticated]);
  return (
    <>
      <Header></Header>
      <div className="flex-grow">{children}</div>
    </>
  );
}
