"use server";
import { MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";


const loginSchema = z.object({
    email : z.string({required_error : "Email is required"})
                .email()
                .trim()
                .toLowerCase(),
    password : z.string({required_error : "Password is required"})
                .min(MIN_LENGTH, "Password should be longer than 4")
});

export default async function LoginAction(prevData : any, data : FormData) {
    const loginData = {
        email : data.get("email"),
        password : data.get("password"),
    }

    const result = loginSchema.safeParse(loginData);
    console.log(result);

    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten();
    } else {
        console.log(result.data);
    }

}