import React from "react";

interface IInputErrorProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string
    messages?: string[]

}

export default function InputError(props: IInputErrorProps) {
    if (!props.messages && !props.message) {
        return null
    }
    if (props.messages !== undefined) {
        return props.messages.length > 0 ? <p className={'text-sm text-red-600 ' + props.className}>{props.messages[0]}</p> : null
    }
    return props.message ? <p className={'text-sm text-red-600 ' + props.className}>{props.message}</p> : null;
}