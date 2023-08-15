import './MicroButton.css'
import { mdiMicrophone } from '@mdi/js';
import Icon from '@mdi/react';

export interface IMicroButtonProps {
    onClick: (e?: any) => void
    active: boolean
}

export default function MicroButton({ onClick, active }: IMicroButtonProps) {
    return (
        <div>
            <button className={`microphone-button ${active ? 'pulse' : ''}`} onClick={onClick}>
                <Icon path={mdiMicrophone} size={1} />
                {/* <svg
                    className="mdi-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d={mdiMicrophone} />
                </svg> */}

            </button>
        </div>
    );
}
