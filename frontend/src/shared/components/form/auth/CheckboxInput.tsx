import React from 'react';

interface ICheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default function CheckboxInput(props: ICheckboxInputProps) {
    return (
        <input
            type="checkbox"
            name={props.name}
            value={props.value}
            className="rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={props.onChange}
        />
    );
}