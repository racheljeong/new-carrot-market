import { InputHTMLAttributes } from "react";

interface IInputProps {
    name : string;
    value ? : string;
    errors? : string[]
}

export default function Input ({name, value, errors = [], ...rest} : IInputProps & InputHTMLAttributes<HTMLInputElement>) {
    //console.log(rest);
    return(
        <div className="flex flex-row justify-center align-middle">
            <input
                name={name}
                value={value}
                className="bg-transparent text-amber-500 rounded-md w-52 h-7 p-2 m-2 
                    justify-center align-middle
                    focus:outline-none ring-2 
                    focus:ring-4 transition ring-neutral-200 
                    focus:bg-white 
                    focus:ring-orange-500 border-none 
                    placeholder:text-neutral-400" 
                {...rest}
            />
            {errors &&
                errors.map((error, index) => (
                    <span key={index} className="text-red-500 font-medium">{error}</span>
                ))}
        </div>
    );
}