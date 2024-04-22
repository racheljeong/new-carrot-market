
"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./action";
import Input from "@/components/Input";
import Button from "@/components/Button";
import GithubLogin from "@/components/github-login";

export default function CreateAccount() {

    const [state, userTrigger] = useFormState(createAccount, null);


    return (
        <div className="items-center justify-center p-6 mt-10 max-w-screen-sm">
            <h1 className="font-semibold font-sans text-3xl text-orange-600 text-center mb-10">Welcome!</h1>
            <div className="flex flex-col align-middle justify-center mt-10">
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