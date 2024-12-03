import React, { ChangeEvent } from "react";

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  processing?: boolean;
  isFocused?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: ITextInputProps) {
  return (
    <div className="flex flex-col items-start">
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        className={`form-control ${props.className ? props.className : ""}`}
        onChange={(e) => props.onChange(e)}
        readOnly={props.readOnly}
        disabled={props.disabled}
        autoComplete={
          typeof props.autoComplete == "boolean"
            ? props.autoComplete
              ? "on"
              : "off"
            : props.autoComplete
        }
      />
    </div>
  );
}
