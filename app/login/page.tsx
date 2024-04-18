
"use client";

import { useFormState } from "react-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LoginAction from "./action";

export default function CreateAccount() {

    const [state, loginTrigger] = useFormState(LoginAction, null);

    return (
        <div className="flex flex-col gap-2 bg-slate-50 py-8 px-5">
        <h1 className="font-semibold font-sans text-3xl text-orange-400 text-center mb-10">Welcome!</h1>
        <div className="flex align-middle justify-center">
                <form action={loginTrigger}>
                    <Input 
                        name="email"
                        type="email"
                        required
                        placeholder="email"
                        errors={state?.fieldErrors?.email}
                    />
                    <Input 
                        name="password"
                        type="password"
                        required
                        placeholder="password"
                        errors={state?.fieldErrors?.password}
                    />
                    <Button text="Login" />
                </form>
            </div>
        </div>

    );
}