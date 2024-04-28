"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import { z } from "zod";
import { File, Blob } from "@web-std/file";
import path from "path";

const TweetsSchema = z.object({
    photo: z.string({
        required_error: "Photo is required",
    }),
    title: z.string({
        required_error: "Title is required!!!!!",
    }),
    contents: z.string({
        required_error: "contents is required",
    }),
      
});



export default async function createTweet(_: any, formData : FormData) {

    const data = {
        photo : formData.get("photo"),
        title : formData.get("title"),
        contents : formData.get("contents"),
    }

    console.log(`data.photo`,data.photo);
    // const fileExtension = data.photo!.split('.').pop(); // 파일 확장자 추출
    // const mimeType = `image/${fileExtension}`; // 확장자를 기반으로 MIME 유형 설정
    // const photoFile = new File([photoData], fileName, { type: mimeType });

    const uniqueName = new Date().getTime(); // 타임스탬프를 인덱스로 사용
    const fileName = `file_${uniqueName}.jpg`; // 파일 이름에 인덱스 추가  
    const file = new File([data.photo!], fileName, { type: "text/plain" });
    
     // 파일 객체 생성 및 저장
     const photoBlob = new Blob([data.photo!], { type: "image/*" });  // 블랍 생성
     const photoFile = new File([photoBlob], fileName);  // 파일 객체 생성

    
    // 저장할 디렉토리 설정 및 파일 저장
    const savePath = path.join(process.cwd(), "public", "upload", photoFile.name);
    await fs.writeFile(savePath, Buffer.from(await photoBlob.arrayBuffer())); 
    data.photo = fileName;
    console.log(`photoFile.name`,photoFile.name);

    const result = TweetsSchema.safeParse(data);

    console.log(`result`,result);

    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        if(session.id) {
            const tweet = await db.tweet.create({
                data : {
                    title : result.data.title,
                    photo : result.data.photo,
                    //photo : `/uploads/${file}`,  // 이미지 경로 저장
                    contents : result.data.contents,
                    user : {
                        connect : {
                            id : session.id
                        }
                    }
                },
                select : {
                    id : true
                }
            });
            console.log(`photoooo`,data.photo);
            //redirect(`/tweets/${tweet.id}`);
            redirect(`/tweets`);
        }
    }




   
}