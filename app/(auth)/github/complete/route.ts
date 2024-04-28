import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const {error, access_token} = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avatar_url, login, username} = await userProfileResponse.json();

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    //이미 깃헙 계정있는경우
      const session = await getSession();
      session.id = user.id;
      await session.save();

      return redirect("/main");
    }

    //깃헙 계정 생성 : 이미 동일 이름 있을 경우 처리 필요
    const chkUserExist = await db.user.findUnique({
      where : {
        username
      }
    }); 
    const loginedUser = chkUserExist ? `${login}_gh` : login;
    //console.log(`loginedUser`,loginedUser);
    
    const newUser = await db.user.create({
      data: {
        username: loginedUser, 
        github_id: id + "",
        avatar: avatar_url,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = newUser.id;
    await session.save();
    return redirect("/main");

}