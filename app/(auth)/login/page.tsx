
"use client";

import { useFormState } from "react-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LoginAction from "./action";
import GithubLogin from "@/components/Github-login";

export default function CreateAccount() {

    const [state, loginTrigger] = useFormState(LoginAction, null);

    return (
        <div className="flex flex-col items-center justify-center p-6 mt-10 max-w-screen-sm">
            <h1 className="font-semibold font-sans text-3xl text-orange-600 text-center mb-10">🥕 Login</h1>
            <div className="flex flex-col align-middle justify-center mt-10">
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
                <Button text="Login"/>
            </form>
            <GithubLogin />
        </div>
    </div>

    );
}