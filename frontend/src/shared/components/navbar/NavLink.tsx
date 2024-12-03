import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({
  children,
  link,
  onClick,
}: {
  children: React.ReactNode;
  link: any;
  onClick: (event?: any) => void;
}) {
  return (
    <>
      {link.href ? (
        <a
          onClick={onClick}
          href={link.href}
          className={`${link.href ? "scrollto" : ""} ${
            link.active ? "active" : ""
          } h-100 text-color-black-26 font-noto text-uppercase `}
        >
          {link.label}
        </a>
      ) : (
        <Link
          onClick={onClick}
          className={`${link.href ? "scrollto" : ""} ${
            link.active ? "active" : ""
          } h-100 text-color-black-26 font-noto text-uppercase`}
          to={link.to}
        >
          {link.label}
        </Link>
      )}
    </>
  );
}
