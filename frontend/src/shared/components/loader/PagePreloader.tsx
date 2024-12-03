import React from "react";
import "./Loader.scss";

export default function PagePreloaderLoader({ active }: { active: boolean }) {
  return <div className={`preloader ${active ? "" : "d-none"}`}></div>;
}
