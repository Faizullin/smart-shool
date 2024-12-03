import React from "react";
import "./secondary-button.scss";

interface IPrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  processing?: boolean;
  onClick?: (data: any) => any | React.MouseEventHandler<HTMLButtonElement>;
}

export default function SecondaryButton(props: IPrimaryButtonProps) {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={
        `secondary-button text-color-white-normal font-noto font-weight-medium ${
          props.processing && "opacity-25"
        } ` + props.className
      }
      disabled={props.processing}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
