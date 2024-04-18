
"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./action";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function CreateAccount() {

    const [state, userTrigger] = useFormState(createAccount, null);


    return (
        <div className="flex flex-col gap-2 bg-slate-50 py-8 px-5">
            <h1 className="font-semibold font-sans text-3xl text-orange-600 text-center mb-10">Welcome!</h1>
            <div className="flex align-middle justify-center">
                <form action={userTrigger}>
                    <Input 
                        name="username"
                        type="text"
                        required
                        placeholder="username"
                        errors={state?.fieldErrors?.username}
                    />
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
                    <Input 
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="Confirm Password"
                        errors={state?.fieldErrors?.confirmPassword}
                    />
                    <Button text="Created Account" />
                </form>
            </div>
        </div>

    );
}