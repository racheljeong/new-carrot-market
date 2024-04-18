"use server";
import { MIN_LENGTH, PWD_REGEX, PWD_REGEX_ERRORMSG } from "@/lib/constants";
import { z } from "zod";

const accountSchema = z.object({
    username : z.string({
        invalid_type_error : "Username must be String",
        required_error : "Username is required"
    })
    .min(MIN_LENGTH, "Username should be longer than 4")
    .trim()
    .toLowerCase(),
    email : z.string().email().toLowerCase(),
    password : z.string().min(MIN_LENGTH, "Password should be longer than 4")
                .regex(PWD_REGEX, PWD_REGEX_ERRORMSG),
    confirmPassword : z.string().min(MIN_LENGTH),
}).superRefine(({password, confirmPassword}, ctx) => {
    if(password !== confirmPassword){
        ctx.addIssue({
            code: "custom",
            message: "Two passwords should be equal",
            path: ["confirm_password"],
          });
    }
});

export async function createAccount (prevData : any ,data : FormData) {
    const userData = {
        username : data.get("username"),
        email : data.get("email"),
        password : data.get("password"),
        confirmPassword : data.get("confirmPassword"),
    }
    //zod의 validation func이 다 async이므로 zod에게 async라고 알려준다 -> safeParseAsync
    const result = await accountSchema.safeParseAsync(userData);
    console.log(`result`,result);

    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten(); // error formatting func
    } else {
        //No code for validation here
        console.log(result.data);

        //1. check if username is taken
        //2. check if email is taken
        //3. hash password
        //4. save the user to prisma(db)
        //5. log the user in
        //6. redirect to home
    }
}

