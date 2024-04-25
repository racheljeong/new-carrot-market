"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

//1. get data of User
export async function getUser() {
    const session = await getSession();
    if(session.id){
        const user = db.user.findUnique({
            where : {
                id : session.id
            }
        });
        if(user){
            return user;  
        }
    }
    notFound();
}


export const logout = async() => {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}