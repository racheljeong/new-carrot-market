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
            className="text-orange-400 py-2 px-4 m-4 bg-slate-100 font-semibold border-2 border-slate-500 rounded-md primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
            {pending? "Submitting..." : text}
        </button>
    );
}