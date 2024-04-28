
import Input from "@/components/Input";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import HeartBtn from "@/components/HeartBtn";
import { EyeIcon } from "@heroicons/react/24/outline";


async function getWriterChk (userId : number) {
    const session = await getSession();
    if(session.id){
        return session.id === userId;
    }
    return false;
}

async function getTweet(id : number) {
    try {
        const tweet = await db.tweet.findUnique({
            where : {
                id
            },
           select : {
                title : true,
                contents : true,
                createdAt : true,
                photo : true,
            },
        });
        return tweet;
    } catch(e) {
        return null;
    }
}

async function getTweetDetail(id : number) {
    
    try {
        const tweet = await db.tweet.update({
            where : {
                id
            },
            data : {
                view : {
                    increment : 1,
                },
            },
            include: {
                user: {
                  select: {
                    username: true,
                    avatar: true,
                  },
                },
            },
        });
        return tweet;
    } catch(e) {
        return null;
    }
}

const getCachedPost = nextCache(getTweetDetail, ["post-detail"], {
    tags: ["post-detail"],
    revalidate: 60,
  });

async function getLikeStatus(tweetId : number) {
    const session = await getSession();
    const isLiked = await db.like.findUnique({
        where : {
            id : {
                tweetId,
                userId : session.id!,
            }
        }
    });

    const likeCnt = await db.like.count({
        where : {
            tweetId,
        }
    });
    return {
        likeCnt,
        isLiked : Boolean(isLiked),
    }
}
export function getCachedLikeStatus(tweetId: number) {
    const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
      tags: [`like-status-${tweetId}`],
    });
    return cachedOperation(tweetId);
  }

export default async function TweetDetail({
    params,
  }: {
    params: { id: string };
  }) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return notFound();
      }
    const post = await getCachedPost(id);

    if (!post) {
        return notFound();
      }

    const { likeCnt, isLiked } = await getCachedLikeStatus(id);
    const tweetDetails = await getTweet(id);
    const formattedDate = new Date(post.createdAt).toISOString().split("T")[0].replace(/-/g, " ");
    
    console.log(`tweetDetails`,tweetDetails);


    return (
        <div className="flex flex-col items-center justify-between p-3">
          <div className="p-5 flex flex-col gap-5">
            {post.photo ? 
                <img src={post.photo} alt=""/> 
                : 
                <svg className="hover:text-orange-200 justify-center align-middle" data-slot="icon" fill="none" strokeWidth="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                </svg>  
            }
            </div>
        <h1 className="text-4xl font-semibold m-3 p-2">{post.title}</h1>
        <div className="w-full justify-end flex flex-row gap-4 m-2 p-2 text-neutral-400 text-sm">
            <span className="justify-center text-center"><EyeIcon className="size-7"/>{post.view}</span>
            <span><HeartBtn isLiked={isLiked} likeCount={likeCnt} postId={id} /></span>
        </div>
        <p className="bg-slate-50 w-full p-4 rounded-md m-5 text-lg font-sans">{post.contents}
        <span className="flex text-md justify-end right-2 ml-auto font-semibold m-2 p-1">{post.user.username}</span>
            <span className="flex justify-end font-sans text-sm text-slate-500">{formattedDate}</span>
        </p>
        </div>
        )
}