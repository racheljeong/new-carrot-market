import Link from "next/link";
import FloatingBtn from "./FloatingBtn";
import { string } from "zod";


interface CountProps {
    likes : number;
}

interface TweetProps {
    id : number;
    title : string;
    photo : string;
    contents : string;
    view : number;
    //likes : CountProps;
    tag? : string;
    createdAt : Date;
    _count : CountProps;
}

export default function TweetList({id,title,photo,contents,tag,view,createdAt} : TweetProps) {
    const formattedDate = new Date(createdAt).toISOString().split("T")[0].replace(/-/g, " ");
   
    return (
        <div className="flex flex-row gap-5 border-2 border-slate-300 m-2 p-2 rounded-md
                        last:border-b-0">
            <Link href={`tweets/${id}`}>
                <div>
                    <img src={photo ? photo : `/defaultLatte.jpg`} 
                        className="size-28 rounded-md"/>
                </div>
            </Link>
           <div className="flex flex-col justify-between p-2">
            <Link href={`tweets/${id}`}>
                <span className="font-semibold text-lg">{title}</span>
            </Link>
            <span className="w-72 truncate">{contents}</span>
            <span className=" text-slate-500 font-sans text-xs">{formattedDate}</span>
           </div>
            <div className="flex size-7">
                <svg data-slot="icon" fill="none" strokeWidth="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                </svg>
            </div>
        </div>
    );
}