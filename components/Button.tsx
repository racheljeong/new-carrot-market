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
            className="w-full primary-btn h-10 mt-10"
        >
            {pending? "Submitting..." : text}
        </button>
    );
}