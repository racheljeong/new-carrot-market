"use server";
import { MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

//1. find a user with email
const emailExistYn = async (email : string) => {
    const userEmail = db.user.findUnique({
        where : {
            email
        },
        select : {
            id : true
        }
    });
    return Boolean(userEmail);
}

const loginSchema = z.object({
    email : z.string({required_error : "Email is required"})
                .email()
                .trim()
                .toLowerCase()
                .refine(emailExistYn, "Email does not exist"),
    password : z.string({required_error : "Password is required"})
                .min(MIN_LENGTH, "Password should be longer than 4")
});


export default async function LoginAction(prevData : any, data : FormData) {
    const loginData = {
        email : data.get("email"),
        password : data.get("password"),
    }

    const result = await loginSchema.safeParseAsync(loginData);
    //console.log(result);

    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten();
    } else {
        //2. if user is founded, check hashed password
        const user = await db.user.findUnique({
            where : {
                email : result.data.email
            },
            select : {
                id : true,
                password : true
            }
        });
     
        //3. if hashed password same with logined password
        const passwordChk = await bcrypt.compare(
            result.data.password, 
            user!.password ?? "1234lL!"
        );

        if(passwordChk){
            //4. let user loged in
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            //5. redirect somewhere else
            redirect("/main")
        } else {
            return {
                //error 발생시 zod의 fieldError 처럼 만들어 보내기
                fieldErrors : {
                    password : ["Wrong password"],
                    email : []
                }
            };
        }
 

    }

}