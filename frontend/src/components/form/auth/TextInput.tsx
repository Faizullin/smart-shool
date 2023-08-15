import React, { useEffect, useRef, ChangeEvent } from "react";

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    processing?: boolean
    isFocused?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput(props: ITextInputProps) {
    const input = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.isFocused && input.current != null) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                ref={input}
                type={props.type}
                id={props.name}
                name={props.name}
                value={props.value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm` +
                    props.className
                }
                autoComplete={props.autoComplete}
                required={props.required}
                onChange={(e) => props.onChange(e)}
            />
        </div>
    );
}