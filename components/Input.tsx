import { InputHTMLAttributes } from "react";

interface IInputProps {
    name : string;
    errors? : string[]
}

export default function Input ({name, errors = [], ...rest} : IInputProps & InputHTMLAttributes<HTMLInputElement>) {
    //console.log(rest);
    return(
        <div>
            <input
                name={name} 
                className="bg-transparent rounded-md w-full h-10 p-2 m-3 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:bg-white focus:ring-orange-500 border-none placeholder:text-neutral-400" 
                {...rest}
            />
            {errors &&
                errors.map((error, index) => (
                    <span key={index} className="text-red-500 font-medium">{error}</span>
                ))}
        </div>
    );
}