import React from "react";

interface IEmptyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  processing?: boolean;
  onClick?: (data: any) => any | React.MouseEventHandler<HTMLButtonElement>;
}

export default function EmptyButton(props: IEmptyButtonProps) {
  return (
    <button
      type={props.type}
      className={
        `btn text-color-white-normal font-noto font-weight-medium text-uppercase ${
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
