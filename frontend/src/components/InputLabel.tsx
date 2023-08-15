import React, { ReactNode } from 'react';

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    value?: ReactNode | string,
}

export default function InputLabel(props: InputLabelProps) {
    return (
        <label htmlFor={props.htmlFor} className={`block font-medium text-sm text-gray-700 ` + props.className}>
            { props.value ? props.value : props.children }
        </label>
    );
}