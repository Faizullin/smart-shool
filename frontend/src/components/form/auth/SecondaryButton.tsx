import React from "react";

interface IPrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    processing?: boolean
    onClick?: (data: any) => any | React.MouseEventHandler<HTMLButtonElement>
}

export default function SecondaryButton(props: IPrimaryButtonProps) {
    return (
        <button
            type={props.type}
            className={
                `items-center px-4 py-2 border border-dark font-semibold text-xs text-dark uppercase tracking-widest active:bg-gray-900 active:text-white transition ease-in-out duration-150 bg-white w-full ${
                    props.processing && 'opacity-25'
                } ` + props.className
            }
            disabled={props.processing}
            onClick={props.onClick}
        >
            { props.children }
        </button>
    );
}