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
                <CameraIcon className="h-20 w-20 text-gray-300" />
                    {/* <div>
                    {tweet.photo ?
                        <img src={tweet.photo} className="size-28 rounded-md"/>
                        :
                        <CameraIcon className="h-6 w-6 text-gray-500" />
                        }
                    </div> */}
                </Link>
                <div className="flex flex-col justify-between p-2">
                <Link href={`tweets/${tweet.id}`}>
                    <span className="font-semibold text-lg">{tweet.title}</span>
                </Link>
                <span className="w-72 truncate">{tweet.contents}</span>
                </div>
                 <div className="w-full flex size-7 justify-end">
                 {/* <HeartBtn isLiked={isLiked} likeCount={likeCnt} postId={id} /> */}
                </div>
             </div>
                ))}
            </div>
           <FloatingBtn />
        </div>
    );
}