import React from "react";
import "./DarkButton.scss";

interface IDarkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  processing?: boolean;
  style?: React.CSSProperties;
  onClick?: (data: any) => any | React.MouseEventHandler<HTMLButtonElement>;
}

export default function DarkButton(props: IDarkButtonProps) {
  return (
    <button
      type={props.type}
      className={
        `dark-button text-color-white-normal font-noto font-weight-medium ${
          props.processing && "opacity-25"
        } ` + props.className
      }
      disabled={props.processing}
      style={props.style || {}}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
