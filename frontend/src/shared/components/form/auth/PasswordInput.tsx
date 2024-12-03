import React, { ChangeEvent, useState } from "react";

interface IPasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  processing?: boolean;
  isFocused?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: IPasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  //   const input = useRef<HTMLInputElement | null>(null);

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="input-group">
      <input
        type={passwordVisible ? "text" : "password"}
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
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleTogglePassword}
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
