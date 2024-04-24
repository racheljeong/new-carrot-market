"use client";

import { useFormStatus } from "react-dom";

interface IButtonProps {
    text : string;
}
export default function Button({text} : IButtonProps) {
    const { pending } = useFormStatus();
    return(
        <button 
            disabled={pending}
            className="w-72 primary-btn h-10 mt-7 mb-0"
        >
            {pending? "Submitting..." : text}
        </button>
    );
}