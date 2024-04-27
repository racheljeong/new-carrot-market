import FloatingBtn from "@/components/FloatingBtn";
import db from "@/lib/db";
import Link from "next/link";
import { CameraIcon } from "@heroicons/react/24/outline";




async function getTweets() {
    const tweetList = await db.tweet.findMany ({
        select : {
            id :true,      
            title : true,      
            photo : true, 
            contents : true,
            tag : true,
            view : true,
            createdAt : true, 
            _count : {
                select : {
                    likes : true,
                }
            }
        }
    });
    //console.log(tweetList);
    return tweetList;
}

export default async function Tweet() {
    const tweetList = await getTweets();
    console.log(tweetList);

    return(
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                {tweetList.map((tweet) => (
                <div className="flex flex-row gap-5 border-2 border-slate-300 m-2 p-2 rounded-md">
                <Link key={tweet.id} href={`tweets/${tweet.id}`}>
                    <div>
                    {tweet.photo ?
                        <img src={tweet.photo} className="size-28 rounded-md"/>
                        :
                        <CameraIcon className="h-6 w-6 text-gray-500" />
                        }
                    </div>
                </Link>
                <div className="flex flex-col justify-between p-2">
                <Link href={`tweets/${tweet.id}`}>
                    <span className="font-semibold text-lg">{tweet.title}</span>
                </Link>
                <span className="w-72 truncate">{tweet.contents}</span>
                </div>
                 <div className="w-full flex size-7 justify-end">
                    <svg className="pr-3 align-middle justify-center" data-slot="icon" fill="none" strokeWidth="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                    </svg>
                </div>
             </div>
                ))}
            </div>
           <FloatingBtn />
        </div>
    );
}