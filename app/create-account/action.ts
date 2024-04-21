"use server";
import { MIN_LENGTH, PWD_REGEX, PWD_REGEX_ERRORMSG } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import getSession from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkPassword = ({password, confirmPassword} : {password : string, confirmPassword : string}) => password === confirmPassword;

 //1. check if username is taken
// const checkUsernameUnique = async (username : string) => {

//     const userName = await db.user.findUnique({
//         where : {
//             username,
//         },
//         select : {
//             id : true
//         }
//     });
//     return !Boolean(userName);
// }

//2. check if email is taken
// const checkEmailUnique = async (email : string) => {
//     const userEmail = await db.user.findUnique({
//         where : {
//             email
//         },
//         select : {
//             id : true
//         }
//     });
//     return Boolean(userEmail) === false;
// }

const accountSchema = z.object({
    username : z.string({
        invalid_type_error : "Username must be String",
        required_error : "Username is required"
    })
        .min(MIN_LENGTH, "Username should be longer than 4")
        .trim()
        .toLowerCase(),
        //.refine(checkUsernameUnique, "This Username is already been using"),
    email : z.string()
        .email()
        .toLowerCase(),
        //.refine(checkEmailUnique, "This Email is already been using"),
    password : z.string()
        .min(MIN_LENGTH, "Password should be longer than 4")
        .regex(PWD_REGEX, PWD_REGEX_ERRORMSG),
    confirmPassword : z.string()
        .min(MIN_LENGTH),
})
//superRefine으로 db 한번만 다녀오기
.superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
        where : {
            username,
        },
        select : {
            id : true
        }
});
if(user){
    ctx.addIssue({
        code : "custom",
        message : "This Username is already been using",
        path :["username"],
        fatal : true,
    });
    return z.NEVER;
}
})
.superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
        where : {
            email,
        },
        select : {
            id : true
        }
});
if(user){
    ctx.addIssue({
        code : "custom",
        message : "This Email is already been using",
        path :["email"],
        fatal : true,
    });
    return z.NEVER;
}
})
.refine(checkPassword, {
    message : "Password does not match",
    path : ["confirmPassword"]

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

    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten(); // error formatting func
    } else {
        //No code for validation here
        //3. hash password
        const hashedPwd = await bcrypt.hash(result.data.password, 12); 
        //12번알고리즘 돌리겠다
               
        //4. save the user to prisma(db)
        //기본적으로 data를 다 들고오니 select로 id만 들고오게함
        const createdUser = await db.user.create({
            data : {
                username : result.data.username,
                email : result.data.email,
                password : result.data.password,
            },
            select : {
                id : true,
            }
        });
        console.log(createdUser);

        //5. log the user in === give Cookie to user : session.ts
        const session = await getSession();
        session.id = createdUser.id;
        await session.save();
        //6. redirect to somewhere else
        redirect("/profile");
    }
}

