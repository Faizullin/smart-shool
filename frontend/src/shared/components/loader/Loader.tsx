import React from "react";
import "./Loader.scss";

export default function Loader({ active }: { active: boolean }) {
  return <div className={`preloader h-100 ${active ? "" : "d-none"}`}></div>;
}
