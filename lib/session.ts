import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface sessionContents {
    id? : number;
    //회원가입/로그인 안한 경우 id가 없을수도 있음
}


export default function getSession() {
    return getIronSession<sessionContents>(cookies(), {
        cookieName : "carrot-user",
        password: process.env.COOKIE_PASSWORD!,
    });
}