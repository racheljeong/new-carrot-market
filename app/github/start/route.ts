import { redirect } from "next/navigation";


export function GET() {
    const baseURL = "https://github.com/login/oauth/authorize";
    const params = {
        client_id : process.env.GITHUB_CLIENT_ID!,
        scope : "read:user,user:email", //대상의 정보와 이메일 읽기만 가능
        allow_signuo : "true", //미가입자 가능 여부
    };

    const formattedParams = new URLSearchParams(params).toString();
    const finalUrl = `${baseURL}?${formattedParams}`;
    return redirect(finalUrl);

}