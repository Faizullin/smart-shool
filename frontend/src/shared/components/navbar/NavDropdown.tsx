import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { ReactNode, useState } from "react";

function NavDropdown({
  className,
  titleComponent,
  children,
  mobile,
}: {
  className?: string;
  titleComponent: ReactNode;
  mobile: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = (event) => {
    event.preventDefault();
    if (mobile) {
      setIsOpen((state) => !state);
    }
  };
  return (
    <li className={`dropdown ${className ? className : ""}`}>
      <a
        href="#"
        className="text-color-black-26 font-noto"
        onClick={handleToggleDropdown}
      >
        {titleComponent}
        <Icon path={isOpen ? mdiChevronUp : mdiChevronDown} size={1} />
      </a>
      <ul className={`${isOpen && mobile ? "dropdown-active" : ""}`}>
        {children}
      </ul>
    </li>
  );
}

export default NavDropdown;
